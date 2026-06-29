import React from 'react'
import './styles.css'

export const metadata = {
  description: 'A curated AI tools directory built with Payload and Next.js.',
  title: 'NavFox AI Tools Directory',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
