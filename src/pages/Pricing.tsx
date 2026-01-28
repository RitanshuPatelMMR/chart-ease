import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Check, Info } from "lucide-react";

const plans = [
  {
    name: "Free",
    description: "Get started with essential features",
    features: [
      "Upload Excel/CSV files",
      "Create unlimited charts",
      "Customize chart styles",
      "Free exports during early access",
    ],
  },
  {
    name: "Starter",
    description: "For users who need more power",
    features: [
      "Everything in Free",
      "Advanced chart customization",
      "Higher export limits",
    ],
  },
  {
    name: "Pro",
    description: "For power users and professionals",
    features: [
      "Everything in Starter",
      "Priority exports",
      "Saved chart history",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    description: "For teams and organizations",
    features: [
      "Everything in Pro",
      "Team usage",
      "Dedicated support",
    ],
  },
];

export default function Pricing() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Header Section */}
        <section className="py-20 md:py-28">
          <div className="container max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
              Simple, Transparent Pricing
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Chartify is currently free during early access. Pricing plans shown below represent our future roadmap.
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="pb-16">
          <div className="container">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative rounded-xl border bg-card p-6 flex flex-col ${
                    plan.highlighted
                      ? "border-primary shadow-sm ring-1 ring-primary/10"
                      : "border-border"
                  }`}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="inline-block rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                        Popular
                      </span>
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {plan.description}
                    </p>
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm">
                        <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={plan.highlighted ? "default" : "outline"}
                    className="w-full"
                    disabled
                  >
                    Free during early access
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Early Access Notice */}
        <section className="pb-20">
          <div className="container max-w-2xl">
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-6">
              <div className="flex gap-4">
                <div className="shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Info className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Early Access</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    All features are currently free. Pricing will be introduced in the future as the platform evolves.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
