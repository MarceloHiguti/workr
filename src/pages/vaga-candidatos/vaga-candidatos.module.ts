import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VagaCandidatosPage } from './vaga-candidatos';

@NgModule({
  declarations: [
    VagaCandidatosPage,
  ],
  imports: [
    IonicPageModule.forChild(VagaCandidatosPage),
  ],
})
export class VagaCandidatosPageModule {}
