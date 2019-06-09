import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NewInitiativePage } from './new-initiative.page';

const routes: Routes = [
  {
    path: '',
    component: NewInitiativePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NewInitiativePage]
})
export class NewInitiativePageModule {}
