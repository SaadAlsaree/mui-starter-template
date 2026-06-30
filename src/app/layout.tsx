// Root layout — required by Next.js, delegates to [locale] layout
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
