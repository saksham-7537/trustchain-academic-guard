import { Button } from "@/components/ui/button";
import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle, GlassCardDescription } from "@/components/ui/glass-card";
import { Shield, Brain, Fingerprint, CheckCircle, Building, Users, BarChart3, FileCheck } from "lucide-react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      {/* Header */}
      <header className="glass border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
              TrustChain AI
            </span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link to="/verify" className="text-muted-foreground hover:text-foreground transition-colors">
              Verify
            </Link>
            <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            The{" "}
            <span className="gradient-primary bg-clip-text text-transparent">
              Aadhaar
            </span>{" "}
            of Academic Certificates
          </h1>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            AI-powered authenticity validation system ensuring the integrity of academic credentials 
            through advanced forgery detection and blockchain verification.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gradient-primary text-lg px-8 py-6" asChild>
              <Link to="/verify">
                <FileCheck className="mr-2 h-5 w-5" />
                Verify Certificate
              </Link>
            </Button>
            
            <Button size="lg" variant="outline" className="text-lg px-8 py-6" asChild>
              <Link to="/dashboard/institution">
                <Building className="mr-2 h-5 w-5" />
                Institution Login
              </Link>
            </Button>
            
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6" asChild>
              <Link to="/dashboard/admin">
                <BarChart3 className="mr-2 h-5 w-5" />
                Admin Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Powered by Advanced AI Technology</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our comprehensive verification system uses cutting-edge technology to detect forgeries 
            and ensure certificate authenticity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <GlassCard className="animate-slide-up text-center">
            <GlassCardHeader>
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <GlassCardTitle>AI-Powered Detection</GlassCardTitle>
              <GlassCardDescription>
                Advanced machine learning algorithms analyze seals, signatures, and photo tampering 
                with 99.8% accuracy rate.
              </GlassCardDescription>
            </GlassCardHeader>
          </GlassCard>

          <GlassCard className="animate-slide-up text-center" style={{ animationDelay: '0.1s' }}>
            <GlassCardHeader>
              <div className="mx-auto w-12 h-12 bg-verified/10 rounded-full flex items-center justify-center mb-4">
                <Fingerprint className="h-6 w-6 text-verified" />
              </div>
              <GlassCardTitle>Certificate Fingerprinting</GlassCardTitle>
              <GlassCardDescription>
                Unique digital fingerprints for every certificate enabling instant verification 
                and tamper detection.
              </GlassCardDescription>
            </GlassCardHeader>
          </GlassCard>

          <GlassCard className="animate-slide-up text-center" style={{ animationDelay: '0.2s' }}>
            <GlassCardHeader>
              <div className="mx-auto w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-accent" />
              </div>
              <GlassCardTitle>Blockchain Security</GlassCardTitle>
              <GlassCardDescription>
                Immutable verification records stored on blockchain ensuring transparency 
                and preventing data manipulation.
              </GlassCardDescription>
            </GlassCardHeader>
          </GlassCard>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-20 bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl my-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div className="animate-fade-in-up">
            <div className="text-4xl font-bold text-primary mb-2">1M+</div>
            <div className="text-muted-foreground">Certificates Verified</div>
          </div>
          <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="text-4xl font-bold text-verified mb-2">99.8%</div>
            <div className="text-muted-foreground">Accuracy Rate</div>
          </div>
          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="text-4xl font-bold text-accent mb-2">500+</div>
            <div className="text-muted-foreground">Partner Institutions</div>
          </div>
          <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="text-4xl font-bold text-suspicious mb-2">2.1K</div>
            <div className="text-muted-foreground">Frauds Prevented</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="glass border-t mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">TrustChain AI</span>
              </div>
              <p className="text-muted-foreground">
                Securing academic credentials with AI-powered verification technology.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="/verify" className="hover:text-foreground transition-colors">Verify Certificate</Link></li>
                <li><Link to="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link></li>
                <li><Link to="/api" className="hover:text-foreground transition-colors">API Access</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="/docs" className="hover:text-foreground transition-colors">Documentation</Link></li>
                <li><Link to="/support" className="hover:text-foreground transition-colors">Support</Link></li>
                <li><Link to="/status" className="hover:text-foreground transition-colors">System Status</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>support@trustchain.ai</li>
                <li>+91 (800) 123-4567</li>
                <li>New Delhi, India</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 TrustChain AI. A Government of India Initiative. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}