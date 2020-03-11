import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';



const MaterialModule = [
 MatTabsModule
];

@NgModule({
  imports: [MaterialModule],

  exports: [MaterialModule]
})


export class AngularMaterialModule { }
