import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Input } from './ui/input';
import { Home, User, ArrowLeft, Heart, MessageCircle, Share2, MapPin, TrendingUp, Dumbbell } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';

interface PostData {
  id: string;
  username: string;
  userState: string;
  avatar: string;
  title: string;
  content: string;
  image: string;
  likes: number;
  comments: number;
  timestamp: string;
  tags: string[];
}

export default function CommunityPostDetailPage() {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [post, setPost] = useState<PostData | null>(null);
  const [liked, setLiked] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [postComments, setPostComments] = useState<Array<{id: number; user: string; text: string; likes: number}>>([]);

  // Sample post database
  const posts: { [key: string]: PostData } = {
    '1': {
      id: '1',
      username: 'RajeshKumar',
      userState: 'Haryana',
      avatar: 'RK',
      title: '30-day transformation complete!',
      content: "Started with M2Fitnes diet plan from Haryana. Lost 8kg while keeping muscle! The desi diet approach with high protein really works. Eating ghar ka khana and seeing results 💪\n\nBreakfast: Bajra roti + paneer\nLunch: Dal + brown rice\nDinner: Grilled chicken salad\n\nConsistency is key brothers! #M2Fitnes #HaryanaGains",
      image: 'transformation',
      likes: 342,
      comments: 48,
      timestamp: '2 days ago',
      tags: ['Transformation', 'Weight Loss', 'Haryana'],
    },
    '2': {
      id: '2',
      username: 'PriyaSharma',
      userState: 'Punjab',
      avatar: 'PS',
      title: 'New PR on Deadlifts 💪',
      content: "Hit 100kg deadlift today! Been following the M2Fitnes strength program for 3 months.\n\nStarted at 60kg, now at 100kg. The progressive overload works!\n\nDiet: High protein Punjabi meals\n- Chole\n- Dal makhani\n- Paneer tikka\n\nFeeling stronger every day! Who says desi food can't build muscle? #PunjabPower #Deadlifts",
      image: 'deadlift',
      likes: 289,
      comments: 35,
      timestamp: '1 day ago',
      tags: ['Strength', 'PR', 'Punjab'],
    },
    '3': {
      id: '3',
      username: 'AnkitVerma',
      userState: 'Delhi',
      avatar: 'AV',
      title: 'Meal prep Sunday done right',
      content: "Prepped all my meals for the week using M2Fitnes Delhi diet plan!\n\n✅ Rajma chawal\n✅ Chole with brown rice\n✅ Paneer tikka\n✅ Dal tadka\n\nAll meals have 30g+ protein. No excuses this week! Ghar ka khana = gym gains 🍛\n\n#MealPrep #DelhiDiet #M2Fitnes",
      image: 'mealprep',
      likes: 256,
      comments: 42,
      timestamp: '3 hours ago',
      tags: ['Meal Prep', 'Diet', 'Delhi'],
    },
  };

  const relatedPosts = [
    { id: '4', title: 'From 90kg to 75kg in 4 months', user: '@SunilPatil', state: 'Maharashtra' },
    { id: '5', title: 'Bench press journey: 40kg to 80kg', user: '@DeepakReddy', state: 'Tamil Nadu' },
    { id: '6', title: 'My vegetarian muscle gain journey', user: '@AmarJoshi', state: 'Gujarat' },
  ];

  useEffect(() => {
    if (postId && posts[postId]) {
      setPost(posts[postId]);
      
      // Sample comments
      setPostComments([
        { id: 1, user: '@VikramSingh', text: 'Inspirational bro! Keep it up 🔥', likes: 12 },
        { id: 2, user: '@NehaGupta', text: 'This is amazing! What was your workout split?', likes: 8 },
        { id: 3, user: '@RohitSharma', text: 'Desi diet best diet! 💪', likes: 15 },
      ]);
    }
  }, [postId]);

  const handleLike = () => {
    setLiked(!liked);
    if (post) {
      setPost({ ...post, likes: liked ? post.likes - 1 : post.likes + 1 });
    }
    toast.success(liked ? 'Unliked!' : 'Liked! ❤️');
  };

  const handleComment = () => {
    if (commentText.trim()) {
      setPostComments([
        ...postComments,
        { id: postComments.length + 1, user: '@You', text: commentText, likes: 0 }
      ]);
      setCommentText('');
      toast.success('Comment posted! 💬');
    }
  };

  const handleShare = () => {
    toast.success('Post link copied to clipboard! 🔗');
  };

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Post not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
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
              <Link to="/community">
                <Button variant="ghost" size="sm">
                  <User className="w-4 h-4 mr-2" />
                  Community
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Post Column */}
            <div className="lg:col-span-2">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/', { state: { scrollTo: 'community' } })}
                className="mb-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Feed
              </Button>

              {/* Post Card */}
              <Card className="border-2 shadow-lg">
                <CardContent className="p-0">
                  {/* Post Header */}
                  <div className="p-6 border-b">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500">
                          <AvatarFallback className="text-white" style={{ fontWeight: 700 }}>
                            {post.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg" style={{ fontWeight: 700 }}>@{post.username}</h3>
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {post.userState}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500">{post.timestamp}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="bg-blue-500 text-white hover:bg-blue-600">
                        Follow
                      </Button>
                    </div>
                  </div>

                  {/* Post Image */}
                  <div className="bg-gradient-to-br from-gray-100 to-gray-200 aspect-video flex items-center justify-center">
                    <div className="text-center">
                      <Dumbbell className="w-24 h-24 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 text-lg" style={{ fontWeight: 600 }}>{post.title}</p>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="p-6">
                    <h2 className="text-2xl mb-4" style={{ fontWeight: 700 }}>{post.title}</h2>
                    <p className="text-gray-700 whitespace-pre-line mb-4">{post.content}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {post.tags.map((tag, index) => (
                        <span key={index} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Engagement Stats */}
                    <div className="flex items-center gap-6 pb-4 border-b">
                      <button
                        onClick={handleLike}
                        className={`flex items-center gap-2 transition-all ${
                          liked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
                        }`}
                      >
                        <Heart className={`w-6 h-6 ${liked ? 'fill-current' : ''}`} />
                        <span style={{ fontWeight: 600 }}>{post.likes}</span>
                      </button>
                      <button className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-all">
                        <MessageCircle className="w-6 h-6" />
                        <span style={{ fontWeight: 600 }}>{post.comments}</span>
                      </button>
                      <button onClick={handleShare} className="flex items-center gap-2 text-gray-600 hover:text-green-500 transition-all">
                        <Share2 className="w-6 h-6" />
                        <span style={{ fontWeight: 600 }}>Share</span>
                      </button>
                    </div>

                    {/* Comment Section */}
                    <div className="mt-6">
                      <h3 className="text-xl mb-4" style={{ fontWeight: 700 }}>Comments ({postComments.length})</h3>
                      
                      {/* Add Comment */}
                      <div className="mb-6">
                        <div className="flex gap-3">
                          <Avatar className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500">
                            <AvatarFallback className="text-white" style={{ fontWeight: 700 }}>
                              You
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <Input
                              placeholder="Add your comment..."
                              value={commentText}
                              onChange={(e) => setCommentText(e.target.value)}
                              className="mb-2"
                              onKeyPress={(e) => e.key === 'Enter' && handleComment()}
                            />
                            <Button size="sm" onClick={handleComment} className="bg-blue-500 hover:bg-blue-600">
                              Post Comment
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Comments List */}
                      <div className="space-y-4">
                        {postComments.map((comment) => (
                          <div key={comment.id} className="flex gap-3 p-4 bg-gray-50 rounded-lg">
                            <Avatar className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-500">
                              <AvatarFallback className="text-white" style={{ fontWeight: 700 }}>
                                {comment.user.charAt(1)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <p className="text-sm mb-1" style={{ fontWeight: 700 }}>{comment.user}</p>
                              <p className="text-gray-700">{comment.text}</p>
                              <div className="flex items-center gap-4 mt-2">
                                <button className="text-sm text-gray-500 hover:text-red-500 flex items-center gap-1">
                                  <Heart className="w-4 h-4" />
                                  {comment.likes > 0 && <span>{comment.likes}</span>}
                                </button>
                                <button className="text-sm text-gray-500 hover:text-blue-500">Reply</button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Trending Creators */}
              <Card className="mb-6 border-2">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-5 h-5 text-orange-500" />
                    <h3 className="text-lg" style={{ fontWeight: 700 }}>Trending Creators</h3>
                  </div>
                  <div className="space-y-4">
                    {['@FitRahul', '@MuscleManoj', '@YogaPreeti'].map((creator, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500">
                            <AvatarFallback className="text-white">{creator.charAt(1)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm" style={{ fontWeight: 600 }}>{creator}</p>
                            <p className="text-xs text-gray-500">{Math.floor(Math.random() * 900 + 100)}K followers</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" className="text-xs">Follow</Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Related Posts */}
              <Card className="border-2">
                <CardContent className="p-6">
                  <h3 className="text-lg mb-4" style={{ fontWeight: 700 }}>Related Posts</h3>
                  <div className="space-y-3">
                    {relatedPosts.map((relatedPost) => (
                      <div 
                        key={relatedPost.id}
                        className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-all"
                        onClick={() => navigate(`/community/post/${relatedPost.id}`)}
                      >
                        <p className="text-sm mb-1" style={{ fontWeight: 600 }}>{relatedPost.title}</p>
                        <p className="text-xs text-gray-600">
                          {relatedPost.user} • {relatedPost.state}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
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
          <p className="text-gray-400">&copy; 2025 M2Fitnes — Version 14.4. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
