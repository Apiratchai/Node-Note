import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link"

export default function Component() {
  const { data: session } = useSession()
  if (session) {
    return (
      <div className="navbar flex-row bg-base-300">
        <div className="flex-1 flex-row">
          {/* Search Input */}
          <div className="form-control">
            <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
          </div>
          {/* Home Link */}
          <Link href="/Home">
            <div className="btn btn-ghost text-xl">Node-Note</div>
          </Link>
        </div>

        {/* Profile */}
        <div>
          <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-full rounded-full">
              {session.user.image && (
                <img src="{session.user.image}" alt="Profile" className="w-full h-full object-cover rounded-full" />
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <>
      Not signed in <br />
      <button className="btn btn-primary btn-xl" onClick={() => signIn()}>Sign in</button>
    </>
  )
}