import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { todoSelector } from 'src/app/providers/todos.reducers';
import { TodoModel } from 'src/app/providers/todos.states';
import { TodoComponent } from '../todo/todo.component';



@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos:TodoModel[] = [];

  constructor(private store: Store, private dialog:MatDialog) { }

  ngOnInit(): void {
  }

  loadTodos() {
    this.store.select(todoSelector).subscribe((state) => this.todos = state);
  }

  onCreate() {
    this.todoservice.intializeFormGorup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(TodoComponent, dialogConfig)
  }



}
