import React from "react";
import { graphql } from "gatsby";
import { HelmetDatoCms } from "gatsby-source-datocms";
import { LightboxItem } from "../components/lightbox";
import Layout from "../components/layout";

const Art = ({ data }) => {
  const art = data && data.art;
  if (!art) {
    return (
      <Layout>
        <article className="sheet sheet__art">
          <div className="sheet__inner">
            <h1 className="sheet__title">Art</h1>
            <p className="sheet__lead">Content unavailable.</p>
          </div>
        </article>
      </Layout>
    );
  }
  return (
    <Layout>
      <article className="sheet sheet__art">
        {art.seoMetaTags && <HelmetDatoCms seo={art.seoMetaTags} />}
        <div className="sheet__inner">
          <h1 className="sheet__title a11y-visually-hidden">{art.title}</h1>
          {art.subtitle && <p className="sheet__lead">{art.subtitle}</p>}
          <div className="sheet__gallery showcase">
            {Array.isArray(art.gallery) &&
              art.gallery.map(
                ({ fluid }) =>
                  fluid && <LightboxItem fluid={fluid} key={fluid.src} />
              )}
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default Art;

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
`;
