import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Home, User, ArrowLeft, Clock, User as UserIcon, Share2, Heart, MessageCircle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';

export default function BlogDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const blogArticles = {
    '1': {
      title: 'No More Excuses — Desi Style Fitness at Home',
      author: 'Rahul Sharma',
      date: 'October 25, 2025',
      readTime: '5 min read',
      thumbnail: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800',
      content: `
        <p>We've all heard the excuses: "I don't have time," "Gyms are too expensive," "I don't have equipment." But the truth is, you don't need any of that to get fit.</p>
        
        <h2>The Indian Home Workout Revolution</h2>
        <p>Fitness isn't about fancy equipment or expensive memberships. It's about consistency, dedication, and making the most of what you have. And guess what? You have everything you need right at home.</p>
        
        <h2>5 Exercises You Can Do Anywhere</h2>
        <ul>
          <li><strong>Push-ups:</strong> The ultimate chest and tricep builder. Start with 3 sets of 10.</li>
          <li><strong>Squats:</strong> Build powerful legs without weights. Aim for 3 sets of 15.</li>
          <li><strong>Plank:</strong> Core strength made simple. Hold for 30 seconds, 3 times.</li>
          <li><strong>Lunges:</strong> Balance and leg strength combined. 3 sets of 12 per leg.</li>
          <li><strong>Mountain Climbers:</strong> Cardio that burns fat fast. 3 sets of 20.</li>
        </ul>
        
        <h2>The Desi Diet Advantage</h2>
        <p>Combine these workouts with traditional Indian high-protein foods like dal, paneer, and curd. You don't need protein shakes when you have desi staples.</p>
        
        <h2>No More Excuses</h2>
        <p>Start today. Start small. But start. Your future self will thank you.</p>
      `,
    },
    '2': {
      title: 'Why Paneer is the Best Protein You\'re Ignoring',
      author: 'Dr. Priya Patel',
      date: 'October 22, 2025',
      readTime: '4 min read',
      thumbnail: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800',
      content: `
        <p>If you're vegetarian and serious about fitness, paneer should be your best friend. This humble Indian cottage cheese is a protein powerhouse that rivals any supplement.</p>
        
        <h2>The Protein Profile</h2>
        <p>100 grams of paneer contains approximately 18 grams of protein. That's comparable to chicken or fish! Plus, it's packed with calcium, which helps build strong bones.</p>
        
        <h2>Beyond the Curry</h2>
        <p>While paneer tikka masala is delicious, there are countless ways to incorporate paneer into your fitness diet:</p>
        <ul>
          <li><strong>Paneer Bhurji:</strong> Scrambled paneer with vegetables for breakfast (25g protein)</li>
          <li><strong>Grilled Paneer Tikka:</strong> Perfect post-workout snack (26g protein)</li>
          <li><strong>Paneer Paratha:</strong> High-protein breakfast option (25g protein)</li>
          <li><strong>Paneer Salad:</strong> Light dinner with greens (22g protein)</li>
        </ul>
        
        <h2>The Science Behind It</h2>
        <p>Paneer is rich in casein protein, which digests slowly and provides a steady stream of amino acids to your muscles. This makes it perfect for muscle recovery and growth.</p>
        
        <h2>Make Paneer Your Protein Partner</h2>
        <p>Whether you're bulking or cutting, paneer fits perfectly into any fitness plan. It's affordable, versatile, and 100% desi.</p>
      `,
    },
    '3': {
      title: 'Top 5 Workouts for Indian Beginners',
      author: 'Amit Kumar',
      date: 'October 20, 2025',
      readTime: '6 min read',
      thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
      content: `
        <p>Starting your fitness journey can be overwhelming. With so many exercises and conflicting advice, where do you even begin? We've got you covered.</p>
        
        <h2>1. Walking/Jogging</h2>
        <p>Don't underestimate the power of a simple walk. Start with 20 minutes daily and gradually increase. It's low-impact, requires no equipment, and perfect for Indian weather (just go early morning).</p>
        
        <h2>2. Bodyweight Squats</h2>
        <p>The king of leg exercises. Squats build lower body strength and improve mobility. Perfect for Indians who sit cross-legged regularly!</p>
        
        <h2>3. Push-ups (Modified if Needed)</h2>
        <p>Start with wall push-ups or knee push-ups. Work your way up to regular push-ups. They build chest, shoulders, and triceps effectively.</p>
        
        <h2>4. Plank Hold</h2>
        <p>Core strength is essential for all other exercises. Start with 20-second holds and progress to 1 minute or more.</p>
        
        <h2>5. Dumbbell Rows (or Bottle Rows)</h2>
        <p>Can't afford dumbbells? Use water bottles! This exercise builds a strong back and improves posture (crucial for desk workers).</p>
        
        <h2>The Beginner's Routine</h2>
        <p>Do these 5 exercises 3 times per week. Rest for 1-2 days between sessions. Combine with a high-protein Indian diet, and you'll see results in 4 weeks.</p>
        
        <h2>Remember</h2>
        <p>Everyone starts somewhere. The key is to start and stay consistent. You've got this!</p>
      `,
    },
    '4': {
      title: 'The Psychology of Lifting — Stay Consistent',
      author: 'Neha Gupta',
      date: 'October 18, 2025',
      readTime: '7 min read',
      thumbnail: 'https://images.unsplash.com/photo-1554244933-d876deb6b2ff?w=800',
      content: `
        <p>Why do 90% of people quit the gym after 3 months? It's not because they're lazy. It's because they don't understand the psychology of habit formation.</p>
        
        <h2>The Motivation Myth</h2>
        <p>Motivation is overrated. It's fleeting. What you need is discipline and systems. Motivation gets you started; discipline keeps you going.</p>
        
        <h2>The Power of Micro-Habits</h2>
        <p>Don't aim to work out for 2 hours daily. Start with 10 minutes. Make it so easy you can't say no. Once the habit is formed, increase the duration naturally.</p>
        
        <h2>Identity-Based Fitness</h2>
        <p>Don't say "I want to lose weight." Say "I am an athlete." When fitness becomes part of your identity, consistency becomes automatic.</p>
        
        <h2>The Indian Family Challenge</h2>
        <p>Indian families often don't understand fitness goals. "Zyada gym mat ja," "Bahut patla/patli ho gaya/gayi hai." Learn to politely ignore and stay focused on your goals.</p>
        
        <h2>Track Everything</h2>
        <p>What gets measured gets managed. Use apps to track workouts, take progress photos, measure yourself. Seeing progress fuels consistency.</p>
        
        <h2>Find Your Community</h2>
        <p>Join M2Fitnes community. Surround yourself with people who share your goals. Accountability partners make all the difference.</p>
        
        <h2>The 3-Month Rule</h2>
        <p>It takes 3 months for fitness to become a true habit. Push through the first 90 days, and you'll never quit again.</p>
      `,
    },
    '5': {
      title: 'Workouts for Students Who Sit All Day',
      author: 'Sanjay Verma',
      date: 'October 15, 2025',
      readTime: '5 min read',
      thumbnail: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=800',
      content: `
        <p>Spending 8+ hours sitting and studying? You're not alone. But prolonged sitting is destroying your health, focus, and fitness. Here's how to fight back.</p>
        
        <h2>The Student's Dilemma</h2>
        <p>Between classes, studying, assignments, and competitive exams, finding time for fitness seems impossible. But what if you could work out in just 15 minutes?</p>
        
        <h2>The 15-Minute Student Workout</h2>
        <ul>
          <li><strong>Jumping Jacks (2 min):</strong> Wake up your body and mind</li>
          <li><strong>Push-ups (3 sets of 10):</strong> Build upper body strength</li>
          <li><strong>Squats (3 sets of 15):</strong> Strengthen legs and improve blood flow</li>
          <li><strong>Plank (3x30 seconds):</strong> Core strength for better posture</li>
          <li><strong>Burpees (2 min):</strong> Full-body cardio blast</li>
        </ul>
        
        <h2>Study Break Exercises</h2>
        <p>Every 45 minutes of studying, take a 5-minute break:</p>
        <ul>
          <li>20 push-ups</li>
          <li>30 squats</li>
          <li>1-minute plank</li>
        </ul>
        <p>This will improve blood flow to your brain, making you sharper and more focused.</p>
        
        <h2>The Sitting Disease</h2>
        <p>Prolonged sitting increases risk of obesity, diabetes, and poor posture. Combat it with these desk stretches:</p>
        <ul>
          <li>Neck rolls (every hour)</li>
          <li>Shoulder shrugs (every hour)</li>
          <li>Seated spinal twists</li>
          <li>Ankle circles</li>
        </ul>
        
        <h2>Nutrition for Students</h2>
        <p>Ditch the samosas and chips. Opt for:</p>
        <ul>
          <li>Boiled eggs (quick protein)</li>
          <li>Roasted chana (study snack)</li>
          <li>Bananas (brain fuel)</li>
          <li>Paneer cubes (protein on the go)</li>
        </ul>
        
        <h2>Your Body = Your First Asset</h2>
        <p>Academic success means nothing without health. Take care of your body, and it will take care of you through exams, placements, and beyond.</p>
      `,
    },
  };

  const article = blogArticles[id as keyof typeof blogArticles];

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl mb-4" style={{ fontWeight: 700 }}>Article Not Found</h1>
          <Button onClick={() => navigate('/blog')}>
            Back to Blog
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
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
              <Link to="/blog">
                <Button variant="ghost" size="sm">
                  Back to Blog
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Article Header */}
      <div className="pt-24 pb-8 bg-gradient-to-br from-orange-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/blog')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>

          <h1 className="text-5xl mb-6" style={{ fontWeight: 700 }}>
            {article.title}
          </h1>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4 text-gray-600">
              <div className="flex items-center gap-2">
                <UserIcon className="w-5 h-5" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{article.readTime}</span>
              </div>
              <span className="text-sm text-gray-400">{article.date}</span>
            </div>

            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => toast.success('Article liked!')}
              >
                <Heart className="w-4 h-4 mr-2" />
                Like
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => toast.success('Link copied to clipboard!')}
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 mb-12">
        <div className="aspect-video overflow-hidden rounded-2xl shadow-2xl">
          <ImageWithFallback
            src={article.thumbnail}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: article.content }}
          style={{
            lineHeight: 1.8,
          }}
        />

        {/* Social Actions */}
        <div className="mt-12 pt-8 border-t">
          <div className="flex items-center justify-between">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-blue-500 hover:from-orange-600 hover:to-blue-600"
              onClick={() => toast.success('Article liked!')}
            >
              <Heart className="w-5 h-5 mr-2" />
              Like This Article
            </Button>
            <Button 
              variant="outline"
              size="lg"
              onClick={() => toast.success('Link copied!')}
            >
              <Share2 className="w-5 h-5 mr-2" />
              Share
            </Button>
          </div>
        </div>

        {/* CTA Section */}
        <Card className="mt-12 bg-gradient-to-r from-blue-500 to-orange-500 text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-3xl mb-4" style={{ fontWeight: 700 }}>
              Ready to Start Your Fitness Journey?
            </h3>
            <p className="text-xl mb-6 opacity-90">
              Join M2Fitnes and get personalized workouts and diet plans
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  Get Started Free
                </Button>
              </Link>
              <Link to="/">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Explore More
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
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

      <style>{`
        .prose h2 {
          font-size: 2rem;
          font-weight: 700;
          margin-top: 2rem;
          margin-bottom: 1rem;
          color: #1f2937;
        }
        .prose p {
          margin-bottom: 1.5rem;
          color: #4b5563;
        }
        .prose ul {
          margin-bottom: 1.5rem;
          padding-left: 2rem;
        }
        .prose li {
          margin-bottom: 0.75rem;
          color: #4b5563;
        }
        .prose strong {
          font-weight: 600;
          color: #1f2937;
        }
      `}</style>
    </div>
  );
}
