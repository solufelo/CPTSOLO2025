/**
 * Admin Blog Editor
 * Create and edit blog posts from the dashboard
 */

import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { ensureProfileExists } from '../../lib/profileUtils';
import AuthGuard from '../../components/auth/AuthGuard';
import LogoHeader from '../../components/LogoHeader';
import Navbar from '../../sections/Navbar';

const AdminBlogEditor = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    category: 'Music Production',
    content: '',
    readTime: '5 min',
    published: false,
  });

  // Check if user is admin (you can customize this check)
  const isAdmin = user?.email === 'solomonolufelo@outlook.com' || user?.email?.includes('admin');

  useEffect(() => {
    if (!isAdmin) {
      navigate('/dashboard');
      return;
    }
    if (user) {
      fetchPosts();
    }
  }, [user, isAdmin, navigate]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setPosts(data || []);
    } catch (err) {
      console.error('Error fetching posts:', err);
      alert('Error fetching posts: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    // Auto-generate slug from title (only if not editing existing post)
    if (field === 'title' && !editingPost) {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const handleDelete = async (postId) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', postId);
      
      if (error) throw error;
      
      alert('Post deleted successfully!');
      setFormData({
        title: '',
        slug: '',
        description: '',
        category: 'Music Production',
        content: '',
        readTime: '5 min',
        published: false,
      });
      setEditingPost(null);
      fetchPosts();
    } catch (err) {
      console.error('Error deleting post:', err);
      alert('Error deleting post: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!formData.title || !formData.slug || !formData.content) {
      alert('Please fill in all required fields (Title, Slug, Content)');
      return;
    }

    try {
      setLoading(true);
      
      // Ensure profile exists before creating blog post
      await ensureProfileExists(user);
      
      const postData = {
        user_id: user.id,
        title: formData.title,
        slug: formData.slug,
        description: formData.description,
        category: formData.category,
        content: formData.content,
        read_time: formData.readTime,
        published: formData.published,
      };

      let result;
      if (editingPost) {
        // Update existing post
        const { data, error } = await supabase
          .from('blog_posts')
          .update(postData)
          .eq('id', editingPost.id)
          .select()
          .single();
        if (error) throw error;
        result = data;
      } else {
        // Create new post
        const { data, error } = await supabase
          .from('blog_posts')
          .insert([postData])
          .select()
          .single();
        if (error) throw error;
        result = data;
      }

      alert(`Blog post ${editingPost ? 'updated' : 'created'} successfully!`);
      setFormData({
        title: '',
        slug: '',
        description: '',
        category: 'Music Production',
        content: '',
        readTime: '5 min',
        published: false,
      });
      setEditingPost(null);
      fetchPosts();
      
      // If post was published, it will appear in blog index automatically
      // BlogIndex fetches from database on load
    } catch (err) {
      console.error('Error saving post:', err);
      alert('Error saving post: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <AuthGuard>
      <LogoHeader />
      <Navbar />
      <div className="min-h-screen bg-DarkLava py-20 px-4 sm:px-8">
    <div className="max-w-4xl mx-auto">
      <div className="bg-primary/10 border border-SageGray/30 rounded-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-amiamie-round text-3xl font-black text-primary">
            Blog Post Editor
          </h2>
          <div className="flex gap-4">
            <button
              onClick={() => {
                setFormData({
                  title: '',
                  slug: '',
                  description: '',
                  category: 'Music Production',
                  content: '',
                  readTime: '5 min',
                  published: false,
                });
                setEditingPost(null);
              }}
              className="text-gold hover:underline text-sm"
            >
              New Post
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="text-gold hover:underline text-sm"
            >
              ← Back to Dashboard
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-primary/80 mb-2">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="w-full bg-primary/5 border border-SageGray/30 rounded px-4 py-2 text-primary"
              placeholder="Enter blog post title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary/80 mb-2">
              Slug *
            </label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => handleInputChange('slug', e.target.value)}
              className="w-full bg-primary/5 border border-SageGray/30 rounded px-4 py-2 text-primary"
              placeholder="blog-post-slug"
            />
            <p className="text-xs text-SageGray mt-1">
              URL: /blog/{formData.slug}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-primary/80 mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="w-full bg-primary/5 border border-SageGray/30 rounded px-4 py-2 text-primary"
              rows="3"
              placeholder="Brief description for SEO and preview"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary/80 mb-2">
              Category *
            </label>
            <select
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              className="w-full bg-primary/5 border border-SageGray/30 rounded px-4 py-2 text-primary"
            >
              <option value="Music Production">Music Production</option>
              <option value="Local Business">Local Business</option>
              <option value="Web Development">Web Development</option>
              <option value="Productivity">Productivity</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-primary/80 mb-2">
              Content (Markdown) *
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => handleInputChange('content', e.target.value)}
              className="w-full bg-primary/5 border border-SageGray/30 rounded px-4 py-2 text-primary font-mono"
              rows="20"
              placeholder="Write your blog post in Markdown format..."
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.published}
                onChange={(e) => handleInputChange('published', e.target.checked)}
                className="mr-2"
              />
              <span className="text-primary">Published</span>
            </label>
          </div>

          {/* Existing Posts List */}
          {posts.length > 0 && (
            <div className="mt-8 pt-8 border-t border-SageGray/30">
              <h3 className="font-amiamie-round text-xl font-black text-primary mb-4">
                Existing Posts ({posts.length})
              </h3>
              <div className="space-y-2">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-primary/5 border border-SageGray/30 rounded-lg p-4 flex justify-between items-center"
                  >
                    <div>
                      <h4 className="font-bold text-primary">{post.title}</h4>
                      <p className="text-sm text-SageGray">
                        {post.category} • {post.published ? 'Published' : 'Draft'} • {post.created_at ? new Date(post.created_at).toLocaleDateString() : ''}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setEditingPost(post);
                        setFormData({
                          title: post.title,
                          slug: post.slug,
                          description: post.description || '',
                          category: post.category,
                          content: post.content,
                          readTime: post.read_time || '5 min',
                          published: post.published || false,
                        });
                      }}
                      className="bg-primary/10 border border-SageGray/30 text-primary px-4 py-2 rounded-lg
                               hover:bg-primary/20 transition-colors text-sm"
                    >
                      Edit
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={handleSave}
              disabled={loading}
              className="bg-gold text-DarkLava font-amiamie-round font-bold py-3 px-6 rounded-lg
                       hover:bg-gold/90 transition-colors disabled:opacity-50"
            >
              {loading ? 'Saving...' : editingPost ? 'Update Post' : 'Save Post'}
            </button>
            <button
              onClick={() => {
                setFormData({
                  title: '',
                  slug: '',
                  description: '',
                  category: 'Music Production',
                  content: '',
                  readTime: '5 min',
                  published: false,
                });
                setEditingPost(null);
              }}
              disabled={loading}
              className="bg-primary/10 border border-SageGray/30 text-primary font-amiamie-round font-bold py-3 px-6 rounded-lg
                       hover:bg-primary/20 transition-colors disabled:opacity-50"
            >
              {editingPost ? 'Cancel Edit' : 'Clear Form'}
            </button>
            {editingPost && (
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to delete this post?')) {
                    handleDelete(editingPost.id);
                  }
                }}
                disabled={loading}
                className="bg-red-500/20 border border-red-500/50 text-red-400 font-amiamie-round font-bold py-3 px-6 rounded-lg
                         hover:bg-red-500/30 transition-colors disabled:opacity-50"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
      </div>
      </div>
    </AuthGuard>
  );
};

export default AdminBlogEditor;

