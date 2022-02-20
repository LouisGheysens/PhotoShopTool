import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { todoSelector } from 'src/app/providers/todos.reducers';
import { TodoModel } from 'src/app/providers/todos.states';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos:TodoModel[] = [];

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  loadTodos() {
    this.store.select(todoSelector).subscribe((state) => this.todos = state);
  }



}
