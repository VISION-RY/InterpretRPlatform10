// app/layout.tsx

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* You can add global meta tags or links to stylesheets here */}
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
