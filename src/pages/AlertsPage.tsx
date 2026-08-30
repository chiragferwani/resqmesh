import { useState } from 'react';
import { useAlertStore } from '@/stores/alertStore';
import { Bell, Check, AlertTriangle, AlertCircle, Info } from 'lucide-react';
import { formatTimeAgo, getPriorityColor, getPriorityBorderColor } from '@/lib/utils';
import { toast } from '@/components/ui/Toast';

export default function AlertsPage() {
  const alerts = useAlertStore((s) => s.alerts);
  const markAsRead = useAlertStore((s) => s.markAsRead);
  const markAllAsRead = useAlertStore((s) => s.markAllAsRead);
  const [activeTab, setActiveTab] = useState<'All' | 'critical' | 'high' | 'medium' | 'low'>('All');

  const filteredAlerts = alerts.filter(alert => {
    if (activeTab === 'All') return true;
    return alert.priority.toLowerCase() === activeTab.toLowerCase();
  });

  const handleMarkAllRead = () => {
    markAllAsRead();
    toast('All alerts marked as read', 'success');
  };

  const getAlertIcon = (priority: string) => {
    switch (priority) {
      case 'critical': return <AlertTriangle className="h-5 w-5 text-red-600 animate-bounce" />;
      case 'high': return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'medium': return <AlertCircle className="h-5 w-5 text-warning" />;
      default: return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Alerts & Notifications</h1>
          <p className="text-sm text-text-secondary mt-1">Stay updated with critical real-time incident reports</p>
        </div>
        <button 
          onClick={handleMarkAllRead}
          className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-text-primary px-4 py-2.5 rounded-lg text-sm font-medium transition-colors w-fit"
        >
          <Check className="h-4 w-4" />
          <span>Mark All as Read</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-lg p-1 w-fit overflow-x-auto">
        {(['All', 'critical', 'high', 'medium', 'low'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors capitalize ${
              activeTab === tab ? 'bg-white text-text-primary shadow-sm' : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            {tab} ({tab === 'All' ? alerts.length : alerts.filter((a) => a.priority === tab).length})
          </button>
        ))}
      </div>

      {/* Alerts list */}
      <div className="space-y-3">
        {filteredAlerts.length > 0 ? (
          filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              onClick={() => markAsRead(alert.id)}
              className={`bg-white rounded-card border border-border shadow-sm p-4 flex items-start gap-4 cursor-pointer hover:shadow transition-shadow border-l-4 ${getPriorityBorderColor(alert.priority)} ${
                !alert.read ? 'bg-blue-50/20' : ''
              }`}
            >
              <div className="p-2 bg-gray-50 rounded-lg flex-shrink-0">
                {getAlertIcon(alert.priority)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-4">
                  <h3 className={`text-sm ${!alert.read ? 'font-bold' : 'font-semibold'} text-text-primary`}>{alert.title}</h3>
                  <span className="text-[10px] text-text-secondary whitespace-nowrap">{formatTimeAgo(alert.createdAt)}</span>
                </div>
                <p className="text-xs text-text-secondary mt-1">{alert.description}</p>
                {alert.location && (
                  <p className="text-[10px] text-primary font-semibold mt-2">Location: {alert.location}</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 text-text-secondary">
            No alerts found in this category.
          </div>
        )}
      </div>
    </div>
  );
}
