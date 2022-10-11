import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ContatoService } from '../services/contato.service';
import { FormsContatoViewModel } from '../view-models/forms-contato.view-model';

@Component({
  selector: 'app-inserir-contato',
  templateUrl: './inserir-contato.component.html'
})
export class InserirContatoComponent implements OnInit {
  public formContato: FormGroup;
  private contatoFormVM: FormsContatoViewModel = new FormsContatoViewModel;

  constructor(
    titulo: Title,
    private fb: FormBuilder,
    private contatoService: ContatoService,
    private router: Router
  ) {
    titulo.setTitle('Cadastrar Contato — eAgenda');
  }

  ngOnInit(): void {
    this.formContato = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required]],
      empresa: [''],
      cargo: ['']
    });
  }

  get nome() {
    return this.formContato.get('nome');
  }

  get email() {
    return this.formContato.get('email');
  }

  get telefone() {
    return this.formContato.get('telefone');
  }

  get empresa() {
    return this.formContato.get('empresa');
  }

  get cargo() {
    return this.formContato.get('cargo');
  }

  public gravar() {
    if(this.formContato.invalid)
      return;

    this.contatoFormVM = Object.assign({}, this.contatoFormVM, this.formContato.value);

    this.contatoService.inserir(this.contatoFormVM)
      .subscribe({
        next: (contatoInserido) => this.processarSucesso(contatoInserido),
        error: (erro) => this.processarFalha(erro)
      });
  }

  private processarSucesso(contato: FormsContatoViewModel) {
    this.router.navigate(['/contatos/listar']);
  }

  private processarFalha(erro: any) {
    if(erro)
      console.log(erro);
  }
}
