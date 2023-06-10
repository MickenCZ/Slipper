import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <meta name="description" content="Social media app slipper" />
        <link rel="icon" href="/logo.png" />
        <meta name="author" content="MickenCZ" />
        <meta name="keywords" content="social media app slipper" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}