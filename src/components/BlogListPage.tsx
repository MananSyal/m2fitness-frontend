import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Home, Dumbbell, User, Utensils, Users, BookOpen, ArrowLeft, Clock, User as UserIcon } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export default function BlogListPage() {
  const navigate = useNavigate();

  const blogArticles = [
    {
      id: 1,
      title: 'No More Excuses — Desi Style Fitness at Home',
      snippet: 'Discover how you can build muscle and lose fat using simple, home-based workouts that fit the Indian lifestyle. No gym? No problem!',
      thumbnail: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600',
      author: 'Rahul Sharma',
      date: 'October 25, 2025',
      readTime: '5 min read',
    },
    {
      id: 2,
      title: 'Why Paneer is the Best Protein You\'re Ignoring',
      snippet: 'Paneer isn\'t just for curries! Learn why this Indian cottage cheese should be your #1 protein source for building muscle and staying fit.',
      thumbnail: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600',
      author: 'Dr. Priya Patel',
      date: 'October 22, 2025',
      readTime: '4 min read',
    },
    {
      id: 3,
      title: 'Top 5 Workouts for Indian Beginners',
      snippet: 'Starting your fitness journey? These 5 exercises are perfect for Indian beginners who want to build strength without overwhelming themselves.',
      thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600',
      author: 'Amit Kumar',
      date: 'October 20, 2025',
      readTime: '6 min read',
    },
    {
      id: 4,
      title: 'The Psychology of Lifting — Stay Consistent',
      snippet: 'Why do 90% of people quit fitness after 3 months? Understand the mental game behind building lasting workout habits and never quit again.',
      thumbnail: 'https://images.unsplash.com/photo-1554244933-d876deb6b2ff?w=600',
      author: 'Neha Gupta',
      date: 'October 18, 2025',
      readTime: '7 min read',
    },
    {
      id: 5,
      title: 'Workouts for Students Who Sit All Day',
      snippet: 'Spending 8+ hours sitting and studying? These quick, effective workouts will help you stay fit and focused even with a packed schedule.',
      thumbnail: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=600',
      author: 'Sanjay Verma',
      date: 'October 15, 2025',
      readTime: '5 min read',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-sm z-50 border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-orange-500 rounded-lg"></div>
              <span className="text-xl" style={{ fontWeight: 700 }}>M2Fitnes</span>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="ghost" size="sm">
                  <User className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate(-1)}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-5xl mb-4" style={{ fontWeight: 700 }}>
              <span className="bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent">
                M2Fitnes Blog
              </span>
            </h1>
            <p className="text-xl text-gray-600">
              Real advice. Real results. 100% Desi fitness wisdom.
            </p>
          </div>

          {/* Blog Articles Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {blogArticles.map((article) => (
              <Card 
                key={article.id}
                className="group cursor-pointer hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-orange-300"
                onClick={() => navigate(`/blog/${article.id}`)}
              >
                <CardContent className="p-0">
                  {/* Thumbnail */}
                  <div className="aspect-video relative overflow-hidden rounded-t-lg">
                    <ImageWithFallback
                      src={article.thumbnail}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h2 className="text-2xl mb-3 group-hover:text-orange-600 transition-colors" style={{ fontWeight: 700 }}>
                      {article.title}
                    </h2>
                    <p className="text-gray-600 mb-4">
                      {article.snippet}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <UserIcon className="w-4 h-4" />
                        <span>{article.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t">
                      <p className="text-xs text-gray-400">{article.date}</p>
                    </div>

                    {/* CTA */}
                    <Button 
                      className="w-full mt-4 bg-gradient-to-r from-orange-500 to-blue-500 hover:from-orange-600 hover:to-blue-600"
                    >
                      Read More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-orange-500 rounded-lg"></div>
            <span className="text-xl" style={{ fontWeight: 700 }}>M2Fitness</span>
          </div>
          <p className="text-gray-400">&copy; 2025 M2Fitnes. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
