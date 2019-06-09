import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InitiativeDetailsPage } from './initiative-details.page';

const routes: Routes = [
  {
    path: '',
    component: InitiativeDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InitiativeDetailsPage]
})
export class InitiativeDetailsPageModule {}
