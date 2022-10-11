import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ContatoService } from '../services/contato.service';
import { FormsContatoViewModel } from '../view-models/forms-contato.view-model';

@Component({
  selector: 'app-editar-contato',
  templateUrl: './editar-contato.component.html'
})
export class EditarContatoComponent implements OnInit {
  public formContato: FormGroup;
  private contatoFormVM: FormsContatoViewModel = new FormsContatoViewModel;

  constructor(
    titulo: Title,
    private fb: FormBuilder,
    private contatoService: ContatoService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    titulo.setTitle('Edição de Contato — eAgenda');
  }

  ngOnInit(): void {
    this.contatoFormVM = this.route.snapshot.data['contato'];

    this.formContato = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required]],
      empresa: [''],
      cargo: ['']
    });

    this.formContato.patchValue({
      id: this.contatoFormVM.id,
      nome: this.contatoFormVM.nome,
      email: this.contatoFormVM.email,
      telefone: this.contatoFormVM.telefone,
      empresa: this.contatoFormVM.empresa ? this.contatoFormVM.empresa : '',
      cargo: this.contatoFormVM.cargo ? this.contatoFormVM.cargo : ''
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

    this.contatoService.editar(this.contatoFormVM)
      .subscribe({
        next: (contatoEditado) => this.processarSucesso(contatoEditado),
        error: (erro) => this.processarFalha(erro)
      })
  }

  private processarSucesso(contatoEditado: FormsContatoViewModel) {
    this.router.navigate(['/contatos/listar']);
  }

  private processarFalha(erro: any) {
    console.log(erro);
  }
}
