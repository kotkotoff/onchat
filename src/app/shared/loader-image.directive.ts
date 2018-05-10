import { Directive, HostListener, OnInit, Input } from '@angular/core';

@Directive({
  selector: '[loaderImage]'
})
export class LoaderImageDirective implements OnInit {
  @Input("loaderSrc") loader: HTMLElement;

  ngOnInit() {
   if (this.loader) {
      this.loader.hidden = false;
   }
  }

  @HostListener("loadeddata")
  @HostListener("load")
  frameLoaded() {
    if (this.loader) {
      this.loader.hidden = true;
   }
  }
}
