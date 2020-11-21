import { useState, useEffect } from "react"
import { useDebouncedCallback } from "use-debounce"

type ReturnType = {
  width: number
}

export const useDevice = (): ReturnType => {
  const [width, setWidth] = useState<number>(window.innerWidth)
  const setDebouncedWidth = useDebouncedCallback(
    () => setWidth(window.innerWidth),
    100
  )

  const handleResize = (): void => setDebouncedWidth.callback()

  useEffect(() => {
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
    // eslint-disable-next-line
  }, [])

  return {
    width,
  }
}
