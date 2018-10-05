import { Injectable } from '@angular/core';

@Injectable()
export class GlobalProvider {

  public _empresaName: string;
  public _vagaFiltro: string;
  public _feedbackMotivo: string;
  public _feedbackObservacao: string;
  public _candidatoNivel: string;
  public _candidatoIngles: string;
  public _filtrosArray: string[];
  public _areasArray: string[];

  constructor() {
    console.log('Hello GlobalProvider Provider');
    this._empresaName = '';
    this._vagaFiltro = '';
    this._candidatoNivel = '0';
    this._candidatoIngles = '0';
    this._vagaFiltro = '';
    this._feedbackMotivo = 'nenhum';
    this._feedbackObservacao = '';
    this._filtrosArray = ["Todos", "Tecnologia", "Engenharia", "Educação", "Gastronomia", "Vendas",
      "Administração", "Saúde", "Finanças", "Manutenção", "Limpeza", "Outros"];
    this._areasArray = ["Tecnologia", "Engenharia", "Educação", "Gastronomia", "Vendas",
      "Administração", "Saúde", "Finanças", "Manutenção", "Limpeza", "Outros"];
  }

}
