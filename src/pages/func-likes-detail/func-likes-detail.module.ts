import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FuncLikesDetailPage } from './func-likes-detail';

@NgModule({
  declarations: [
    FuncLikesDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(FuncLikesDetailPage),
  ],
})
export class FuncLikesDetailPageModule {}
