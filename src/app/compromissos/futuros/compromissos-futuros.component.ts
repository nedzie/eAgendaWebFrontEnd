import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CompromissoService } from '../services/compromisso.service';
import { ListarCompromissoViewModel } from '../view-models/listar-compromisso.view-model';

@Component({
  selector: 'app-compromissos-futuros',
  templateUrl: './compromissos-futuros.component.html',
  styles: [
  ]
})
export class CompromissosFuturosComponent implements OnInit {
  public compromissos$: Observable<ListarCompromissoViewModel[]>;
  public formDatas: FormGroup

  constructor(
    private compromissoService: CompromissoService,
    private fb: FormBuilder
    ) { }

  ngOnInit(): void {
    this.formDatas = this.fb.group({
      dataInicial: ['', [Validators.required]],
      dataFinal: ['', [Validators.required]]
    });
  }

  get dataInicial() {
    return this.formDatas.get('dataInicial');
  }

  get dataFinal() {
    return this.formDatas.get('dataFinal');
  }

  public buscar() {
    this.compromissos$ = this.compromissoService.selecionarCompromissosFuturos(this.dataInicial?.value, this.dataFinal?.value);
  }

}
