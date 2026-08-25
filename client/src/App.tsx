import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { CourseProvider } from "./contexts/CourseContext";
import Home from "./pages/Home";

// This course is a single interactive application. Rendering it directly keeps
// GitHub Pages project URLs such as /chatgpt-business-course/ route-safe.
function CourseApplication() {
  return <Home />;
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <CourseProvider>
          <TooltipProvider>
            <Toaster />
            <CourseApplication />
          </TooltipProvider>
        </CourseProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
