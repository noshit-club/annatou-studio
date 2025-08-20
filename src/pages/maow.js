import React from "react";
import { graphql } from "gatsby";
import { HelmetDatoCms } from "gatsby-source-datocms";
import Layout from "../components/layout";

const Maow = ({ data }) => {
  const page = data && data.page;
  if (!page) {
    return (
      <Layout location="maow">
        <article className="sheet sheet__maow">
          <div className="sheet__inner">
            <h1 className="sheet__title">Maow</h1>
            <p className="sheet__lead">Content unavailable.</p>
          </div>
        </article>
      </Layout>
    );
  }
  return (
    <Layout location="maow">
      <article className="sheet sheet__maow">
        {page.seoMetaTags && <HelmetDatoCms seo={page.seoMetaTags} />}
        <div className="sheet__inner">
          <h1 className="sheet__title a11y-visually-hidden">{page.title}</h1>
          {page.subtitle && <p className="sheet__lead">{page.subtitle}</p>}
          {page.contentNode?.childMarkdownRemark?.html && (
            <div
              className="sheet__body"
              dangerouslySetInnerHTML={{
                __html: page.contentNode.childMarkdownRemark.html,
              }}
            />
          )}
        </div>
      </article>
    </Layout>
  );
};

export default Maow;

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
`;
