import React from 'react'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import Img from 'gatsby-image'
import { graphql } from 'gatsby'
import Layout from "../components/layout"


export default ({ data }) => (
  <Layout>
    <article className="sheet">
      <HelmetDatoCms seo={data.datoCmsWork.seoMetaTags} />
      <div className="sheet__inner">
        <h1 className="sheet__title">{data.datoCmsWork.title}</h1>
        <div
          className="sheet__lead"
          dangerouslySetInnerHTML={{
            __html: data.datoCmsWork.descriptionNode.childMarkdownRemark.html,
          }}
        />
        <div
          className="sheet__body"
          dangerouslySetInnerHTML={{
            __html: data.datoCmsWork.subdescriptionNode.childMarkdownRemark.html,
          }}
        />
        <div className="sheet__gallery">
          {data.datoCmsWork.gallery.map(({ fluid }) => (
            <Img fluid={fluid} key={fluid.src} durationFadeIn={400} placeholderStyle={{
              filter: `blur(6px)`,
              WebkitFilter: `blur(6px)`,
              MozFilter: `blur(6px)`,
              msFilter: `blur(6px`,
              OFilter: `blur(6px)`
            }} />
          ))}
          <Img fluid={data.datoCmsWork.coverImage.fluid} durationFadeIn={400} placeholderStyle={{
            filter: `blur(6px)`,
            WebkitFilter: `blur(6px)`,
            MozFilter: `blur(6px)`,
            msFilter: `blur(6px`,
            OFilter: `blur(6px)`
          }} />       
        </div>
      </div>
    </article>
  </Layout>
)

export const query = graphql`
  query WorkQuery($slug: String!) {
    datoCmsWork(slug: { eq: $slug }) {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      title
      excerpt
      gallery {
        fluid(maxWidth: 1200, imgixParams: { fm: "jpg", auto: "compress" }) {
          ...GatsbyDatoCmsSizes
        }
      }
      descriptionNode {
        childMarkdownRemark {
          html
        }
      }
      subdescriptionNode {
        childMarkdownRemark {
          html
        }
      }
      coverImage {
        url
        fluid(maxWidth: 1200, imgixParams: { fm: "jpg", auto: "compress" }) {
          ...GatsbyDatoCmsSizes
        }
      }
    }
  }
`
