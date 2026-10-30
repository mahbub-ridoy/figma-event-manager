import { X, TrendingUp, Download as DownloadIcon, MessageCircle, Calendar, Store, Award, Share2, Clock } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

interface ActivityDashboardProps {
  onClose: () => void;
}

export function ActivityDashboard({ onClose }: ActivityDashboardProps) {
  const { profile, points, badges, activity, leaderboard } = useUser();

  const totalEngagement = 
    activity.boothsVisited.length + 
    activity.commentsPosted + 
    activity.resourcesDownloaded.length + 
    activity.meetingsScheduled;

  const engagementScore = Math.min(100, Math.floor((totalEngagement / 20) * 100));

  const totalTimeMinutes = Object.values(activity.timeSpent).reduce((a, b) => a + b, 0);
  const hours = Math.floor(totalTimeMinutes / 60);
  const minutes = totalTimeMinutes % 60;

  const userRank = leaderboard.findIndex(u => u.name === profile.name) + 1;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#10B759] to-[#0E9F4D] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-white" />
            <h3 className="text-xl font-bold text-white">My Activity Dashboard</h3>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all font-medium flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              Share
            </button>
            <button 
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-full p-1 transition-all"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-80px)] p-6">
          {/* Top Stats Grid */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <Award className="w-6 h-6 text-green-600" />
                <span className="text-xs font-semibold text-green-600">TOTAL</span>
              </div>
              <div className="text-3xl font-bold text-green-700">{points}</div>
              <div className="text-sm text-green-600">Points Earned</div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <Store className="w-6 h-6 text-blue-600" />
                <span className="text-xs font-semibold text-blue-600">BOOTHS</span>
              </div>
              <div className="text-3xl font-bold text-blue-700">{activity.boothsVisited.length}</div>
              <div className="text-sm text-blue-600">Booths Visited</div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <MessageCircle className="w-6 h-6 text-purple-600" />
                <span className="text-xs font-semibold text-purple-600">SOCIAL</span>
              </div>
              <div className="text-3xl font-bold text-purple-700">{activity.commentsPosted}</div>
              <div className="text-sm text-purple-600">Comments Posted</div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <DownloadIcon className="w-6 h-6 text-orange-600" />
                <span className="text-xs font-semibold text-orange-600">RESOURCES</span>
              </div>
              <div className="text-3xl font-bold text-orange-700">{activity.resourcesDownloaded.length}</div>
              <div className="text-sm text-orange-600">Downloads</div>
            </div>
          </div>

          {/* Engagement Score */}
          <div className="bg-gradient-to-r from-slate-50 to-white border border-slate-200 rounded-xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-lg font-bold text-slate-900">Engagement Score</h4>
                <p className="text-sm text-slate-600">Based on your activity across the platform</p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-[#10B759]">{engagementScore}%</div>
                <div className="text-sm text-slate-600">
                  {engagementScore >= 80 ? 'Excellent!' : engagementScore >= 50 ? 'Good' : 'Keep going!'}
                </div>
              </div>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-[#10B759] to-[#0E9F4D] h-full rounded-full transition-all duration-500"
                style={{ width: `${engagementScore}%` }}
              />
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            {/* Time Spent */}
            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-[#10B759]" />
                <h4 className="font-bold text-slate-900">Time Spent</h4>
              </div>
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-[#10B759]">
                  {hours}h {minutes}m
                </div>
                <div className="text-sm text-slate-600">Total Event Time</div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Lobby</span>
                  <span className="font-semibold text-slate-900">{activity.timeSpent.lobby} min</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Auditorium</span>
                  <span className="font-semibold text-slate-900">{activity.timeSpent.auditorium} min</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Lounge</span>
                  <span className="font-semibold text-slate-900">{activity.timeSpent.lounge} min</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Booths</span>
                  <span className="font-semibold text-slate-900">{activity.timeSpent.booth} min</span>
                </div>
              </div>
            </div>

            {/* Leaderboard Rank */}
            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-5 h-5 text-[#10B759]" />
                <h4 className="font-bold text-slate-900">Your Ranking</h4>
              </div>
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-[#10B759]">
                  #{userRank > 0 ? userRank : 'N/A'}
                </div>
                <div className="text-sm text-slate-600">Out of {leaderboard.length + 1} Attendees</div>
              </div>
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-3 text-center">
                <div className="text-sm text-slate-600 mb-1">You're in the</div>
                <div className="text-xl font-bold text-orange-600">
                  Top {Math.ceil((userRank / (leaderboard.length + 1)) * 100)}%
                </div>
              </div>
            </div>
          </div>

          {/* Badges Earned */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-5 h-5 text-[#10B759]" />
              <h4 className="font-bold text-slate-900">Badges Earned ({badges.length})</h4>
            </div>
            {badges.length > 0 ? (
              <div className="grid grid-cols-4 gap-3">
                {badges.map(badge => (
                  <div
                    key={badge.id}
                    className="bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-3 text-center hover:shadow-md transition-all"
                  >
                    <div className="text-4xl mb-2">{badge.icon}</div>
                    <div className="font-semibold text-sm text-slate-900 mb-1">{badge.name}</div>
                    <div className="text-xs text-slate-600">{badge.description}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-slate-400">
                <Award className="w-12 h-12 mx-auto mb-2" />
                <p className="text-sm">No badges earned yet. Keep engaging!</p>
              </div>
            )}
          </div>

          {/* Activity Breakdown */}
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <h4 className="font-bold text-slate-900 mb-4">Activity Breakdown</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Store className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm text-slate-600">Booths Visited</div>
                  <div className="text-xl font-bold text-slate-900">{activity.boothsVisited.length}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <div className="text-sm text-slate-600">Comments Posted</div>
                  <div className="text-xl font-bold text-slate-900">{activity.commentsPosted}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <DownloadIcon className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <div className="text-sm text-slate-600">Resources Downloaded</div>
                  <div className="text-xl font-bold text-slate-900">{activity.resourcesDownloaded.length}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="text-sm text-slate-600">Meetings Scheduled</div>
                  <div className="text-xl font-bold text-slate-900">{activity.meetingsScheduled}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Shareable Recap Card */}
          <div className="mt-6 bg-gradient-to-br from-[#10B759] to-[#0E9F4D] rounded-xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">My Event Recap</h3>
            <div className="grid grid-cols-3 gap-6 mb-6">
              <div>
                <div className="text-4xl font-bold">{points}</div>
                <div className="text-sm opacity-90">Points</div>
              </div>
              <div>
                <div className="text-4xl font-bold">{activity.boothsVisited.length}</div>
                <div className="text-sm opacity-90">Booths</div>
              </div>
              <div>
                <div className="text-4xl font-bold">{badges.length}</div>
                <div className="text-sm opacity-90">Badges</div>
              </div>
            </div>
            <button className="px-6 py-3 bg-white text-[#10B759] rounded-lg hover:shadow-lg transition-all font-bold flex items-center gap-2 mx-auto">
              <Share2 className="w-5 h-5" />
              Share My Recap
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
