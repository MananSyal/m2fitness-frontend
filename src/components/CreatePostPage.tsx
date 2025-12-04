import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Textarea } from './ui/textarea';
import { 
  ArrowLeft, 
  X, 
  Image as ImageIcon, 
  Video, 
  Hash,
  User
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface PostMedia {
  id: string;
  type: 'photo' | 'video';
  url: string;
  name: string;
}

const TRENDING_HASHTAGS = [
  '#DesiGains',
  '#LegDay',
  '#M2Journey',
  '#TransformationTuesday',
  '#WorkoutMotivation',
  '#HealthyIndia',
  '#FitnessGoals',
  '#ProteinPacked',
];

export default function CreatePostPage() {
  const navigate = useNavigate();
  const [caption, setCaption] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [mediaFiles, setMediaFiles] = useState<PostMedia[]>([]);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const hasContent = caption.trim() !== '' || mediaFiles.length > 0;

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const currentPhotos = mediaFiles.filter(m => m.type === 'photo').length;
    const currentVideos = mediaFiles.filter(m => m.type === 'video').length;

    if (currentVideos > 0) {
      toast.error('Remove video first to upload photos');
      return;
    }

    const availableSlots = 4 - currentPhotos;
    if (availableSlots === 0) {
      toast.error('Maximum 4 photos allowed');
      return;
    }

    const filesToAdd = Array.from(files).slice(0, availableSlots);
    
    filesToAdd.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newMedia: PostMedia = {
          id: Math.random().toString(36).substr(2, 9),
          type: 'photo',
          url: e.target?.result as string,
          name: file.name
        };
        setMediaFiles(prev => [...prev, newMedia]);
      };
      reader.readAsDataURL(file);
    });

    if (e.target) e.target.value = '';
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (mediaFiles.length > 0) {
      toast.error('Remove all media first to upload a video');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const newMedia: PostMedia = {
        id: Math.random().toString(36).substr(2, 9),
        type: 'video',
        url: e.target?.result as string,
        name: file.name
      };
      setMediaFiles([newMedia]);
    };
    reader.readAsDataURL(file);

    if (e.target) e.target.value = '';
  };

  const removeMedia = (id: string) => {
    setMediaFiles(prev => prev.filter(m => m.id !== id));
  };

  const handleHashtagClick = (tag: string) => {
    if (!hashtags.includes(tag)) {
      setHashtags(prev => prev ? `${prev} ${tag}` : tag);
    }
  };

  const handlePost = () => {
    if (!hasContent) {
      toast.error('Add some content to your post');
      return;
    }

    // Create the post object
    const newPost = {
      id: Math.random().toString(36).substr(2, 9),
      username: 'Guest User',
      userAvatar: null,
      caption: caption.trim(),
      hashtags: hashtags.trim(),
      media: mediaFiles,
      likes: 0,
      comments: 0,
      shares: 0,
      timestamp: new Date().toISOString(),
      isUserPost: true
    };

    // Get existing posts from localStorage
    const existingPosts = JSON.parse(localStorage.getItem('userPosts') || '[]');
    
    // Add new post to the beginning
    const updatedPosts = [newPost, ...existingPosts];
    
    // Save to localStorage
    localStorage.setItem('userPosts', JSON.stringify(updatedPosts));

    // Navigate to success page
    navigate('/community/post-success');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/community')}
            className="gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </Button>
          <h1 className="text-xl absolute left-1/2 transform -translate-x-1/2">Create a Post</h1>
          <Button 
            onClick={handlePost}
            disabled={!hasContent}
            className="bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 disabled:opacity-50"
          >
            Post
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card>
          <CardContent className="p-6 space-y-6">
            {/* User Info */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-gray-600">Guest User</p>
              </div>
            </div>

            {/* Caption Input */}
            <div>
              <Textarea
                placeholder="What's on your fitness journey today?"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="min-h-[120px] resize-none text-lg border-gray-200 focus:border-orange-500"
              />
            </div>

            {/* Media Upload Section */}
            <div className="space-y-4">
              <div className="flex gap-3">
                <input
                  ref={photoInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                <input
                  ref={videoInputRef}
                  type="file"
                  accept="video/*"
                  onChange={handleVideoUpload}
                  className="hidden"
                />
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => photoInputRef.current?.click()}
                  className="flex-1 gap-2 border-2 border-dashed hover:border-orange-500 hover:bg-orange-50"
                >
                  <ImageIcon className="w-5 h-5" />
                  📸 Upload Photo
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => videoInputRef.current?.click()}
                  className="flex-1 gap-2 border-2 border-dashed hover:border-purple-500 hover:bg-purple-50"
                >
                  <Video className="w-5 h-5" />
                  🎥 Upload Video
                </Button>
              </div>

              <p className="text-sm text-gray-500 text-center">
                You can upload up to 4 images or 1 video
              </p>

              {/* Media Previews */}
              {mediaFiles.length > 0 && (
                <div className="grid grid-cols-2 gap-4">
                  {mediaFiles.map((media) => (
                    <div key={media.id} className="relative group rounded-lg overflow-hidden bg-gray-100">
                      {media.type === 'photo' ? (
                        <img 
                          src={media.url} 
                          alt={media.name}
                          className="w-full h-48 object-cover"
                        />
                      ) : (
                        <video 
                          src={media.url}
                          className="w-full h-48 object-cover"
                          controls
                        />
                      )}
                      <button
                        onClick={() => removeMedia(media.id)}
                        className="absolute top-2 right-2 w-8 h-8 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-5 h-5 text-white" />
                      </button>
                      <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/60 rounded text-white text-xs">
                        {media.type === 'photo' ? '📸 Photo' : '🎥 Video'}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Hashtag Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-700">
                <Hash className="w-5 h-5" />
                <span>Add Hashtags</span>
              </div>
              <Textarea
                placeholder="#DesiGains #LegDay #M2Journey"
                value={hashtags}
                onChange={(e) => setHashtags(e.target.value)}
                className="min-h-[60px] resize-none border-gray-200 focus:border-orange-500"
              />
              
              {/* Trending Hashtags */}
              <div className="flex flex-wrap gap-2">
                {TRENDING_HASHTAGS.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleHashtagClick(tag)}
                    className="px-3 py-1 bg-gradient-to-r from-orange-100 to-purple-100 hover:from-orange-200 hover:to-purple-200 rounded-full text-sm transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Visibility Selector (Static for now) */}
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm">Visibility</p>
                  <p className="text-xs text-gray-500">Your post will be visible to everyone</p>
                </div>
                <div className="px-4 py-2 bg-white rounded-lg border border-gray-300 text-sm">
                  🌍 Public
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => navigate('/community')}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handlePost}
                disabled={!hasContent}
                className="flex-1 bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 disabled:opacity-50"
              >
                Post to Community
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
