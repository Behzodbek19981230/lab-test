import type { NextRequest } from 'next/server'

import axios from 'axios'

import { getSession } from '@/app/api/session/route'

export async function POST(request: NextRequest) {
  const session = await getSession()
  const body = await request.json()

  try {
    if (session.isLoggedIn) {
      const params = {
        headers: {
          Authorization: `Bearer ${body.token}`,
          'Content-Type': 'application/json'
        }
      }

      const r = await axios('user/me', params)

      if (r.data.success) {
        session.user = r.data.data
        await session.save()

        return Response.json(session.user)
      }
    }

    return Response.json({ success: false })
  } catch (error) {
    throw error
  }
}
