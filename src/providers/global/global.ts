import { Injectable } from '@angular/core';

@Injectable()
export class GlobalProvider {

  public _vagaFiltro: string;
  public _feedbackMotivo: string;
  public _feedbackObservacao: string;

  constructor() {
    console.log('Hello GlobalProvider Provider');
    this._vagaFiltro = 'Todos';
    this._feedbackMotivo = 'nenhum';
    this._feedbackObservacao = '';
  }

}
