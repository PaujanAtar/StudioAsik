import Navbar from "./navbar"
import Footer from "./footer"

const Layout = ({
  children,
  setVis,
  className,
}: {
  children: any
  setVis: any
  className: any
}) => {
  return (
    <div className={className}>
      <Navbar setVis={setVis} />
      {children}
      <Footer />
    </div>
  )
}

export default Layout
