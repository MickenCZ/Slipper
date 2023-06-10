import { SignIn } from "@clerk/nextjs";
import { ClerkProvider } from "@clerk/nextjs";
import Head from "next/head";


export default function Page() {
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key")
  }
  const clerkPubKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  return (<ClerkProvider publishableKey={clerkPubKey}>
  <Head><title>Sign In - Slipper</title></Head>
  <SignIn />
  </ClerkProvider>)
}