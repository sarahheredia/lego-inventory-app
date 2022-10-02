/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  serverRuntimeConfig: {
    googleServiceKey: process.env.GOOGLE_SERVICE_KEY,
    spreadsheetId: process.env.SPREADSHEET_ID,
    rebrickableApiKey: process.env.REBRICKABLE_API_KEY,
  },
  publicRuntimeConfig: {
    basePath: `http${process.env.VERCEL_ENV === 'development' ? '' : 's'}://${process.env.VERCEL_URL}`,
  },
}

module.exports = nextConfig
