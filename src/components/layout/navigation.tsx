import { Shield, Home, FileCheck, Building, Settings, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { UserRole } from "@/store/useAppStore";

interface NavigationProps {
  userRole?: UserRole;
  className?: string;
}

const navigationItems = {
  student: [
    { label: "Dashboard", href: "/dashboard/student", icon: Home },
    { label: "Verify Certificate", href: "/verify", icon: FileCheck },
  ],
  employer: [
    { label: "Dashboard", href: "/dashboard/employer", icon: Home },
    { label: "Verify Certificate", href: "/verify", icon: FileCheck },
  ],
  institution: [
    { label: "Dashboard", href: "/dashboard/institution", icon: Home },
    { label: "Certificate Registry", href: "/registry", icon: FileCheck },
    { label: "Upload Records", href: "/upload", icon: Building },
  ],
  admin: [
    { label: "Analytics", href: "/dashboard/admin", icon: Home },
    { label: "Institutions", href: "/institutions", icon: Building },
    { label: "Blacklist", href: "/blacklist", icon: Settings },
  ],
};

export function Navigation({ userRole = 'student', className }: NavigationProps) {
  const location = useLocation();
  const items = navigationItems[userRole] || navigationItems.student;

  return (
    <nav className={cn("flex flex-col space-y-2", className)}>
      <div className="flex items-center gap-2 mb-6 px-2">
        <Shield className="h-6 w-6 text-primary" />
        <span className="font-semibold text-lg">TrustChain AI</span>
      </div>

      {items.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.href;
        
        return (
          <Button
            key={item.href}
            variant={isActive ? "default" : "ghost"}
            asChild
            className={cn(
              "w-full justify-start gap-3",
              isActive && "bg-primary text-primary-foreground"
            )}
          >
            <Link to={item.href}>
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          </Button>
        );
      })}
      
      <div className="pt-4 mt-auto border-t border-border">
        <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground">
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </nav>
  );
}