import Link from 'next/link'
import '@/styles/globals.css'
import { useEffect } from 'react'
import NextImage from 'next/image'
import { Metrics } from '@layer0/rum'
import { useRouter } from 'next/router'
import Prefetch from '@layer0/react/Prefetch'
import { prefetch } from '@layer0/prefetch/window/prefetch'

new Metrics({ token: '5238fa35-ae29-4984-b516-b2f03e920130' }).collect()

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter()

  useEffect(() => {
    // Register a listener for SW messages to prefetch images
    const { serviceWorker } = navigator
    if (serviceWorker) {
      serviceWorker.addEventListener('message', (event) => {
        if (event.data.action === 'prefetch') {
          prefetch(event.data.url, event.data.as, event.data.options)
        }
      })
    }

    const handleRouteChange = () => {
      if (window.location.href.replace(/\/$/, '') === window.location.origin.replace(/\/$/, '')) {
        window.requestAnimationFrame(() => window.scrollTo(0, window.homeScrollLeave))
      }
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [])

  return (
    <div className="flex w-full flex-col items-center bg-[#181818]">
      <Link passHref href="/">
        <Prefetch>
          <a>
            <div className="flex flex-row items-center justify-center gap-x-2 pt-10">
              <NextImage src={'https://demos-layer0-netflix-default.layer0-limelight.link/assets/layer0.png'} height={39 * 0.8} width={159 * 0.8} />
              <NextImage src={'https://demos-layer0-netflix-default.layer0-limelight.link/assets/plus.png'} height={10 * 0.8} width={10 * 0.8} />
              <NextImage src={'https://demos-layer0-netflix-default.layer0-limelight.link/assets/tvmaze.png'} height={40 * 0.8} width={126.5 * 0.8} />
            </div>
          </a>
        </Prefetch>
      </Link>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
