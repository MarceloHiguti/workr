import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterFuncionarioPage } from './register-funcionario';

@NgModule({
  declarations: [
    RegisterFuncionarioPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterFuncionarioPage),
  ],
})
export class RegisterFuncionarioPageModule {}
