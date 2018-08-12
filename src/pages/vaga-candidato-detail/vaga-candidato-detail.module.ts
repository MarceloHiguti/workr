import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VagaCandidatoDetailPage } from './vaga-candidato-detail';

@NgModule({
  declarations: [
    VagaCandidatoDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(VagaCandidatoDetailPage),
  ],
})
export class VagaCandidatoDetailPageModule {}
