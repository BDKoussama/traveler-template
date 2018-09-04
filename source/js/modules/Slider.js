import Modal from './Modal'
import  Post  from './Post'
//----------------------------------------//
//     Slider                             //
//----------------------------------------//

class Slider {
    constructor(element) {
        // new el object for the main Wrapper element
        this.el = {}
        this.el.container = element
        this.init();
    }
    init() {
        this.el.nav = this.el.container.querySelector('.navigation');
        // select Navigation next // previous 
        this.el.navigation = {
            next: this.el.nav.querySelector('.next-button'),
            previous: this.el.nav.querySelector('.previous-button')
        };
        this.el.covers = [...this.el.container.querySelectorAll('.covers > .cover')];
        // select modal 
        this.el.modal = {
            menu: this.el.container.querySelector('.header .menu'),
            modal: this.el.container.querySelector('.modal')
        }
        // initialize modal 
        const modal = new Modal(this.el.modal);
        // select slider indexes
        this.el.sliderIndex = this.el.container.querySelector('.slider-index .slider-index-inner');
        // select all Slides and initialize new Post ( slide )
        this.el.sliders = Array.from(this.el.container.querySelectorAll('.slide'), post => new Post(post));
        this.totalSliders = this.el.sliders.length;
        this.isClosed = true;
        this.isAnimating = false;
        this.currentPosition = 0;
        this.bindEvents();
    }
    // init Events 
    bindEvents() {
        // next Slide onclick 
        this.nextSlider = () => this.getPosition('next');
        // previous Slide onclick
        this.previousSlider = () => this.getPosition('previous');
        this.el.navigation.next.addEventListener('click', this.nextSlider);
        this.el.navigation.previous.addEventListener('click', this.previousSlider);
    }
    // get Slide position
    getPosition(direction) {
        if (this.isAnimating) return;
        this.isAnimating = true;
        this.currentSlide = this.el.sliders[this.currentPosition];
        let newPosition = this.currentPosition = direction === 'next' ?
            this.currentPosition < this.totalSliders - 1 ? this.currentPosition + 1 : 0 :
            this.currentPosition = this.currentPosition > 0 ? this.currentPosition - 1 : this.totalSliders - 1;
        let newPost = this.el.sliders[newPosition];
        this.changePost(newPost, newPosition);
    }

    // change new slide 
    changePost(newPost, newPosition) {
        newPost.el.post.classList.add('active');
        Promise.all([this.currentSlide.hidePrevious(), newPost.showNext(), this.updatePostIndex(newPosition)]).then(() => {
            this.currentSlide.el.post.classList.remove('active');
            this.currentSlide = newPost;
            this.isAnimating = false;
        });
    }
    // update Slide Index
    updatePostIndex(newPosition) {
        this.el.sliderIndex.innerHTML = `0${newPosition+1}`
    }
}

export default Slider;