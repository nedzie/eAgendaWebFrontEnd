import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ContatoService } from '../services/contato.service';
import { FormsContatoViewModel } from '../view-models/forms-contato.view-model';

@Component({
  selector: 'app-excluir-contato',
  templateUrl: './excluir-contato.component.html'
})
export class ExcluirContatoComponent implements OnInit {
  public contatoFormVM: FormsContatoViewModel = new FormsContatoViewModel;

  constructor(
    titulo: Title,
    private contatoService: ContatoService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    titulo.setTitle('Exclusão de Contato — eAgenda');
  }

  ngOnInit(): void {
    this.contatoFormVM = this.route.snapshot.data['contato'];
  }

  public gravar() {
    this.contatoService.excluir(this.contatoFormVM.id)
      .subscribe({
        next: (contatoId) => this.processarSucesso(contatoId),
        error: (erro) => this.processarFalha(erro)
      });
  }

  private processarSucesso(id: string) {
    this.router.navigate(['/contatos/listar']);
  }

  private processarFalha(erro: any) {
    if(erro)
      console.log(erro);
  }
}
