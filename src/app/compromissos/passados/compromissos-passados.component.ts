import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CompromissoService } from '../services/compromisso.service';
import { ListarCompromissoViewModel } from '../view-models/listar-compromisso.view-model';

@Component({
  selector: 'app-compromissos-passados',
  templateUrl: './compromissos-passados.component.html'
})
export class CompromissosPassadosComponent implements OnInit {
  public compromissos$: Observable<ListarCompromissoViewModel[]>;
  constructor(private compromissoService: CompromissoService) { }

  ngOnInit(): void {
    this.compromissos$ = this.compromissoService.selecionarCompromissosPassados(new Date());
  }

}
