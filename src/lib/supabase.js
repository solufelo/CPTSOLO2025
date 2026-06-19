/**
 * Custom Supabase Emulator Client
 * Replaces @supabase/supabase-js, routing database operations, storage, 
 * and authentication to the local SQLite Python backend (port 8081).
 */

const API_BASE = import.meta.env.VITE_API_URL || '';
const authListeners = new Set();

const triggerAuthEvent = (event, session) => {
  for (const listener of authListeners) {
    try {
      listener(event, session);
    } catch (e) {
      console.error('Error in auth listener:', e);
    }
  }
};

class SupabaseQueryBuilder {
  constructor(table) {
    this.table = table;
    this.operation = 'select';
    this.conditions = {};
    this.orderConfig = null;
    this.limitVal = null;
    this.isSingle = false;
    this.data = null;
  }

  select(columns = '*') {
    this.operation = 'select';
    this.selectColumns = columns;
    return this;
  }

  insert(data) {
    this.operation = 'insert';
    this.data = data;
    return this;
  }

  update(data) {
    this.operation = 'update';
    this.data = data;
    return this;
  }

  delete() {
    this.operation = 'delete';
    return this;
  }

  eq(column, value) {
    this.conditions[column] = value;
    return this;
  }

  order(column, options = {}) {
    this.orderConfig = {
      field: column,
      ascending: options.ascending !== false,
    };
    return this;
  }

  limit(val) {
    this.limitVal = val;
    return this;
  }

  single() {
    this.isSingle = true;
    return this;
  }

  async execute() {
    try {
      const token = localStorage.getItem('portfolio_session_token') || '';
      const response = await fetch(`${API_BASE}/api/db/${this.table}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          operation: this.operation,
          conditions: this.conditions,
          order: this.orderConfig,
          isSingle: this.isSingle,
          data: this.data,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return { data: null, error: { message: errorData.error || `HTTP ${response.status}` } };
      }

      const res = await response.json();
      return { data: res.data, error: null };
    } catch (err) {
      console.error(`DB Query Error on table ${this.table}:`, err);
      return { data: null, error: { message: err.message || 'Network error' } };
    }
  }

  // Thenable implementation to support direct await on the builder chain
  async then(onfulfilled, onrejected) {
    try {
      const res = await this.execute();
      return onfulfilled ? onfulfilled(res) : res;
    } catch (err) {
      if (onrejected) return onrejected(err);
      throw err;
    }
  }
}

class SupabaseChannel {
  constructor(name) {
    this.name = name;
    this.listeners = [];
    this.pollingInterval = null;
  }

  on(event, config, callback) {
    this.listeners.push({ event, config, callback });
    return this;
  }

  subscribe(statusCallback) {
    // Notify client they are subscribed
    setTimeout(() => {
      if (statusCallback) statusCallback('SUBSCRIBED');
    }, 10);

    // Mock postgres_changes by polling local API
    this.pollingInterval = setInterval(() => {
      this.listeners.forEach((listener) => {
        // Trigger registered callbacks to pull updates
        try {
          listener.callback();
        } catch (e) {
          console.error('Error in realtime channel listener callback:', e);
        }
      });
    }, 3000); // 3 seconds poll

    return this;
  }

  unsubscribe() {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
      this.pollingInterval = null;
    }
  }
}

export const supabase = {
  auth: {
    async getSession() {
      try {
        const token = localStorage.getItem('portfolio_session_token');
        if (!token) return { data: { session: null }, error: null };

        const response = await fetch(`${API_BASE}/api/auth/session`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          localStorage.removeItem('portfolio_session_token');
          return { data: { session: null }, error: null };
        }

        const sessionInfo = await response.json();
        if (sessionInfo.authenticated) {
          const user = {
            id: sessionInfo.user_id,
            email: sessionInfo.email,
            user_metadata: {
              full_name: sessionInfo.full_name || '',
            },
          };
          const session = {
            user,
            access_token: token,
          };
          return { data: { session }, error: null };
        }
        
        return { data: { session: null }, error: null };
      } catch (err) {
        return { data: { session: null }, error: err };
      }
    },

    async getUser() {
      const { data: { session }, error } = await this.getSession();
      return { data: { user: session?.user ?? null }, error };
    },

    async signUp({ email, password, options }) {
      try {
        const fullName = options?.data?.full_name || '';
        const response = await fetch(`${API_BASE}/api/auth/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password, full_name: fullName }),
        });

        const res = await response.json();
        if (!response.ok) {
          return { data: { user: null }, error: { message: res.error || 'Signup failed' } };
        }

        const user = {
          id: res.user_id,
          email,
          user_metadata: {
            full_name: fullName,
          },
        };

        return { data: { user }, error: null };
      } catch (err) {
        return { data: { user: null }, error: { message: err.message } };
      }
    },

    async signInWithPassword({ email, password }) {
      try {
        const response = await fetch(`${API_BASE}/api/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        const res = await response.json();
        if (!response.ok) {
          return { data: { session: null, user: null }, error: { message: res.error || 'Login failed' } };
        }

        localStorage.setItem('portfolio_session_token', res.token);

        const user = {
          id: res.user_id,
          email: res.email,
          user_metadata: {
            full_name: res.full_name || '',
          },
        };
        const session = {
          user,
          access_token: res.token,
        };

        triggerAuthEvent('SIGNED_IN', session);
        return { data: { session, user }, error: null };
      } catch (err) {
        return { data: { session: null, user: null }, error: { message: err.message } };
      }
    },

    async signOut() {
      try {
        const token = localStorage.getItem('portfolio_session_token');
        if (token) {
          await fetch(`${API_BASE}/api/auth/logout`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }).catch(() => {});
        }
      } finally {
        localStorage.removeItem('portfolio_session_token');
        triggerAuthEvent('SIGNED_OUT', null);
      }
      return { error: null };
    },

    onAuthStateChange(callback) {
      authListeners.add(callback);
      // Immediately run callback with current session
      this.getSession().then(({ data: { session } }) => {
        callback(session ? 'INITIAL_SESSION' : 'SIGNED_OUT', session);
      });

      return {
        data: {
          subscription: {
            unsubscribe() {
              authListeners.delete(callback);
            },
          },
        },
      };
    },

    async resetPasswordForEmail(email) {
      console.log(`Mock reset password request for email: ${email}`);
      return { data: {}, error: null };
    },

    admin: {
      async deleteUser(userId) {
        try {
          const { error } = await supabase.from('users').delete().eq('id', userId);
          return { error };
        } catch (err) {
          return { error: err };
        }
      },
    },
  },

  from(table) {
    return new SupabaseQueryBuilder(table);
  },

  storage: {
    from(bucket) {
      return {
        async upload(path, file) {
          console.log(`Mock storage upload [${bucket}] to ${path}`, file);
          return { data: { path }, error: null };
        },
        getPublicUrl(path) {
          // Serve general resume as a successful static fallback download
          return { data: { publicUrl: '/resume.pdf' } };
        },
      };
    },
  },

  channel(name) {
    return new SupabaseChannel(name);
  },

  removeChannel(channel) {
    if (channel && typeof channel.unsubscribe === 'function') {
      channel.unsubscribe();
    }
  },
};

export default supabase;
