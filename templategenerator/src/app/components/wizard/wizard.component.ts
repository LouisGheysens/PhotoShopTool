import { Component, OnInit, HostListener, Directive, Output, EventEmitter } from '@angular/core';
import { FormatEnum, FileType2LabelMapping } from 'src/app/model/format';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.css']
})
export class WizardComponent implements OnInit {
  public rasterX: any;
  public rasterY: any;
  public rasterXTwo: any;
  public rasterYTwo:any;


  x!: number;
  y!: number;
  px!: number;
  py!: number;
  width!: number;
  height!: number;
  minArea!: number;
  draggingCorner!: boolean;
  draggingWindow!: boolean;
  resizer!: Function;

  public FileType2LabelMapping = FileType2LabelMapping;
  public fileTypes = Object.values(FormatEnum);

  canvas!: HTMLCanvasElement;

  
  @HostListener('mousemove', ['$event'])
  onMouseMove(e: any) {
    this.rasterX = e.screenX;
    this.rasterY = e.screenY;
    // console.log(e);
  }

  constructor() { 
    this.x = 300;
    this.y = 100;
    this.px = 0;
    this.py = 0;
    this.width = 600;
    this.height = 300; 
    this.draggingCorner = false;
    this.draggingWindow = false;
    this.minArea = 20000
  }

  ngOnInit(): void {
  }

  over() {
    console.log("Mouseover called");

  }

  out() {
    console.log("Mouseout called");
  }

   area() {
    return this.width * this.height;
  }

  onWindowPress(event: MouseEvent) {
    this.draggingWindow = true;
    this.px = event.clientX;
    this.py = event.clientY;
  }

  onWindowDrag(event: MouseEvent) {
     if (!this.draggingWindow) {
        return;
    }
    let offsetX = event.clientX - this.px;
    let offsetY = event.clientY - this.py;

    this.x += offsetX;
    this.y += offsetY;
    this.px = event.clientX;
    this.py = event.clientY;
  }

  topLeftResize(offsetX: number, offsetY: number) {
    this.x += offsetX;
    this.y += offsetY;
    this.width -= offsetX;
    this.height -= offsetY;
  }

  topRightResize(offsetX: number, offsetY: number) {
    this.y += offsetY;
    this.width += offsetX;
    this.height -= offsetY;
  }

  bottomLeftResize(offsetX: number, offsetY: number) {
    this.x += offsetX;
    this.width -= offsetX;
    this.height += offsetY;
  }

  bottomRightResize(offsetX: number, offsetY: number) {
    this.width += offsetX;
    this.height += offsetY;
  }

  onCornerClick(event: MouseEvent, resizer?: Function) {
    this.draggingCorner = true;
    this.px = event.clientX;
    this.py = event.clientY;
    this.resizer = resizer!;
    event.preventDefault();
    event.stopPropagation();
  }

  @HostListener('document:mousemove', ['$event'])
  onCornerMove(event: MouseEvent) {
    if (!this.draggingCorner) {
        return;
    }
    let offsetX = event.clientX - this.px;
    let offsetY = event.clientY - this.py;

    let lastX = this.x;
    let lastY = this.y;
    let pWidth = this.width;
    let pHeight = this.height;

    this.resizer(offsetX, offsetY);
    if (this.area() < this.minArea) {
        this.x = lastX;
        this.y = lastY;
        this.width = pWidth;
        this.height = pHeight;
    }
    this.px = event.clientX;
    this.py = event.clientY;
  }

  @HostListener('document:mouseup', ['$event'])
  onCornerRelease(event: MouseEvent) {
    this.draggingWindow = false;
    this.draggingCorner = false;
  }

}
