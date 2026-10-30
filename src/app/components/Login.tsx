import { useState } from 'react';
import { LogIn, Users, Shield } from 'lucide-react';

interface LoginProps {
  onLogin: (username: string, role: 'admin' | 'user') => void;
}

export function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Simple authentication
    if (username === 'admin' && password === 'admin') {
      onLogin('admin', 'admin');
    } else if (username === 'user' && password === 'user') {
      onLogin('user', 'user');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#10B759]/10 via-white to-[#5B7C8F]/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#10B759] to-[#0E9F4D] rounded-2xl shadow-lg mb-4">
            <Users className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#10B759] to-[#5B7C8F] bg-clip-text text-transparent">
            mypeople
          </h1>
          <p className="text-slate-600 mt-2">Virtual Event Platform</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Welcome Back</h2>
            <p className="text-slate-600 text-sm">Sign in to continue to your events</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-[#10B759] focus:ring-2 focus:ring-[#10B759]/20"
                placeholder="Enter your username"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-[#10B759] focus:ring-2 focus:ring-[#10B759]/20"
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#10B759] to-[#0E9F4D] text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <LogIn className="w-5 h-5" />
              Sign In
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 pt-6 border-t border-slate-200">
            <p className="text-xs text-slate-500 text-center mb-3">Demo Credentials:</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-50 rounded-lg p-3 text-center border border-slate-200">
                <Shield className="w-4 h-4 text-[#10B759] mx-auto mb-1" />
                <p className="text-xs font-semibold text-slate-700">Admin</p>
                <p className="text-xs text-slate-500 mt-1">admin / admin</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-3 text-center border border-slate-200">
                <Users className="w-4 h-4 text-[#5B7C8F] mx-auto mb-1" />
                <p className="text-xs font-semibold text-slate-700">User</p>
                <p className="text-xs text-slate-500 mt-1">user / user</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
