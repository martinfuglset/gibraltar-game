import "./globals.css";


export const metadata = {
  title: "Gibraltar Game",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Font Import for Stardos Stencil */}
        <link
          href="https://fonts.googleapis.com/css2?family=Stardos+Stencil:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-stardos">
        {children}
      </body>
    </html>
  );
}
