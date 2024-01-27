import "../styles/globals.css"
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
      <Component {...pageProps} />
    </ConvexClientProvider>
  )
}