import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Verify from "./pages/Verify";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import InstitutionDashboard from "./pages/dashboard/InstitutionDashboard";
import StudentEmployerDashboard from "./pages/dashboard/StudentEmployerDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
          <Route path="/dashboard/institution" element={<InstitutionDashboard />} />
          <Route path="/dashboard/student" element={<StudentEmployerDashboard userType="student" />} />
          <Route path="/dashboard/employer" element={<StudentEmployerDashboard userType="employer" />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
