import { Component } from '@angular/core';
import { FilaService, Senha } from '../services/fila.service'

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  senhaEmitida: Senha | null = null;

  constructor(public filaService: FilaService) {}

  emitir(tipo: 'SP' | 'SG' | 'SE') {
    this.senhaEmitida = this.filaService.emitirSenha(tipo);
  }
}