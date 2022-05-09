import React from 'react'
import { graphql } from 'gatsby'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import { LightboxItem } from '../components/lightbox'
import Layout from "../components/layout"

const Art = ({ data: { art } }) => (
  <Layout>
    <article className="sheet sheet__art">
      <HelmetDatoCms seo={art.seoMetaTags} />
      <div className="sheet__inner">
        <h1 className="sheet__title a11y-visually-hidden">{art.title}</h1>
        <p className="sheet__lead">{art.subtitle}</p>
        <div className="sheet__gallery showcase">
          {art.gallery.map(({ fluid }) => (
            <LightboxItem fluid={fluid} key={fluid.src} />
          ))}
        </div>
      </div>
    </article>
  </Layout>
)

export default Art

export const query = graphql`
  query ArtQuery {
    art: datoCmsArtPage {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      title
      subtitle
      gallery {
        fluid(maxWidth: 1200, imgixParams: { fm: "jpg", auto: "compress" }) {
          ...GatsbyDatoCmsSizes
        }
      }
    }
  }
`
