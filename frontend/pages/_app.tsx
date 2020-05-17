import { AppProps } from 'next/app'
import { useState ,useEffect } from 'react'
import cookie from 'js-cookie';
import { useRouter } from "next/router";
import '../styles/main.scss'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    validateAuthentication()
  }, [])

  async function validateAuthentication() {
    try {
      const accessToken = cookie.get('access_token')
      if (!accessToken) router.push('/lobby', '/lobby')
    } catch (error) {
      console.log(error)
    }
  }

  return <Component {...pageProps} />
}

export default MyApp