import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import CareerSelection from "./pages/CareerSelection";
import VirtualWorkspace from "./pages/VirtualWorkspace";
import MethodologySelection from "./pages/MethodologySelection";
import SimulatorEnvironment from "./pages/SimulatorEnvironment";
import SessionSummary from "./pages/SessionSummary";
import MySimulations from "./pages/MySimulations";
import PostLoginSplash from "./components/PostLoginSplash";
import AppDashboard from "./pages/AppDashboard";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/auth/:step" component={Auth} />
      <Route path="/auth" component={Auth} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/career-selection" component={CareerSelection} />
      <Route path="/workspace/:slug" component={VirtualWorkspace} />
      <Route path="/methodology-selection" component={MethodologySelection} />
      <Route path="/simulator" component={SimulatorEnvironment} />
      <Route path="/session-summary" component={SessionSummary} />
      <Route path="/my-simulations" component={MySimulations} />
      <Route path="/splash" component={PostLoginSplash} />
      <Route path="/app" component={AppDashboard} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
