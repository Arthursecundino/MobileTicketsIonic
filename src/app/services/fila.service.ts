import { Injectable } from '@angular/core';

export interface Senha {
  numero: string;
  tipo: 'SP' | 'SG' | 'SE';
  emitidaEm: Date;
  atendidaEm?: Date;
  guiche?: number;
  atendida: boolean;
  descartada: boolean;
}

@Injectable({ providedIn: 'root' })
export class FilaService {
  filaSP: Senha[] = [];
  filaSG: Senha[] = [];
  filaSE: Senha[] = [];
  ultimasChamadas: Senha[] = [];
  contadores = { SP: 0, SG: 0, SE: 0 };
  ultimoTipoChamado: 'SP' | 'SG' | 'SE' | null = null;

  gerarNumero(tipo: 'SP' | 'SG' | 'SE'): string {
    const agora = new Date();
    const yy = String(agora.getFullYear()).slice(-2);
    const mm = String(agora.getMonth() + 1).padStart(2, '0');
    const dd = String(agora.getDate()).padStart(2, '0');
    this.contadores[tipo]++;
    const seq = String(this.contadores[tipo]).padStart(3, '0');
    return `${yy}${mm}${dd}-${tipo}${seq}`;
  }

  emitirSenha(tipo: 'SP' | 'SG' | 'SE'): Senha {
    const descartada = Math.random() < 0.05;
    const senha: Senha = {
      numero: this.gerarNumero(tipo),
      tipo,
      emitidaEm: new Date(),
      atendida: false,
      descartada
    };
    if (!descartada) {
      if (tipo === 'SP') this.filaSP.push(senha);
      else if (tipo === 'SG') this.filaSG.push(senha);
      else this.filaSE.push(senha);
    }
    return senha;
  }

  proximaSenha(): Senha | null {
    const agora = new Date();
    const hora = agora.getHours();
    if (hora < 7 || hora >= 17) return null;

    let proxima: Senha | undefined;

    if (this.ultimoTipoChamado !== 'SP' && this.filaSP.length > 0) {
      proxima = this.filaSP.shift();
    } else if (this.filaSE.length > 0) {
      proxima = this.filaSE.shift();
    } else if (this.filaSG.length > 0) {
      proxima = this.filaSG.shift();
    } else if (this.filaSP.length > 0) {
      proxima = this.filaSP.shift();
    }

    if (!proxima) return null;

    proxima.atendida = true;
    proxima.atendidaEm = new Date();
    proxima.guiche = Math.floor(Math.random() * 3) + 1;
    this.ultimoTipoChamado = proxima.tipo;

    this.ultimasChamadas.unshift(proxima);
    if (this.ultimasChamadas.length > 5) this.ultimasChamadas.pop();

    return proxima;
  }

  calcularTM(tipo: 'SP' | 'SG' | 'SE'): number {
    if (tipo === 'SP') {
      const variacao = (Math.random() < 0.5 ? 1 : -1) * 5;
      return 15 + variacao;
    }
    if (tipo === 'SG') {
      const variacao = (Math.random() * 6) - 3;
      return Math.round(5 + variacao);
    }
    return Math.random() < 0.95 ? 1 : 5;
  }
}