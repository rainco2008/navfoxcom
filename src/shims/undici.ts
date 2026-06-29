export class Agent {
  constructor(_options?: unknown) {}
}

export const fetch: typeof globalThis.fetch = (input, init) => globalThis.fetch(input, init)
