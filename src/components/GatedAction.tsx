import { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../utils/authContext';
import { Lock } from 'lucide-react';
import { cn } from './ui/utils';

interface GatedActionProps {
  children: ReactNode;
  actionType: 'save' | 'like' | 'comment' | 'share' | 'post' | 'follow' | 'start-workout' | 'download' | 'get-plan';
  actionMessage: string;
  onAuthenticated?: () => void;
  className?: string;
  showLockIcon?: boolean;
  tooltipText?: string;
}

export function GatedAction({
  children,
  actionType,
  actionMessage,
  onAuthenticated,
  className,
  showLockIcon = true,
  tooltipText = 'Login to access this feature'
}: GatedActionProps) {
  const { isAuthenticated, setReturnPath, setPendingAction } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (e: React.MouseEvent) => {
    if (!isAuthenticated) {
      e.preventDefault();
      e.stopPropagation();
      
      // Set return path and pending action
      setReturnPath(location.pathname + location.search);
      setPendingAction({
        type: actionType,
        message: actionMessage
      });
      
      // Navigate to login
      navigate('/login');
    } else if (onAuthenticated) {
      onAuthenticated();
    }
  };

  return (
    <div 
      className={cn("relative group", className)}
      onClick={handleClick}
      title={!isAuthenticated ? tooltipText : undefined}
    >
      {children}
      {!isAuthenticated && showLockIcon && (
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center shadow-md">
          <Lock className="w-3 h-3 text-white" />
        </div>
      )}
      {!isAuthenticated && (
        <div className="absolute inset-0 cursor-pointer" />
      )}
    </div>
  );
}
