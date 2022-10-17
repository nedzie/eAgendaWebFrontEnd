import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ContatoService } from 'src/app/contatos/services/contato.service';
import { CompromissoService } from '../services/compromisso.service';
import { FormsCompromissoViewModel } from '../view-models/forms-compromisso.view-model';
import { TipoLocalizacaoCompromissoEnum } from '../view-models/tipo-localizacao-compromisso.enum';

@Component({
  selector: 'app-inserir-compromisso',
  templateUrl: './inserir-compromisso.component.html'
})
export class InserirCompromissoComponent implements OnInit {
  public formCompromisso: FormGroup;
  public formCompromissoVM: FormsCompromissoViewModel = new FormsCompromissoViewModel;
  public contatos = this.contatoService.selecionarTodos();
  public tipos = Object.values(TipoLocalizacaoCompromissoEnum)
    .filter(v => !Number.isFinite(v));

  constructor(
    titulo: Title,
    private fb: FormBuilder,
    private compromissoService: CompromissoService,
    private contatoService: ContatoService,
    private router: Router
  ) {
    titulo.setTitle('Compromissos — eAgenda');
  }

  ngOnInit(): void {
    this.formCompromisso = this.fb.group({
      assunto: ['', [Validators.required, Validators.minLength(6)]],
      tipoLocalizacaoCompromisso: [''],
      local: [''],
      link: [''],
      data: ['', [Validators.required]],
      horaInicio: ['', [Validators.required]],
      horaTermino: ['', [Validators.required]],
      contato: [''],
      contatoId: ['', [Validators.required]]
    });

    this.processarTipoCompromisso();
  }

  get assunto() {
    return this.formCompromisso.get('assunto');
  }

  get tipoLocalizacaoCompromisso() {
    return this.formCompromisso.get('tipoLocalizacaoCompromisso');
  }

  get local() {
    return this.formCompromisso.get('local');
  }

  get link() {
    return this.formCompromisso.get('link');
  }

  get data() {
    return this.formCompromisso.get('data');
  }

  get horaInicio() {
    return this.formCompromisso.get('horaInicio');
  }

  get horaTermino() {
    return this.formCompromisso.get('horaTermino');
  }

  get contato() {
    return this.formCompromisso.get('contato');
  }

  get contatoId() {
    return this.formCompromisso.get('contatoId');
  }

  public gravar() {
    if(this.formCompromisso.invalid)
      return;

    this.formCompromissoVM = Object.assign({}, this.formCompromissoVM, this.formCompromisso.value);

    this.compromissoService.inserir(this.formCompromissoVM)
      .subscribe({
        next: (compromissoInserido) => this.processarSucesso(compromissoInserido),
        error: (erro) => this.processarFalha(erro)
      });
  }

   private processarSucesso(tarefa: FormsCompromissoViewModel) {
    this.router.navigate(['/compromissos/listar']);
  }

  private processarFalha(erro: any) {
    if(erro)
      console.log(erro);
  }

  private processarTipoCompromisso(): void {
    this.tipoLocalizacaoCompromisso?.valueChanges
        .subscribe(valor => {
          if(valor  === TipoLocalizacaoCompromissoEnum.Presencial) {
            this.local?.enable();
            this.local?.setValidators([Validators.required, Validators.minLength(3)]);
            this.local?.reset();
            this.link?.clearValidators();
            this.link?.disable();
          }
          else {
            this.link?.enable();
            this.link?.setValidators([Validators.required, Validators.minLength(3)]);
            this.link?.reset();
            this.local?.clearValidators();
            this.local?.disable();
          }
        }
  )}
}
