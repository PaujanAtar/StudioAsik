import "@/styles/globals.css"
import type { AppProps } from "next/app"
import Layout from "@/components/layout"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Menu from "@/components/menu"
import localFont from "next/font/local"

const grotta = localFont({
  src: [
    {
      path: "../assets/Fonts/grotta/Grotta-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../assets/Fonts/grotta/Grotta-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../assets/Fonts/grotta/Grotta-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/Fonts/grotta/Grotta-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/Fonts/grotta/Grotta-Semibold.otf",
      weight: "600",
      style: "normal",
    },
  ],
})

export default function App({ Component, pageProps }: AppProps) {
  const [isRendered, setIsRendered] = useState(false)
  const [visible, setVisible] = useState(false)
  const router = useRouter()
  useEffect(() => {
    setIsRendered(true)
    setVisible(false)
  }, [router])

  if (!isRendered) return null
  return (
    <>
      {visible && <Menu setVis={setVisible} />}
      <Layout setVis={setVisible} className={grotta.className}>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
