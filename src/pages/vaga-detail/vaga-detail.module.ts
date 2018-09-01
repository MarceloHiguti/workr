import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VagaDetailPage } from './vaga-detail';

@NgModule({
  declarations: [
    VagaDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(VagaDetailPage),
  ],
})
export class VagaDetailPageModule {}
