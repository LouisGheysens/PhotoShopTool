import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { actions } from 'src/app/providers/todos.actions';
import { todoSelector } from 'src/app/providers/todos.reducers';
import { TodoModel } from 'src/app/providers/todos.states';
import { TodoComponent } from '../todo/todo.component';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Output() event = new EventEmitter<TodoModel[]>();
  @Input() todo?: TodoModel;
  todos?: TodoModel[] = [];
  editTodo: boolean = false;
  todoInput?: string;
  completeTodo: boolean = false;
  dialog: any;

  constructor(private store: Store) { }

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
    // this.loadTodos();
  }


  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40";
    this.dialog.open(TodoComponent, dialogConfig)
  }


}
