import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmpresaFiltrosPage } from './empresa-filtros';

@NgModule({
  declarations: [
    EmpresaFiltrosPage,
  ],
  imports: [
    IonicPageModule.forChild(EmpresaFiltrosPage),
  ],
})
export class EmpresaFiltrosPageModule {}
