import { Directive, NgZone } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appWindowScroll]'
})
export class WindowScrollDirective implements OnInit, OnDestroy {

  private eventOptions: boolean | { capture?: boolean, passive?: boolean };
  ngOnInit() {
    window.addEventListener('scroll', this.scroll, true); //third parameter
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scroll, true);
  }

  scroll = (): void => {
    console.log("Scrolling...");
    //handle your scroll here
    //notice the 'odd' function assignment to a class field
    //this is used to be able to remove the event listener
  };

}
