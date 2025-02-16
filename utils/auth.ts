const FIREBASE_API_KEY = process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY || ''

export async function verifyFirebaseToken(idToken: string) {
  try {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${FIREBASE_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken }),
      }
    )

    if (!response.ok) {
      throw new Error(
        `Firebase token verification failed: ${response.statusText}`
      )
    }

    const data = await response.json()
    return data.users?.[0] || null
  } catch (error) {
    console.error('Firebase token verification failed:', error)
    return null
  }
}
