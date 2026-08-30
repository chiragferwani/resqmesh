import { Clock, Zap, CheckCircle, Users, Box, Wifi } from 'lucide-react';
import StatCard from '@/components/ui/StatCard';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area 
} from 'recharts';

const incidentsOverTime = [
  { day: 'Mon', count: 4 },
  { day: 'Tue', count: 7 },
  { day: 'Wed', count: 5 },
  { day: 'Thu', count: 8 },
  { day: 'Fri', count: 12 },
  { day: 'Sat', count: 6 },
  { day: 'Sun', count: 3 },
];

const incidentsByCategory = [
  { category: 'Flooding', count: 8, color: '#165DDB' },
  { category: 'Fire', count: 4, color: '#E53935' },
  { category: 'Accident', count: 6, color: '#F59E0B' },
  { category: 'Medical', count: 3, color: '#16A34A' },
  { category: 'Infra', count: 5, color: '#8B5CF6' },
  { category: 'Other', count: 2, color: '#6B7280' },
];

const responseTimeData = [
  { day: 'Mon', time: 14 },
  { day: 'Tue', time: 13 },
  { day: 'Wed', time: 11 },
  { day: 'Thu', time: 15 },
  { day: 'Fri', time: 18 },
  { day: 'Sat', time: 12 },
  { day: 'Sun', time: 10 },
];

const resourceUtilization = [
  { name: 'Vehicles', used: 85, total: 100 },
  { name: 'Medical', used: 65, total: 100 },
  { name: 'Equipment', used: 92, total: 100 },
  { name: 'Personnel', used: 70, total: 100 },
];

export default function AnalyticsPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Analytics Dashboard</h1>
        <p className="text-sm text-text-secondary mt-1">Real-time performance metrics and historical data analysis</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        <StatCard title="Avg Response" value="12 min" icon={Clock} color="bg-blue-50 text-blue-600" />
        <StatCard title="SOS Latency" value="3.2s" icon={Zap} color="bg-amber-50 text-amber-600" />
        <StatCard title="Resolved" value="156" icon={CheckCircle} color="bg-green-50 text-green-600" />
        <StatCard title="Active Responders" value="24" icon={Users} color="bg-indigo-50 text-indigo-600" />
        <StatCard title="Resource Util" value="78%" icon={Box} color="bg-purple-50 text-purple-600" />
        <StatCard title="Mesh Uptime" value="96%" icon={Wifi} color="bg-emerald-50 text-emerald-600" />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Incidents over time */}
        <div className="bg-white p-5 rounded-card border border-border shadow-sm">
          <h3 className="font-semibold text-text-primary mb-4 text-sm">Weekly Incident Frequency</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={incidentsOverTime}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#165DDB" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#165DDB" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="count" stroke="#165DDB" fillOpacity={1} fill="url(#colorCount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category breakdown */}
        <div className="bg-white p-5 rounded-card border border-border shadow-sm">
          <h3 className="font-semibold text-text-primary mb-4 text-sm">Incidents by Category</h3>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={incidentsByCategory} dataKey="count" nameKey="category" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
                  {incidentsByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Response times */}
        <div className="bg-white p-5 rounded-card border border-border shadow-sm">
          <h3 className="font-semibold text-text-primary mb-4 text-sm">Response Time Trend (Minutes)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={responseTimeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="time" stroke="#E53935" strokeWidth={2} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Resource utilization */}
        <div className="bg-white p-5 rounded-card border border-border shadow-sm">
          <h3 className="font-semibold text-text-primary mb-4 text-sm">Resource Allocation Index</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={resourceUtilization} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis dataKey="name" type="category" />
                <Tooltip />
                <Bar dataKey="used" fill="#16A34A" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
