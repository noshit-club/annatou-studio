import React from 'react'
import Img from 'gatsby-image'
import Swipe from 'react-easy-swipe'

class Lightbox extends React.Component {
    constructor(props) {
        super(props);
    
        this.previousImage = this.previousImage.bind(this);
        this.nextImage = this.nextImage.bind(this);
        this.closeLightbox = this.closeLightbox.bind(this);
        this.keydownListener = this.keydownListener.bind(this);
    }
    
    previousImage() {
        document.querySelector('.lightbox--image-wrapper').classList.add('loading');

        const items = document.querySelectorAll('.showcase__item');
        const currentIndex = parseInt(document.querySelector('.lightbox').dataset.index);
        const previousIndex = currentIndex > 1 ? currentIndex - 1 : items.length - 1;

        document.querySelector('.lightbox--image').src = items[previousIndex].href; 
        document.querySelector('.lightbox').dataset.index = previousIndex;
    }
    
    nextImage() {
        document.querySelector('.lightbox--image-wrapper').classList.add('loading');

        const items = document.querySelectorAll('.showcase__item');
        const currentIndex = parseInt(document.querySelector('.lightbox').dataset.index);
        const nextIndex = currentIndex < items.length ? currentIndex + 1 : 1;

        document.querySelector('.lightbox--image').src = items[nextIndex].href; 
        document.querySelector('.lightbox').dataset.index = nextIndex;
    }
    
    closeLightbox() {
        const body = document.body;
        const scrollY = body.style.top;
        body.style.position = '';
        body.style.top = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
        
        body.className = '';
        document.querySelector('.lightbox--image').src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

    }

    keydownListener(evt) {
        switch(evt.keyCode){
            case 27:
                this.closeLightbox();
            break;
            case 37:
                this.previousImage();
            break;
            case 39:
                this.nextImage();
            break;
            default: ;
        }  
    }

    componentDidMount(){
        document.addEventListener('keydown', this.keydownListener, false);
        window.addEventListener('scroll', () => {
            document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
          });
    }
    
    componentWillUnmount(){
        document.removeEventListener('keydown', this.keydownListener, false);
    }

    render() {
        return ( 
            <Swipe 
                onSwipeLeft={this.nextImage} 
                onSwipeRight={this.previousImage} 
                className="lightbox" 
                data-index="0"
            >
                <div className="lightbox--image-wrapper">
                    <img 
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" 
                        alt="Art &amp; craft" 
                        className="lightbox--image" 
                    />
                </div>

                <nav className="lightbox--controls">
                    <button className="lightbox__button lightbox__button--arrow--previous" title="Previous (arrow left)" onClick={this.previousImage}>←</button>
                    <button className="lightbox__button lightbox__button--arrow--next" title="Next (arrow right)" onClick={this.nextImage}>→</button>
                    <button className="lightbox__button lightbox__button--close" title="Close (Esc)" onClick={this.closeLightbox}>Close</button>
                </nav>
            </Swipe>
        )
    }
}

class LightboxItem extends React.Component {
    constructor(props) {
      super(props);
  
      this.openLightbox = this.openLightbox.bind(this);
    }

    openLightbox(e) {
        e.preventDefault();

        document.body.className = 'lightbox-open';
        const scrollY = document.documentElement.style.getPropertyValue('--scroll-y');
        const body = document.body;
        body.style.position = 'fixed';
        body.style.top = `-${scrollY}`;

        const index = (el) => {
            if (!el) return -1;
            let i = 0;
            do { i++ } while ((el = el.previousElementSibling));
            return i;
        }

        document.querySelector('.lightbox').dataset.index = index(e.currentTarget) - 1;

        const onImgLoaded = () => {
            document.querySelector('.lightbox--image-wrapper').classList.remove('loading');
        }

        const onImgError = () => {

        }

        const addImgEvents = () => {
            img.addEventListener('load', onImgLoaded);
            img.addEventListener('error', onImgError);
        }

        const img = document.querySelector('.lightbox--image');
        img.src = e.currentTarget.href;

        img.complete ? onImgLoaded() : addImgEvents();
    }
  
    render() {
        return (
            <a href={this.props.fluid.src} className="showcase__item" onClick={this.openLightbox}>
                <Img fluid={this.props.fluid} durationFadeIn={400} placeholderStyle={{
                    filter: `blur(6px)`,
                    WebkitFilter: `blur(6px)`,
                    MozFilter: `blur(6px)`,
                    msFilter: `blur(6px`,
                    OFilter: `blur(6px)`
                }} />
            </a>
        )
    }
}

export { Lightbox, LightboxItem };