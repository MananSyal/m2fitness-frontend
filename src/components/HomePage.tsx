import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Target, TrendingUp, Users, Star, Search } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export default function HomePage() {
  const features = [
    {
      icon: Target,
      title: 'Personalized Workouts',
      description: 'Get custom workout plans tailored to your fitness goals and experience level.',
    },
    {
      icon: TrendingUp,
      title: 'Progress Tracking',
      description: 'Track your workouts, monitor streaks, and celebrate every milestone.',
    },
    {
      icon: Users,
      title: 'Community Challenges',
      description: 'Join challenges, compete with friends, and stay motivated together.',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Lost 15kg in 4 months',
      content: 'M2Fitnes changed my life! The personalized plans kept me motivated and the progress tracking helped me stay consistent.',
      rating: 5,
    },
    {
      name: 'Mike Chen',
      role: 'Gained 8kg muscle',
      content: 'The variety of workouts and the community support are incredible. I\'ve never felt stronger!',
      rating: 5,
    },
    {
      name: 'Priya Sharma',
      role: '90-day streak',
      content: 'Finally found a fitness routine I can stick to! The regional diet plans are a game-changer.',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-sm z-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-orange-500 rounded-lg"></div>
              <span className="text-xl" style={{ fontWeight: 700 }}>M2Fitnes</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <Link to="/" className="text-gray-700 hover:text-blue-500 transition-colors">Home</Link>
              <Link to="/workouts" className="text-gray-700 hover:text-blue-500 transition-colors">Workouts</Link>
              <Link to="/diet" className="text-gray-700 hover:text-blue-500 transition-colors">Diet Plans</Link>
              <Link to="/community" className="text-gray-700 hover:text-blue-500 transition-colors">Community</Link>
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-orange-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl" style={{ fontWeight: 700, lineHeight: 1.2 }}>
                Your Fitness Journey Starts Today
              </h1>
              <p className="text-xl text-gray-600">
                Transform your body and mind with personalized workouts, nutrition plans, and a supportive community.
              </p>
              
              {/* Search Bar */}
              <div className="relative w-full max-w-2xl">
                <Input
                  placeholder="Search workouts, exercises, or diet plans..."
                  className="h-16 pl-6 pr-20 bg-white border-2 border-gray-200 rounded-2xl shadow-md hover:shadow-xl focus:shadow-2xl hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-base"
                  style={{ paddingTop: '1rem', paddingBottom: '1rem' }}
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 h-10 w-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center hover:from-blue-600 hover:to-blue-700 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer shadow-lg">
                  <Search className="w-5 h-5 text-white" />
                </button>
              </div>

              <div className="flex gap-4">
                <Link to="/signup">
                  <Button size="lg" className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                    Get Started
                  </Button>
                </Link>
                <Link to="/workouts">
                  <Button size="lg" variant="outline">
                    Explore Plans
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1646072508768-d8ed28bc834c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwbW9kZWwlMjBmdWxsJTIwYm9keSUyMHN0YW5kaW5nfGVufDF8fHx8MTc2MjAxOTcwOHww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Full body fitness model"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inspiration Banner */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJvbmclMjBtdXNjdWxhciUyMGF0aGxldGV8ZW58MXx8fHwxNzYyMDE5ODQwfDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Strong muscular athlete"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-900/50 to-transparent"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-5xl md:text-6xl mb-6 text-white" style={{ fontWeight: 700 }}>
              Build The Body You've Always Dreamed Of
            </h2>
            <p className="text-2xl text-white/90 mb-8">
              Join thousands who transformed their physiques with M2Fitnes
            </p>
            <Link to="/signup">
              <Button size="lg" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-lg px-8 py-6">
                Start Your Transformation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 py-12">
            <h2 className="text-5xl mb-6" style={{ fontWeight: 700 }}>
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600">
              Powerful tools to help you reach your fitness goals
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const featureImages = [
                'https://images.unsplash.com/photo-1734483768408-87df54bbc89a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib2R5YnVpbGRlciUyMHZlaW5zJTIwbXVzY2xlcyUyMHNocmVkZGVkfGVufDF8fHx8MTc2MjAxOTQ5MHww&ixlib=rb-4.1.0&q=80&w=1080',
                'https://images.unsplash.com/photo-1667890786608-8b2f8c60afa6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNjdWxhciUyMG1hbiUyMHdvcmtvdXR8ZW58MXx8fHwxNzYyMDE5NDk5fDA&ixlib=rb-4.1.0&q=80&w=1080',
                'https://images.unsplash.com/photo-1756699495345-6877309eb20b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdGhsZXRpYyUyMHdvbWFuJTIwbXVzY2xlc3xlbnwxfHx8fDE3NjIwMTk0OTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
              ];
              return (
                <Card key={index} className="border-2 hover:border-blue-500 transition-all duration-300 hover:shadow-lg overflow-hidden">
                  <div className="relative h-64">
                    <ImageWithFallback
                      src={featureImages[index]}
                      alt={feature.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-br from-blue-500 to-orange-500 rounded-xl flex items-center justify-center">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <CardContent className="p-6 text-center">
                    <h3 className="mb-3" style={{ fontWeight: 700 }}>{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Transformation Gallery */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 py-12">
            <h2 className="text-5xl mb-6" style={{ fontWeight: 700 }}>
              Real Transformations
            </h2>
            <p className="text-xl text-gray-600">
              See what's possible with dedication and the right plan
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl group">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1584952811320-7e85d8f3a5c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwdHJhbnNmb3JtYXRpb24lMjBiZWZvcmUlMjBhZnRlcnxlbnwxfHx8fDE3NjIwMTk4Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Fitness transformation"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-3xl mb-2" style={{ fontWeight: 700 }}>90 Days</p>
                <p className="text-lg">Complete Body Transformation</p>
              </div>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl group">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1609389231040-f3d0cd6c2c51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxneW0lMjBtb3RpdmF0aW9uJTIwd29ya291dHxlbnwxfHx8fDE3NjIwMTk4NDB8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Gym motivation"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-3xl mb-2" style={{ fontWeight: 700 }}>Peak Performance</p>
                <p className="text-lg">Achieve Your Maximum Potential</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section with Background */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1621750627159-cf77b0b91aac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib2R5YnVpbGRlciUyMGZ1bGwlMjBib2R5JTIwcG9zZXxlbnwxfHx8fDE3NjIwMTk3MDh8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Bodybuilder full body pose"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/85 to-purple-900/85"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 py-12">
            <h2 className="text-6xl text-white mb-6" style={{ fontWeight: 700 }}>
              Join The Movement
            </h2>
            <p className="text-2xl text-white/90">
              Thousands are already transforming their lives
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: '50K+', label: 'Active Members' },
              { number: '100K+', label: 'Workouts Completed' },
              { number: '25K+', label: 'Goals Achieved' },
              { number: '4.9★', label: 'Average Rating' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-5xl md:text-6xl text-white mb-2" style={{ fontWeight: 700 }}>{stat.number}</p>
                <p className="text-xl text-white/80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 py-12">
            <h2 className="text-5xl mb-6" style={{ fontWeight: 700 }}>
              Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              Real results from real people
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => {
              const avatarImages = [
                'https://images.unsplash.com/photo-1551833726-b6549cd73566?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwd29tYW4lMjBhYnMlMjBzdHJvbmd8ZW58MXx8fHwxNzYyMDE5NDk4fDA&ixlib=rb-4.1.0&q=80&w=1080',
                'https://images.unsplash.com/photo-1734191979156-57972139dfee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNjdWxhciUyMGZpdG5lc3MlMjBtb2RlbCUyMHBoeXNpcXVlfGVufDF8fHx8MTc2MjAxOTQ5MXww&ixlib=rb-4.1.0&q=80&w=1080',
                'https://images.unsplash.com/photo-1756699495345-6877309eb20b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdGhsZXRpYyUyMHdvbWFuJTIwbXVzY2xlc3xlbnwxfHx8fDE3NjIwMTk0OTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
              ];
              return (
                <Card key={index} className="bg-white overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="relative h-48">
                    <ImageWithFallback
                      src={avatarImages[index]}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  </div>
                  <CardContent className="p-8">
                    <div className="mb-4">
                      <p className="text-xl mb-1" style={{ fontWeight: 600 }}>{testimonial.name}</p>
                      <p className="text-sm text-blue-600" style={{ fontWeight: 600 }}>{testimonial.role}</p>
                    </div>
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-orange-500 text-orange-500" />
                      ))}
                    </div>
                    <p className="text-gray-700 italic">"{testimonial.content}"</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA with Aesthetic Image */}
      <section className="relative py-40 overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1623092350739-4635ce84d47c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib2R5YnVpbGRpbmclMjBjb21wZXRpdGlvbiUyMHN0YWdlfGVufDF8fHx8MTc2MjAxOTg0MXww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Bodybuilding competition"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30"></div>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl md:text-7xl text-white mb-8" style={{ fontWeight: 700 }}>
            Your Journey Starts Now
          </h2>
          <p className="text-2xl md:text-3xl text-white/90 mb-12">
            Stop dreaming. Start building. Transform your body today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-xl px-12 py-8">
                Get Started Free
              </Button>
            </Link>
            <Link to="/workouts">
              <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm text-white border-2 border-white hover:bg-white/20 text-xl px-12 py-8">
                View Programs
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-orange-500 rounded-lg"></div>
                <span className="text-xl" style={{ fontWeight: 700 }}>M2Fitnes</span>
              </div>
              <p className="text-gray-400">Transform your life, one workout at a time.</p>
            </div>
            <div>
              <h4 className="mb-4" style={{ fontWeight: 600 }}>Quick Links</h4>
              <div className="space-y-2">
                <Link to="/workouts" className="block text-gray-400 hover:text-white transition-colors">Workouts</Link>
                <Link to="/diet" className="block text-gray-400 hover:text-white transition-colors">Diet Plans</Link>
                <Link to="/community" className="block text-gray-400 hover:text-white transition-colors">Community</Link>
              </div>
            </div>
            <div>
              <h4 className="mb-4" style={{ fontWeight: 600 }}>Company</h4>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">About</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Contact</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              </div>
            </div>
            <div>
              <h4 className="mb-4" style={{ fontWeight: 600 }}>Account</h4>
              <div className="space-y-2">
                <Link to="/login" className="block text-gray-400 hover:text-white transition-colors">Login</Link>
                <Link to="/signup" className="block text-gray-400 hover:text-white transition-colors">Sign Up</Link>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 M2Fitnes. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
