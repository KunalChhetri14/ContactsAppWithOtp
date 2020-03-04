import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ContactsServiceService {

  constructor(private httpService: HttpClient,private router:Router) { }

 //Save the contact Details which needs to shown at the click
 contactInfo;


 //authguard boolean variable to disallow direct 
 //entry on refresh of page to view contactDetails and sendMessage component
 allowEntry=false;

 herokuAppUrl="https://contactlistserver.herokuapp.com/"
 postMessageDetails={};
 
 //service to call api's which return all the contacts as an array
  public getAllContacts(){
    return this.httpService.get(this.herokuAppUrl+"getContactList")
    .pipe(catchError(this.errHandler))
  }

//Savnig Clicked contact on ContactLists component on subject
//Required for next component i.e ContactDetails component.
 public savedContact(contact){
    this.contactInfo=contact;
 }


 public allowNavigate(){
   return this.allowEntry;
 }

 public getContact(){
   return this.contactInfo;
 }

  //Common method to handle errors 
  public errHandler(err: HttpErrorResponse) {
    console.log('Error handler in service');
    return throwError(err);
  }

  
  public callExternalMsgAPI(message:string):Observable<any>{
    console.log(message);
    this.postMessageDetails['message']=message;
    this.postMessageDetails['to']=this.contactInfo.phoneNumber;
    this.postMessageDetails['Name']=this.contactInfo.fName + this.contactInfo.lName;
    let date:Date=new Date();
    console.log("Date ="+date);
    
    this.postMessageDetails['Timeline']=date;
    console.log(this.postMessageDetails);
    return this.httpService.post(this.herokuAppUrl+"sendMessage",this.postMessageDetails)
    .pipe(catchError(this.errHandler))
  }


  public getUserMessages():Observable<any>{
      return this.httpService.get<any>(this.herokuAppUrl+"getMessages")
      .pipe(catchError(this.errHandler));
  }


}
