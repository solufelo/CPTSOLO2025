/**
 * Order Chat Component
 * Live chat for order communication between users and admin
 */

import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import { isUserOnline } from '../../lib/onlineStatus';
import { ensureProfileExists } from '../../lib/profileUtils';
import FileUpload from './FileUpload';

const OrderChat = ({ orderId }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState(new Set());
  const messagesEndRef = useRef(null);
  const isAdmin = user?.email === 'solomonolufelo@outlook.com' || user?.email?.includes('admin');

  // Scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch messages
  const fetchMessages = async () => {
    if (!orderId) return;
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('order_messages')
        .select('*, profiles:user_id(email, full_name, last_seen, is_online)')
        .eq('order_id', orderId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages(data || []);
      
      // Update online users set
      if (data) {
        const online = new Set();
        data.forEach(msg => {
          if (msg.profiles) {
            const onlineStatus = msg.profiles.is_online || isUserOnline(msg.profiles.last_seen);
            if (onlineStatus) {
              online.add(msg.profiles.email);
            }
          }
        });
        setOnlineUsers(online);
      }
    } catch (err) {
      console.error('Error fetching messages:', err);
    } finally {
      setLoading(false);
    }
  };

  // Set up realtime subscription
  useEffect(() => {
    if (!orderId || !user) return;

    // Fetch initial messages
    fetchMessages();

    // Subscribe to new messages
    const channelName = `order-messages-${orderId}`;
    const channel = supabase
      .channel(channelName)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'order_messages',
          filter: `order_id=eq.${orderId}`,
        },
        () => {
          // Fetch updated messages to get user profile data
          fetchMessages();
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'order_messages',
          filter: `order_id=eq.${orderId}`,
        },
        () => {
          fetchMessages();
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          console.log('Subscribed to chat updates');
        } else if (status === 'CHANNEL_ERROR') {
          console.error('Chat subscription error');
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId, user]);

  // Send message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || sending) return;

    try {
      setSending(true);
      
      // Ensure profile exists before creating message
      await ensureProfileExists(user);
      
      // Get order details to send email notification
      // Also update online status when sending message
      const { data: orderData } = await supabase
        .from('orders')
        .select('user_id, profiles:user_id(email, full_name)')
        .eq('id', orderId)
        .single();
      
      // Update online status
      await supabase
        .from('profiles')
        .update({
          last_seen: new Date().toISOString(),
          is_online: true,
        })
        .eq('id', user.id);

      const { error } = await supabase
        .from('order_messages')
        .insert([
          {
            order_id: orderId,
            user_id: user.id,
            message: newMessage.trim(),
          },
        ]);

      if (error) throw error;
      
      // Send email notification if recipient is different from sender
      if (orderData && orderData.user_id !== user.id) {
        try {
          await sendMessageNotification({
            orderId,
            recipientEmail: orderData.profiles?.email,
            recipientName: orderData.profiles?.full_name || 'Customer',
            senderName: user.user_metadata?.full_name || user.email || 'Admin',
            messagePreview: newMessage.trim().substring(0, 100),
            isAdmin: isAdmin,
          });
        } catch (emailError) {
          console.error('Error sending email notification:', emailError);
          // Don't block message sending if email fails
        }
      }
      
      setNewMessage('');
    } catch (err) {
      console.error('Error sending message:', err);
      alert('Failed to send message: ' + err.message);
    } finally {
      setSending(false);
    }
  };

  // Send email notification for new message
  const sendMessageNotification = async ({ orderId, recipientEmail, recipientName, senderName, messagePreview, isAdmin }) => {
    try {
      // Call Netlify function to send email
      const response = await fetch('/.netlify/functions/send-message-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId,
          recipientEmail,
          recipientName,
          senderName,
          messagePreview,
          isAdmin,
          orderUrl: `${window.location.origin}/order/${orderId}`,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to send email notification');
      }
    } catch (err) {
      console.error('Error sending email notification:', err);
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

  if (loading && messages.length === 0) {
    return (
      <div className="bg-primary/10 border border-SageGray/30 rounded-lg p-6">
        <p className="text-SageGray text-center">Loading messages...</p>
      </div>
    );
  }

  return (
    <div className="bg-primary/10 border border-SageGray/30 rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-amiamie-round text-xl font-black text-primary">
          💬 Live Chat
        </h3>
        {/* Online Status Indicator */}
        <div className="flex items-center gap-2 text-sm">
          <div className="flex items-center gap-1">
            <div className={`w-2 h-2 rounded-full ${onlineUsers.size > 0 ? 'bg-green-400' : 'bg-gray-400'} animate-pulse`}></div>
            <span className="text-SageGray">
              {onlineUsers.size} {onlineUsers.size === 1 ? 'user' : 'users'} online
            </span>
          </div>
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
            const isOwnMessage = message.user_id === user.id;
            const senderName = message.profiles?.full_name || message.profiles?.email || 'Unknown';
            const isSenderAdmin = message.profiles?.email === 'solomonolufelo@outlook.com' || message.profiles?.email?.includes('admin');
            const senderOnline = message.profiles?.is_online || isUserOnline(message.profiles?.last_seen);

            return (
              <div
                key={message.id}
                className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    isOwnMessage
                      ? 'bg-gold text-DarkLava'
                      : isSenderAdmin
                      ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                      : 'bg-primary/20 text-primary border border-SageGray/30'
                  }`}
                >
                  {!isOwnMessage && (
                    <div className="text-xs font-bold mb-1 opacity-80 flex items-center gap-2">
                      <span>{isSenderAdmin ? '👑 Admin' : senderName}</span>
                      {senderOnline && (
                        <span className="flex items-center gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
                          <span className="text-[10px] opacity-60">online</span>
                        </span>
                      )}
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
          className="flex-1 bg-primary/5 border border-SageGray/30 rounded px-4 py-2 text-primary focus:outline-none focus:border-gold"
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

export default OrderChat;

