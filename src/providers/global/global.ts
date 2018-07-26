import { Injectable } from '@angular/core';

@Injectable()
export class GlobalProvider {

  public _vagaFiltro: string;

  constructor() {
    console.log('Hello GlobalProvider Provider');
    this._vagaFiltro = 'Todos';
  }

}
