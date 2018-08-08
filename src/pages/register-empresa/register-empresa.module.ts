import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterEmpresaPage } from './register-empresa';

@NgModule({
  declarations: [
    RegisterEmpresaPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterEmpresaPage),
  ],
})
export class RegisterEmpresaPageModule {}
