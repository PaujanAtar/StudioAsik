import Head from "next/head"
import styles from "@/styles/Home.module.css"
import Link from "next/link"
import { useState, useEffect } from "react"

export const getStaticProps = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STUDIOASA}project?per_page=60&_embed`
  )
  const data = await res.json()

  const latest = data.slice(0, 3)

  const filterGallery = (projects: any) => {
    const galeri = projects.galeri
    return galeri.split(",")
  }

  const ids: any[][] = latest.map((project: any) => {
    return filterGallery(project).slice(0, 1)
  })

  const results: string[][] = ids.map((latestId: string[]) => {
    return [
      `${process.env.NEXT_PUBLIC_STUDIOASA}media?include=${latestId.join(",")}`,
    ]
  })

  const fetchPromise = results.map(async (url) => {
    // Fetch each URL individually
    const response = await fetch(url[0])

    return await response.json()
  })

  const latestGallery = await Promise.all(fetchPromise).then((dataArray) => {
    return dataArray
  })

  const latestGalleries = latestGallery.map((urls: any) => {
    return urls.map((url: any) => url.source_url)
  })

  const latestImages = latestGalleries.map((images: any, index: any) => {
    const projectData = latest[index]

    return {
      ...projectData,
      images,
    }
  })

  /* --------------------------------------------------------------------------- */

  const filtered = data.filter((filter: any) => {
    return filter.highlight === "true"
  })

  // Function to extract galleries from a project
  const galer = (project: any) => {
    const galeri = project.galeri
    return galeri.split(",")
  }

  // Extract galleries from the filtered data
  const id: any[][] = filtered.map((project: any) => {
    return galer(project).slice(0, 5)
  })

  const result: string[][] = id.map((innerId: string[]) => {
    return [
      `${process.env.NEXT_PUBLIC_STUDIOASA}media?include=${innerId.join(",")}`,
    ]
  })

  const fetchPromises = result.map(async (url) => {
    // Fetch each URL individually
    const response = await fetch(url[0])

    return await response.json()
  })

  const promises = await Promise.all(fetchPromises).then((dataArray) => {
    return dataArray
  })

  const highlightData = promises?.map((urls: any) => {
    return urls.map((url: any) => url.source_url)
  })

  const mergedData = highlightData.map((images: any, index: any) => {
    const projectData = filtered[index]

    return {
      ...projectData,
      images,
    }
  })

  /* --------------------------------------------------------------------------- */

  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_STUDIOASA}kategori-project?per_page=100`
  )
  const datap = await resp.json()

  return {
    props: {
      highlights: data,
      kategori: datap,
      carousel: mergedData,
      latest: latestImages,
    },
  }
}

export default function Home({
  highlights,
  kategori,
  carousel,
  latest,
}: {
  highlights: any
  kategori: any
  carousel: any
  latest: any
}) {
  const projects = [
    {
      image: "/Homepage/projectimage.jpeg",
      title: "Garden Design",
      project: "15",
      city: "15",
    },
    {
      image: "/Homepage/projectimageArchitecture.jpeg",
      title: "Garden Design",
      project: "15",
      city: "15",
    },
    {
      image: "/Homepage/projectimage.jpeg",
      title: "Garden Design",
      project: "15",
      city: "15",
    },
    {
      image: "/Homepage/projectimageCommercial.jpeg",
      title: "Commerce",
      project: "15",
      city: "15",
    },
    {
      image: "/Homepage/projectimage.jpeg",
      title: "Commerce",
      project: "15",
      city: "15",
    },
    {
      image: "/Homepage/projectimageGardenDesign.jpeg",
      title: "Garden Design",
      project: "15",
      city: "15",
    },
    {
      image: "/Homepage/projectimageInteriorDesign.jpeg",
      title: "Garden Design",
      project: "15",
      city: "15",
    },
    {
      image: "/Homepage/projectimage.jpeg",
      title: "Garden Design",
      project: "15",
      city: "15",
    },
    {
      image: "/Homepage/projectimageI.jpeg",
      title: "Garden Design",
      project: "15",
      city: "15",
    },
    {
      image: "/Homepage/projectimageOffice.jpeg",
      title: "Garden Design",
      project: "15",
      city: "15",
    },
    {
      image: "/Homepage/projectimageResidential.jpeg",
      title: "Garden Design",
      project: "15",
      city: "15",
    },
    {
      image: "/Homepage/projectimageRetail.jpeg",
      title: "Garden Design",
      project: "15",
      city: "15",
    },
  ]

  const [index, setIndex] = useState(0)

  const [currentIndex, setCurrentIndex] = useState({ i: 0, j: 0 })

  useEffect(() => {
    const timer = setInterval(() => {
      setGaleri((prevGaleri) => {
        const newJ = (prevGaleri[currentIndex.i]?.child + 1) % 5
        const newI =
          newJ === 0 ? (currentIndex.i + 1) % carousel.length : currentIndex.i

        const newGaleri = [...prevGaleri]
        newGaleri[currentIndex.i] = { parent: currentIndex.i, child: newJ }

        setCurrentIndex({ i: newI, j: newJ })
        return newGaleri
      })
    }, 3000)

    // Clear the interval when the component unmounts
    return () => clearInterval(timer)
  }, [currentIndex, carousel.length])

  const [galeri, setGaleri] = useState<
    Array<{ parent: number; child: number }>
  >(Array.from({ length: carousel.length }, () => ({ parent: 0, child: 0 })))

  return (
    <>
      <Head>
        <title>Studio Asu</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Logo Studio Asa.svg" />
      </Head>

      {/* --------------------------------------------------------------------------- */}

      <div className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroHeader}>
            <h1>Unity of Nature towards Design for Human & Space.</h1>
            <h5>#ArchitectureWithinNature</h5>
          </div>
          <div className={styles.heroHeaderAlt}>
            <h1>Human, Space, & Nature.</h1>
            <h5>Unity of nature towards design for human and space</h5>
          </div>
          <Link href="/project" className={styles.button}>
            Our Latest Project <img src="/Icons/arrow_outward.svg" alt="" />
          </Link>
        </div>
      </div>

      {/* --------------------------------------------------------------------------- */}

      <div className={styles.highlight}>
        <div className={styles.container}>
          <div className={styles.highlightTitle}>
            <h1>Highlight Projects</h1>
          </div>
          <div className={styles.highlightCardContainer}>
            {carousel?.map((highlight: any, i: any) => {
              if (highlight.highlight === "true") {
                return (
                  <div
                    key={i}
                    className={styles.highlightCard}
                    id={highlight.id}
                  >
                    <div className={styles.imageContainer}>
                      <img
                        src={highlight.images[galeri[i].child]}
                        alt={i.toString()}
                      />
                      <div className={styles.carouselHighlight}>
                        {highlights.slice(0, 5).map((carousel: any, j: any) => (
                          <div
                            key={j}
                            className={
                              galeri[i].child === j
                                ? styles.carouselIndicatorsActive
                                : styles.carouselIndicators
                            }
                            onClick={() => {
                              setGaleri((prevGaleri) => {
                                const newGaleri = [...prevGaleri]
                                newGaleri[i] = { parent: i, child: j }
                                return newGaleri
                              })
                            }}
                          ></div>
                        ))}
                      </div>
                    </div>
                    <h3>{highlight.location}</h3>
                    <h1>{highlight.title.rendered}</h1>
                    <h2>{highlight._embedded["wp:term"][1][0].name}</h2>
                  </div>
                )
              } else return null
            })}
          </div>
        </div>
      </div>

      {/* --------------------------------------------------------------------------- */}

      <div className={styles.slideshow}>
        <div className={styles.containerSlideshow}>
          <div className={styles.main}>
            <img
              src={latest[index]._embedded["wp:featuredmedia"][0].source_url}
              alt="highlight"
            />
          </div>
          <div className={styles.secondary}>
            <div className={styles.secondaryTexts}>
              <h2>GARDEN DESIGN, RESIDENTIAL</h2>
              <h1
                style={{ textTransform: "uppercase" }}
                dangerouslySetInnerHTML={{
                  __html: latest[index].title.rendered,
                }}
              />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
                nisi dolore natus, modi blanditiis dolor suscipit voluptatibus
                temporibus similique dicta! Dolorem facilis sequi quisquam iure,
                ipsa natus! Suscipit, debitis perspiciatis?
              </p>
            </div>
            <div className={styles.highlightImageContainer}>
              <img src={latest[index].images[0]} alt="highlight" />
              <button
                onClick={() => {
                  if (index < 2) {
                    setIndex(index + 1)
                  } else if (index === 2) {
                    setIndex(0)
                  }
                }}
              >
                <img src="/Homepage/nextbutton.png" alt="next" />
              </button>
              <div className={styles.carousel}>
                {highlights.slice(0, 3).map((carousel: any, i: any) => (
                  <div
                    key={i}
                    className={
                      index === i
                        ? styles.carouselIndicatorsActiveHighlight
                        : styles.carouselIndicators
                    }
                    onClick={() => {
                      setIndex(i)
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --------------------------------------------------------------------------- */}

      <div className={styles.banner}>
        <div className={styles.container}>
          <div className={styles.bannerContainer}>
            <div className={styles.bannerContent}>
              <h1>Unity of Nature towards Design for Human & Space</h1>
              <Link href={"/about"}>More About Us</Link>
            </div>
          </div>
        </div>
      </div>

      {/* --------------------------------------------------------------------------- */}

      <div className={styles.project}>
        <div className={styles.container}>
          <div className={styles.projectCardContainer}>
            {kategori?.map((project: any, i: any) => {
              const backgroundUrl = projects[i]?.image
              if (
                project?.parent === 0 &&
                project?.name !== "Team" &&
                project?.name !== "featured"
              )
                return (
                  <Link
                    href={`/project?filter=${project.name}`}
                    key={project.id}
                    className={styles.projectCard}
                    style={{
                      background: `url(${backgroundUrl}) 50% / cover no-repeat`,
                      backgroundSize: "cover",
                    }}
                  >
                    <div className={styles.projectTextUpper}>
                      <h1>{project.name}</h1>
                      <div className={styles.projectCardTextLower}>
                        <h6>{project.count} project</h6>
                      </div>
                    </div>
                  </Link>
                )
              else return
            })}
          </div>
        </div>
      </div>

      {/* --------------------------------------------------------------------------- */}

      <div className={styles.lorem}>
        <div className={styles.container}>
          <div className={styles.loremContent}>
            <h1>
              “Lorem ipsum dolor sit amet consectetur. Est risus neque
              scelerisque ut fermentum.”
            </h1>
            <h2>Egghotel</h2>
          </div>
        </div>
      </div>
    </>
  )
}
