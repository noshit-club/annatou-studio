import React from 'react'
import { graphql } from 'gatsby'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import { LightboxItem } from '../components/lightbox'
import Layout from "../components/layout"

const Exhibitions = ({ data: { exhibitions } }) => (
  <Layout>
    <article className="sheet sheet__exhibitions">
      <HelmetDatoCms seo={exhibitions.seoMetaTags} />
      <div className="sheet__inner">
        <h1 className="sheet__title a11y-visually-hidden">{exhibitions.title}</h1>
        <div
          className="sheet__body a11y-visually-hidden"
          dangerouslySetInnerHTML={{
            __html: exhibitions.descriptionNode.childMarkdownRemark.html,
          }}
        />
        <div className="sheet__gallery showcase">
          {exhibitions.gallery.map(({ fluid }) => (
            <LightboxItem fluid={fluid} key={fluid.src} />
          ))}
        </div>
      </div>
    </article>
  </Layout>
)

export default Exhibitions

export const query = graphql`
  query ExhibitionsQuery {
    exhibitions: datoCmsExhibitionsPage {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      title
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
    }
  }
`
