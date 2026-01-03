import { UserButton as ClerkUserButton, useUser } from "@clerk/clerk-react";
import { Skeleton } from "@/components/ui/skeleton";

export function UserButton() {
  const { isLoaded } = useUser();

  if (!isLoaded) {
    return <Skeleton className="h-8 w-8 rounded-full" />;
  }

  return (
    <ClerkUserButton
      afterSignOutUrl="/"
      appearance={{
        elements: {
          avatarBox: "h-8 w-8",
        },
      }}
    />
  );
}
