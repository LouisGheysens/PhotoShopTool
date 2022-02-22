import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FileType2LabelMapping, VisitorEnum } from 'src/app/model/visitors';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  
  public FileType2LabelMapping = FileType2LabelMapping;
  public fileTypes = Object.values(VisitorEnum);

  constructor() { }

  ngOnInit(): void {
  }

  closeModal() {
  }


}
