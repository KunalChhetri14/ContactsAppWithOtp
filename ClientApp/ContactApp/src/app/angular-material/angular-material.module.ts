import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';

const MaterialComponents=[
  MatTabsModule,
  MatListModule
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialComponents,
    MatIconModule,
    MatButtonModule,
    MatInputModule
  ],
  exports:[
    MaterialComponents
  ]

  
})
export class AngularMaterialModule { }
