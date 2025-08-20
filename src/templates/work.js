import React from "react";
import { HelmetDatoCms } from "gatsby-source-datocms";
import Img from "gatsby-image";
import { graphql } from "gatsby";
import Layout from "../components/layout";

export default ({ data }) => {
  const work = data && data.datoCmsWork;
  if (!work) {
    return (
      <Layout>
        <article className="sheet">
          <div className="sheet__inner">
            <h1 className="sheet__title">Work not found</h1>
            <p>This work is unavailable or has been removed.</p>
          </div>
        </article>
      </Layout>
    );
  }
  return (
    <Layout>
      <article className="sheet">
        {work.seoMetaTags && <HelmetDatoCms seo={work.seoMetaTags} />}
        <div className="sheet__inner">
          <h1 className="sheet__title">{work.title}</h1>
          {work.descriptionNode?.childMarkdownRemark?.html && (
            <div
              className="sheet__lead"
              dangerouslySetInnerHTML={{
                __html: work.descriptionNode.childMarkdownRemark.html,
              }}
            />
          )}
          {work.subdescriptionNode?.childMarkdownRemark?.html && (
            <div
              className="sheet__body"
              dangerouslySetInnerHTML={{
                __html: work.subdescriptionNode.childMarkdownRemark.html,
              }}
            />
          )}
          <div className="sheet__gallery">
            {Array.isArray(work.gallery) &&
              work.gallery.map(
                ({ fluid }) =>
                  fluid && (
                    <Img
                      fluid={fluid}
                      key={fluid.src}
                      durationFadeIn={400}
                      placeholderStyle={{
                        filter: `blur(6px)`,
                        WebkitFilter: `blur(6px)`,
                        MozFilter: `blur(6px)`,
                        msFilter: `blur(6px`,
                        OFilter: `blur(6px)`,
                      }}
                    />
                  )
              )}
            {work.coverImage?.fluid && (
              <Img
                fluid={work.coverImage.fluid}
                durationFadeIn={400}
                placeholderStyle={{
                  filter: `blur(6px)`,
                  WebkitFilter: `blur(6px)`,
                  MozFilter: `blur(6px)`,
                  msFilter: `blur(6px`,
                  OFilter: `blur(6px)`,
                }}
              />
            )}
          </div>
        </div>
      </article>
    </Layout>
  );
};

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
`;
