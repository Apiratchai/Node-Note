import "../styles/globals.css"
import { Toaster } from "sonner"
import { ConvexClientProvider } from "../../components/ConvexClientProvider"
import { dark } from "@clerk/themes"
import { EdgeStoreProvider } from '../lib/edgestore';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <ConvexClientProvider
      appearance={{
        baseTheme: dark
      }}>
      <EdgeStoreProvider>
      <Toaster position="bottom-center" />
      {/* above is popup notification from sonner */}
        <Component {...pageProps} />
      </EdgeStoreProvider>
    </ConvexClientProvider>
  )
}