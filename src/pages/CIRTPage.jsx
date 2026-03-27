import { useEffect } from "react"

export default function CIRTPage() {
  useEffect(() => {
    window.location.replace("https://www.cirt.org.bw/about")
  }, [])

  return null
}
