import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmpresaTabPage } from './empresa-tab';

@NgModule({
  declarations: [
    EmpresaTabPage,
  ],
  imports: [
    IonicPageModule.forChild(EmpresaTabPage),
  ],
})
export class EmpresaTabPageModule {}
