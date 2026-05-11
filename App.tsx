import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { SearchDialog } from "./components/SearchDialog";
import Home from "./pages/Home";
import Architecture from "./pages/Architecture";
import Modules from "./pages/Modules";
import Database from "./pages/Database";
import Workflows from "./pages/Workflows";
import Reports from "./pages/Reports";
import Roadmap from "./pages/Roadmap";
import RolesPermissions from "./pages/RolesPermissions";
import { useState, useEffect } from "react";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/architecture"} component={Architecture} />
      <Route path={"/modules"} component={Modules} />
      <Route path={"/database"} component={Database} />
      <Route path={"/workflows"} component={Workflows} />
      <Route path={"/reports"} component={Reports} />
      <Route path={"/roles-permissions"} component={RolesPermissions} />
      <Route path={"/roadmap"} component={Roadmap} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
          <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
