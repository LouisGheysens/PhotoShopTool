import { Component, OnInit, Input, EventEmitter, Output, ElementRef, ViewChild } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';
import { ModalDismissReasons, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { State, Store } from '@ngrx/store';
import { actions } from 'src/app/providers/todos.actions';
import { todoSelector } from 'src/app/providers/todos.reducers';
import { TodoModel } from 'src/app/providers/todos.states';
import { TodoserviceService } from '../todo/todoservice.service';
import { TodoComponent } from '../todo/todo.component';
import {CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FileType2LabelMapping } from 'src/app/model/visitors';
import { VisitorEnum } from 'src/app/model/visitors';
import { FormControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ColorPickerModule } from 'ngx-color-picker';
import { fabric } from "fabric";


@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})

export class TodoItemComponent implements OnInit {
  @Output() event = new EventEmitter<TodoModel[]>();
  @Input() todo?: TodoModel;
  todos?: TodoModel[] = [];
  closeResult = '';
  editTodo: boolean = false;
  todoInput?: string;
  completeTodo: boolean = false;
  dialog: any;
  @Input() name: any;
  @ViewChild('htmlCanvas') htmlCanvas: ElementRef | undefined;
  @ViewChild('content')
  content!: ElementRef;
  private canvas!: fabric.Canvas;


  
  public FileType2LabelMapping = FileType2LabelMapping;
  public fileTypes = Object.values(VisitorEnum);

  
  formControl: FormControl | undefined;
  
  public disabled = false;
  public color: ThemePalette = 'primary';
  public touchUi = false;
  
  colorCtr: FormControl = new FormControl(null);

  public options = [
    { value: true, label: 'True' },
    { value: false, label: 'False' }
  ];

  public listColors = ['primary', 'accent', 'warn'];

  public codeColorPicker = `
  <mat-form-field>
    <input matInput [ngxMatColorPicker]="picker" [formControl]="colorCtr">
    <ngx-mat-color-toggle matSuffix [for]="picker"></ngx-mat-color-toggle>
    <ngx-mat-color-picker #picker></ngx-mat-color-picker>
  </mat-form-field>`;


  constructor(private store: Store, private modalService: NgbModal,
    private todoService: TodoserviceService) { }

  ngOnInit(): void {
    this.completeTodo = this.todo!.completed;
    this.todoInput = this.todo!.title;
    this.loadTodos();
  }
  loadTodos() {
    this.store.select(todoSelector).subscribe((state) => this.todos = state);
  }

  updateToggle() {
    this.editTodo = !this.editTodo;
  }



  updateTodo() {
    this.editTodo = !this.editTodo;
    if (this.todoInput!.trim().length > 0)
      this.store.dispatch(actions.updateTodoAction({
        id: this.todo!.id,
        completed: this.todo!.completed,
        title: this.todoInput!.trim(),
      }));
    else {
      this.todoInput = this.todo!.title;
    }
  }

  deleteTodo() {
    console.log(this.todos);
    this.store.dispatch(actions.deleteTodoAction({
      id: this.todo!.id,
      completed: this.todo!.completed,
      title: this.todo!.title,
    }));
    console.log(this.todos);
    this.event.emit(this.todos)
  }

  onCreate() {
    this.todoService.create()
  }

  open() {
    this.modalService.open(this.content, {centered: false, size: 'xl'});
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.todos!, event.previousIndex, event.currentIndex);
  }

  
  // addImage(e:any): void {
  //   let context = this.canvas;
  //   var render = new FileReader();
  //   render.onload = function(event) {
  //     var img = new Image();
  //     img.onload = function() {
  //     }
  //     img.src = event.target?.result;
  //   }
  // }



}