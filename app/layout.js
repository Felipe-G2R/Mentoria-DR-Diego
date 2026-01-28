import { Analytics } from "@vercel/analytics/react"

export const metadata = {
  title: 'Mentoria 3.0 - NextLevel Formed',
  description: 'Transforme sua carreira com mentoria especializada.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
