import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FileType2LabelMapping, VisitorEnum } from 'src/app/model/visitors';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  closeResult = '';
  header: string= 'THIS IS A MODAL TEST';


  public FileType2LabelMapping = FileType2LabelMapping;
  public fileTypes = Object.values(VisitorEnum);

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  closeModal() {
  }


}
