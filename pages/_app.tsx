import '@/styles/globals.css'
import type { AppProps } from 'next/app'

// 1. Import `createTheme`
import { NextUIProvider } from "@nextui-org/react"

import { DarkTheme } from '@/themes'

export default function App({ Component, pageProps }: AppProps) {
  return (
    // 2. Use at the root of your app
    <NextUIProvider theme={DarkTheme}>
      <Component {...pageProps} />
    </NextUIProvider>
  );
}
