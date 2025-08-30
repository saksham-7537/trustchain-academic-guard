import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle } from "@/components/ui/glass-card";
import { Navigation } from "@/components/layout/navigation";
import { VerificationBadge } from "@/components/ui/verification-badge";
import { 
  Search, 
  FileText, 
  Calendar, 
  AlertCircle,
  Download,
  ExternalLink,
  Shield,
  History
} from "lucide-react";
import { Link } from "react-router-dom";

const mockVerifications = [
  {
    id: "VER-2024-001",
    certificateId: "IIT-CSE-2023-001",
    institutionName: "IIT Delhi",
    studentName: "Rahul Kumar Sharma",
    course: "B.Tech Computer Science",
    status: "verified" as const,
    verifiedAt: "2024-01-15T10:30:00Z",
    confidence: 98.7
  },
  {
    id: "VER-2024-002", 
    certificateId: "BITS-EEE-2023-045",
    institutionName: "BITS Pilani",
    studentName: "Priya Patel",
    course: "B.Tech Electronics",
    status: "verified" as const,
    verifiedAt: "2024-01-10T14:20:00Z",
    confidence: 97.2
  },
  {
    id: "VER-2024-003",
    certificateId: "VIT-MBA-2023-012",
    institutionName: "VIT Vellore",
    studentName: "Rohit Kumar",
    course: "MBA Finance",
    status: "suspicious" as const,
    verifiedAt: "2024-01-08T09:15:00Z",
    confidence: 65.4
  }
];

interface StudentEmployerDashboardProps {
  userType: 'student' | 'employer';
}

export default function StudentEmployerDashboard({ userType = 'student' }: StudentEmployerDashboardProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredVerifications = mockVerifications.filter(verification =>
    verification.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    verification.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
    verification.institutionName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const dashboardTitle = userType === 'student' ? 'Student Dashboard' : 'Employer Dashboard';
  const dashboardDescription = userType === 'student' 
    ? 'View your certificate verification history and manage your academic credentials'
    : 'Verify academic certificates and track verification history for hiring';

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 flex">
      {/* Sidebar */}
      <div className="w-64 glass-card rounded-r-3xl">
        <Navigation userRole={userType} className="p-6" />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{dashboardTitle}</h1>
          <p className="text-muted-foreground">
            {dashboardDescription}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <GlassCard>
            <GlassCardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <GlassCardTitle className="text-sm font-medium">
                Total Verifications
              </GlassCardTitle>
              <FileText className="h-4 w-4 text-primary" />
            </GlassCardHeader>
            <GlassCardContent>
              <div className="text-3xl font-bold text-primary">23</div>
              <p className="text-xs text-muted-foreground">
                Lifetime verifications
              </p>
            </GlassCardContent>
          </GlassCard>

          <GlassCard>
            <GlassCardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <GlassCardTitle className="text-sm font-medium">
                Success Rate
              </GlassCardTitle>
              <Shield className="h-4 w-4 text-verified" />
            </GlassCardHeader>
            <GlassCardContent>
              <div className="text-3xl font-bold text-verified">98%</div>
              <p className="text-xs text-muted-foreground">
                Verification success
              </p>
            </GlassCardContent>
          </GlassCard>

          <GlassCard>
            <GlassCardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <GlassCardTitle className="text-sm font-medium">
                This Month
              </GlassCardTitle>
              <Calendar className="h-4 w-4 text-accent" />
            </GlassCardHeader>
            <GlassCardContent>
              <div className="text-3xl font-bold text-accent">8</div>
              <p className="text-xs text-muted-foreground">
                Recent verifications
              </p>
            </GlassCardContent>
          </GlassCard>

          <GlassCard>
            <GlassCardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <GlassCardTitle className="text-sm font-medium">
                Alerts
              </GlassCardTitle>
              <AlertCircle className="h-4 w-4 text-suspicious" />
            </GlassCardHeader>
            <GlassCardContent>
              <div className="text-3xl font-bold text-suspicious">1</div>
              <p className="text-xs text-muted-foreground">
                Requires attention
              </p>
            </GlassCardContent>
          </GlassCard>
        </div>

        {/* Quick Actions */}
        <GlassCard className="mb-8">
          <GlassCardHeader>
            <GlassCardTitle>Quick Actions</GlassCardTitle>
          </GlassCardHeader>
          <GlassCardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="h-24 flex-col gap-2" variant="outline" asChild>
                <Link to="/verify">
                  <FileText className="h-8 w-8" />
                  <span className="text-sm font-medium">
                    {userType === 'student' ? 'Verify My Certificate' : 'Verify Certificate'}
                  </span>
                </Link>
              </Button>

              <Button className="h-24 flex-col gap-2" variant="outline">
                <Download className="h-8 w-8" />
                <span className="text-sm font-medium">Download Report</span>
              </Button>

              <Button className="h-24 flex-col gap-2" variant="outline">
                <History className="h-8 w-8" />
                <span className="text-sm font-medium">View History</span>
              </Button>
            </div>
          </GlassCardContent>
        </GlassCard>

        {/* Search & Filters */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search verifications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>

        {/* Verification History */}
        <GlassCard>
          <GlassCardHeader>
            <div className="flex justify-between items-center">
              <GlassCardTitle>Verification History</GlassCardTitle>
              <Button variant="outline" size="sm" asChild>
                <Link to="/verify">
                  <FileText className="mr-2 h-4 w-4" />
                  New Verification
                </Link>
              </Button>
            </div>
          </GlassCardHeader>
          <GlassCardContent>
            <div className="space-y-4">
              {filteredVerifications.map((verification) => (
                <div key={verification.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold">{verification.studentName}</h3>
                      <VerificationBadge status={verification.status} />
                      <span className="text-sm font-medium text-muted-foreground">
                        {verification.confidence}% confidence
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                      <div>
                        <span className="font-medium">Institution:</span> {verification.institutionName}
                      </div>
                      <div>
                        <span className="font-medium">Course:</span> {verification.course}
                      </div>
                      <div>
                        <span className="font-medium">Verified:</span>{" "}
                        {new Date(verification.verifiedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}

              {filteredVerifications.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <FileText className="mx-auto h-12 w-12 mb-4" />
                  <p>No verifications found</p>
                  <Button className="mt-4" asChild>
                    <Link to="/verify">Start Your First Verification</Link>
                  </Button>
                </div>
              )}
            </div>
          </GlassCardContent>
        </GlassCard>
      </div>
    </div>
  );
}