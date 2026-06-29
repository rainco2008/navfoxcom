function sanitizePrefix(prefix = '') {
  return prefix
    .replaceAll('\\', '/')
    .split('/')
    .filter(Boolean)
    .join('/')
}

function sanitizeFilename(filename: string) {
  return filename
    .replaceAll('\\', '-')
    .replaceAll('/', '-')
    .replace(/[^\w.\-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

export function getFileKey({
  collectionPrefix,
  docPrefix,
  filename,
  useCompositePrefixes = false,
}: {
  collectionPrefix?: string
  docPrefix?: string
  filename: string
  useCompositePrefixes?: boolean
}) {
  const sanitizedCollectionPrefix = sanitizePrefix(collectionPrefix)
  const sanitizedDocPrefix = sanitizePrefix(docPrefix)
  const sanitizedFilename = sanitizeFilename(filename)
  const prefix = useCompositePrefixes
    ? [sanitizedCollectionPrefix, sanitizedDocPrefix].filter(Boolean).join('/')
    : sanitizedDocPrefix || sanitizedCollectionPrefix
  const fileKey = [prefix, sanitizedFilename].filter(Boolean).join('/')

  return {
    fileKey,
    sanitizedCollectionPrefix,
    sanitizedDocPrefix,
    sanitizedFilename,
  }
}

export async function resolveSignedURLKey({
  collectionPrefix = '',
  docPrefix,
  filename,
  useCompositePrefixes = false,
}: {
  collectionPrefix?: string
  collectionSlug: string
  docPrefix?: string
  filename: string
  req: unknown
  useCompositePrefixes?: boolean
}) {
  const { fileKey, sanitizedDocPrefix, sanitizedFilename } = getFileKey({
    collectionPrefix,
    docPrefix,
    filename,
    useCompositePrefixes,
  })

  return { fileKey, sanitizedDocPrefix, sanitizedFilename }
}

export async function getFilePrefix({
  clientUploadContext,
  collection,
  filename,
  prefixQueryParam,
  req,
}: {
  clientUploadContext?: unknown
  collection?: {
    slug: string
    upload?: {
      imageSizes?: Array<{ name: string }>
    }
  }
  filename: string
  prefixQueryParam?: unknown
  req: {
    payload: {
      find: (args: unknown) => Promise<{ docs?: Array<{ prefix?: string }> }>
    }
  }
}) {
  if (typeof prefixQueryParam === 'string') {
    return sanitizePrefix(prefixQueryParam)
  }

  if (
    clientUploadContext &&
    typeof clientUploadContext === 'object' &&
    'prefix' in clientUploadContext &&
    typeof clientUploadContext.prefix === 'string'
  ) {
    return sanitizePrefix(clientUploadContext.prefix)
  }

  if (!collection) {
    return ''
  }

  const imageSizes = collection.upload?.imageSizes || []
  const files = await req.payload.find({
    collection: collection.slug,
    depth: 0,
    draft: true,
    limit: 1,
    pagination: false,
    where: {
      or: [
        {
          filename: {
            equals: filename,
          },
        },
        ...imageSizes.map((imageSize) => ({
          [`sizes.${imageSize.name}.filename`]: {
            equals: filename,
          },
        })),
      ],
    },
  })
  const prefix = files.docs?.[0]?.prefix

  return prefix ? sanitizePrefix(prefix) : ''
}

export function initClientUploads() {}
