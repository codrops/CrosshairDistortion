import { gsap } from 'gsap';

export class MenuItem {
    constructor(el) {
        this.DOM = {el};
        // all text chars (Splittingjs) 
        this.DOM.titleChars = this.DOM.el.querySelectorAll('span.char');
        // initial and final colors for each span char (before and after hovering)
        const bodyComputedStyle = getComputedStyle(document.body);
        this.colors = {
            initial: bodyComputedStyle.getPropertyValue('--color-menu'), 
            final: bodyComputedStyle.getPropertyValue('--color-link')
        };
        this.initEvents();
    }
    initEvents() {
        this.onMouseEnterEv = () => this.onMouseEnter();
        this.DOM.el.addEventListener('mouseenter', this.onMouseEnterEv);

        this.onMouseLeaveEv = () => this.onMouseLeave();
        this.DOM.el.addEventListener('mouseleave', this.onMouseLeaveEv);
    }
    onMouseEnter() {
        if ( this.leaveTimeline ) {
            this.leaveTimeline.kill();
        }

        // let's try to do an animation that resembles a glitch effect on the characters
        // we randomly set new positions for the translation and rotation values of each char and also set a new color
        // and repeat this for 3 times
        this.enterTimeline = gsap.timeline({
            defaults: {
                duration: 0.05,
                ease: 'power3',
                x: () => gsap.utils.random(-15, 15),
                y: () => gsap.utils.random(-20, 10),
                rotation: () => gsap.utils.random(-5, 5),
                color: () => gsap.utils.random(0, 3) < 0.5 ? this.colors.final : this.colors.initial
            }
        })
        // repeat 3 times (repeatRefresh option will make sure the translation/rotation values will be different for each iteration)
        .to(this.DOM.titleChars, {
            repeat: 3,
            repeatRefresh: true
        }, 0)
        // reset translation/rotation and set final color
        .to(this.DOM.titleChars, {
            x: 0, 
            y: 0, 
            rotation: 0,
            color: this.colors.final
        }, '+=0.05');
    }
    onMouseLeave() {
        // set back the initial color for each char
        this.leaveTimeline = gsap.timeline()
        .to(this.DOM.titleChars, {
            duration: 0.4,
            ease: 'power3',
            color: this.colors.initial
        });
    }
}