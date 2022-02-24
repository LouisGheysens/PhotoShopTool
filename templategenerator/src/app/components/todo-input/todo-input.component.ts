import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { actions } from 'src/app/providers/todos.actions';
import { todoSelector } from 'src/app/providers/todos.reducers';
import { TodoModel } from 'src/app/providers/todos.states';
import { WizardComponent } from '../wizard/wizard.component'; 

@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.css']
})
export class TodoInputComponent extends WizardComponent {
  
  // @ViewChild('canvas', { static: false })
  // // canvas!: WizardComponent;

  // // constructor(private store: Store) { }

  // ngOnInit(): void {
  //   console.log(this.todos);

  //   this.store.select(todoSelector).subscribe(state => this.todos = state);
  // }

  

  // addDiv(figure: any) {
  //   this.canvas.addDiv(figure);
  // }

}
