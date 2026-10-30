import { Trophy, Medal, Award, TrendingUp } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

export function Leaderboard() {
  const { leaderboard, profile, points } = useUser();

  const userRank = leaderboard.findIndex(u => u.name === profile.name) + 1;
  const topUsers = leaderboard.slice(0, 10);

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-5 h-5 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-slate-400" />;
    if (rank === 3) return <Medal className="w-5 h-5 text-orange-600" />;
    return <Award className="w-5 h-5 text-slate-400" />;
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'from-yellow-50 to-orange-50 border-yellow-300';
    if (rank === 2) return 'from-slate-50 to-gray-50 border-slate-300';
    if (rank === 3) return 'from-orange-50 to-amber-50 border-orange-300';
    return 'from-slate-50 to-white border-slate-200';
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#10B759] to-[#0E9F4D] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-white" />
          <h3 className="font-bold text-white">Top Attendees</h3>
        </div>
        <div className="flex items-center gap-1 px-2 py-1 bg-white/20 rounded-full">
          <TrendingUp className="w-3 h-3 text-white" />
          <span className="text-xs font-semibold text-white">LIVE</span>
        </div>
      </div>

      {/* Current User Stats */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-blue-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src={profile.avatar} 
              alt={profile.name}
              className="w-10 h-10 rounded-full border-2 border-blue-400"
            />
            <div>
              <div className="font-semibold text-sm text-slate-900">You</div>
              <div className="text-xs text-slate-600">Rank #{userRank > 0 ? userRank : 'N/A'}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-[#10B759]">{points}</div>
            <div className="text-xs text-slate-600">points</div>
          </div>
        </div>
      </div>

      {/* Leaderboard List */}
      <div className="divide-y divide-slate-100 max-h-[400px] overflow-y-auto">
        {topUsers.map((user, index) => {
          const rank = index + 1;
          const isCurrentUser = user.name === profile.name;

          return (
            <div
              key={user.name}
              className={`flex items-center justify-between px-4 py-3 transition-all ${
                isCurrentUser 
                  ? 'bg-gradient-to-r from-green-50 to-emerald-50' 
                  : 'hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                {/* Rank */}
                <div className={`flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br ${getRankColor(rank)} border flex-shrink-0`}>
                  {rank <= 3 ? (
                    getRankIcon(rank)
                  ) : (
                    <span className="text-sm font-bold text-slate-600">{rank}</span>
                  )}
                </div>

                {/* Avatar & Name */}
                <img 
                  src={user.avatar} 
                  alt={user.name}
                  className={`w-9 h-9 rounded-full flex-shrink-0 ${
                    rank <= 3 ? 'border-2 border-yellow-400' : ''
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-semibold truncate ${
                    isCurrentUser ? 'text-[#10B759]' : 'text-slate-900'
                  }`}>
                    {user.name} {isCurrentUser && '(You)'}
                  </div>
                  {rank === 1 && (
                    <div className="text-xs text-yellow-600 font-medium">🏆 Top Performer</div>
                  )}
                </div>
              </div>

              {/* Points */}
              <div className="text-right flex-shrink-0">
                <div className={`text-lg font-bold ${
                  rank === 1 ? 'text-yellow-600' :
                  rank === 2 ? 'text-slate-500' :
                  rank === 3 ? 'text-orange-600' :
                  'text-slate-700'
                }`}>
                  {user.points}
                </div>
                <div className="text-xs text-slate-500">points</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="bg-slate-50 px-4 py-2 text-center border-t border-slate-200">
        <p className="text-xs text-slate-600">
          Updates every minute • Earn points by engaging with the event
        </p>
      </div>
    </div>
  );
}
