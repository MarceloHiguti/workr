import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FuncConfigPage } from './func-config';

@NgModule({
  declarations: [
    FuncConfigPage,
  ],
  imports: [
    IonicPageModule.forChild(FuncConfigPage),
  ],
})
export class FuncConfigPageModule {}
