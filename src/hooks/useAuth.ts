import { useEffect, useState } from 'react'

import type { SessionData } from '@/app/api/session/lib'

const useAuth = () => {
  const [session, setSession] = useState<SessionData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch('/api/session')
        const data = await response.json()

        setSession(data)
      } catch (error) {
        console.error('Error fetching session:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSession()
  }, [])

  return { session, loading }
}

export default useAuth
