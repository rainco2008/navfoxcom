import { withPayload } from '@payloadcms/next/withPayload'
import path from 'path'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    localPatterns: [
      {
        pathname: '/api/media/file/**',
      },
    ],
  },
  // Packages with Cloudflare Workers (workerd) specific code
  // Read more: https://opennext.js.org/cloudflare/howtos/workerd
  serverExternalPackages: ['jose', 'pg-cloudflare'],

  // Your Next.js config here
  webpack: (webpackConfig: any, { webpack }: any) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    webpackConfig.resolve.alias = {
      ...(webpackConfig.resolve.alias || {}),
      '@payloadcms/plugin-cloud-storage/utilities': path.resolve(
        './src/shims/cloud-storage-utilities.ts',
      ),
      'pino-pretty': path.resolve('./src/shims/pino-pretty.ts'),
      undici: path.resolve('./src/shims/undici.ts'),
    }

    webpackConfig.resolve.fallback = {
      ...(webpackConfig.resolve.fallback || {}),
      async_hooks: false,
      diagnostics_channel: false,
      dns: false,
      net: false,
      sqlite: false,
      tls: false,
      worker_threads: false,
    }

    webpackConfig.plugins.push(
      new webpack.NormalModuleReplacementPlugin(/^node:/, (resource: { request: string }) => {
        resource.request = resource.request.replace(/^node:/, '')
      }),
    )

    return webpackConfig
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
