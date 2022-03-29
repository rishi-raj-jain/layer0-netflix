import { nextRoutes } from '@layer0/next'
import { Router } from '@layer0/core/router'
import { assetCache, NEXT_CACHE_HANDLER, SSR_CACHE_HANDLER } from './cache.js'

export default new Router()
  // Serve service worker
  .get('/service-worker.js', ({ serviceWorker }) => {
    return serviceWorker('.next/static/service-worker.js')
  })
  .get('/_next/server/middleware-manifest.json', ({ serveStatic }) => {
    serveStatic('.next/server/middleware-manifest.json')
  })

  // Cache SSR HTML
  .match('/', SSR_CACHE_HANDLER)
  .match('/show/:path*', SSR_CACHE_HANDLER)

  // Cache static assets
  .match('/fonts/:file', ({ cache, serveStatic }) => {
    cache(assetCache)
    serveStatic('public/fonts/:file')
  })
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

  // Cache API calls
  .match('/_next/data/:build/index.json', NEXT_CACHE_HANDLER)
  .match('/_next/data/:build/show/:name.json', NEXT_CACHE_HANDLER)

  // Default Next.js Routes
  .use(nextRoutes)
