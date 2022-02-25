import { Component, OnInit, HostListener, Directive, Output, EventEmitter, ViewChild, ElementRef, Input } from '@angular/core';
import { FormatEnum, FileType2LabelMapping } from 'src/app/model/format';
import { fabric } from "fabric";
import { Store } from '@ngrx/store';
import { todoSelector } from 'src/app/providers/todos.reducers';
import { actions } from 'src/app/providers/todos.actions';
import { TodoModel } from 'src/app/providers/todos.states';
import { Canvas } from 'fabric/fabric-impl';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.css'],
  
})

export class WizardComponent implements OnInit {
  public rasterX: any;
  public rasterY: any;
  public rasterXTwo: any;
  public rasterYTwo: any;

  @Output() event = new EventEmitter<TodoModel[]>();
  @Input() todos?: TodoModel[] = [];
  todoInput?: string;

  @ViewChild('htmlCanvas')
  htmlCanvas!: ElementRef;
  private canvas!: fabric.Canvas;


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


  // @HostListener('mousemove', ['$event'])
 onMouseMove(e: any) {
    this.rasterX = e.screenX;
    this.rasterY = e.screenY;
  }



  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.store.select(todoSelector).subscribe(state => this.todos = state);

    this.x = 100;
    this.y = 100;
    this.px = 0;
    this.py = 0;
    this.width = 600;
    this.height = 300;
    this.draggingCorner = true;
    this.draggingWindow = true;
    this.minArea = 20000;

    this.canvas = new fabric.Canvas('canvas', {});
  }

  addTodo() {
    this.store.dispatch(actions.addTodoAction(
      {
        id: this.todos!.length,
        completed: false,
        title: this.todoInput!,
      }
    ));
    this.todoInput = '';
    this.event.emit(this.todos)
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

    // this.resizer(offsetX, offsetY);
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
    this.draggingWindow = true;
    this.draggingCorner = true;
  }

  getElement() {
    document.getElementById('chat');
  }


  addDiv() {
        let add = new fabric.Rect({
          width: 200, height: 100, left: 10, top: 10, angle: 0,
          fill: '',
          hoverCursor: 'default',
          hasBorders: true,
          dirty: false,
          lockMovementX: false,
          lockMovementY: false,
          evented: false,
        });
    this.selectItemAfterAdded(add);
    this.canvas.add(add);
    this.canvas.centerObject(add);


                  // prevent corner resizing
                  add.setControlsVisibility({
                    tl: false,
                    tr: false,
                    bl: false,
                    br: false,
                    mtr: false
                  });
  }
  selectItemAfterAdded(obj: any) {
    this.canvas.discardActiveObject().renderAll();
    this.canvas.setActiveObject(obj);
  }


}

