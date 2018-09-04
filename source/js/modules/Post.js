//----------------------------------------//
//     Post                               //
//----------------------------------------//
class Post {
    constructor(element) {
        // new el object for every new Post or Slide 
        this.el = {
            post: element
        }
        this.settings = {
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
            }
        }
        this.init();
    }
    init() {
        // Select slide content
        this.el.image = this.el.post.querySelector('.slider-image .slider-image--inner');
        this.el.product = this.el.post.querySelector('.product');
        this.el.title = this.el.product.querySelector('.product-title');
        this.el.subtitle = this.el.product.querySelector('.sub-title');
        this.el.description = this.el.product.querySelector('.product-description > p');
        charming(this.el.title);
        this.el.titleLetters = this.el.title.querySelectorAll('span');
        this.splitTitle();
    }
    // wrappe every span inside new Div
    splitTitle() {
        [...this.el.titleLetters].forEach(element => {
            const newDiv = document.createElement("div");
            newDiv.classList.add('letterWrapper');
            newDiv.appendChild(element);
            this.el.title.appendChild(newDiv);
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
        anime.remove(this.el.titleLetters);
        return anime({
            targets: this.el.titleLetters,
            duration: this.settings.title.duration,
            easing: this.settings.title.easing,
            translateX: this.isHidden ? ['-100%', 0] : [0, '100%'],
            opacity: {
                value: this.isHidden ? 1 : [1, 0.5, 0],
                duration: 1,
                delay: this.isHidden ? 200 : 900,
            },
            delay: function (target, index) {
                return index * 50; 
            },
        }).finished;
    }
    animateSubtitle() {
        anime.remove(this.el.subtitle);
        return anime({
            targets: this.el.subtitle,
            duration: this.settings.subtitle.duration,
            easing: this.settings.subtitle.easing,
            delay: this.settings.subtitle.delay,
            translateY: this.isHidden ? ['-100%', 0] : [0, '100%'],
            opacity: {
                value: this.isHidden ? 1 : 0,
                duration: 1,
                delay: this.isHidden ? 200 : 900,
            },
        }).finished
    }
    animateDescription() {
        anime.remove(this.el.description);
        return anime({
            targets: this.el.description,
            duration: this.settings.description.duration,
            easing: this.settings.description.easing,
            delay: this.settings.description.delay,
            translateY: this.isHidden ? ['-100%', 0] : [0, '100%'],
            opacity: {
                value: this.isHidden ? 1 : 0,
                duration: 1,
                delay: this.isHidden ? 200 : 900,
            },
        }).finished;
    }
    animateImage() {
        anime.remove(this.el.image);
        return anime({
            targets: this.el.image,
            duration: this.settings.image.duration,
            delay: this.settings.image.delay,
            easing: this.settings.image.easing,
            scale: 1.2,
            translateX: this.isHidden ? ['-100%', 0] : [0, '100%'],
            opacity: {
                value: this.isHidden ? 1 : 0,
                duration: 1,
                delay: this.isHidden ? 200 : 900,
            }
        }).finished;
    }
}


export default Post;