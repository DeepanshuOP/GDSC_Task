import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, User, Lock } from 'lucide-react';
import { useAuthStore } from '../store/auth';
import { login } from '../lib/api';

export function LandingPage() {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();
  const [username, setUsername] = useState('atuny0');
  const [password, setPassword] = useState('9uQFF1Lh');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const user = await login(username, password);
      setUser(user);
      localStorage.setItem('token', user.token);
      navigate('/feed');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary to-primary-dark text-white">
      <div className="text-center mb-12">
        <h1 className="text-6xl font-bold mb-4">Connect & Share</h1>
        <p className="text-xl opacity-90">Join our community and share your stories with the world</p>
      </div>
      
      <form onSubmit={handleLogin} className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-lg p-8">
        <div className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium mb-1">Username</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20"
                placeholder="Enter username"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20"
                placeholder="Enter password"
              />
            </div>
          </div>

          {error && (
            <p className="text-red-300 text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center px-6 py-3 bg-white text-primary rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
          >
            {isLoading ? (
              'Logging in...'
            ) : (
              <>
                <LogIn className="w-5 h-5 mr-2" />
                Sign in
              </>
            )}
          </button>

          <p className="text-sm text-center text-white/60">
            Use these demo credentials to login:
            <br />
            Username: atuny0
            <br />
            Password: 9uQFF1Lh
          </p>
        </div>
      </form>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
        <FeatureCard
          title="Connect"
          description="Connect with like-minded people from around the world"
          icon="🌎"
        />
        <FeatureCard
          title="Share"
          description="Share your stories, thoughts, and experiences"
          icon="✍️"
        />
        <FeatureCard
          title="Discover"
          description="Discover interesting content tailored to your interests"
          icon="🔍"
        />
      </div>
    </div>
  );
}

function FeatureCard({ title, description, icon }: { title: string; description: string; icon: string }) {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 text-center">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="opacity-80">{description}</p>
    </div>
  );
}