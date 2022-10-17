import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ContatoService } from 'src/app/contatos/services/contato.service';
import { CompromissoService } from '../services/compromisso.service';
import { FormsCompromissoViewModel } from '../view-models/forms-compromisso.view-model';
import { TipoLocalizacaoCompromissoEnum } from '../view-models/tipo-localizacao-compromisso.enum';

@Component({
  selector: 'app-editar-compromisso',
  templateUrl: './editar-compromisso.component.html'
})
export class EditarCompromissoComponent implements OnInit {
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
    private route: ActivatedRoute,
    private router: Router
  ) {
    titulo.setTitle('Compromissos — eAgenda');
  }

  ngOnInit(): void {
    this.formCompromissoVM = this.route.snapshot.data['compromisso'];

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

    this.formCompromisso.patchValue({
      id: this.formCompromissoVM.id,
      assunto: this.formCompromissoVM.assunto,
      tipoLocalizacaoCompromisso: this.formCompromissoVM.tipoLocalizacaoCompromisso,
      local: this.formCompromissoVM.local,
      link: this.formCompromissoVM.link,
      data: this.formCompromissoVM.data.toString().split("T")[0],
      horaInicio: this.formCompromissoVM.horaInicio,
      horaTermino: this.formCompromissoVM.horaTermino,
      contatoId: this.formCompromissoVM.contatoId
    });

    if(this.tipoLocalizacaoCompromisso?.value === TipoLocalizacaoCompromissoEnum.Presencial)
      this.habilitarLocal();
    else
      this.habilitarLink();

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

    this.compromissoService.editar(this.formCompromissoVM)
      .subscribe({
        next: (compromissoEditado) => this.processarSucesso(compromissoEditado),
        error: (erro) => this.processarFalha(erro)
      });
  }

  private processarSucesso(compromissoEditado: FormsCompromissoViewModel) {
    this.router.navigate(['/compromissos/listar']);
  }

  private processarFalha(erro: any) {
    console.log(erro);
  }

  private processarTipoCompromisso(): void {
    this.tipoLocalizacaoCompromisso?.valueChanges
        .subscribe(valor => {
          console.log(valor);
          if(valor === TipoLocalizacaoCompromissoEnum.Presencial)
            this.habilitarLocal();
          else
            this.habilitarLink();
        }
  )}

  private habilitarLocal(): void {
    this.local?.enable();
    this.local?.setValidators([Validators.required, Validators.minLength(3)]);
    this.link?.clearValidators();
    this.link?.patchValue("");
    this.link?.disable();
  }

  private habilitarLink(): void {
    this.link?.enable();
    this.link?.setValidators([Validators.required, Validators.minLength(3)]);
    this.local?.clearValidators();
    this.local?.patchValue("");
    this.local?.disable();
  }

}
