import { Link } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { UserButton } from "@/components/layout/UserButton";
import { useRole } from "@/hooks/useRole"; // ← ADD THIS
import { BarChart3 } from "lucide-react";

export function Header() {
  const { isSignedIn, isLoaded } = useAuth();
  const { isAdmin } = useRole(); // ← ADD THIS

  return (
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <BarChart3 className="h-7 w-7 text-primary" />
            <span className="text-xl font-semibold tracking-tight">Chartify</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
                to="/pricing"
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Pricing
            </Link>
            <Link
                to="/about"
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              About
            </Link>
            {isLoaded && isSignedIn && (
                <>
                  <Link
                      to="/dashboard"
                      className="text-sm font-medium text-muted-foreground hover:text-foreground"
                  >
                    Dashboard
                  </Link>
                  {/* ← WRAP ADMIN LINK */}
                  {isAdmin && (
                      <Link
                          to="/admin/dashboard"
                          className="text-sm font-medium text-muted-foreground/70 hover:text-foreground"
                      >
                        Admin
                      </Link>
                  )}
                </>
            )}
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            {isLoaded && isSignedIn ? (
                <UserButton />
            ) : (
                <>
                  <Link to="/sign-in">
                    <Button variant="ghost" size="sm">
                      Log in
                    </Button>
                  </Link>
                  <Link to="/sign-up">
                    <Button size="sm">Get Started</Button>
                  </Link>
                </>
            )}
          </div>
        </div>
      </header>
  );
}