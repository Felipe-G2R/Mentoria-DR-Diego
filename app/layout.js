import { Analytics } from "@vercel/analytics/next"
import './globals.css'

export const metadata = {
  title: 'Mentoria 3.0 - NextLevel Formed',
  description: 'Transforme sua carreira com mentoria especializada.',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body style={{ margin: 0, padding: 0, overflowX: 'hidden' }}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
