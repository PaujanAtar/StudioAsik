import Head from "next/head"
import styles from "@/styles/Insight.module.css"
import { useState, useEffect } from "react"
import Link from "next/link"

export const getStaticProps = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STUDIOASA}categories?per_page=100`
  )

  const data = await res.json()

  /* console.log(data) */

  const api = data?.filter(
    (val: any) =>
      val.parent === 0 && val.name !== "Team" && val.name !== "featured"
  )

  /* console.log(api) */

  const name = api.map((ids: any) => ids.name)

  /* console.log(name) */

  const id = api.map((ids: any) => ids.id)
  /* console.log(id) */

  const mergedData = name.map((name: any, index: any) => ({
    name,
    id: id[index],
  }))

  return {
    props: { insights: mergedData },
  }
}

const Insights = ({ insights }: { insights: any }) => {
  const [sort, setSort] = useState<any>(["desc"])

  const [visible, setVisible] = useState(false)

  const [param, setParam] = useState<any>([])

  const [id, setId] = useState<any[]>([])

  const [data, setData] = useState<any>()

  const [key, setKey] = useState<any>("")

  const [word, setWord] = useState<any>("")

  const [topic, setTopic] = useState(false)

  const [msort, setMsort] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STUDIOASA}posts?_embed&page=1&per_page=15&order=${sort}${param}${id}${key}${word}`
      )

      console.log(res)

      const api = await res.json()
      setData(api)
    }
    fetchData()
  }, [param, id, sort, key, word])

  return (
    <>
      <Head>
        <title>Insight - Studio Asa</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Logo Studio Asa.svg" />
      </Head>

      {visible ? (
        <div className={styles.popupContainer}>
          <div className={styles.filterPopup}>
            <div className={styles.pageHeader}>
              <h1>FILTER</h1>
              <button>RESET</button>
            </div>
            <div className={styles.pageFilter}>
              <div className={styles.filterHeader}>
                <h1>Sort by</h1>
                <button
                  onClick={() => {
                    setMsort((prevmsort) => !prevmsort)
                  }}
                >
                  <img src="/Icons/dropdown.svg" alt="dropdown" />
                </button>
              </div>
              <div>
                <h2>Newest</h2>
              </div>
              {msort && (
                <form>
                  <hr />
                  <div>
                    <label>Newest</label>
                    <input
                      type="radio"
                      name="topics"
                      checked={sort === "desc"}
                      onChange={() => {
                        setSort("desc")
                      }}
                    />
                  </div>
                  <hr />
                  <div>
                    <label>Oldest</label>
                    <input
                      type="radio"
                      name="topics"
                      checked={sort === "asc"}
                      onChange={() => {
                        setSort("asc")
                      }}
                    />
                  </div>
                  <hr />
                </form>
              )}
            </div>
            <div className={styles.pageFilter}>
              <div className={styles.filterHeader}>
                <h1>Topic</h1>
                <button
                  onClick={() => {
                    setTopic((prevTopic) => !prevTopic)
                  }}
                >
                  <img src="/Icons/dropdown.svg" alt="dropdown" />
                </button>
              </div>
              <div>
                <h2>All Topic</h2>
              </div>
              {topic && (
                <form>
                  <div>
                    <label htmlFor="All">All Topic</label>
                    <input
                      type="radio"
                      name="topics"
                      id="All"
                      checked={id.length === 0}
                      onChange={() => {
                        setId([])
                        setParam([])
                      }}
                    />
                  </div>
                  <hr />
                  {insights.map((radio: any, i: any) => (
                    <>
                      <div>
                        <label htmlFor={i}>{radio.name}</label>
                        <input
                          type="radio"
                          name="topics"
                          id={i}
                          checked={id.includes(radio.id)}
                          onChange={() => {
                            if (id.includes(radio.id)) {
                              // If "Garden Design" is in the array, remove it
                              setId(id.filter((item) => item !== radio.id))
                              if (id.length === 1) {
                                setParam("")
                              }
                            } else {
                              // If "Garden Design" is not in the array, add it
                              setId([radio.id])

                              if (id.length === 0) {
                                setParam("&categories=")
                              }
                            }
                          }}
                        />
                      </div>
                      <hr />
                    </>
                  ))}
                </form>
              )}
            </div>
          </div>
          <div className={styles.done}>
            <button onClick={() => setVisible(false)}>DONE</button>
          </div>
        </div>
      ) : (
        <>
          {/* --------------------------------------------------------------------------- */}{" "}
          <div className={styles.hero}>
            <div className={styles.container}>
              <div className={styles.heroContent}>
                <h1>Insights</h1>
                <p className={styles.p}>
                  Stay up to date with Studio ASA&apos;s latest news and
                  insights on the intersection of humans, space, and nature. Our
                  blog features insights from our team of architects, interior
                  designers, and landscape designers on the latest trends, best
                  practices, and emerging technologies in the industry. From
                  design tips to project highlights, our blog provides a
                  behind-the-scenes look at our innovative and personalized
                  approach to creating functional and beautiful living spaces
                  that reflect the harmony between humans and nature. Subscribe
                  to our newsletter to stay informed on the latest updates and
                  events from Studio ASA.
                </p>
                <p className={styles.pAlt}>
                  Lorem ipsum dolor sit amet consectetur. Aliquet amet viverra
                </p>
              </div>
            </div>
          </div>
          {/* --------------------------------------------------------------------------- */}
          <div className={styles.insight}>
            <div className={styles.container}>
              <div className={styles.filterButton}>
                <button onClick={() => setVisible(true)}>
                  <img src="/Icons/tune.svg" alt="filter" />
                  FILTER
                </button>
              </div>

              {/* --------------------------------------------------------------------------- */}

              <div className={styles.listHeader}>
                {data?.length > 0 ? (
                  <p>
                    Showing 1 - {data?.length} of {data?.length} Result
                  </p>
                ) : (
                  <p>Showing {data?.length} Result</p>
                )}
                <div className={styles.filter}>
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

              {/* --------------------------------------------------------------------------- */}

              <div className={styles.listHeaderAlt}>
                <div className={styles.inputTextAlt}>
                  <h3>Try to find a keyword</h3>
                  <form
                    onSubmit={(event) => {
                      event.preventDefault()
                    }}
                  >
                    <input
                      type="text"
                      placeholder="Enter a keyword"
                      onChange={(event) => {
                        setKey("&search="), setWord(event.target.value)
                      }}
                    />
                  </form>
                  {data?.length > 0 ? (
                    <p>
                      Showing 1 - {data?.length} of {data?.length} Result
                    </p>
                  ) : (
                    <p>Showing {data?.length} Result</p>
                  )}
                </div>
              </div>

              {/* --------------------------------------------------------------------------- */}

              <div className={styles.listContainer}>
                <div className={styles.sidebar}>
                  <div className={styles.inputText}>
                    <h3>Try to find a keyword</h3>
                    <form
                      onSubmit={(event) => {
                        event.preventDefault()
                      }}
                    >
                      <input
                        type="text"
                        placeholder="Enter a keyword"
                        onChange={(event) => {
                          setKey("&search="), setWord(event.target.value)
                        }}
                      />
                    </form>
                  </div>
                  <div className={styles.inputRadio}>
                    <h3>Topic</h3>
                    <form>
                      <input
                        type="radio"
                        name="topics"
                        id="All"
                        onChange={() => {
                          setId([])
                          setParam([])
                        }}
                      />
                      <label htmlFor="All">All Topic</label>
                      <br />
                      {insights.map((radio: any, i: any) => (
                        <>
                          <input
                            type="radio"
                            name="topics"
                            id={i}
                            onChange={() => {
                              if (id.includes(radio.id)) {
                                // If "Garden Design" is in the array, remove it
                                setId(id.filter((item) => item !== radio.id))
                                if (id.length === 1) {
                                  setParam("")
                                }
                              } else {
                                // If "Garden Design" is not in the array, add it
                                setId([radio.id])

                                if (id.length === 0) {
                                  setParam("&categories=")
                                }
                              }
                            }}
                          />
                          <label htmlFor={i}>{radio.name}</label>
                          <br />
                        </>
                      ))}
                    </form>
                  </div>
                </div>

                {/* --------------------------------------------------------------------------- */}

                <div className={styles.list}>
                  {data?.map((insight: any) => {
                    const datetimeString = insight.date

                    // Convert the string to a Date object
                    const date = new Date(datetimeString)

                    // Options for formatting the date
                    const options: Intl.DateTimeFormatOptions = {
                      day: "numeric",
                      month: "long",
                      year: "numeric" as const, // Explicitly define the type
                    }

                    // Format the date using toLocaleDateString
                    const formattedDate = date.toLocaleDateString(
                      "id-ID",
                      options
                    )

                    return (
                      <div className={styles.listItem} key={insight.id}>
                        <div className={styles.listText}>
                          <h3>
                            <time dateTime={datetimeString}>
                              {formattedDate}
                            </time>
                          </h3>
                          <Link href={"/insight/" + insight.slug}>
                            <h1 className={styles.h}>
                              {insight.title.rendered}
                            </h1>
                          </Link>
                          <Link href={"/insight/" + insight.slug}>
                            <h1 className={styles.hAlt}>
                              {insight.title.rendered}
                            </h1>
                          </Link>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: insight.excerpt.rendered,
                            }}
                          />
                        </div>
                        <div className={styles.listImage}>
                          <img
                            src={
                              insight._embedded["wp:featuredmedia"][0]
                                .source_url
                            }
                            alt="list image"
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* --------------------------------------------------------------------------- */}
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Insights
