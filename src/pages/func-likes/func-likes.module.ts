import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FuncLikesPage } from './func-likes';

@NgModule({
  declarations: [
    FuncLikesPage,
  ],
  imports: [
    IonicPageModule.forChild(FuncLikesPage),
  ],
})
export class FuncLikesPageModule {}
