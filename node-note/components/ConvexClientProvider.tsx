"use client";

import { ReactNode } from "react";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { dark } from "@clerk/themes"

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export const ConvexClientProvider = ({
  children
}: {
  children: ReactNode;
}) => {
  return (
    <ClerkProvider afterSignInUrl="/Notetaking" afterSignUpUrl="/Notetaking"
      appearance={{
        baseTheme: dark
      }}

      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
    >
      <ConvexProviderWithClerk
        useAuth={useAuth}
        client={convex}
      >
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
};