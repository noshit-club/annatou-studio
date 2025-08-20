import React from "react";
import { graphql } from "gatsby";
import { HelmetDatoCms } from "gatsby-source-datocms";
import { LightboxItem } from "../components/lightbox";
import Layout from "../components/layout";

const Exhibitions = ({ data }) => {
  const exhibitions = data && data.exhibitions;
  if (!exhibitions) {
    return (
      <Layout>
        <article className="sheet sheet__exhibitions">
          <div className="sheet__inner">
            <h1 className="sheet__title">Exhibitions</h1>
            <p className="sheet__lead">Content unavailable.</p>
          </div>
        </article>
      </Layout>
    );
  }
  return (
    <Layout>
      <article className="sheet sheet__exhibitions">
        {exhibitions.seoMetaTags && (
          <HelmetDatoCms seo={exhibitions.seoMetaTags} />
        )}
        <div className="sheet__inner">
          <h1 className="sheet__title a11y-visually-hidden">
            {exhibitions.title}
          </h1>
          {exhibitions.subtitle && (
            <p className="sheet__lead">{exhibitions.subtitle}</p>
          )}
          <div className="sheet__gallery showcase">
            {Array.isArray(exhibitions.gallery) &&
              exhibitions.gallery.map(
                ({ fluid }) =>
                  fluid && <LightboxItem fluid={fluid} key={fluid.src} />
              )}
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default Exhibitions;

export const query = graphql`
  query ExhibitionsQuery {
    exhibitions: datoCmsExhibitionsPage {
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
