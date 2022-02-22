import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { actions } from 'src/app/providers/todos.actions';
import { todoSelector } from 'src/app/providers/todos.reducers';
import { TodoModel } from 'src/app/providers/todos.states';

@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.css']
})
export class TodoInputComponent implements OnInit {
  @Output() event = new EventEmitter<TodoModel[]>();
  @Input() todos?: TodoModel[] = [];
  todoInput?: string;

  constructor(private store: Store) { }

  ngOnInit(): void {
    console.log(this.todos);

    this.store.select(todoSelector).subscribe(state => this.todos = state);
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

}
