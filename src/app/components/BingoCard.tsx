import { X, Check, Award } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

interface BingoCardProps {
  onClose: () => void;
}

export function BingoCard({ onClose }: BingoCardProps) {
  const { bingoCard } = useUser();

  const completedTasks = bingoCard.filter(task => task.completed).length;
  const totalTasks = bingoCard.length;
  const progress = Math.floor((completedTasks / totalTasks) * 100);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl">🎰</div>
            <div>
              <h3 className="text-xl font-bold text-white">Networking Bingo</h3>
              <p className="text-sm text-white/90">{completedTasks} of {totalTasks} tasks completed</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-full p-1 transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="bg-purple-50 px-6 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-purple-900">Overall Progress</span>
            <span className="text-sm font-bold text-purple-900">{progress}%</span>
          </div>
          <div className="w-full bg-purple-200 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-purple-600 to-pink-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-200px)] p-6">
          {/* Bingo Grid */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {bingoCard.map((task, index) => (
              <div
                key={task.id}
                className={`relative aspect-square rounded-xl border-2 p-4 flex flex-col items-center justify-center text-center transition-all ${
                  task.completed
                    ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-400 shadow-md'
                    : 'bg-white border-purple-200 hover:border-purple-400 hover:shadow-sm'
                }`}
              >
                {task.completed && (
                  <div className="absolute top-2 right-2">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                  </div>
                )}
                <div className="text-sm font-semibold text-slate-900 mb-2 line-clamp-3">
                  {task.task}
                </div>
                <div className={`text-xs font-bold ${
                  task.completed ? 'text-green-600' : 'text-purple-600'
                }`}>
                  {task.points} pts
                </div>
              </div>
            ))}
          </div>

          {/* Completion Reward */}
          {progress === 100 ? (
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-400 rounded-xl p-6 text-center">
              <div className="text-5xl mb-3">🏆</div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">Congratulations!</h4>
              <p className="text-slate-700 mb-4">You've completed all bingo tasks and earned the Bingo Master badge!</p>
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-lg font-bold">
                <Award className="w-5 h-5" />
                Bingo Master Unlocked!
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6 text-center">
              <div className="text-4xl mb-3">🎯</div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Keep Going!</h4>
              <p className="text-sm text-slate-700">
                Complete all tasks to earn the <span className="font-bold text-purple-600">Bingo Master</span> badge and bonus points!
              </p>
            </div>
          )}

          {/* Tips */}
          <div className="mt-6 bg-slate-50 rounded-lg p-4">
            <h5 className="font-semibold text-slate-900 mb-2">💡 Tips to Complete Tasks:</h5>
            <ul className="space-y-1 text-sm text-slate-700">
              <li>• Visit different booths to explore exhibitor content</li>
              <li>• Engage with other attendees by commenting</li>
              <li>• Download resources from booth pages</li>
              <li>• Navigate to all 4 environments (Lobby, Auditorium, Lounge, Booths)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
