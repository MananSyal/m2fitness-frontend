import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Home, Dumbbell, TrendingUp, User, LogOut, Utensils, Users, Play, Heart, MessageCircle, Share2, Upload, Search, MapPin, Trophy, Filter, Plus, Clock } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';

interface Video {
  id: number;
  title: string;
  author: string;
  avatar: string;
  thumbnail: string;
  duration: string;
  views: string;
  likes: number;
  comments: number;
  state: string;
  category: 'workout' | 'meal' | 'transformation' | 'motivation';
  isFromUserState?: boolean;
}

interface UserPost {
  id: string;
  username: string;
  userAvatar: string | null;
  caption: string;
  hashtags: string;
  media: { id: string; type: 'photo' | 'video'; url: string; name: string }[];
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
  isUserPost?: boolean;
  likedByUser?: boolean;
}

export default function CommunityPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('All States');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [userPosts, setUserPosts] = useState<UserPost[]>([]);
  const userState = localStorage.getItem('userState') || 'Punjab';

  // Load user posts from localStorage
  useEffect(() => {
    const posts = JSON.parse(localStorage.getItem('userPosts') || '[]');
    setUserPosts(posts);
  }, [location]);

  // Time ago helper
  const timeAgo = (timestamp: string) => {
    const now = new Date();
    const past = new Date(timestamp);
    const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  // Handle post interactions
  const handleLike = (postId: string) => {
    setUserPosts(prev => {
      const updated = prev.map(post => {
        if (post.id === postId) {
          const isLiked = post.likedByUser || false;
          return {
            ...post,
            likes: isLiked ? post.likes - 1 : post.likes + 1,
            likedByUser: !isLiked
          };
        }
        return post;
      });
      localStorage.setItem('userPosts', JSON.stringify(updated));
      return updated;
    });
    toast.success('👍 Like updated!');
  };

  const handleComment = (postId: string) => {
    toast.info('💬 Comments Coming Soon!', { description: 'Comment feature will be available soon' });
  };

  const handleShare = (postId: string) => {
    const post = userPosts.find(p => p.id === postId);
    if (post) {
      setUserPosts(prev => {
        const updated = prev.map(p => 
          p.id === postId ? { ...p, shares: p.shares + 1 } : p
        );
        localStorage.setItem('userPosts', JSON.stringify(updated));
        return updated;
      });
      toast.success('🔗 Link Copied!', { description: 'Post link copied to clipboard' });
    }
  };

  const videos: Video[] = [
    {
      id: 1,
      title: '10-Min Morning Yoga for Tamil Nadu',
      author: 'Priya Fitness',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600',
      duration: '10:24',
      views: '12.5K',
      likes: 1200,
      comments: 89,
      state: 'Tamil Nadu',
      category: 'workout',
      isFromUserState: userState === 'Tamil Nadu'
    },
    {
      id: 2,
      title: 'Punjab Butter Chicken - Protein-Rich Recipe',
      author: 'Chef Harpreet',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      thumbnail: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600',
      duration: '15:30',
      views: '25.3K',
      likes: 2100,
      comments: 156,
      state: 'Punjab',
      category: 'meal',
      isFromUserState: userState === 'Punjab'
    },
    {
      id: 3,
      title: 'Incredible 90-Day Transformation - Mumbai',
      author: 'Rahul Sharma',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
      thumbnail: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600',
      duration: '8:45',
      views: '45.2K',
      likes: 4500,
      comments: 312,
      state: 'Maharashtra',
      category: 'transformation',
      isFromUserState: userState === 'Maharashtra'
    },
    {
      id: 4,
      title: 'Best Dosa Variations for Muscle Building',
      author: 'Fitness Tamil',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
      thumbnail: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=600',
      duration: '12:15',
      views: '18.7K',
      likes: 1650,
      comments: 94,
      state: 'Tamil Nadu',
      category: 'meal',
      isFromUserState: userState === 'Tamil Nadu'
    },
    {
      id: 5,
      title: 'Home Workout - No Equipment Needed',
      author: 'Delhi Fit Club',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100',
      thumbnail: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600',
      duration: '20:00',
      views: '32.1K',
      likes: 2890,
      comments: 201,
      state: 'Delhi',
      category: 'workout',
      isFromUserState: userState === 'Delhi'
    },
    {
      id: 6,
      title: 'Kerala Fish Curry - High Protein Meal',
      author: 'Coastal Kitchen',
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100',
      thumbnail: 'https://images.unsplash.com/photo-1580554530778-ca36943938b2?w=600',
      duration: '14:22',
      views: '21.5K',
      likes: 1890,
      comments: 127,
      state: 'Kerala',
      category: 'meal',
      isFromUserState: userState === 'Kerala'
    },
    {
      id: 7,
      title: 'Motivational Speech - Never Give Up',
      author: 'Inspire India',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
      thumbnail: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=600',
      duration: '6:30',
      views: '67.8K',
      likes: 6200,
      comments: 445,
      state: 'Maharashtra',
      category: 'motivation',
      isFromUserState: userState === 'Maharashtra'
    },
    {
      id: 8,
      title: 'Bangalore Gym Tour - Best Equipment',
      author: 'Tech Fitness',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100',
      thumbnail: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600',
      duration: '11:50',
      views: '15.9K',
      likes: 1340,
      comments: 78,
      state: 'Karnataka',
      category: 'workout',
      isFromUserState: userState === 'Karnataka'
    }
  ];

  const filteredVideos = videos
    .filter(video => {
      const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          video.author.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesState = selectedState === 'All States' || video.state === selectedState;
      const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
      return matchesSearch && matchesState && matchesCategory;
    })
    .sort((a, b) => {
      if (a.isFromUserState && !b.isFromUserState) return -1;
      if (!a.isFromUserState && b.isFromUserState) return 1;
      return 0;
    });

  const handleVideoLike = (videoId: number) => {
    toast.success('👍 Liked!');
  };

  const handleVideoComment = (videoId: number) => {
    toast.info('💬 Comments Coming Soon!');
  };

  const handleVideoShare = (videoId: number) => {
    toast.success('🔗 Link Copied!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r shadow-sm z-50">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-orange-500 rounded-lg"></div>
            <span className="text-xl" style={{ fontWeight: 700 }}>M2Fitnes</span>
          </div>
          <nav className="space-y-2">
            <Link to="/dashboard">
              <Button variant="ghost" className="w-full justify-start">
                <Home className="w-5 h-5 mr-3" />
                Home
              </Button>
            </Link>
            <Link to="/workouts">
              <Button variant="ghost" className="w-full justify-start">
                <Dumbbell className="w-5 h-5 mr-3" />
                Workouts
              </Button>
            </Link>
            <Link to="/diet/new-plan">
              <Button variant="ghost" className="w-full justify-start">
                <Utensils className="w-5 h-5 mr-3" />
                Diet Plans
              </Button>
            </Link>
            <Link to="/progress">
              <Button variant="ghost" className="w-full justify-start">
                <TrendingUp className="w-5 h-5 mr-3" />
                Progress
              </Button>
            </Link>
            <Link to="/community">
              <Button variant="default" className="w-full justify-start bg-gradient-to-r from-blue-500 to-purple-600">
                <Users className="w-5 h-5 mr-3" />
                Community
              </Button>
            </Link>
            <Link to="/profile">
              <Button variant="ghost" className="w-full justify-start">
                <User className="w-5 h-5 mr-3" />
                Profile
              </Button>
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl mb-2" style={{ fontWeight: 700 }}>
              Community Feed
            </h1>
            <p className="text-xl text-gray-600">Learn & Share with fitness enthusiasts across India</p>
          </div>

          {/* Search & Filters */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex gap-3 items-center">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      placeholder="Search videos, creators, or tags..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <Select value={selectedState} onValueChange={setSelectedState}>
                    <SelectTrigger className="w-[200px]">
                      <MapPin className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Filter by state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All States">All States</SelectItem>
                      <SelectItem value="Punjab">Punjab</SelectItem>
                      <SelectItem value="Tamil Nadu">Tamil Nadu</SelectItem>
                      <SelectItem value="Karnataka">Karnataka</SelectItem>
                      <SelectItem value="Delhi">Delhi</SelectItem>
                      <SelectItem value="Kerala">Kerala</SelectItem>
                      <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                    </SelectContent>
                  </Select>

                  <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="flex-1">
                    <TabsList>
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="workout">Workouts</TabsTrigger>
                      <TabsTrigger value="meal">Meals</TabsTrigger>
                      <TabsTrigger value="transformation">Transformations</TabsTrigger>
                      <TabsTrigger value="motivation">Motivation</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* User Posts Section */}
          {userPosts.length > 0 && (
            <div className="space-y-6 mb-8">
              <h2 className="text-2xl" style={{ fontWeight: 700 }}>
                Latest Community Posts
              </h2>
              {userPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-xl transition-shadow border-2 border-green-200">
                  <CardContent className="p-6">
                    {/* User Info */}
                    <div className="flex items-center gap-3 mb-4">
                      {post.userAvatar ? (
                        <img
                          src={post.userAvatar}
                          alt={post.username}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                          <User className="w-6 h-6 text-white" />
                        </div>
                      )}
                      <div className="flex-1">
                        <p style={{ fontWeight: 600 }}>{post.username}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          {timeAgo(post.timestamp)}
                        </div>
                      </div>
                    </div>

                    {/* Caption */}
                    {post.caption && (
                      <p className="text-gray-800 mb-4 whitespace-pre-wrap">{post.caption}</p>
                    )}

                    {/* Media Grid */}
                    {post.media.length > 0 && (
                      <div className={`grid gap-2 mb-4 ${
                        post.media.length === 1 ? 'grid-cols-1' : 
                        post.media.length === 2 ? 'grid-cols-2' : 
                        post.media.length === 3 ? 'grid-cols-3' : 
                        'grid-cols-2'
                      }`}>
                        {post.media.map((media) => (
                          <div key={media.id} className="relative rounded-lg overflow-hidden bg-gray-100">
                            {media.type === 'photo' ? (
                              <img 
                                src={media.url} 
                                alt={media.name}
                                className="w-full h-64 object-cover"
                              />
                            ) : (
                              <video 
                                src={media.url}
                                className="w-full h-64 object-cover"
                                controls
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Hashtags */}
                    {post.hashtags && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.hashtags.split(' ').filter(tag => tag).map((tag, idx) => (
                          <span key={idx} className="text-sm text-blue-600 hover:underline cursor-pointer">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex items-center gap-6 pt-4 border-t border-gray-200">
                      <button
                        onClick={() => handleLike(post.id)}
                        className={`flex items-center gap-2 transition-colors ${
                          post.likedByUser ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
                        }`}
                      >
                        <Heart className={`w-5 h-5 ${post.likedByUser ? 'fill-current' : ''}`} />
                        <span>{post.likes}</span>
                      </button>
                      <button
                        onClick={() => handleComment(post.id)}
                        className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        <MessageCircle className="w-5 h-5" />
                        <span>{post.comments}</span>
                      </button>
                      <button
                        onClick={() => handleShare(post.id)}
                        className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors"
                      >
                        <Share2 className="w-5 h-5" />
                        <span>{post.shares}</span>
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Video Feed Section */}
          <div className="mb-8">
            <h2 className="text-2xl mb-4" style={{ fontWeight: 700 }}>
              Video Feed {selectedState !== 'All States' && `- ${selectedState}`}
            </h2>
            {filteredVideos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVideos.map((video) => (
                  <Card key={video.id} className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group">
                    <div className="relative">
                      <ImageWithFallback
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Play className="w-16 h-16 text-white" />
                      </div>
                      <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 rounded text-white text-sm">
                        {video.duration}
                      </div>
                      {video.isFromUserState && (
                        <div className="absolute top-2 left-2 px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full text-white text-sm flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          Your State
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <div className="flex gap-3">
                        <img
                          src={video.avatar}
                          alt={video.author}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="mb-1 line-clamp-2" style={{ fontWeight: 600 }}>
                            {video.title}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">{video.author}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>{video.views} views</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {video.state}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 mt-3">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleVideoLike(video.id);
                              }}
                              className="flex items-center gap-1 text-gray-600 hover:text-red-500 transition-colors"
                            >
                              <Heart className="w-4 h-4" />
                              <span className="text-sm">{video.likes}</span>
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleVideoComment(video.id);
                              }}
                              className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors"
                            >
                              <MessageCircle className="w-4 h-4" />
                              <span className="text-sm">{video.comments}</span>
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleVideoShare(video.id);
                              }}
                              className="flex items-center gap-1 text-gray-600 hover:text-green-600 transition-colors"
                            >
                              <Share2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <Filter className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl mb-2">No videos found</h3>
                <p className="text-gray-600">Try adjusting your search or filters</p>
              </Card>
            )}
          </div>
        </div>
      </main>

      {/* Floating Action Button - Create Post */}
      <button
        onClick={() => navigate('/community/create-post')}
        className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 rounded-full shadow-2xl hover:shadow-3xl flex items-center justify-center z-50 transition-all hover:scale-110"
        aria-label="Create Post"
      >
        <Plus className="w-8 h-8 text-white" strokeWidth={3} />
      </button>
    </div>
  );
}
