import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ContactListsComponent} from './Components/contact-lists/contact-lists.component';
import {ContactDetailsComponent} from './Components/contact-details/contact-details.component';
import {SendMessageComponent} from './Components/send-message/send-message.component';


const routes: Routes = [
  {path:"",
  component:ContactListsComponent},
  {
    path:'contactDetails',
    component:ContactDetailsComponent
  },
  {
    path:'sendMessage',
    component:SendMessageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
