import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const Navbar = ({ setVis }: any) => {
  const router = useRouter()

  const [scrolling, setScrolling] = useState(false)

  useEffect(() => {
    if (router.pathname !== "/") {
      setScrolling(true)
    } else {
      setScrolling(false)
      const handleScroll = () => {
        // You can customize the scroll threshold based on your needs
        const isScrolling = window.scrollY > 720
        setScrolling(isScrolling)
      }

      // Attach the event listener when the component mounts
      window.addEventListener("scroll", handleScroll)

      // Clean up the event listener when the component unmounts
      return () => {
        window.removeEventListener("scroll", handleScroll)
      }
    }
  }, [router.pathname]) // The empty dependency array ensures that the effect runs only once on mount

  const pages = [
    {
      title: "about",
      link: "/about",
    },
    {
      title: "project",
      link: "/project",
    },
    {
      title: "insight",
      link: "/insight",
    },
    {
      title: "contact",
      link: "/about#contact",
    },
  ]

  return (
    <div className={scrolling ? "navbar" : "navbarAlt"}>
      <div className="navbarContent">
        <button className="navbarLogo">
          <Link href="/">
            <img
              src={
                scrolling
                  ? "/Logo Studio Asa.svg"
                  : "/Logo Studio Asa White.svg"
              }
              alt="Logo Studio Asa"
              width={127}
              height={72}
            />
          </Link>
        </button>
        <nav>
          {pages.map((page: any, i: any) => (
            <Link key={i} href={page.link}>
              {page.title}
            </Link>
          ))}
        </nav>
        <button className="navBarPopupButton" onClick={() => setVis(true)}>
          <img
            src={
              scrolling
                ? "/Icons/PopupButtonBlack.svg"
                : "/Icons/PopupButtonWhite.svg"
            }
            alt="Pop-up Button"
          />
        </button>
      </div>
    </div>
  )
}

export default Navbar
