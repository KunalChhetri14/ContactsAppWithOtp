import { Component, OnInit } from '@angular/core';
import {ContactsServiceService} from '../../Service/contacts-service.service';
import {Location} from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {

  constructor(private service:ContactsServiceService,
              private _location: Location,
              private router:Router) { }

  //Store contactDetails
  contact={};

  //Fetch the contact details that is needed to be shown from contactInfo subject
  ngOnInit() {
    console.log("Kual");
    this.contact=this.service.getContact();
  }


  // Back button used to traverse back to previous page
  backClicked() {
    this._location.back();
  }

  // Used to navigate to send message component
  sendMessage(){
      this.router.navigateByUrl('/sendMessage')
  }

}
