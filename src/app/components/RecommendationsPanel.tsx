import { Sparkles, Store, Users, ArrowRight } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

interface RecommendationsPanelProps {
  booths?: any[];
  onNavigateToBooth?: (boothId: string) => void;
}

export function RecommendationsPanel({ booths = [], onNavigateToBooth }: RecommendationsPanelProps) {
  const { profile, activity } = useUser();

  // AI-driven recommendations based on profile interests
  const getRecommendedBooths = () => {
    const userInterests = profile.interests || [];
    const visitedBooths = activity.boothsVisited;

    // Filter booths not yet visited
    const unvisitedBooths = booths.filter(booth => !visitedBooths.includes(booth.id));

    // Simple matching algorithm (in production, this would be more sophisticated)
    return unvisitedBooths.slice(0, 3);
  };

  const recommendedBooths = getRecommendedBooths();

  // Mock recommended people based on interests
  const getRecommendedPeople = () => {
    return [
      {
        id: 'rec-1',
        name: 'Jennifer Lee',
        avatar: 'https://i.pravatar.cc/150?img=11',
        role: 'VP of Product',
        company: 'TechCorp',
        commonInterests: 2,
        reason: 'Shares interest in AI/ML and Product Management'
      },
      {
        id: 'rec-2',
        name: 'Marcus Johnson',
        avatar: 'https://i.pravatar.cc/150?img=12',
        role: 'CTO',
        company: 'Innovation Labs',
        commonInterests: 3,
        reason: 'Both interested in SaaS and Digital Transformation'
      },
      {
        id: 'rec-3',
        name: 'Sophia Rodriguez',
        avatar: 'https://i.pravatar.cc/150?img=13',
        role: 'Product Manager',
        company: 'Future Systems',
        commonInterests: 2,
        reason: 'Looking for networking opportunities like you'
      }
    ];
  };

  const recommendedPeople = getRecommendedPeople();

  return (
    <div className="space-y-6">
      {/* Recommended Booths */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-3 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-white" />
          <h3 className="font-bold text-white">Recommended For You</h3>
        </div>

        <div className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Store className="w-4 h-4 text-slate-600" />
            <h4 className="font-semibold text-slate-900 text-sm">Booths You Might Like</h4>
          </div>

          {recommendedBooths.length > 0 ? (
            <div className="space-y-3">
              {recommendedBooths.map((booth) => (
                <div
                  key={booth.id}
                  className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg hover:shadow-md transition-all group cursor-pointer"
                  onClick={() => onNavigateToBooth?.(booth.id)}
                >
                  <img 
                    src={booth.imageUrl} 
                    alt={booth.title}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm text-slate-900 truncate">{booth.title}</div>
                    <div className="text-xs text-purple-600">
                      Matches your interests
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-purple-600 opacity-0 group-hover:opacity-100 transition-all" />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-slate-400">
              <Store className="w-12 h-12 mx-auto mb-2" />
              <p className="text-sm">No new booth recommendations</p>
              <p className="text-xs">You've explored most booths!</p>
            </div>
          )}
        </div>
      </div>

      {/* Recommended People */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-4 py-3 flex items-center gap-2">
          <Users className="w-5 h-5 text-white" />
          <h3 className="font-bold text-white">People You Should Meet</h3>
        </div>

        <div className="p-4 space-y-3">
          {recommendedPeople.map((person) => (
            <div
              key={person.id}
              className="flex items-start gap-3 p-3 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-lg hover:shadow-md transition-all group"
            >
              <img 
                src={person.avatar} 
                alt={person.name}
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm text-slate-900">{person.name}</div>
                <div className="text-xs text-slate-600">{person.role} at {person.company}</div>
                <div className="mt-1 flex items-center gap-1">
                  <div className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                    {person.commonInterests} shared interests
                  </div>
                </div>
                <div className="text-xs text-slate-500 mt-1">{person.reason}</div>
              </div>
              <button className="px-3 py-1.5 bg-gradient-to-r from-[#10B759] to-[#0E9F4D] text-white rounded text-xs font-medium hover:shadow-md transition-all opacity-0 group-hover:opacity-100">
                Connect
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Personalization Tip */}
      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <h5 className="font-semibold text-sm text-slate-900 mb-1">
              Improve Your Recommendations
            </h5>
            <p className="text-xs text-slate-700">
              Update your profile interests to get better booth and networking suggestions!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
