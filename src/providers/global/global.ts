import { Injectable } from '@angular/core';

@Injectable()
export class GlobalProvider {

  public _vagaFiltro: string;
  public _feedbackMotivo: string;
  public _feedbackObservacao: string;
  public _candidatoNivel: string;
  public _candidatoIngles: string;

  constructor() {
    console.log('Hello GlobalProvider Provider');
    this._vagaFiltro = '';
    this._candidatoNivel = '0';
    this._candidatoIngles = '0';
    this._vagaFiltro = '';
    this._feedbackMotivo = 'nenhum';
    this._feedbackObservacao = '';
  }

}
