import { Component } from '@angular/core';
import { Historico } from '../models/historico';
import { HistoricoService } from '../servicos/historico.service';

import localePtBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public listaHistoricos: Historico[]= [];

  constructor(
    private historicoService: HistoricoService
  ) {
    registerLocaleData(localePtBr);
  }

  public buscarHistoricos() {
    this.listaHistoricos = [];

    this.historicoService.getAll().subscribe(dados => {
      this.listaHistoricos = dados.map(registro => {
        return {
          $key: registro.payload.doc.id,
          leitura: registro.payload.doc.data()['leitura'],
          dataHora: new Date(registro.payload.doc.data()['dataHora']['seconds'] * 1000), //o timestamp é exibido em segundos, e é preciso multiplicar por 100 para exibir uma data atual (ou real)
        } as Historico;
      });
    });
  }

  //sempre que a tela for chamada, esse método é chamado.
  async ionViewWillEnter() {
    await this.buscarHistoricos();
  }

  public deletar(key: string) {
    this.historicoService.delete(key);
    this.buscarHistoricos();
  }

}
