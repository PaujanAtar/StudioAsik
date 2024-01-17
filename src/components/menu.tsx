import styles from "@/styles/Menu.module.css"
import Link from "next/link"
import Image from "next/image"

const Menu = ({ setVis }: any) => {
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
    {
      title: "career",
      link: "/career",
    },
  ]
  return (
    <div className={styles.menu}>
      <div className={styles.container}>
        <button className={styles.x} onClick={() => setVis(false)}>
          <img src="/Icons/x.svg" alt="close" />
        </button>
        <div className={styles.menuContainer}>
          <div className={styles.column1}>
            <img src="/Logo Studio Asa White.svg" alt="Logo" />
            <h1>Gudang Selatan No 22 - Gudang B</h1>
            <h1>
              <b>Bandung</b>
            </h1>
            <h1>+62 8123 4324 53</h1>
            <h1>
              <u>contact@mail.com</u>
            </h1>
          </div>
          <div className={styles.column2}>
            <nav>
              {pages.map((page: any, i: any) => (
                <Link href={page.link} key={i}>
                  {page.title}
                </Link>
              ))}
            </nav>
          </div>
          <div className={styles.column3}>
            <h1>Send a message</h1>
            <form>
              <input type="text" placeholder="Name" />
              <input type="text" placeholder="Email" />
              <input type="text" placeholder="Phone Number" />
              <input type="text" placeholder="Message" />
              <input type="submit" value="Send to Whatsapp" />
            </form>
          </div>
        </div>
      </div>
      {/*------------------------------------------------------------------------------ */}
      <div className={styles.containerAlt}>
        <div className={styles.row1}>
          <img src="/Logo Studio Asa White.svg" alt="Logo" />
          <button className={styles.xAlt} onClick={() => setVis(false)}>
            <img src="/Icons/x.svg" alt="close" />
          </button>
        </div>
        <div className={styles.row2}>
          <nav>
            {pages.map((page: any, i: any) => (
              <Link href={page.link} key={i}>
                {page.title}
              </Link>
            ))}
          </nav>
        </div>
        <div className={styles.row3}>
          <div className={styles.archdailyMenu}>
            <a href="https://www.archdaily.com/">
              <Image
                src="/Icons/arch daily white.png"
                alt="arch daily"
                width={44}
                height={44}
              />
            </a>
          </div>
          <a href="https://id-id.facebook.com/">
            <Image
              src="/Icons/facebook white.svg"
              alt="facebook"
              width={44}
              height={44}
            />
          </a>
          <a href="https://www.instagram.com/">
            <Image
              src="/Icons/instagram white.svg"
              alt="instagram"
              width={44}
              height={44}
            />
          </a>
        </div>
        <div className={styles.row4}>
          <h1>Gudang Selatan No 22 - Gudang B</h1>
          <h1>
            <b>Bandung</b>
          </h1>
          <h1>+62 8123 4324 53</h1>
          <h1>
            <u>contact@mail.com</u>
          </h1>
        </div>
        <div className={styles.row5}>
          <a href="https/whatsapp.com">Whatsapp</a>
        </div>
      </div>
    </div>
  )
}

export default Menu
