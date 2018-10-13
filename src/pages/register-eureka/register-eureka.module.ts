import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterEurekaPage } from './register-eureka';

@NgModule({
  declarations: [
    RegisterEurekaPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterEurekaPage),
  ],
})
export class RegisterEurekaPageModule {}
