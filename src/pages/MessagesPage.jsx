/**
 * Messages Page
 * User can view and send direct messages to admin
 */

import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import AuthGuard from '../components/auth/AuthGuard';
import LogoHeader from '../components/LogoHeader';
import Navbar from '../sections/Navbar';
import DirectMessage from '../components/messages/DirectMessage';

const MessagesPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [loading, setLoading] = useState(true);
  const isAdmin = user?.email === 'solomonolufelo@outlook.com' || user?.email?.includes('admin');

  useEffect(() => {
    if (user) {
      fetchConversations();
    }
  }, [user]);

  // Set up realtime subscription for new conversations
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('direct-messages-list')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'direct_messages',
        },
        () => {
          fetchConversations();
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'direct_messages',
        },
        () => {
          fetchConversations();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const fetchConversations = async () => {
    try {
      setLoading(true);
      
      // Get all messages, then group by user_id (conversation thread)
      let query = supabase
        .from('direct_messages')
        .select('*, profiles:user_id(email, full_name)')
        .order('created_at', { ascending: false });

      // Users see their own conversations, admins see all
      if (!isAdmin) {
        query = query.eq('user_id', user.id);
      }

      const { data, error } = await query;

      if (error) throw error;

      // Group messages by user_id to create conversation threads
      // Each conversation is identified by the user_id (the customer)
      const conversationMap = new Map();
      (data || []).forEach(msg => {
        const key = msg.user_id; // Conversation key is the customer's user_id
        if (!conversationMap.has(key)) {
          // First message in this conversation (should have subject)
          conversationMap.set(key, {
            id: msg.id, // Use first message ID as conversation identifier
            user_id: msg.user_id,
            subject: msg.subject || 'Direct Message',
            created_at: msg.created_at,
            updated_at: msg.updated_at || msg.created_at,
            status: msg.status || 'open',
            profiles: msg.profiles,
            last_message: msg.message?.substring(0, 50) || '',
          });
        } else {
          // Update if this message is newer
          const existing = conversationMap.get(key);
          if (new Date(msg.created_at) > new Date(existing.updated_at)) {
            existing.updated_at = msg.created_at;
            existing.last_message = msg.message?.substring(0, 50) || '';
            existing.status = msg.status || existing.status;
          }
        }
      });

      // Sort conversations by most recent update
      const sortedConversations = Array.from(conversationMap.values())
        .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

      setConversations(sortedConversations);
    } catch (err) {
      console.error('Error fetching conversations:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleNewConversation = (conversationId) => {
    setSelectedConversation(conversationId);
    fetchConversations();
  };

  const getUnreadCount = (conversation) => {
    // Count unread messages for this conversation
    return conversations.filter(c => 
      c.user_id === conversation.user_id && 
      !c.read && 
      c.user_id !== user.id
    ).length;
  };

  return (
    <AuthGuard>
      <LogoHeader />
      <Navbar />
      
      <div className="min-h-screen bg-DarkLava py-20 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="font-amiamie-round text-4xl font-black text-primary mb-2">
                Messages
              </h1>
              <p className="text-SageGray">
                {isAdmin ? 'Manage customer messages' : 'Send me a message anytime'}
              </p>
            </div>
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-primary/10 border border-SageGray/30 text-primary px-4 py-2 rounded-lg
                       hover:bg-primary/20 transition-colors"
            >
              ← Back to Dashboard
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Conversations List */}
            <div className="lg:col-span-1">
              <div className="bg-primary/10 border border-SageGray/30 rounded-lg p-4">
                <h2 className="font-amiamie-round text-lg font-black text-primary mb-4">
                  {isAdmin ? 'All Conversations' : 'Your Messages'}
                </h2>
                
                {loading ? (
                  <p className="text-SageGray text-center py-4">Loading...</p>
                ) : (
                  <div className="space-y-2">
                    {conversations.length === 0 ? (
                      <p className="text-SageGray text-sm text-center py-4">
                        No messages yet
                      </p>
                    ) : (
                      conversations.map((conversation) => {
                        const unreadCount = getUnreadCount(conversation);
                        const isSelected = selectedConversation === conversation.id;

                        return (
                          <button
                            key={conversation.id}
                            onClick={() => setSelectedConversation(conversation.id)}
                            className={`w-full text-left p-3 rounded-lg transition-colors ${
                              isSelected
                                ? 'bg-gold text-DarkLava'
                                : 'bg-primary/5 hover:bg-primary/10 text-primary'
                            }`}
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <p className={`font-bold text-sm ${isSelected ? 'text-DarkLava' : 'text-primary'}`}>
                                  {conversation.subject}
                                </p>
                                <p className={`text-xs mt-1 ${isSelected ? 'text-DarkLava/80' : 'text-SageGray'}`}>
                                  {isAdmin 
                                    ? conversation.profiles?.email || 'Unknown'
                                    : 'To: Admin'
                                  }
                                </p>
                                {conversation.last_message && (
                                  <p className={`text-xs mt-1 ${isSelected ? 'text-DarkLava/60' : 'text-SageGray/70'} truncate`}>
                                    {conversation.last_message}...
                                  </p>
                                )}
                                <p className={`text-xs mt-1 ${isSelected ? 'text-DarkLava/60' : 'text-SageGray/70'}`}>
                                  {new Date(conversation.updated_at).toLocaleDateString()}
                                </p>
                              </div>
                              {unreadCount > 0 && !isSelected && (
                                <span className="bg-gold text-DarkLava text-xs font-bold px-2 py-1 rounded">
                                  {unreadCount}
                                </span>
                              )}
                            </div>
                          </button>
                        );
                      })
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Message View */}
            <div className="lg:col-span-2">
              <DirectMessage 
                conversationId={selectedConversation}
                onNewConversation={handleNewConversation}
              />
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
};

export default MessagesPage;

