import { Injectable } from '@angular/core';
import { Contato } from '../componentes/contato/contato';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ContatoService {

  private readonly api = 'http://localhost:3000/contatos'

  constructor(private http: HttpClient) {}

  obterContatos(): Observable<Contato[]> {
    return this.http.get<Contato[]>(this.api);
  }

  salvarContato(contato: Contato) {
    return this.http.post<Contato>(this.api, contato)
  }

  buscarPorId(id: number): Observable<Contato> {
    const url = `${this.api}/${id}`
    return this.http.get<Contato>(url)
  }
  
  excluirContato(id: number): Observable<Contato> {
    const url = `${this.api}/${id}`
    return this.http.delete<Contato>(url)
  }
  
  editarContato(contato: Contato): Observable<Contato> {
    const url = `${this.api}/${contato.id}`
    return this.http.put<Contato>(url, contato)
  }

  editarOuSalvarContato(contato: Contato): Observable<Contato> {
    if(contato.id) {
        return this.editarContato(contato)
    } else {
        return this.salvarContato(contato)
    }
  }
}