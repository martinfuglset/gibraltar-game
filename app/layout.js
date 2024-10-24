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
        <link href="https://fonts.googleapis.com/css2?family=Spline+Sans:wght@300..700&display=swap" rel="stylesheet"></link>
      </head>
      <body className="font-spline">
        {children}
      </body>
    </html>
  );
}
