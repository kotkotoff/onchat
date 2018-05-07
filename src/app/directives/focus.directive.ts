import { NgZone, Renderer, Directive, Input, OnInit } from '@angular/core';

@Directive({
    selector: '[focusDirective]'
})
export class FocusDirective implements OnInit {
    @Input() cssSelector: string;

    constructor(
        private ngZone: NgZone,
        private renderer: Renderer
    ) { }

    ngOnInit() {
        this.ngZone.runOutsideAngular(() => {
            setTimeout(() => {
                this.renderer.selectRootElement(this.cssSelector).focus();
            }, 0);
        });
    }
}
