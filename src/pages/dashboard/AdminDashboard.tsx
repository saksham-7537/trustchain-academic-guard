import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle } from "@/components/ui/glass-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VerificationBadge } from "@/components/ui/verification-badge";
import { Navigation } from "@/components/layout/navigation";
import { 
  Shield, 
  TrendingUp, 
  AlertTriangle, 
  Building, 
  Users, 
  MapPin,
  Calendar,
  Activity
} from "lucide-react";
import { useAppStore } from "@/store/useAppStore";

const fraudData = [
  { district: "Delhi", attempts: 45 },
  { district: "Mumbai", attempts: 38 },
  { district: "Bangalore", attempts: 32 },
  { district: "Chennai", attempts: 28 },
  { district: "Pune", attempts: 23 },
];

const institutionData = [
  { name: "IIT Delhi", verifications: 245, suspicious: 2 },
  { name: "IIM Bangalore", verifications: 189, suspicious: 1 },
  { name: "BITS Pilani", verifications: 156, suspicious: 3 },
  { name: "NIT Trichy", verifications: 134, suspicious: 1 },
  { name: "VIT Vellore", verifications: 98, suspicious: 4 },
];

const statusDistribution = [
  { name: 'Verified', value: 1156, color: 'hsl(var(--verified))' },
  { name: 'Suspicious', value: 67, color: 'hsl(var(--suspicious))' },
  { name: 'Invalid', value: 24, color: 'hsl(var(--invalid))' },
];

export default function AdminDashboard() {
  const { analytics } = useAppStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 flex">
      {/* Sidebar */}
      <div className="w-64 glass-card rounded-r-3xl">
        <Navigation userRole="admin" className="p-6" />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Admin Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor verification activities and fraud detection across the platform
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <GlassCard>
            <GlassCardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <GlassCardTitle className="text-sm font-medium">
                Total Verifications
              </GlassCardTitle>
              <Activity className="h-4 w-4 text-primary" />
            </GlassCardHeader>
            <GlassCardContent>
              <div className="text-3xl font-bold text-primary">{analytics.totalVerifications.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </GlassCardContent>
          </GlassCard>

          <GlassCard>
            <GlassCardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <GlassCardTitle className="text-sm font-medium">
                Fraud Attempts
              </GlassCardTitle>
              <AlertTriangle className="h-4 w-4 text-invalid" />
            </GlassCardHeader>
            <GlassCardContent>
              <div className="text-3xl font-bold text-invalid">{analytics.fraudAttempts}</div>
              <p className="text-xs text-muted-foreground">
                -5% from last month
              </p>
            </GlassCardContent>
          </GlassCard>

          <GlassCard>
            <GlassCardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <GlassCardTitle className="text-sm font-medium">
                Success Rate
              </GlassCardTitle>
              <TrendingUp className="h-4 w-4 text-verified" />
            </GlassCardHeader>
            <GlassCardContent>
              <div className="text-3xl font-bold text-verified">{analytics.successRate}%</div>
              <p className="text-xs text-muted-foreground">
                +0.3% from last month
              </p>
            </GlassCardContent>
          </GlassCard>

          <GlassCard>
            <GlassCardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <GlassCardTitle className="text-sm font-medium">
                Active Institutions
              </GlassCardTitle>
              <Building className="h-4 w-4 text-accent" />
            </GlassCardHeader>
            <GlassCardContent>
              <div className="text-3xl font-bold text-accent">247</div>
              <p className="text-xs text-muted-foreground">
                +8 this month
              </p>
            </GlassCardContent>
          </GlassCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Monthly Trend Chart */}
          <GlassCard>
            <GlassCardHeader>
              <GlassCardTitle>Monthly Verification Trend</GlassCardTitle>
            </GlassCardHeader>
            <GlassCardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analytics.monthlyTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="verifications" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    name="Verifications"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="frauds" 
                    stroke="hsl(var(--invalid))" 
                    strokeWidth={2}
                    name="Fraud Attempts"
                  />
                </LineChart>
              </ResponsiveContainer>
            </GlassCardContent>
          </GlassCard>

          {/* Status Distribution */}
          <GlassCard>
            <GlassCardHeader>
              <GlassCardTitle>Verification Status Distribution</GlassCardTitle>
            </GlassCardHeader>
            <GlassCardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {statusDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-6 mt-4">
                {statusDistribution.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-muted-foreground">
                      {item.name}: {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </GlassCardContent>
          </GlassCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Fraud Hotspots */}
          <GlassCard>
            <GlassCardHeader>
              <GlassCardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Fraud Hotspots by District
              </GlassCardTitle>
            </GlassCardHeader>
            <GlassCardContent>
              <div className="space-y-4">
                {fraudData.map((item, index) => (
                  <div key={item.district} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-invalid/10 flex items-center justify-center text-sm font-medium text-invalid">
                        {index + 1}
                      </div>
                      <span className="font-medium">{item.district}</span>
                    </div>
                    <div className="px-3 py-1 rounded-full text-sm font-medium bg-invalid text-invalid-foreground">
                      {item.attempts} attempts
                    </div>
                  </div>
                ))}
              </div>
            </GlassCardContent>
          </GlassCard>

          {/* Top Institutions */}
          <GlassCard>
            <GlassCardHeader>
              <GlassCardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Most Active Institutions
              </GlassCardTitle>
            </GlassCardHeader>
            <GlassCardContent>
              <div className="space-y-4">
                {institutionData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {item.verifications} verifications
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-verified">
                        {((1 - item.suspicious / item.verifications) * 100).toFixed(1)}%
                      </div>
                      <div className="text-xs text-muted-foreground">success rate</div>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCardContent>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}