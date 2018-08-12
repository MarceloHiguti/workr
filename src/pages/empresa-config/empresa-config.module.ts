import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmpresaConfigPage } from './empresa-config';

@NgModule({
  declarations: [
    EmpresaConfigPage,
  ],
  imports: [
    IonicPageModule.forChild(EmpresaConfigPage),
  ],
})
export class EmpresaConfigPageModule {}
