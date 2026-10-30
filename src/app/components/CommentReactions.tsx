import { useState } from 'react';
import { ThumbsUp, Heart, Smile, TrendingUp } from 'lucide-react';

export interface Reaction {
  type: 'like' | 'heart' | 'clap' | 'celebrate';
  count: number;
  users: string[];
}

interface CommentReactionsProps {
  commentId: string;
  reactions: Reaction[];
  onReact: (type: Reaction['type']) => void;
  currentUserReaction?: Reaction['type'] | null;
}

export function CommentReactions({ 
  commentId, 
  reactions, 
  onReact,
  currentUserReaction 
}: CommentReactionsProps) {
  const [showTooltip, setShowTooltip] = useState<Reaction['type'] | null>(null);

  const getReactionIcon = (type: Reaction['type']) => {
    switch (type) {
      case 'like':
        return '👍';
      case 'heart':
        return '❤️';
      case 'clap':
        return '👏';
      case 'celebrate':
        return '🎉';
    }
  };

  const getReactionData = (type: Reaction['type']) => {
    return reactions.find(r => r.type === type) || { type, count: 0, users: [] };
  };

  const totalReactions = reactions.reduce((sum, r) => sum + r.count, 0);

  return (
    <div className="flex items-center gap-1 mt-2">
      {/* Reaction Buttons */}
      {(['like', 'heart', 'clap', 'celebrate'] as const).map((type) => {
        const reactionData = getReactionData(type);
        const isActive = currentUserReaction === type;
        
        return (
          <div key={type} className="relative">
            <button
              onClick={() => onReact(type)}
              onMouseEnter={() => setShowTooltip(type)}
              onMouseLeave={() => setShowTooltip(null)}
              className={`group relative flex items-center gap-1 px-2 py-1 rounded-full transition-all text-xs font-medium ${
                isActive
                  ? 'bg-[#10B759] text-white'
                  : reactionData.count > 0
                  ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
              }`}
            >
              <span className={`text-sm ${isActive ? 'scale-125' : ''} transition-transform`}>
                {getReactionIcon(type)}
              </span>
              {reactionData.count > 0 && (
                <span className="text-xs">{reactionData.count}</span>
              )}
            </button>

            {/* Tooltip */}
            {showTooltip === type && reactionData.users.length > 0 && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-slate-900 text-white text-xs rounded-lg whitespace-nowrap z-10">
                {reactionData.users.slice(0, 3).join(', ')}
                {reactionData.users.length > 3 && ` +${reactionData.users.length - 3} more`}
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
