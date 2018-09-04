//----------------------------------------//
//     Modal                              //
//----------------------------------------//
class Modal {
    // modal constructor
    constructor(element) {
        // new el object for modal 
        this.el = {};
        this.el.modal = element.modal;
        this.el.menu = element.menu;
        this.settings = {
            modal: {
                duration: 400,
                offset: 0,
                easing: 'easeInQuad'

            },
            modalContent: {
                duration: 400,
                easing: 'easeInQuad'

            },
            modalList: {
                duration: 500,
                easing: 'easeInOutQuad',
                delay: function (target, index) {
                    return index * 80;
                }
            }
        }
        this.init();
    }
    init() {
        // select modal content
        this.el.modalContent = this.el.modal.querySelector('.modal-content');
        // select modal menu 
        this.el.modalMenu = {
            contactInfo: this.el.modalContent.querySelector('.modal-menu .contact-info'),
            listItems: [...this.el.modalContent.querySelectorAll('.modal-menu .menu-list > .list-item h2')]
        };
        this.isAnimated = false;
        // init the animation timeline 
        this.animationTimeline = anime.timeline({
            direction: "normal",
            autoplay: false,
        });
        // add modal animations to the timeline 
        this.animationTimeline.add({
            targets: this.el.modal,
            duration: this.settings.modal.duration,
            offset: this.settings.modal.offset,
            easing: this.settings.modal.easing,
            width: !this.isAnimated ? ['0%', '100%'] : ['100%', '0%'],
            delay: !this.isAnimated ? 0 : 50
        }).add({
            targets: this.el.modalContent,
            duration: this.settings.modalContent.duration,
            offset: `-=${this.settings.modal.duration / 2}`,
            easing: this.settings.modalContent.easing,
            delay: !this.isAnimated ? 200 : 50,
            width: !this.isAnimated ? ['0%', `100%`] : [`100%`, '0%'],
            opacity: !this.isAnimated ? 1 : 0
        }).add({
            targets: this.el.modalMenu.listItems,
            duration: this.settings.modalList.duration,
            direction: this.settings.modalList.direction,
            offset: `-=${this.settings.modalContent.duration / 2 }`,
            easing: this.settings.modalList.easing,
            elasticity: this.settings.modalList.elasticity,
            delay: this.settings.modalList.delay,
            translateX: !this.isAnimated ? ['150%', 0] : [0, '150%'],
            opacity: {
                value: !this.isAnimated ? 1 : 0,
                duration: 1,
                delay: !this.isAnimated ? 200 : 600,
            }
        }).add({
            targets: this.el.modalMenu.contactInfo,
            duration: 400,
            offset: `-=${this.settings.modalList.duration}`,
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
        this.bindEvents();
    }
    bindEvents() {
        // toggleModal on click 
        this.openMenu = () => this.toggleModal();
        this.el.menu.addEventListener('click', this.openMenu);
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
        this.el.menu.classList.toggle('clicked');
        return this.toggle();
    }
}

export default Modal;