import { Component, OnInit } from '@angular/core';
import {ContactsServiceService} from '../../Service/contacts-service.service'
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material'

@Component({
  selector: 'app-contact-lists',
  templateUrl: './contact-lists.component.html',
  styleUrls: ['./contact-lists.component.css']
})
export class ContactListsComponent implements OnInit {

  constructor(private service:ContactsServiceService,
              private router:Router,
              private _snackbar:MatSnackBar) { }
  
  //array to store all the contact info fetched from the server
  contactList;

  loading=true;


  color= 'primary';
  mode= 'indeterminate';
  value = 50;




  ngOnInit(): void {

    this.service.getAllContacts().subscribe(data=>{
      this.contactList=data;
      console.log(this.contactList)
      this.loading=false;
    },
    err=>{
      this.loading=false;
      this._snackbar.open('Data cannot be fetched please reload the page');
    })
  }


  navigateToDetails(contactDetails){
    console.log(contactDetails);
    this.service.savedContact(contactDetails);
    this.router.navigateByUrl('/contactDetails');

  }
}
