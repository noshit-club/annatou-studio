import React from 'react'
import { graphql } from 'gatsby'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import Layout from "../components/layout"

const Maow = ({ data: { page } }) => (
  <Layout location="maow">
    <article className="sheet sheet__maow">
      <HelmetDatoCms seo={page.seoMetaTags} />
      <div className="sheet__inner">
        <h1 className="sheet__title a11y-visually-hidden">{page.title}</h1>
        <p className="sheet__lead">{page.subtitle}</p>
        <div
          className="sheet__body"
          dangerouslySetInnerHTML={{
            __html: page.contentNode.childMarkdownRemark.html,
          }}
        />
      </div>
    </article>
  </Layout>
)

export default Maow

export const query = graphql`
  query MaowPageQuery {
    page: datoCmsMaow {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      title
      subtitle
      photo {
        fluid(maxWidth: 600, imgixParams: { fm: "jpg", auto: "compress" }) {
          ...GatsbyDatoCmsSizes
        }
      }
      contentNode {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
