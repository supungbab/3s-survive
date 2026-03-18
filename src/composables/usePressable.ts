import { useAudio } from './useAudio'

export function usePressable(action: () => void) {
  const { playTick } = useAudio()
  let timer: ReturnType<typeof setTimeout> | null = null

  return {
    onClick: (e: MouseEvent) => {
      const el = e.currentTarget as HTMLElement
      if (timer) clearTimeout(timer)
      el.classList.add('active')
      timer = setTimeout(() => el.classList.remove('active'), 150)
      playTick()
      action()
    },
  }
}
