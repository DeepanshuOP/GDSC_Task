import { useNavigate } from 'react-router-dom';

export function LandingPage() {
  const navigate = useNavigate();

  const handleNavigateToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary to-primary-dark text-white">
      <div className="text-center mb-12">
        <h1 className="text-6xl font-bold mb-4">Connect & Share</h1>
        <p className="text-xl opacity-90">Join our community and share your stories with the world</p>
      </div>
      
      <button
        onClick={handleNavigateToLogin}
        className="w-full max-w-md flex items-center justify-center px-6 py-3 bg-white text-primary rounded-lg shadow-lg hover:shadow-xl transition-all"
      >
        Go to Login
      </button>

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