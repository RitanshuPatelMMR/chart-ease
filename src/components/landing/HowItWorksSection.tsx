import { Upload, Sliders, Download } from "lucide-react";

const steps = [
  {
    icon: Upload,
    step: "01",
    title: "Upload Your Data",
    description:
      "Drag and drop your Excel or CSV file. We support files up to 5MB with up to 1,000 rows.",
  },
  {
    icon: Sliders,
    step: "02",
    title: "Customize Your Chart",
    description:
      "Choose chart types, colors, and styling. Edit your data inline and see real-time previews.",
  },
  {
    icon: Download,
    step: "03",
    title: "Export & Share",
    description:
      "Download as SVG, PNG, or PDF. Your charts are saved to your account for future access.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground">
            Create professional charts in three simple steps
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((item) => (
            <div
              key={item.step}
              className="relative rounded-xl border border-border bg-card p-8"
            >
              <div className="mb-6 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <span className="text-4xl font-bold text-muted-foreground/20">
                  {item.step}
                </span>
              </div>
              <h3 className="mb-3 text-xl font-semibold">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
