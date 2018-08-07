class Slider {
    constructor(element) {
        this.domElements = {}
        this.domElements.container = element
        this.init();
    }
    init() {
        this.domElements.nav = this.domElements.container.querySelector('.nav-buttons');
        this.domElements.navigation = {
            next : this.domElements.nav.querySelector('.next-button'),
            previous : this.domElements.nav.querySelector('.previous-button')
        };
        this.domElements.menu = this.domElements.container.querySelector('.header .menu');
        this.domElements.sliderIndex = this.domElements.container.querySelector('.slider-index .slider-index-inner');
        this.domElements.sliders = Array.from(this.domElements.container.querySelectorAll('.main-content'), slide => new Slide(slide));
        this.initEvents();
    }
    initEvents(){
        this.nextSlider = () => console.log('next clicked');
        this.previousSlider = () => console.log('previous clicked');
        this.domElements.navigation.next.addEventListener('click' , this.nextSlider);
        this.domElements.navigation.previous.addEventListener('click' , this.previousSlider);

    }
}

class Slide {
    constructor(element) {
        this.domElements = {
            DOM: element
        }
        this.init();
    }
    init() {
        this.domElements.product = this.domElements.DOM.querySelector('.product');
    }
}

slider = new Slider(document.querySelector('.main-container'));

console.log(slider.domElements);