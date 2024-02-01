import "../styles/globals.css"
import { Toaster } from "sonner"
import { ConvexClientProvider } from "../../components/ConvexClientProvider"
import { SignedIn, SignedOut } from "@clerk/nextjs"
import { dark } from "@clerk/themes"

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <ConvexClientProvider
      appearance={{
        baseTheme: dark
      }}>
      <Toaster position="bottom-center" />
      {/* above is popup notification from sonner */}
      <Component {...pageProps} />
    </ConvexClientProvider>
  )
}