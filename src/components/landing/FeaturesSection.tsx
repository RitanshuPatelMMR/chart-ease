import {
  BarChart3,
  Palette,
  FileSpreadsheet,
  Save,
  Download,
  Shield,
} from "lucide-react";

const features = [
  {
    icon: BarChart3,
    title: "Multiple Chart Types",
    description:
      "Line, bar, area, pie, and stacked charts. Choose the perfect visualization for your data.",
  },
  {
    icon: Palette,
    title: "Beautiful Themes",
    description:
      "5 professionally designed color themes. Switch instantly and see your chart transform.",
  },
  {
    icon: FileSpreadsheet,
    title: "Inline Data Editing",
    description:
      "Edit your data directly in the browser. Add rows, modify values, reset anytime.",
  },
  {
    icon: Save,
    title: "Auto-Save Charts",
    description:
      "All your work is automatically saved. Access your chart history from anywhere.",
  },
  {
    icon: Download,
    title: "Export Options",
    description:
      "Download as high-quality SVG, PNG, or PDF. Perfect for presentations and reports.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description:
      "Your data stays private. Enterprise-grade security with encrypted storage.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Everything You Need
          </h2>
          <p className="text-lg text-muted-foreground">
            Powerful features to create stunning charts without the complexity
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border border-border bg-card p-6 hover:border-primary/50"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <feature.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
