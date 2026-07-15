/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Spotify album artwork, used by the "Now playing" card once
      // SPOTIFY_* credentials are configured.
      { protocol: 'https', hostname: 'i.scdn.co' },
    ],
  },
}
module.exports = nextConfig
