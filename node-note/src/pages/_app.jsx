import "../styles/globals.css"
import { Toaster } from "sonner"
import { ConvexClientProvider } from "../../components/ConvexClientProvider"
import { SignedIn, SignedOut } from "@clerk/nextjs"
import { dark } from "@clerk/themes"
import { ModalProvider} from "../../@/components/ui/providers/modal-provider"

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
      <ModalProvider />
      {/* above is popup notification from sonner */}
      <Component {...pageProps} />
    </ConvexClientProvider>
  )
}