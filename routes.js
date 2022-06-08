import { nextRoutes } from '@layer0/next'
import { Router } from '@layer0/core/router'
import getPathsToPrerender from 'prerenderRequests'
import { assetCache, NEXT_CACHE_HANDLER } from './cache.js'

export default new Router()
  // Pre-render the static home page
  // By pre-rendering, once the project is deployed
  // the set of links are visited to warm the cache
  // for future visits (expected to be the first view for real users)
  // More on static prerendering: https://docs.layer0.co/guides/static_prerendering
  .prerender(getPathsToPrerender)

  // Serve service worker
  .get('/service-worker.js', ({ serviceWorker }) => {
    serviceWorker('.next/static/service-worker.js')
  })

  // Cache static assets
  .match('/assets/:file', ({ cache, serveStatic }) => {
    cache(assetCache)
    serveStatic('public/assets/:file')
  })
  .match('/image/:path*', ({ cache, setResponseHeader, proxy }) => {
    cache(assetCache)
    setResponseHeader('cache-control', 'public, max-age=86400')
    proxy('image', { path: ':path*' })
  })
  .match('/_next/image/:path*', ({ cache, setResponseHeader, removeUpstreamResponseHeader }) => {
    removeUpstreamResponseHeader('set-cookie')
    setResponseHeader('cache-control', 'public, max-age=86400')
    cache(assetCache)
  })

  // Cache API calls for faster transitions
  .match('/_next/data/:build/index.json', NEXT_CACHE_HANDLER)
  .match('/_next/data/:build/show/:name.json', NEXT_CACHE_HANDLER)

  // Default Next.js Routes
  .use(nextRoutes)
