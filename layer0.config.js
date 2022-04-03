// This file was automatically added by layer0 deploy.
// You should commit this file to source control.
module.exports = {
  team: 'layer0-docs',
  connector: '@layer0/next',
  backends: {
    image: {
      domainOrIp: 'static.tvmaze.com',
      hostHeader: 'static.tvmaze.com',
      disableCheckCert: process.env.DISABLE_CHECK_CERT || true,
    },
  },
}
