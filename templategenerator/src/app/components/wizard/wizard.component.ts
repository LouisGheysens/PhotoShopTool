import { Component, OnInit, HostListener } from '@angular/core';
import { Format } from 'src/app/model/format';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.css']
})
export class WizardComponent implements OnInit {
  public rasterX: any;
  public rasterY: any;

  formats: Format[] = [
    {value: 'JPEG'},
    {value: 'PNG'},
  ];

  
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: any) {
    this.rasterX = e.screenX;
    this.rasterY = e.screenY;
    console.log(e);
  }

  canvas!: HTMLCanvasElement;

  constructor() { }

  ngOnInit(): void {
  }

  over() {
    console.log("Mouseover called");

  }

  out() {
    console.log("Mouseout called");
  }

}
