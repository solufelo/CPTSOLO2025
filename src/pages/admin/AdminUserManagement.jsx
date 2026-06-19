/**
 * Admin User Management
 * View and manage all users
 */

import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';
import AuthGuard from '../../components/auth/AuthGuard';
import LogoHeader from '../../components/LogoHeader';
import Navbar from '../../sections/Navbar';

const AdminUserManagement = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const isAdmin = user?.email === 'solomonolufelo@outlook.com' || user?.email?.includes('admin');

  useEffect(() => {
    if (!isAdmin) {
      navigate('/dashboard');
      return;
    }
    fetchUsers();
  }, [user, isAdmin, navigate]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      
      // Fetch all profiles with their order counts
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;

      // Fetch order counts for each user
      const usersWithStats = await Promise.all(
        (profiles || []).map(async (profile) => {
          const { data: orders } = await supabase
            .from('orders')
            .select('id, price, status')
            .eq('user_id', profile.id);

          const totalSpent = orders?.reduce((sum, order) => sum + (parseFloat(order.price) || 0), 0) || 0;
          const orderCount = orders?.length || 0;

          return {
            ...profile,
            orderCount,
            totalSpent,
            lastOrder: orders?.[0]?.created_at || null,
          };
        })
      );

      setUsers(usersWithStats);
    } catch (err) {
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user =>
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isAdmin) {
    return null;
  }

  return (
    <AuthGuard>
      <LogoHeader />
      <Navbar />
      
      <div className="min-h-screen bg-DarkLava py-20 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="font-amiamie-round text-4xl font-black text-primary mb-2">
                User Management
              </h1>
              <p className="text-SageGray">
                Manage all registered users
              </p>
            </div>
            <button
              onClick={() => navigate('/dashboard/admin')}
              className="bg-primary/10 border border-SageGray/30 text-primary px-4 py-2 rounded-lg
                       hover:bg-primary/20 transition-colors"
            >
              ← Back to Admin Dashboard
            </button>
          </div>

          {/* Search */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-1/3 bg-primary/5 border border-SageGray/30 rounded px-4 py-2 text-primary
                       focus:outline-none focus:border-gold"
            />
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-SageGray">Loading users...</p>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-SageGray">No users found.</p>
            </div>
          ) : (
            <div className="bg-primary/10 border border-SageGray/30 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-primary/20 border-b border-SageGray/30">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-amiamie-round font-bold text-primary uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-amiamie-round font-bold text-primary uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-amiamie-round font-bold text-primary uppercase tracking-wider">
                        Orders
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-amiamie-round font-bold text-primary uppercase tracking-wider">
                        Total Spent
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-amiamie-round font-bold text-primary uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-amiamie-round font-bold text-primary uppercase tracking-wider">
                        Joined
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-amiamie-round font-bold text-primary uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-SageGray/30">
                    {filteredUsers.map((userData) => (
                      <tr key={userData.id} className="hover:bg-primary/5">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gold/20 flex items-center justify-center">
                              <span className="text-gold font-bold">
                                {userData.full_name?.[0]?.toUpperCase() || userData.email?.[0]?.toUpperCase() || 'U'}
                              </span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-primary">
                                {userData.full_name || 'No name'}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-SageGray">
                            {userData.email}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-primary font-bold">
                            {userData.orderCount}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gold font-bold">
                            ${userData.totalSpent.toFixed(2)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-bold rounded ${
                            userData.is_online 
                              ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                              : 'bg-gray-500/20 text-gray-400 border border-gray-500/50'
                          }`}>
                            {userData.is_online ? 'Online' : 'Offline'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-SageGray">
                          {new Date(userData.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button
                            onClick={() => navigate(`/order?userId=${userData.id}`)}
                            className="text-gold hover:text-gold/80 font-amiamie-round font-bold"
                          >
                            View Orders
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Stats Summary */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-primary/10 border border-SageGray/30 rounded-lg p-6">
              <h3 className="font-amiamie-round font-bold text-primary text-sm mb-2">
                Total Users
              </h3>
              <p className="text-3xl font-black text-gold">
                {users.length}
              </p>
            </div>
            <div className="bg-primary/10 border border-SageGray/30 rounded-lg p-6">
              <h3 className="font-amiamie-round font-bold text-primary text-sm mb-2">
                Users with Orders
              </h3>
              <p className="text-3xl font-black text-gold">
                {users.filter(u => u.orderCount > 0).length}
              </p>
            </div>
            <div className="bg-primary/10 border border-SageGray/30 rounded-lg p-6">
              <h3 className="font-amiamie-round font-bold text-primary text-sm mb-2">
                Total Revenue from Users
              </h3>
              <p className="text-3xl font-black text-gold">
                ${users.reduce((sum, u) => sum + u.totalSpent, 0).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
};

export default AdminUserManagement;

