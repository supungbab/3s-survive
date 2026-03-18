// Shared AudioContext singleton — only created on user gesture
let ctx: AudioContext | null = null

export function getAudioContext(): AudioContext {
  if (!ctx) {
    ctx = new AudioContext()
  }
  return ctx
}

// Call this only from within a user gesture handler (pointerdown, click, etc.)
export async function ensureAudioReady(): Promise<AudioContext> {
  const c = getAudioContext()
  if (c.state === 'suspended') {
    await c.resume()
  }
  return c
}
