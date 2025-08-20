import React from "react";
import { graphql } from "gatsby";
import { HelmetDatoCms } from "gatsby-source-datocms";
import Layout from "../components/layout";

const About = ({ data }) => {
  const about = data && data.about;
  if (!about) {
    return (
      <Layout>
        <article className="sheet">
          <div className="sheet__inner">
            <h1 className="sheet__title">About</h1>
            <p className="sheet__lead">Content unavailable.</p>
          </div>
        </article>
      </Layout>
    );
  }
  return (
    <Layout>
      <article className="sheet">
        {about.seoMetaTags && <HelmetDatoCms seo={about.seoMetaTags} />}
        <div className="sheet__inner">
          <h1 className="sheet__title a11y-visually-hidden">{about.title}</h1>
          {about.subtitle && <p className="sheet__lead">{about.subtitle}</p>}
          {about.bioNode?.childMarkdownRemark?.html && (
            <div
              className="sheet__body"
              dangerouslySetInnerHTML={{
                __html: about.bioNode.childMarkdownRemark.html,
              }}
            />
          )}
        </div>
      </article>
    </Layout>
  );
};

export default About;

export const query = graphql`
  query AboutQuery {
    about: datoCmsAboutPage {
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
      bioNode {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`;
