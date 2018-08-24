// all animation configuration 
const animationSettings = {
    title: {
        duration: 700,
        easing: 'easeInOutQuad',
        delay: 50
    },
    subtitle: {
        duration: 700,
        easing: 'easeInQuad',
        delay: 150
    },
    description: {
        duration: 700,
        easing: 'easeInQuad',
        delay: 150
    },
    image: {
        duration: 700,
        easing: 'easeInOutQuad',
        delay: 200
    },
    modal: {
        duration: 400,
        offset: 0,
        easing: 'easeInQuad',
        width: !this.isAnimated ? ['0%', '100%'] : ['100%', '0%'],
        delay: !this.isAnimated ? 0 : 50
    },
    modalContent: {
        duration: 400,
        easing: 'easeInQuad',
        delay: !this.isAnimated ? 200 : 50,
        width: !this.isAnimated ? ['0%', `100%`] : [`100%`, '0%'],
        opacity: !this.isAnimated ? 1 : 0,
    },
    modalList: {
        duration: 500,
        //direction: 'forwards',
        easing: 'easeInOutQuad',
        delay: function (target, index) {
            return index * 80;
        },
        translateX: !this.isAnimated ? ['150%', 0] : [0, '150%'],
        opacity: {
            value: !this.isAnimated ? 1 : 0,
            duration: 1,
            delay: !this.isAnimated ? 200 : 600,
        },
    },
    contactInfo: {

    }
}
//----------------------------------------//
//     Modal                              //
//----------------------------------------//
class Modal {
    // modal constructor
    constructor(element) {
        // new DOM object for modal 
        this.DOM = {};
        this.DOM.modal = element.modal;
        this.DOM.menu = element.menu;
        this.init();
    }
    init() {
        // select modal content
        this.DOM.modalContent = this.DOM.modal.querySelector('.modal-content');
        // select modal menu 
        this.DOM.modalMenu = {
            contactInfo: this.DOM.modalContent.querySelector('.modal-menu .contact-info'),
            listItems: [...this.DOM.modalContent.querySelectorAll('.modal-menu .menu-list > .list-item h2')]
        };
        this.isAnimated = false;
        // init the animation timeline 
        this.animationTimeline = anime.timeline({
            direction: "normal",
            autoplay: false,
        });
        // add modal animations to the timeline 
        this.animationTimeline.add({
            targets: this.DOM.modal,
            duration: animationSettings.modal.duration,
            offset: animationSettings.modal.offset,
            easing: animationSettings.modal.easing,
            width: animationSettings.modal.width,
            delay: animationSettings.modal.delay
        }).add({
            targets: this.DOM.modalContent,
            duration: animationSettings.modalContent.duration,
            offset: `-=${animationSettings.modal.duration / 2}`,
            easing: animationSettings.modalContent.easing,
            delay: !this.isAnimated ? animationSettings.modal.duration / 2 : 50,
            width: animationSettings.modalContent.width,
            opacity: animationSettings.modalContent.opacity,
        }).add({
            targets: this.DOM.modalMenu.listItems,
            duration: animationSettings.modalList.duration,
            direction: animationSettings.modalList.direction,
            offset: `-=${animationSettings.modalContent.duration / 2 }`,
            easing: animationSettings.modalList.easing,
            elasticity: animationSettings.modalList.elasticity,
            delay: animationSettings.modalList.delay,
            translateX: animationSettings.modalList.translateX,
            opacity: animationSettings.modalList.opacity,
        }).add({
            targets: this.DOM.modalMenu.contactInfo,
            duration: 400,
            offset: `-=${animationSettings.modalList.duration}`,
            easing: 'easeInOutQuad',
            delay: 100,
            translateY: !this.isAnimated ? ['100%', 0] : [0, '100%'],
            opacity: {
                value: !this.isAnimated ? 1 : 0,
                duration: 1,
                delay: !this.isAnimated ? 200 : 600,
            },
        });

        // init Events 
        this.initEvents();
    }
    initEvents() {
        // toggleModal on click 
        this.openMenu = () => this.toggleModal();
        this.DOM.menu.addEventListener('click', this.openMenu);
    }

    show() {
        this.animationTimeline.restart();
        this.isAnimated = true;
        return this.animationTimeline.finished
    }

    hide() {
        this.animationTimeline.play();
        this.animationTimeline.reverse();
        this.isAnimated = false;
        return this.animationTimeline.finished
    }

    toggle() {
        return !this.isAnimated ? this.show() : this.hide();
    }

    toggleModal() {
        this.DOM.menu.classList.toggle('clicked');
        return this.toggle();
    }
}

//----------------------------------------//
//     Slider                             //
//----------------------------------------//

class Slider {
    constructor(element) {
        // new DOM object for the main Wrapper element
        this.DOM = {}
        this.DOM.container = element
        this.init();
    }
    init() {

        this.DOM.nav = this.DOM.container.querySelector('.navigation');
        // select Navigation next // previous 
        this.DOM.navigation = {
            next: this.DOM.nav.querySelector('.next-button'),
            previous: this.DOM.nav.querySelector('.previous-button')
        };
        this.DOM.covers = [...this.DOM.container.querySelectorAll('.covers > .cover')];
        // select modal 
        this.DOM.modal = {
            menu: this.DOM.container.querySelector('.header .menu'),
            modal: this.DOM.container.querySelector('.modal')
        }
        // initialize modal 
        const modal = new Modal(this.DOM.modal);
        // select slider indexes
        this.DOM.sliderIndex = this.DOM.container.querySelector('.slider-index .slider-index-inner');
        // select all Slides and initialize new Post ( slide )
        this.DOM.sliders = Array.from(this.DOM.container.querySelectorAll('.slide'), post => new Post(post));
        this.totalSliders = this.DOM.sliders.length;
        this.isClosed = true;
        this.isAnimating = false;
        this.currentPosition = 0;
        this.initEvents();
    }
    // init Events 
    initEvents() {
        // next Slide onclick 
        this.nextSlider = () => this.getPosition('next');
        // previous Slide onclick
        this.previousSlider = () => this.getPosition('previous');
        this.DOM.navigation.next.addEventListener('click', this.nextSlider);
        this.DOM.navigation.previous.addEventListener('click', this.previousSlider);
    }
    // get Slide position
    getPosition(direction) {
        if (this.isAnimating) return;
        this.isAnimating = true;
        this.currentSlide = this.DOM.sliders[this.currentPosition];
        let newPosition = this.currentPosition = direction === 'next' ?
            this.currentPosition < this.totalSliders - 1 ? this.currentPosition + 1 : 0 :
            this.currentPosition = this.currentPosition > 0 ? this.currentPosition - 1 : this.totalSliders - 1;
        let newPost = this.DOM.sliders[newPosition];
        this.changePost(newPost, newPosition);
    }

    // change new slide 
    changePost(newPost, newPosition) {
        newPost.DOM.post.classList.add('active');
        Promise.all([this.currentSlide.hidePrevious(), newPost.showNext(), this.updatePostIndex(newPosition)]).then(() => {
            this.currentSlide.DOM.post.classList.remove('active');
            this.currentSlide = newPost;
            this.isAnimating = false;
        });
    }
    // update Slide Index
    updatePostIndex(newPosition) {
        this.DOM.sliderIndex.innerHTML = `0${newPosition+1}`
    }
}

//----------------------------------------//
//     Post                               //
//----------------------------------------//
class Post {
    constructor(element) {
        // new DOM object for every new Post or Slide 
        this.DOM = {
            post: element
        }
        this.init();
    }
    init() {
        // Select slide content
        this.DOM.image = this.DOM.post.querySelector('.slider-image .slider-image--inner');
        this.DOM.product = this.DOM.post.querySelector('.product');
        this.DOM.title = this.DOM.product.querySelector('.product-title');
        this.DOM.subtitle = this.DOM.product.querySelector('.sub-title');
        this.DOM.description = this.DOM.product.querySelector('.product-description > p');
        charming(this.DOM.title);
        this.DOM.titleLetters = this.DOM.title.querySelectorAll('span');
        this.letterWrapper();
    }
    // wrappe every span inside new Div
    letterWrapper() {
        [...this.DOM.titleLetters].forEach(element => {
            const newDiv = document.createElement("div");
            newDiv.classList.add('letterWrapper');
            newDiv.appendChild(element);
            this.DOM.title.appendChild(newDiv);
        });
    }
    showNext() {
        this.isHidden = true
        return this.animate();
    }
    hidePrevious() {
        this.isHidden = false
        return this.animate();
    }

    animate() {
        return Promise.all([
            this.animateTitle(),
            this.animateSubtitle(),
            this.animateDescription(),
            this.animateImage()
        ]);
    }
    animateTitle() {
        anime.remove(this.DOM.titleLetters);
        return anime({
            targets: this.DOM.titleLetters,
            duration: animationSettings.title.duration,
            easing: animationSettings.title.easing,
            translateX: this.isHidden ? ['-100%', 0] : [0, '100%'],
            opacity: {
                value: this.isHidden ? 1 : [1, 0.5, 0],
                duration: 1,
                delay: this.isHidden ? 200 : 900,
            },
            delay: function (target, index) {
                return index * animationSettings.title.delay;
            },
        }).finished;
    }
    animateSubtitle() {
        anime.remove(this.DOM.subtitle);
        return anime({
            targets: this.DOM.subtitle,
            duration: animationSettings.subtitle.duration,
            easing: animationSettings.subtitle.easing,
            delay: animationSettings.subtitle.delay,
            translateY: this.isHidden ? ['-100%', 0] : [0, '100%'],
            opacity: {
                value: this.isHidden ? 1 : 0,
                duration: 1,
                delay: this.isHidden ? 200 : 900,
            },
        }).finished
    }
    animateDescription() {
        anime.remove(this.DOM.description);
        return anime({
            targets: this.DOM.description,
            duration: animationSettings.description.duration,
            easing: animationSettings.description.easing,
            delay: animationSettings.description.delay,
            translateY: this.isHidden ? ['-100%', 0] : [0, '100%'],
            opacity: {
                value: this.isHidden ? 1 : 0,
                duration: 1,
                delay: this.isHidden ? 200 : 900,
            },
        }).finished;
    }
    animateImage() {
        anime.remove(this.DOM.image);
        return anime({
            targets: this.DOM.image,
            duration: animationSettings.image.duration,
            delay: animationSettings.image.delay,
            easing: animationSettings.image.easing,
            translateX: this.isHidden ? ['-100%', 0] : [0, '100%'],
            opacity: {
                value: this.isHidden ? 1 : 0,
                duration: 1,
                delay: this.isHidden ? 200 : 900,
            }
        }).finished;
    }
}


slider = new Slider(document.querySelector('.main-container'));
















/*
const letterWrapper = (spanList, element) => {
    spanList.forEach(item => {
        const newDiv = document.createElement("div");
        newDiv.classList.add('letterWrapper');
        newDiv.appendChild(item);
        element.appendChild(newDiv);
    });
}
*/
/*
    this.dom.modalMenu.modalList = [];
    this.dom.modalMenu.listItems.forEach(element => {
        const item = element.querySelector('h3');
        charming(item);
        const spanList = item.querySelectorAll('span');
        letterWrapper(spanList, item);
        console.log(item);
        this.dom.modalMenu.modalList.push(item);
    });
    console.log(this.dom.modalMenu.modalList);
    */