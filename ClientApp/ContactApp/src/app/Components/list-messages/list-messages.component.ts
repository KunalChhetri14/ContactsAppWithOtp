import { Component, OnInit } from '@angular/core';
import {ContactsServiceService} from '../../Service/contacts-service.service';
import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';


@Component({
  selector: 'app-list-messages',
  templateUrl: './list-messages.component.html',
  styleUrls: ['./list-messages.scss']
})
export class ListMessagesComponent implements OnInit {

  constructor(private service:ContactsServiceService) { }
  messageDetails;
  loading=true;


  color: ThemePalette = 'primary';
  mode= 'indeterminate';
  value = 50;

  ngOnInit() {
    this.service.getUserMessages().subscribe(data=>{
      console.log("The messages are: ",data);
      this.messageDetails=data;
      this.loading=false;
    })
  }

}
