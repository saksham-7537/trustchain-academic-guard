import * as React from "react";
import { cn } from "@/lib/utils";
import { VerificationStatus } from "@/store/useAppStore";
import { CheckCircle, AlertTriangle, XCircle, Clock } from "lucide-react";

interface VerificationBadgeProps {
  status: VerificationStatus;
  className?: string;
}

const statusConfig = {
  verified: {
    label: "Verified",
    icon: CheckCircle,
    className: "status-verified",
  },
  suspicious: {
    label: "Suspicious", 
    icon: AlertTriangle,
    className: "status-suspicious",
  },
  invalid: {
    label: "Invalid",
    icon: XCircle,
    className: "status-invalid",
  },
  pending: {
    label: "Pending",
    icon: Clock,
    className: "bg-muted text-muted-foreground",
  },
};

export function VerificationBadge({ status, className }: VerificationBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "verification-badge inline-flex items-center gap-1.5",
        config.className,
        className
      )}
    >
      <Icon className="h-3 w-3" />
      <span>{config.label}</span>
    </div>
  );
}