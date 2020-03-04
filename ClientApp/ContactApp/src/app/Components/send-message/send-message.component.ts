import { Component, OnInit } from '@angular/core';
import {ContactsServiceService} from '../../Service/contacts-service.service';
import {Location} from '@angular/common';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material'

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.css']
})
export class SendMessageComponent implements OnInit {

  constructor(private contactservice:ContactsServiceService,
              private location:Location,
              private router:Router,
              private _snackbar: MatSnackBar,) { }
  textMessage;

 snackBarReference;

  ngOnInit() {
    var sixdigitsrandomOTP = Math.floor(100000 + Math.random() * 900000);
    this.textMessage="Hi,your OTP is "+sixdigitsrandomOTP;
    

  }

   // Back button used to traverse back to previous page
   backClicked() {
    this.location.back();
  }

  callMessageAPI(){
      this.contactservice.callExternalMsgAPI(this.textMessage).subscribe(
        //if success then
        data=>{
        console.log("message status",data);
        // this.snackBarReference=this._snackbar.open('Message has been sent succesfully');

        this._snackbar.open('Message has been sent succesfully', '', {
          duration: 2000,
          
        });
        //console.log("Message has been sent succesfully");
        // setTimeout(function(){ 
        //   this.snackBarReference.dis
        //   this.router.navigateByUrl('/');
        //  }, 1000);
        


        
        //navigate and then regresh page as the message tab also needs to be refreshed.
        this.router.navigate(['/'])
       .then(() => {
        window.location.reload();
  });


        //this.router.navigateByUrl('/');
      },
      
      err=>{
        if(err.status==502){
          this._snackbar.open('Message sent to device but couldnot save to database side error', '', {
            duration: 2000
          });
        }
        else if(err.status==501){
          this._snackbar.open('Could not sent message', '', {
            duration: 2000
          });
        }
        else{
          this._snackbar.open('Unknown server error', '', {
            duration: 2000
          });
        }
      }
      
      )
  }

}
