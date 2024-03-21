import Head from "next/head"
import styles from "@/styles/Project.module.css"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Link from "next/link"

export const getServerSideProps = async (context: any) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STUDIOASA}kategori-project?per_page=100`
  )

  const data = await res.json()

  const api = data?.filter(
    (val: any) =>
      val.parent === 0 && val.name !== "Team" && val.name !== "featured"
  )

  const name = api.map((ids: any) => ids.name)

  const id = api.map((ids: any) => ids.id)

  const mergedData = name.map((name: any, index: any) => ({
    name,
    id: id[index],
  }))

  const url = api.filter((val: any) => val.name === context.query.filter)

  let urlData

  if (url.length !== 0) {
    urlData = {
      id: url[0].id,
      filter: url[0].name,
      param: "&kategori-project=",
    }
  } else {
    urlData = {
      id: null,
      filter: null,
      param: null,
    }
  }

  return {
    props: { api: mergedData, url: urlData },
  }
}

const Project = ({ api, url }: { api: any; url: any }) => {
  const [filter, setFilter] = useState<any[]>(url.filter ? [url.filter] : [])

  const [visible, setVisible] = useState(false)

  const [param, setParam] = useState<any>(url.param || "")

  const [id, setId] = useState<any[]>(url.id ? [url.id] : [])

  const [sort, setSort] = useState<any>(["desc"])

  const [data, setData] = useState<any>()

  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `${
          process.env.NEXT_PUBLIC_STUDIOASA
        }project?page=1&per_page=100&_embed=true&order=${sort}${param}${id.join(
          ","
        )}`
      )

      const api = await res.json()

      setData(api)
    }

    fetchData()
  }, [param, id, filter, sort])

  return (
    <>
      <Head>
        <title>Project - Studio Asa</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Logo Studio Asa.svg" />
      </Head>

      {visible && (
        <div className={styles.popupContainer}>
          <div className={styles.filterPopup}>
            <div className={styles.pageHeader}>
              <h1>FILTER</h1>
              <button
                onClick={() => {
                  setFilter([])
                  setId([])
                  setParam([])
                  router.push(`/project/`, undefined, {
                    shallow: true,
                  })
                }}
              >
                RESET
              </button>
            </div>
            <div className={styles.pageFilter}>
              <form>
                {api?.map((cats: any, i: any) => (
                  <div key={i}>
                    <input
                      type="checkbox"
                      name="filter"
                      checked={
                        filter.includes(cats.name) ||
                        router.query.filter === cats.name
                      }
                      onChange={() => {
                        if (filter.includes(cats.name)) {
                          // If category is in the array, remove it
                          setFilter((prevFilter) =>
                            prevFilter.filter((item) => item !== cats.name)
                          )
                          setId((prevId) =>
                            prevId.filter((item) => item !== cats.id)
                          )
                          if (id.length === 1) {
                            setParam("")
                            router.push("/project/", undefined, {
                              shallow: true,
                            })
                          }
                        } else {
                          // If category is not in the array, add it
                          setFilter([...filter, cats.name])
                          setId([...id, cats.id])
                          if (id.length === 0) {
                            console.log(cats.name)
                            setParam("&kategori-project=")
                            router.push(
                              `/project/?filter=${[cats.name]}`,
                              undefined,
                              {
                                shallow: true,
                              }
                            )
                          }
                        }
                      }}
                      id={i}
                    />
                    <label htmlFor={i}>{cats.name}</label>
                    {i === 2 && <hr />}
                  </div>
                ))}
              </form>
            </div>
          </div>
          <div className={styles.done}>
            <button onClick={() => setVisible(false)}>DONE</button>
          </div>
        </div>
      )}

      <div className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <h1 onClick={() => console.log(filter, id, param)}>
              Curated Projects
            </h1>
            <p className={styles.p}>
              At Studio ASA, we approach each project with a commitment to
              understanding our clients&apos; unique vision and needs. Our team
              of experts in architecture, interior design, and landscape design
              works collaboratively to create functional and beautiful living
              spaces that reflect the harmony between humans and nature. Our
              design philosophy, based on Biophilic Design, emphasizes the
              importance of integrating green spaces to enhance well-being.
              Browse our portfolio to see our innovative and personalized
              approach to residential and commercial projects.
            </p>
            <p className={styles.pAlt}>
              Lorem ipsum dolor sit amet consectetur. Aliquet amet viverra
            </p>
          </div>
        </div>
      </div>

      {/* --------------------------------------------------------------------------- */}

      <div className={styles.project}>
        <div className={styles.container}>
          {/* --------------------------------------------------------------------------- */}

          <div className={styles.filterButton}>
            <button onClick={() => setVisible(true)}>
              <img src="/Icons/tune.svg" alt="filter" />
              FILTER
              {filter.length !== 0 && (
                <div className={styles.filterAlt}>{filter.length}</div>
              )}
            </button>
          </div>

          {/* --------------------------------------------------------------------------- */}

          <div className={styles.listContainer}>
            <div className={styles.sidebar}>
              <form>
                {api?.map((cats: any, i: any) => (
                  <div key={i}>
                    <input
                      type="checkbox"
                      name="filter"
                      checked={
                        filter.includes(cats.name) ||
                        router.query.filter === cats.name
                      }
                      onChange={() => {
                        if (filter.includes(cats.name)) {
                          // If category is in the array, remove it
                          setFilter((prevFilter) =>
                            prevFilter.filter((item) => item !== cats.name)
                          )
                          setId((prevId) =>
                            prevId.filter((item) => item !== cats.id)
                          )
                          setParam("")
                          router.push("/project/", undefined, {
                            shallow: true,
                          })
                          if (id.length === 1) {
                          }
                        } else {
                          // If category is not in the array, add it
                          setFilter([...filter, cats.name])
                          setId([...id, cats.id])
                          if (id.length === 0) {
                            console.log(cats.name)
                            setParam("&kategori-project=")
                            router.push(
                              `/project/?filter=${[cats.name]}`,
                              undefined,
                              {
                                shallow: true,
                              }
                            )
                          }
                        }
                      }}
                      id={i}
                    />
                    <label htmlFor={i}>{cats.name}</label>
                    {i === 2 && <hr />}
                  </div>
                ))}
              </form>
            </div>

            {/* --------------------------------------------------------------------------- */}

            <div className={styles.right}>
              {/* --------------------------------------------------------------------------- */}

              <div className={styles.filterContainer}>
                <div className={styles.containerButton}>
                  {filter?.map((checkbox: any, i: any) => (
                    <div className={styles.filter} key={i}>
                      {checkbox}
                      <button
                        onClick={() => {
                          // Find the index of the checkbox in the filter array
                          const filterIndex = filter.indexOf(checkbox)

                          if (filterIndex !== -1) {
                            // If the checkbox is found in the array, remove it
                            setFilter((prevFilter) => {
                              const newFilter = [...prevFilter]
                              newFilter.splice(filterIndex, 1)
                              return newFilter
                            })

                            router.push("/project/", undefined, {
                              shallow: true,
                            })

                            // Remove the corresponding ID using the filterIndex
                            setId((prevId) => {
                              const testId = prevId
                              /* console.log(testId, testId) */
                              testId.splice(filterIndex, 1)
                              return testId
                            })
                          }

                          if (id.length === 1) {
                            setParam("")
                          }
                        }}
                      >
                        <img src="/Icons/close.svg" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className={styles.containerDropdown}>
                  <div className={styles.filterSort}>
                    <label>Sort by: </label>
                    <select
                      name="sort"
                      id="sort"
                      onChange={(event) => {
                        const selectedValue = event.target.value

                        // Set sort based on the selected option
                        if (selectedValue === "newest") {
                          setSort("desc")
                        } else if (selectedValue === "oldest") {
                          setSort("asc")
                        }
                      }}
                    >
                      <option value="newest">Newest</option>
                      <option value="oldest">Oldest</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* --------------------------------------------------------------------------- */}

              <div className={styles.list}>
                {data?.map((project: any, i: any) => (
                  <div className={styles.card} key={i}>
                    <h2>PROJECTS</h2>
                    <Link href={"/project/" + project.slug}>
                      <h1
                        dangerouslySetInnerHTML={{
                          __html: project.title.rendered,
                        }}
                      />
                      <img
                        src={
                          project._embedded["wp:featuredmedia"][0].source_url
                        }
                        alt="projects"
                      />
                    </Link>
                  </div>
                ))}
              </div>

              {/* --------------------------------------------------------------------------- */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Project
