import { Injectable, ComponentFactoryResolver, Injector, ApplicationRef, EmbeddedViewRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { TodoComponent } from './todo.component';

@Injectable({
  providedIn: 'root'
})
export class TodoserviceService {
  private dialogSubject: Subject<any> = new Subject<any>();
  public dialogObservable$: Observable<any> | undefined;


  constructor(private compFactRes: ComponentFactoryResolver, private injector: Injector,
    private appRef: ApplicationRef) {
    this.dialogObservable$ = this.dialogSubject.asObservable();
   }

   public create() {
     const compoRef = this.compFactRes.resolveComponentFactory(TodoComponent)
     .create(this.injector);
     this.appRef.attachView(compoRef.hostView);
     const ele = (compoRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
     document.body.appendChild(ele);

   }
}
