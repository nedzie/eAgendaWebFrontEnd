import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ContatoService } from '../services/contato.service';
import { ListarContatoViewModel } from '../view-models/listar-contato.view-model';

@Component({
  selector: 'app-listar-contato',
  templateUrl: './listar-contato.component.html'
})
export class ListarContatoComponent implements OnInit {
  public contato$: Observable<ListarContatoViewModel[]>;

  constructor(
    private contatoService: ContatoService
  ) { }

  ngOnInit(): void {
    this.contato$ = this.contatoService.selecionarTodos();
  }
}
