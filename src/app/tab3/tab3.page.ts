import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonList, IonListHeader, IonItem, IonLabel, IonBadge } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FilaService, Senha } from '../services/fila.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonList, IonListHeader, IonItem, IonLabel, IonBadge],
})
export class Tab3Page {
  senhaAtual: Senha | null = null;
  tm: number = 0;
  semSenhas: boolean = false;

  constructor(public filaService: FilaService) {}

  chamarProxima() {
    const proxima = this.filaService.proximaSenha();
    if (proxima) {
      this.senhaAtual = proxima;
      this.tm = this.filaService.calcularTM(proxima.tipo);
      this.semSenhas = false;
    } else {
      this.semSenhas = true;
    }
  }
}