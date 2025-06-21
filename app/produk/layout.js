// app/layout.js
export const metadata = {
  title: 'UKM Basket',
  description: 'Dashboard UKM Basket',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  )
}
