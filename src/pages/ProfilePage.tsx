import { useAuthStore } from '@/stores/authStore';
import { Mail, Phone, MapPin, Shield, Calendar, Award, Briefcase } from 'lucide-react';
import { getInitials } from '@/lib/utils';
import StatusBadge from '@/components/ui/StatusBadge';
import { toast } from '@/components/ui/Toast';

export default function ProfilePage() {
  const currentUser = useAuthStore((s) => s.currentUser);

  const mockActivities = [
    { id: 1, action: 'Resolved Incident', target: 'Flash Flood Rescue (inc-001)', time: '2 hours ago', icon: Shield, color: 'text-green-500' },
    { id: 2, action: 'Updated Status', target: 'Available for deployment', time: '5 hours ago', icon: Award, color: 'text-blue-500' },
    { id: 3, action: 'Assigned to Team', target: 'Team Alpha Rescue Squad', time: '1 day ago', icon: Briefcase, color: 'text-indigo-500' },
    { id: 4, action: 'Submitted Report', target: 'End of shift operations log', time: '2 days ago', icon: Calendar, color: 'text-gray-500' },
  ];

  if (!currentUser) return null;

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-card border border-border shadow-sm overflow-hidden">
        {/* Banner */}
        <div className="h-32 bg-gradient-to-r from-navy to-primary relative">
          <div className="absolute -bottom-12 left-6">
            <div className="h-24 w-24 rounded-full border-4 border-white bg-primary-50 flex items-center justify-center text-3xl font-bold text-primary shadow-md">
              {getInitials(currentUser.name)}
            </div>
          </div>
          <div className="absolute top-4 right-4 flex gap-2">
            <StatusBadge status="available" />
          </div>
        </div>

        {/* Profile Info */}
        <div className="pt-16 pb-6 px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-text-primary">{currentUser.name}</h1>
              <p className="text-sm text-text-secondary capitalize mt-0.5">{currentUser.role.replace('-', ' ')}</p>
              <p className="text-xs text-text-secondary flex items-center gap-1 mt-1.5"><MapPin className="w-3.5 h-3.5" />{currentUser.location || 'Pune Base'}</p>
            </div>
            <button onClick={() => toast('Profile editing not enabled in demo mode', 'info')} className="bg-gray-50 border border-border hover:bg-gray-100 text-text-primary px-4 py-2 rounded-lg text-xs font-semibold transition-colors w-fit">
              Edit Profile
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 border-t border-border pt-6 text-sm">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-text-secondary" />
              <div>
                <p className="text-[10px] text-text-secondary uppercase">Email Address</p>
                <p className="font-medium text-text-primary">{currentUser.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-text-secondary" />
              <div>
                <p className="text-[10px] text-text-secondary uppercase">Phone Number</p>
                <p className="font-medium text-text-primary">{currentUser.phone || 'N/A'}</p>
              </div>
            </div>
            {currentUser.teamId && (
              <div className="flex items-center gap-3">
                <Briefcase className="w-4 h-4 text-text-secondary" />
                <div>
                  <p className="text-[10px] text-text-secondary uppercase">Assigned Squad</p>
                  <p className="font-medium text-text-primary">Team Alpha Rescue Squad</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Activity list */}
      <div className="bg-white rounded-card border border-border shadow-sm p-6">
        <h2 className="text-lg font-bold text-text-primary mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {mockActivities.map((act) => {
            const Icon = act.icon;
            return (
              <div key={act.id} className="flex items-start gap-3 border-b border-border/50 pb-3 last:border-b-0 last:pb-0">
                <div className={`p-2 bg-gray-50 rounded-lg ${act.color} mt-0.5`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-text-primary">{act.action}</p>
                  <p className="text-xs text-text-secondary mt-0.5">{act.target}</p>
                </div>
                <span className="text-[10px] text-text-secondary">{act.time}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
