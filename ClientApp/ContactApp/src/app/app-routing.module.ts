import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ContactListsComponent} from './Components/contact-lists/contact-lists.component';
import {ContactDetailsComponent} from './Components/contact-details/contact-details.component';
import {SendMessageComponent} from './Components/send-message/send-message.component';
import {AuthGuard} from './Authguard/auth.guard';

const routes: Routes = [
  {path:"",
  component:ContactListsComponent},
  {
    path:'contactDetails',
    component:ContactDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'sendMessage',
    component:SendMessageComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
