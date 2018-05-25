import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FuncionarioTabPage } from './funcionario-tab';

@NgModule({
  declarations: [
    FuncionarioTabPage,
  ],
  imports: [
    IonicPageModule.forChild(FuncionarioTabPage),
  ],
})
export class FuncionarioTabPageModule {}
