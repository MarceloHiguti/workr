import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastrarVagaPage } from './cadastrar-vaga';

@NgModule({
  declarations: [
    CadastrarVagaPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastrarVagaPage),
  ],
})
export class CadastrarVagaPageModule {}
