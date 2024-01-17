import Image from "next/image"
import Link from "next/link"

const Footer = () => {
  const pages = [
    { title: "about", link: "/about" },
    { title: "client", link: "" },
    { title: "project", link: "/project" },
    { title: "insight", link: "/insight" },
    { title: "contact", link: "/about#contact" },
    { title: "career", link: "/career" },
  ]

  return (
    <div className="footer">
      <div className="footerContent">
        <div className="footerTitle">
          <Image
            src="/Logo Studio Asa.svg"
            alt="Logo Studio Asa"
            width={90}
            height={72}
          />
          <h1>Unity of Nature towards Design for Human & Space</h1>
        </div>
        <div className="footerNav">
          <nav>
            {pages.map((page: any, i: any) => (
              <Link key={i} href={page.link}>
                {page.title}
              </Link>
            ))}
          </nav>
          <div className="footerSocial">
            <div className="archdaily">
              <a href="https://www.archdaily.com/">
                <Image
                  src="/Icons/arch daily.png"
                  alt="arch daily"
                  width={44}
                  height={44}
                />
              </a>
            </div>
            <a href="https://id-id.facebook.com/">
              <Image
                src="/Icons/facebook.svg"
                alt="facebook"
                width={44}
                height={44}
              />
            </a>
            <a href="https://www.instagram.com/">
              <Image
                src="/Icons/instagram.svg"
                alt="instagram"
                width={44}
                height={44}
              />
            </a>
          </div>
        </div>
        <div className="footerContact">
          <h1>Gudang Selatan No 22 - Gudang B</h1>
          <h1>
            <b>Bandung</b>
          </h1>
          <h1>+62 8123 4324 53</h1>
          <h1>
            <u>contact@mail.com</u>
          </h1>
        </div>
      </div>
    </div>
  )
}

export default Footer
