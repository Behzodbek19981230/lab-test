import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

import { getIronSession } from 'iron-session'

import type { SessionData } from './lib'
import { defaultSession, sessionOptions } from './lib'
import { data } from '@/data/users'

export async function getSession() {
  // @ts-ignore
  return await getIronSession<SessionData>(cookies(), sessionOptions)
}

export async function clearSession() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions)

  // Clear the session data
  session.destroy()

  // Save the session to remove the cookie
  await session.save()
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession()
    const data1 = await request.json()
    const user = data.find(itm => itm.username == data1.username && itm.password == data1.password)

    // const _res = await axios('test', {
    //   method: 'POST',
    //   data
    // })
    const _res = {
      data: {
        data: {
          token: 'test_token_1',
          ...data
        }
      }
    }

    if (_res.data?.data?.token) {
      session.isLoggedIn = true
      session.user = user ?? null
      await session.save()
    }

    return Response.json({ session: { isLoggedIn: session.isLoggedIn, user: { ...user, role: user?.role } } })
  } catch (error: any) {
    throw error
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getSession()
    const action = new URL(request.url).searchParams.get('action')

    if (action === 'logout') {
      await clearSession()
    }

    if (session.isLoggedIn !== true) {
      return NextResponse.json(defaultSession)
    }

    return NextResponse.json(session)
  } catch (error) {
    throw error
  }
}
