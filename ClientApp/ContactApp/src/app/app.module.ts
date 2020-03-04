import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContactListsComponent } from './Components/contact-lists/contact-lists.component';

import {AngularMaterialModule} from './angular-material/angular-material.module';
import { HttpClientModule } from '@angular/common/http';
import { ContactDetailsComponent } from './Components/contact-details/contact-details.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule, MatIcon} from '@angular/material/icon';
import { SendMessageComponent } from './Components/send-message/send-message.component';
import {MatInputModule} from '@angular/material/input';
import { ListMessagesComponent } from './Components/list-messages/list-messages.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { IgxListModule } from 'igniteui-angular';

@NgModule({
  declarations: [
    AppComponent,
    ContactListsComponent,
    ContactDetailsComponent,
    SendMessageComponent,
    ListMessagesComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    IgxListModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
