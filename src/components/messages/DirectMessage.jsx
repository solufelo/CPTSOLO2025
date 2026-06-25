/**
 * Direct Message Component
 * Allows users to message admin directly without placing an order
 */

import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import { isUserOnline } from '../../lib/onlineStatus';
import { ensureProfileExists } from '../../lib/profileUtils';

const DirectMessage = ({ conversationId, onNewConversation }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [subject, setSubject] = useState('');
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [creating, setCreating] = useState(false);
  const messagesEndRef = useRef(null);
  const isAdmin = user?.email === 'solomonolufelo@outlook.com' || user?.email?.includes('admin');

  // Scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch messages for this conversation
  const fetchMessages = async () => {
    if (!conversationId) return;
    
    try {
      setLoading(true);
      
      // First, get the conversation to find the user_id
      const { data: conversation, error: convError } = await supabase
        .from('direct_messages')
        .select('user_id, subject')
        .eq('id', conversationId)
        .single();

      if (convError) throw convError;
      
      // Fetch all messages in this conversation thread (same user_id)
      // Note: We need to handle admin_id separately since it's optional
      const { data: allMessages, error: messagesError } = await supabase
        .from('direct_messages')
        .select(`
          *,
          profiles:user_id(email, full_name, last_seen, is_online),
          admin_profile:admin_id(email, full_name)
        `)
        .eq('user_id', conversation.user_id)
        .order('created_at', { ascending: true });

      if (messagesError) throw messagesError;
      setMessages(allMessages || []);
    } catch (err) {
      console.error('Error fetching messages:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (conversationId) {
      fetchMessages();
    }
  }, [conversationId]);

  // Set up realtime subscription
  useEffect(() => {
    if (!conversationId || !user) return;

    let channel = null;

    // Get the conversation to get user_id for filtering
    supabase
      .from('direct_messages')
      .select('user_id')
      .eq('id', conversationId)
      .single()
      .then(({ data: conversation }) => {
        if (!conversation) return;

        const channelName = `direct-messages-${conversation.user_id}`;
        channel = supabase
          .channel(channelName)
          .on(
            'postgres_changes',
            {
              event: 'INSERT',
              schema: 'public',
              table: 'direct_messages',
              filter: `user_id=eq.${conversation.user_id}`,
            },
            () => {
              fetchMessages();
            }
          )
          .on(
            'postgres_changes',
            {
              event: 'UPDATE',
              schema: 'public',
              table: 'direct_messages',
              filter: `user_id=eq.${conversation.user_id}`,
            },
            () => {
              fetchMessages();
            }
          )
          .subscribe((status) => {
            if (status === 'SUBSCRIBED') {
              console.log('Subscribed to direct messages');
            }
          });
      });

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, [conversationId, user]);

  // Create new conversation
  const handleCreateConversation = async (e) => {
    e.preventDefault();
    if (!subject.trim() || !newMessage.trim() || creating) return;

    try {
      setCreating(true);
      
      // Ensure profile exists
      await ensureProfileExists(user);
      
      // Update online status
      await supabase
        .from('profiles')
        .update({
          last_seen: new Date().toISOString(),
          is_online: true,
        })
        .eq('id', user.id);

      // Create new message (this starts a conversation)
      const { data, error } = await supabase
        .from('direct_messages')
        .insert([
          {
            user_id: user.id,
            subject: subject.trim(),
            message: newMessage.trim(),
            status: 'open',
          },
        ])
        .select()
        .single();

      if (error) throw error;

      // Send email notification to admin
      try {
        await sendDirectMessageNotification({
          conversationId: data.id,
          subject: subject.trim(),
          messagePreview: newMessage.trim().substring(0, 100),
          userEmail: user.email,
          userName: user.user_metadata?.full_name || user.email,
        });
      } catch (emailError) {
        console.error('Error sending email notification:', emailError);
      }

      // Clear form
      setSubject('');
      setNewMessage('');
      
      // Notify parent to refresh conversation list
      if (onNewConversation) {
        onNewConversation(data.id);
      }
      
      // Refresh messages
      fetchMessages();
    } catch (err) {
      console.error('Error creating conversation:', err);
      alert('Failed to send message: ' + err.message);
    } finally {
      setCreating(false);
    }
  };

  // Send message in existing conversation
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || sending || !conversationId) return;

    try {
      setSending(true);
      
      // Get conversation to get user_id (the customer in this conversation)
      const { data: conversation } = await supabase
        .from('direct_messages')
        .select('user_id')
        .eq('id', conversationId)
        .single();

      if (!conversation) throw new Error('Conversation not found');
      
      // The user_id in the conversation is the customer
      // We need to keep the same user_id for the thread

      // Update online status
      await supabase
        .from('profiles')
        .update({
          last_seen: new Date().toISOString(),
          is_online: true,
        })
        .eq('id', user.id);

      // Create new message in conversation
      // If admin is replying, set admin_id, otherwise keep user_id
      const messageData = {
        user_id: conversation.user_id,
        message: newMessage.trim(),
      };
      
      if (isAdmin) {
        messageData.admin_id = user.id;
      }

      const { data, error } = await supabase
        .from('direct_messages')
        .insert([messageData])
        .select()
        .single();

      if (error) throw error;

      // Send email notification
      try {
        const recipientId = isAdmin ? conversation.user_id : user.id;
        const { data: recipient } = await supabase
          .from('profiles')
          .select('email, full_name')
          .eq('id', recipientId)
          .single();

        if (recipient) {
          await sendDirectMessageNotification({
            conversationId: conversationId,
            subject: 'New message',
            messagePreview: newMessage.trim().substring(0, 100),
            recipientEmail: recipient.email,
            recipientName: recipient.full_name || recipient.email,
            senderName: user.user_metadata?.full_name || user.email || 'Admin',
            isAdmin: isAdmin,
          });
        }
      } catch (emailError) {
        console.error('Error sending email notification:', emailError);
      }

      setNewMessage('');
    } catch (err) {
      console.error('Error sending message:', err);
      alert('Failed to send message: ' + err.message);
    } finally {
      setSending(false);
    }
  };

  // Send email notification
  const sendDirectMessageNotification = async ({ conversationId, subject, messagePreview, userEmail, userName, recipientEmail, recipientName, senderName, isAdmin }) => {
    try {
      const response = await fetch('/api/order/message-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'direct_message',
          conversationId,
          subject,
          messagePreview,
          recipientEmail: recipientEmail || 'solomonolufelo@outlook.com',
          recipientName: recipientName || 'Admin',
          senderName: senderName || userName || 'User',
          isAdmin: isAdmin || false,
          messageUrl: `${window.location.origin}/dashboard/messages`,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to send email notification');
      }
    } catch (err) {
      console.error('Error sending direct message notification:', err);
      throw err;
    }
  };

  // Format message time
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (minutes < 1440) return `${Math.floor(minutes / 60)}h ago`;
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // If no conversation, show create form
  if (!conversationId) {
    return (
      <div className="bg-primary/10 border border-SageGray/30 rounded-lg p-6">
        <h3 className="font-amiamie-round text-xl font-black text-primary mb-4">
          💬 Send a Message
        </h3>
        <p className="text-SageGray mb-6">
          Have a question or want to discuss a project? Send me a message and I'll get back to you!
        </p>
        
        <form onSubmit={handleCreateConversation} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary/80 mb-2">
              Subject *
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="What is this about?"
              className="w-full bg-primary/5 border border-SageGray/30 rounded px-4 py-2 text-primary
                       focus:outline-none focus:border-gold"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-primary/80 mb-2">
              Message *
            </label>
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Tell me about your project or ask your question..."
              className="w-full bg-primary/5 border border-SageGray/30 rounded px-4 py-2 text-primary
                       focus:outline-none focus:border-gold h-32"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={!subject.trim() || !newMessage.trim() || creating}
            className="bg-gold text-DarkLava font-amiamie-round font-bold px-6 py-3 rounded-lg
                     hover:bg-gold/90 transition-colors disabled:opacity-50"
          >
            {creating ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    );
  }

  if (loading && messages.length === 0) {
    return (
      <div className="bg-primary/10 border border-SageGray/30 rounded-lg p-6">
        <p className="text-SageGray text-center">Loading messages...</p>
      </div>
    );
  }

  const conversation = messages[0];
  const conversationSubject = conversation?.subject || 'Direct Message';

  return (
    <div className="bg-primary/10 border border-SageGray/30 rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="font-amiamie-round text-xl font-black text-primary">
            💬 {conversationSubject}
          </h3>
          <p className="text-sm text-SageGray">
            {conversation?.status === 'open' ? 'Open' : 'Closed'}
          </p>
        </div>
      </div>

      {/* Messages Container */}
      <div className="h-96 overflow-y-auto mb-4 space-y-4 p-4 bg-primary/5 rounded-lg">
        {messages.length === 0 ? (
          <p className="text-SageGray text-center py-8">
            No messages yet. Start the conversation!
          </p>
        ) : (
          messages.map((message) => {
            // Determine if this message is from admin or user
            const isAdminMessage = !!message.admin_id;
            const isOwnMessage = isAdminMessage 
              ? message.admin_id === user.id 
              : message.user_id === user.id && !isAdmin;
            
            // Get sender info
            const senderName = isAdminMessage 
              ? (message.admin_profile?.full_name || message.admin_profile?.email || 'Admin')
              : (message.profiles?.full_name || message.profiles?.email || 'User');
            
            const senderOnline = !isAdminMessage && (message.profiles?.is_online || isUserOnline(message.profiles?.last_seen));

            return (
              <div
                key={message.id}
                className={`flex ${isOwnMessage || isAdminMessage ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    isAdminMessage
                      ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                      : isOwnMessage
                      ? 'bg-gold text-DarkLava'
                      : 'bg-primary/20 text-primary border border-SageGray/30'
                  }`}
                >
                  {!isOwnMessage && (
                    <div className="text-xs font-bold mb-1 opacity-80 flex items-center gap-2">
                      <span>{senderName}</span>
                      {senderOnline && !isAdminMessage && (
                        <span className="flex items-center gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
                          <span className="text-[10px] opacity-60">online</span>
                        </span>
                      )}
                    </div>
                  )}
                  {message.subject && message.id === conversation?.id && (
                    <div className="text-xs font-bold mb-2 opacity-80">
                      Subject: {message.subject}
                    </div>
                  )}
                  <p className="text-sm whitespace-pre-wrap break-words">{message.message}</p>
                  {message.file_url && (
                    <a
                      href={message.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs underline mt-2 block"
                    >
                      📎 {message.file_name || 'Attachment'}
                    </a>
                  )}
                  <div className="text-xs opacity-60 mt-1">
                    {formatTime(message.created_at)}
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 bg-primary/5 border border-SageGray/30 rounded px-4 py-2 text-primary
                   focus:outline-none focus:border-gold"
          disabled={sending}
        />
        <button
          type="submit"
          disabled={!newMessage.trim() || sending}
          className="bg-gold text-DarkLava font-amiamie-round font-bold px-6 py-2 rounded-lg
                   hover:bg-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {sending ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
};

export default DirectMessage;

