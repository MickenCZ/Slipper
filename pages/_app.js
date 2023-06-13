import "../styles/App.css"
import { ClerkProvider } from "@clerk/nextjs"

if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}
const clerkPubKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export default function MyApp({ Component, pageProps }) {
  return (<ClerkProvider publishableKey={clerkPubKey}>
  <Component {...pageProps} />
  </ClerkProvider>)
}