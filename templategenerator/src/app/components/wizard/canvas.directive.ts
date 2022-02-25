import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[canvas]'
})
export class CanvasDirective {
  @Output() onMouseMoveEvent = new EventEmitter<any>();

  constructor() { }

  @HostListener('mousemove', ['$event'])
  onMouseMove(e: any) {
    console.log(e);
    this.onMouseMoveEvent.emit(e)
   }

}
