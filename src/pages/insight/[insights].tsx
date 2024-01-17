import Head from "next/head"
import styles from "@/styles/IDetails.module.css"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export const getStaticPaths = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STUDIOASA}posts?per_page=100&_embed`
  )

  const data = await res.json()

  const paths = data?.map((path: any) => {
    return {
      params: { insights: path.slug },
    }
  })

  return { paths, fallback: false }
}

export const getStaticProps = async (context: any) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STUDIOASA}posts?per_page=100&_embed`
  )

  const data = await res.json()

  const route = context.params.insights

  const resContent = await fetch(
    `${process.env.NEXT_PUBLIC_STUDIOASA}posts?slug=${route}&_embed`
  )

  const dataContent = await resContent.json()

  return {
    props: { contents: dataContent, relateds: data },
  }
}

const InsightDetails = ({
  contents,
  relateds,
}: {
  contents: any
  relateds: any
}) => {
  return (
    <>
      <Head>
        <title>details - Studio Asu</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Logo Studio Asa.svg" />
      </Head>

      {/* --------------------------------------------------------------------------- */}

      <div className={styles.icon}>
        <div className={styles.iconContainer}>
          <Link href="/">
            <img src="/Icons/home.svg" alt="homepage" />
          </Link>
          <img src="/Icons/arrowright.svg" alt="arrow" />
          <Link href="/insight">
            <h5>Insights</h5>
          </Link>
        </div>
      </div>

      {/* --------------------------------------------------------------------------- */}

      <div className={styles.banner}>
        <div className={styles.bannerContainer}>
          <h6>10 Jun 2022</h6>
          <img
            className={styles.bannerImage}
            src={contents[0]._embedded["wp:featuredmedia"][0].source_url}
            alt="banner"
          />
          <div
            dangerouslySetInnerHTML={{
              __html: contents[0].content.rendered,
            }}
            className={styles.content}
          />
          <h5>Share</h5>
          <div className={styles.social}>
            <a href="">
              <img src="/Icons/link.svg" alt="link" />
            </a>
            <a href="facebook.com">
              <img src="/Icons/facebookproject.svg" alt="facebook" />
            </a>
            <a href="twitter.com">
              <img src="/Icons/twitterproject.svg" alt="twitter" />
            </a>
            <a href="linkedin.com">
              <img src="/Icons/linkedin.svg" alt="linkedin" />
            </a>
          </div>
        </div>
      </div>

      {/* --------------------------------------------------------------------------- */}

      <div className={styles.related}>
        <div className={styles.container}>
          <hr />
          <h1>Related</h1>
          <div className={styles.roulette}>
            {relateds?.map((related: any) => {
              return (
                <div className={styles.card} key={related.id}>
                  <img
                    src={related._embedded["wp:featuredmedia"][0].source_url}
                    alt="card"
                  />
                  <h6>{related.date}</h6>
                  <h2>{related.title.rendered}</h2>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default InsightDetails