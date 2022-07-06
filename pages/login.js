import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import Auth from '../components/Auth'
import Account from '../components/Account'
import Link from 'next/link'

export default function Login() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      {!session ? <Auth /> : <Account key={session.user.id} session={session} />}
      <ul>
      <li>
        <Link href="/">
          <a className="text-3xl font-bold underline">Home</a>
        </Link>
      </li>
      <li>
        <Link href="/Requests">
          <a className="text-3xl font-bold underline">My Requests</a>
        </Link>
      </li>
    </ul>
    </div>
  )
}