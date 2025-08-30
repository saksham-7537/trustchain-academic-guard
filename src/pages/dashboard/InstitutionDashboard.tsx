import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle } from "@/components/ui/glass-card";
import { Navigation } from "@/components/layout/navigation";
import { VerificationBadge } from "@/components/ui/verification-badge";
import { Badge } from "@/components/ui/badge";
import { 
  Upload, 
  Search, 
  FileText, 
  Users, 
  Calendar, 
  AlertCircle,
  Plus,
  Filter,
  Download
} from "lucide-react";

const mockCertificates = [
  {
    id: "CERT-2024-001",
    studentName: "Aarav Sharma",
    rollNumber: "CSE2021001",
    course: "B.Tech Computer Science",
    issueDate: "2024-06-15",
    status: "verified" as const,
    verificationCount: 3
  },
  {
    id: "CERT-2024-002", 
    studentName: "Priya Patel",
    rollNumber: "ECE2021045",
    course: "B.Tech Electronics",
    issueDate: "2024-06-15",
    status: "verified" as const,
    verificationCount: 1
  },
  {
    id: "CERT-2024-003",
    studentName: "Rohit Kumar",
    rollNumber: "MBA2022012",
    course: "MBA Finance",
    issueDate: "2024-06-10",
    status: "suspicious" as const,
    verificationCount: 8
  }
];

export default function InstitutionDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filteredCertificates = mockCertificates.filter(cert => {
    const matchesSearch = cert.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.course.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === "all" || cert.status === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 flex">
      {/* Sidebar */}
      <div className="w-64 glass-card rounded-r-3xl">
        <Navigation userRole="institution" className="p-6" />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Institution Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your certificate registry and monitor verification activities
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <GlassCard>
            <GlassCardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <GlassCardTitle className="text-sm font-medium">
                Total Certificates
              </GlassCardTitle>
              <FileText className="h-4 w-4 text-primary" />
            </GlassCardHeader>
            <GlassCardContent>
              <div className="text-3xl font-bold text-primary">1,247</div>
              <p className="text-xs text-muted-foreground">
                +23 this week
              </p>
            </GlassCardContent>
          </GlassCard>

          <GlassCard>
            <GlassCardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <GlassCardTitle className="text-sm font-medium">
                Verifications Today
              </GlassCardTitle>
              <Users className="h-4 w-4 text-verified" />
            </GlassCardHeader>
            <GlassCardContent>
              <div className="text-3xl font-bold text-verified">89</div>
              <p className="text-xs text-muted-foreground">
                +12% from yesterday
              </p>
            </GlassCardContent>
          </GlassCard>

          <GlassCard>
            <GlassCardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <GlassCardTitle className="text-sm font-medium">
                Pending Requests
              </GlassCardTitle>
              <AlertCircle className="h-4 w-4 text-suspicious" />
            </GlassCardHeader>
            <GlassCardContent>
              <div className="text-3xl font-bold text-suspicious">7</div>
              <p className="text-xs text-muted-foreground">
                Require attention
              </p>
            </GlassCardContent>
          </GlassCard>

          <GlassCard>
            <GlassCardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <GlassCardTitle className="text-sm font-medium">
                Success Rate
              </GlassCardTitle>
              <Calendar className="h-4 w-4 text-accent" />
            </GlassCardHeader>
            <GlassCardContent>
              <div className="text-3xl font-bold text-accent">98.2%</div>
              <p className="text-xs text-muted-foreground">
                This month
              </p>
            </GlassCardContent>
          </GlassCard>
        </div>

        {/* Actions & Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search certificates by name, roll number, or course..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Certificate
            </Button>
            
            <Button variant="outline" size="sm">
              <Upload className="mr-2 h-4 w-4" />
              Bulk Upload
            </Button>
          </div>
        </div>

        {/* Filter Badges */}
        <div className="flex gap-2 mb-6">
          {["all", "verified", "suspicious", "pending"].map((filter) => (
            <Badge
              key={filter}
              variant={selectedFilter === filter ? "default" : "outline"}
              className="cursor-pointer capitalize"
              onClick={() => setSelectedFilter(filter)}
            >
              {filter}
            </Badge>
          ))}
        </div>

        {/* Certificates Table */}
        <GlassCard>
          <GlassCardHeader>
            <div className="flex justify-between items-center">
              <GlassCardTitle>Certificate Registry</GlassCardTitle>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </GlassCardHeader>
          <GlassCardContent>
            <div className="space-y-4">
              {filteredCertificates.map((cert) => (
                <div key={cert.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold">{cert.studentName}</h3>
                      <VerificationBadge status={cert.status} />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                      <div>
                        <span className="font-medium">Roll:</span> {cert.rollNumber}
                      </div>
                      <div>
                        <span className="font-medium">Course:</span> {cert.course}
                      </div>
                      <div>
                        <span className="font-medium">Issued:</span> {cert.issueDate}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm font-medium">ID: {cert.id}</div>
                    <div className="text-xs text-muted-foreground">
                      {cert.verificationCount} verification{cert.verificationCount !== 1 ? 's' : ''}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </GlassCardContent>
        </GlassCard>

        {/* Bulk Upload Section */}
        <GlassCard className="mt-8">
          <GlassCardHeader>
            <GlassCardTitle>Quick Actions</GlassCardTitle>
          </GlassCardHeader>
          <GlassCardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 border-2 border-dashed border-border rounded-lg hover:border-primary/50 transition-colors cursor-pointer">
                <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-3" />
                <h3 className="font-semibold mb-1">Bulk Upload CSV</h3>
                <p className="text-sm text-muted-foreground">Upload multiple certificates at once</p>
              </div>
              
              <div className="text-center p-6 border-2 border-dashed border-border rounded-lg hover:border-primary/50 transition-colors cursor-pointer">
                <FileText className="mx-auto h-8 w-8 text-muted-foreground mb-3" />
                <h3 className="font-semibold mb-1">Add Single Certificate</h3>
                <p className="text-sm text-muted-foreground">Manually add new certificate</p>
              </div>
              
              <div className="text-center p-6 border-2 border-dashed border-border rounded-lg hover:border-primary/50 transition-colors cursor-pointer">
                <Download className="mx-auto h-8 w-8 text-muted-foreground mb-3" />
                <h3 className="font-semibold mb-1">Download Template</h3>
                <p className="text-sm text-muted-foreground">Get CSV template for bulk upload</p>
              </div>
            </div>
          </GlassCardContent>
        </GlassCard>
      </div>
    </div>
  );
}