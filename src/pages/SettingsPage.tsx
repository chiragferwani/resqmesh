import { useState } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { useMeshStore } from '@/stores/meshStore';
import { User, Bell, Shield, Wifi, Moon, Save } from 'lucide-react';
import { toast } from '@/components/ui/Toast';

export default function SettingsPage() {
  const currentUser = useAuthStore((s) => s.currentUser);
  const connectivityMode = useMeshStore((s) => s.connectivityMode);
  
  const [criticalNotifs, setCriticalNotifs] = useState(true);
  const [teamNotifs, setTeamNotifs] = useState(true);
  const [reportNotifs, setReportNotifs] = useState(false);
  
  const [locationSharing, setLocationSharing] = useState(true);
  const [sosMode, setSosMode] = useState('both');
  
  const [offlineMode, setOfflineMode] = useState(false);
  const [compactMode, setCompactMode] = useState(false);

  const handleSave = () => {
    toast('Preferences saved successfully', 'success');
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto pb-12">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Settings</h1>
        <p className="text-sm text-text-secondary mt-1">Manage your account preferences and application settings</p>
      </div>

      <div className="space-y-6">
        {/* Account Details */}
        <div className="bg-white rounded-card border border-border shadow-sm overflow-hidden">
          <div className="p-4 border-b border-border bg-gray-50/50 flex items-center gap-3">
            <User className="h-5 w-5 text-primary" />
            <h2 className="font-bold text-sm text-text-primary">Account Details</h2>
          </div>
          <div className="p-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Full Name</label>
                <input type="text" readOnly value={currentUser?.name || ''} className="w-full bg-gray-50 border border-border rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Email Address</label>
                <input type="email" readOnly value={currentUser?.email || ''} className="w-full bg-gray-50 border border-border rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Phone Number</label>
                <input type="text" readOnly value={currentUser?.phone || ''} className="w-full bg-gray-50 border border-border rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Role Group</label>
                <input type="text" readOnly value={currentUser?.role || ''} className="w-full bg-gray-50 border border-border rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none capitalize" />
              </div>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-card border border-border shadow-sm overflow-hidden">
          <div className="p-4 border-b border-border bg-gray-50/50 flex items-center gap-3">
            <Bell className="h-5 w-5 text-primary" />
            <h2 className="font-bold text-sm text-text-primary">Notifications Preferences</h2>
          </div>
          <div className="p-5 space-y-4">
            <div className="flex items-center justify-between py-2 border-b border-border/50">
              <div>
                <p className="text-sm font-semibold text-text-primary">Critical Incident Alerts</p>
                <p className="text-xs text-text-secondary">Sound alarm and popups for critical/high emergencies</p>
              </div>
              <input type="checkbox" checked={criticalNotifs} onChange={(e) => setCriticalNotifs(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
            </div>
            <div className="flex items-center justify-between py-2 border-b border-border/50">
              <div>
                <p className="text-sm font-semibold text-text-primary">Team Communication Messages</p>
                <p className="text-xs text-text-secondary">Recieve notification for team channel messages</p>
              </div>
              <input type="checkbox" checked={teamNotifs} onChange={(e) => setTeamNotifs(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-semibold text-text-primary">Weekly Report Digests</p>
                <p className="text-xs text-text-secondary">Generate and notify for post-incident logs weekly</p>
              </div>
              <input type="checkbox" checked={reportNotifs} onChange={(e) => setReportNotifs(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
            </div>
          </div>
        </div>

        {/* Emergency Configurations */}
        <div className="bg-white rounded-card border border-border shadow-sm overflow-hidden">
          <div className="p-4 border-b border-border bg-gray-50/50 flex items-center gap-3">
            <Shield className="h-5 w-5 text-primary" />
            <h2 className="font-bold text-sm text-text-primary">Emergency & Safety Configurations</h2>
          </div>
          <div className="p-5 space-y-4">
            <div className="flex items-center justify-between py-2 border-b border-border/50">
              <div>
                <p className="text-sm font-semibold text-text-primary">Real-Time Location Sharing</p>
                <p className="text-xs text-text-secondary">Constantly stream location coordinates during active incidents</p>
              </div>
              <input type="checkbox" checked={locationSharing} onChange={(e) => setLocationSharing(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-semibold text-text-primary">SOS Trigger Mode</p>
                <p className="text-xs text-text-secondary">Choose triggers for quick emergency alerts</p>
              </div>
              <select value={sosMode} onChange={(e) => setSosMode(e.target.value)} className="border border-border rounded-lg px-3 py-1.5 text-xs bg-white">
                <option value="both">Both Audio & Coordinates</option>
                <option value="silent">Silent Broadcast</option>
                <option value="voice">Audio Call Only</option>
              </select>
            </div>
          </div>
        </div>

        {/* Connectivity */}
        <div className="bg-white rounded-card border border-border shadow-sm overflow-hidden">
          <div className="p-4 border-b border-border bg-gray-50/50 flex items-center gap-3">
            <Wifi className="h-5 w-5 text-primary" />
            <h2 className="font-bold text-sm text-text-primary">Network & Connectivity</h2>
          </div>
          <div className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-text-primary">Offline Mode (Simulated)</p>
                <p className="text-xs text-text-secondary">Force application to queue requests locally for sync</p>
              </div>
              <input type="checkbox" checked={offlineMode} onChange={(e) => setOfflineMode(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
            </div>
            <div className="bg-gray-50 p-4 rounded-xl flex justify-between items-center text-xs text-text-secondary mt-2">
              <span>Current Connection Adapter</span>
              <span className="font-bold text-primary uppercase">{connectivityMode} Mode</span>
            </div>
          </div>
        </div>

        {/* Appearance */}
        <div className="bg-white rounded-card border border-border shadow-sm overflow-hidden">
          <div className="p-4 border-b border-border bg-gray-50/50 flex items-center gap-3">
            <Moon className="h-5 w-5 text-primary" />
            <h2 className="font-bold text-sm text-text-primary">Appearance Settings</h2>
          </div>
          <div className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-text-primary">Compact Dashboards</p>
                <p className="text-xs text-text-secondary">Reduce paddings to fit more elements on single screen</p>
              </div>
              <input type="checkbox" checked={compactMode} onChange={(e) => setCompactMode(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <button onClick={handleSave} className="flex items-center gap-2 bg-primary hover:bg-primary-600 text-white px-5 py-3 rounded-xl text-sm font-bold transition-all shadow-lg">
          <Save className="h-4 w-4" /> Save Preferences
        </button>
      </div>
    </div>
  );
}
