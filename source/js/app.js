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
    imageTitle: {
        duration: 700,
        easing: 'easeInQuad',
        delay: 150
    },
    image: {
        duration: 700,
        easing: 'easeInOutQuad',
        delay: 150
    }
}

class Slider {
    constructor(element) {
        this.dom = {}
        this.dom.container = element
        this.init();
    }
    init() {
        this.dom.nav = this.dom.container.querySelector('.nav-buttons');
        this.dom.navigation = {
            next: this.dom.nav.querySelector('.next-button'),
            previous: this.dom.nav.querySelector('.previous-button')
        };
        this.dom.covers = [...this.dom.container.querySelectorAll('.covers > .cover')];
        this.dom.menu = this.dom.container.querySelector('.header .menu');
        this.dom.modal = this.dom.container.querySelector('.modal');
        this.dom.modalContent = this.dom.modal.querySelector('.modal-content');
        this.dom.sliderIndex = this.dom.container.querySelector('.slider-index .slider-index-inner');
        this.dom.sliders = Array.from(this.dom.container.querySelectorAll('.main-content'), post => new Post(post));
        this.totalSliders = this.dom.sliders.length;
        this.isClosed = true;
        this.currentPosition = 0;
        this.initEvents();
    }
    initEvents() {
        this.nextSlider = () => this.getPosition('next');
        this.previousSlider = () => this.getPosition('previous');
        this.openMenu = () => this.toggleMenu();
        this.dom.navigation.next.addEventListener('click', this.nextSlider);
        this.dom.navigation.previous.addEventListener('click', this.previousSlider);
        this.dom.menu.addEventListener('click', this.openMenu);
    }
    toggleMenu() {
        this.dom.menu.classList.toggle('clicked');
        Promise.all([this.toggleModal(), this.modalMenu()]).then(() => {
            this.isClosed = !this.isClosed;
        });
    }
    getPosition(direction) {
        this.currentSlide = this.dom.sliders[this.currentPosition];
        let newPosition = this.currentPosition = direction === 'next' ?
            this.currentPosition < this.totalSliders - 1 ? this.currentPosition + 1 : 0 :
            this.currentPosition = this.currentPosition > 0 ? this.currentPosition - 1 : this.totalSliders - 1;
        let newPost = this.dom.sliders[newPosition];
        this.changePost(newPost, newPosition);
    }

    changePost(newPost, newPosition) {
        newPost.DOM.post.classList.add('current--section');
        Promise.all([this.currentSlide.hidePrevious(), newPost.showNext(), this.updatePostIndex(newPosition)]).then(() => {
            this.currentSlide.DOM.post.classList.remove('current--section');
            this.currentSlide = newPost;
        });
    }

    updatePostIndex(newPosition) {
        this.dom.sliderIndex.innerHTML = `0${newPosition+1}`
    }

    toggleModal() {
        anime.remove(this.dom.modal);
        return anime({
            targets: this.dom.modal,
            duration: 500,
            easing: 'easeInQuad',
            width: this.isClosed ? ['0%', '100%'] : ['100%', '0%'],
            delay: this.isClosed ? 0 : 200
        }).finished;
    }
    modalMenu() {
        anime.remove(this.dom.modalContent);
        return anime({
            targets: this.dom.modalContent,
            duration: 700,
            easing: 'easeInQuad',
            delay: this.isClosed ? 200 : 50,
            width: this.isClosed ? ['0%', `${100/3}%`] : [`${100/3}%`, '0%'],
        }).finished;
    }
}

class Post {
    constructor(element) {
        this.DOM = {
            post: element
        }
        this.init();
    }
    init() {
        this.DOM.image = this.DOM.post.querySelector('.slider-image'),
            this.DOM.imageTitle = this.DOM.post.querySelector('.slider-image .img-title'),
            this.DOM.product = this.DOM.post.querySelector('.product');
        this.DOM.title = this.DOM.product.querySelector('.product-title');
        this.DOM.subtitle = this.DOM.product.querySelector('.sub-title');
        this.DOM.description = this.DOM.product.querySelector('.product-description > p');
        charming(this.DOM.title);
        this.DOM.titleLetters = this.DOM.title.querySelectorAll('span');
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
            this.title_Animation(),
            this.subtitle_Animation(),
            this.description_Animation(),
            this.image_Animation(),
            this.imgTitle_Animation()
        ]);
    }
    title_Animation() {
        anime.remove(this.DOM.titleLetters);
        return anime({
            targets: this.DOM.titleLetters,
            duration: animationSettings.title.duration,
            easing: animationSettings.title.easing,
            translateY: this.isHidden ? ['-100%', 0] : [0, '100%'],
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
    subtitle_Animation() {
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
        }).finished;
    }
    description_Animation() {
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
    imgTitle_Animation() {
        anime.remove(this.DOM.imageTitle);
        return anime({
            targets: this.DOM.imageTitle,
            duration: animationSettings.imageTitle.duration,
            delay: animationSettings.imageTitle.delay,
            easing: animationSettings.imageTitle.easing,
            translateX: this.isHidden ? ['-100%', 0] : [0, '100%'],
            opacity: {
                value: this.isHidden ? 1 : 0,
                duration: 1,
                delay: this.isHidden ? 200 : 900,
            },
        }).finished;
    }
    image_Animation() {
        anime.remove(this.DOM.image);
        return anime({
            targets: this.DOM.image,
            duration: animationSettings.image.duration,
            delay: animationSettings.image.delay,
            easing: animationSettings.image.easing,
            translateY: this.isHidden ? ['-100%', 0] : [0, '100%'],
            opacity: {
                value: this.isHidden ? 1 : 0,
                duration: 1,
                delay: this.isHidden ? 200 : 900,
            }
        }).finished;
    }
}

slider = new Slider(document.querySelector('.main-container'));