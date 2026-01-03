import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Upload } from "lucide-react";

export function HeroSection() {
  return (
    <section className="py-20 md:py-32">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center rounded-full border border-border bg-muted px-4 py-1.5 text-sm">
            <span className="mr-2 rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
              New
            </span>
            <span className="text-muted-foreground">
              All features free during early access
            </span>
          </div>

          {/* Headline */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Turn Excel Data into{" "}
            <span className="text-primary">Beautiful Charts</span>
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Upload your spreadsheet, customize the visualization, and export
            stunning charts in seconds. No design skills required.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/sign-up">
              <Button size="lg" className="gap-2">
                <Upload className="h-4 w-4" />
                Start Creating Charts
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" size="lg" className="gap-2">
                Learn More
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Social proof */}
          <p className="mt-8 text-sm text-muted-foreground">
            Trusted by data analysts, marketers, and teams worldwide
          </p>
        </div>
      </div>
    </section>
  );
}
