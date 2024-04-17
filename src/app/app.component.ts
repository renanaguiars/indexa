import { Component } from '@angular/core';
import unidecode from 'unidecode'; // Importe a função unidecode
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ContainerComponent } from './componentes/container/container.component';
import { CabecalhoComponent } from './componentes/cabecalho/cabecalho.component';
import { SeparadorComponent } from './componentes/separador/separador.component';
import { ContatoComponent } from './componentes/contato/contato.component';
import { FormsModule } from '@angular/forms';

interface Contato {
  id: number
  nome: string 
  telefone: string
}

import agenda from './agenda.json'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ContainerComponent,
    CabecalhoComponent,
    SeparadorComponent,
    ContatoComponent,
    FormsModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  alfabeto: string = 'abcdefghijklmnopqrstuvwxyz';
  contatos: Contato[] = agenda;

  filtroPorTexto: string = ''

  filtrarContatosPorTexto(): Contato[] {
    if (!this.filtroPorTexto) {
      return this.contatos;
    } 
    const filtroNormalizado = unidecode(this.filtroPorTexto.toLowerCase()); // Normaliza o filtro de texto
    return this.contatos.filter(contato => {
      const nomeNormalizado = unidecode(contato.nome.toLowerCase()); // Normaliza o nome do contato
      return nomeNormalizado.includes(filtroNormalizado); // Verifica se o nome normalizado inclui o filtro normalizado
    });
  }

  filtrarContatosPorLetraInicial(letra: string): Contato[] {
    return this.filtrarContatosPorTexto().filter(contato => {
      return unidecode(contato.nome.toLowerCase()).startsWith(letra); // Normaliza o nome do contato antes de verificar a letra inicial
    });
  }
}
