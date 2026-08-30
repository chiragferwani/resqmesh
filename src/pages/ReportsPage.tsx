import { useState } from 'react';
import { FileText, Download, Eye, Plus, Search, Calendar, MapPin, User } from 'lucide-react';
import StatusBadge from '@/components/ui/StatusBadge';
import { mockReports } from '@/data/reports';
import { formatDateTime } from '@/lib/utils';
import { toast } from '@/components/ui/Toast';

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState<'All' | 'incident' | 'log'>('All');
  const [search, setSearch] = useState('');

  const reports = mockReports || [];

  const filteredReports = reports.filter(r => {
    const typeMatches = activeTab === 'All' || 
      (activeTab === 'incident' && r.category === 'Incident Report') ||
      (activeTab === 'log' && r.category === 'Activity Log');
    const searchMatches = r.title.toLowerCase().includes(search.toLowerCase()) || 
      r.location.toLowerCase().includes(search.toLowerCase()) ||
      r.reportId.toLowerCase().includes(search.toLowerCase());
    return typeMatches && searchMatches;
  });

  const handleDownload = (id: string) => {
    toast(`Preparing PDF download for report ${id}...`, 'info');
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Reports & Logs</h1>
          <p className="text-sm text-text-secondary mt-1">View, track and manage all incident reports and activity logs</p>
        </div>
        <button
          onClick={() => toast('Creating report draft...', 'info')}
          className="flex items-center gap-2 bg-primary hover:bg-primary-600 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors w-fit"
        >
          <Plus className="h-4 w-4" /> Create New Report
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search reports or locations..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1 w-fit flex-shrink-0">
          {(['All', 'incident', 'log'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors capitalize ${
                activeTab === tab ? 'bg-white text-text-primary shadow-sm' : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {tab === 'incident' ? 'Incident Reports' : tab === 'log' ? 'Activity Logs' : 'All'}
            </button>
          ))}
        </div>
      </div>

      {/* Reports list/table */}
      <div className="bg-white rounded-card border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-55/50 border-b border-border text-xs font-semibold text-text-secondary uppercase tracking-wider">
                <th className="px-6 py-4">Report Details</th>
                <th className="px-6 py-4">Date & Time</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Submitted By</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredReports.map((r) => (
                <tr key={r.id} className="text-sm hover:bg-gray-55/10 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-50 rounded-lg"><FileText className="h-5 w-5 text-primary" /></div>
                      <div>
                        <p className="font-semibold text-text-primary">{r.title}</p>
                        <p className="text-xs text-text-secondary font-mono">{r.reportId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-text-secondary" /> {formatDateTime(r.dateTime)}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-text-secondary" /> {r.location}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-text-secondary" />
                      <div>
                        <p className="font-medium text-text-primary">{r.submittedBy}</p>
                        <p className="text-[10px] text-text-secondary capitalize">{r.submitterRole}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={r.status} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => handleDownload(r.reportId)} className="p-2 hover:bg-gray-55 rounded-lg text-text-secondary" title="Download Report">
                        <Download className="w-4 h-4" />
                      </button>
                      <button onClick={() => toast('Previewing document...', 'info')} className="p-2 hover:bg-gray-55 rounded-lg text-text-secondary" title="View Document">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
