// This file was automatically added by layer0 init.
// You should commit this file to source control.
const { withLayer0, withServiceWorker } = require('@layer0/next/config')

module.exports = () =>
  withLayer0(
    withServiceWorker({
      // With latest Next.js using the target: 'server'
      // More on: https://docs.layer0.co/guides/next#nextjs-12-with-server-target-deprecations
      target: 'server',
      // Layer0 Source Maps for debugging
      // More on Layer0 Source Maps
      // https://docs.layer0.co/guides/next#withlayer0
      layer0SourceMaps: true,
      // For image optimization using Next.js Image's component
      // Read more on: https://nextjs.org/docs/basic-features/image-optimization
      images: {
        domains: ['localhost', 'demos-layer0-netflix-default.layer0-limelight.link'],
      },
      // Disable Layer0 Devtools that are added
      // by default with a Next.js app in production
      // To be documented in Layer0 docs
      // disableLayer0DevTools: true
    })
  )
