import React from 'react'
import { Link, graphql } from 'gatsby'
import Masonry from 'react-masonry-component'
import Img from 'gatsby-image'
import Layout from "../components/layout"

function isTouch() {
  try {
      let prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');

      let mq = function (query) {
          return window.matchMedia(query).matches;
      };

      if (('ontouchstart' in window) || (typeof window.DocumentTouch !== "undefined" && document instanceof window.DocumentTouch)) {
          return true;
      }

      return mq(['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join(''));
  } catch (e) {
      console.error('(Touch detect failed)', e);
      return false;
  }
}

const IndexPage = ({ data }) => (
  <Layout>
    <article>
      <h1 className="sheet__title a11y-visually-hidden">{data.datoCmsSite.globalSeo.siteName}</h1>
      <Masonry className="showcase">
      {data.allDatoCmsWork.edges.map(({ node: work }) => (
        <Link to={`/works/${work.slug}`} key={work.id} className="showcase__item" 
        onPointerMove={e => { 
          if ( !isTouch() ) {
            const thumbnailWrapper = e.currentTarget;
            const nbImages = thumbnailWrapper.querySelectorAll('.gatsby-image-wrapper').length;
            const posX = e.pageX - thumbnailWrapper.getBoundingClientRect().left;
            let currentIndex = Math.floor(posX / (parseFloat(getComputedStyle(thumbnailWrapper, null).width.replace("px", "")) / nbImages));
            currentIndex = currentIndex < 0 ? 0 : currentIndex;
            thumbnailWrapper.querySelector('.on').classList.remove('on');
            thumbnailWrapper.querySelectorAll('.gatsby-image-wrapper')[currentIndex].classList.add('on');              
          }
        }} 
        onPointerLeave={e => { 
          e.currentTarget.querySelector('.on').classList.remove('on');
          e.currentTarget.querySelector('.gatsby-image-wrapper').classList.add('on');
        }}>
          <figure className="card">
            <div className="card__image">
              <Img fluid={work.coverImage.fluid} className="default on" durationFadeIn={400} placeholderStyle={{
                filter: `blur(6px)`,
                WebkitFilter: `blur(6px)`,
                MozFilter: `blur(6px)`,
                msFilter: `blur(6px`,
                OFilter: `blur(6px)`
              }} /> 
              {work.gallery.map(({ fixed }) => (
                <Img fixed={fixed} key={fixed.src} fadeIn={false} style={{
                  position: `absolute`,
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  transition: `none`,
                  zIndex: 0
                }} />
              ))}
            </div>
            <figcaption className="card__caption">
              <div>
                <h2 className="card__title">
                  {work.title}
                </h2>
                {work.excerpt ? 
                  <div className="card__description">
                    <p>{work.excerpt}</p>
                  </div> : ""}
              </div>
            </figcaption>
          </figure>
        </Link>
      ))}
      </Masonry>
    </article>
  </Layout>
)

export default IndexPage

export const query = graphql`
  query IndexQuery {
    datoCmsSite {
      globalSeo {
        siteName
      }
    }
    allDatoCmsWork(sort: { fields: [position], order: ASC }) {
      edges {
        node {
          id
          title
          slug
          excerpt
          coverImage {
            fluid(maxWidth: 360, imgixParams: { fm: "jpg", auto: "compress" }) {
              ...GatsbyDatoCmsFluid
            }
          }
          gallery {
            fixed(width: 640, imgixParams: { fm: "jpg", auto: "compress" }) {
              ...GatsbyDatoCmsFixed_noBase64
            }
          }
        }
      }
    }
  }
`
