import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CompromissoService } from '../services/compromisso.service';
import { VisualizarCompromissoViewModel } from '../view-models/visualizar-compromisso.view-model';

@Component({
  selector: 'app-excluir-compromisso',
  templateUrl: './excluir-compromisso.component.html'
})
export class ExcluirCompromissoComponent implements OnInit {
  public compromissoFormVM: VisualizarCompromissoViewModel = new VisualizarCompromissoViewModel();

  constructor(
    titulo: Title,
    private compromissoService: CompromissoService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    titulo.setTitle('Exclusão de Compromisso — eAgenda');
  }

  ngOnInit(): void {
    this.compromissoFormVM = this.route.snapshot.data['compromisso'];
  }

  public gravar() {
    this.compromissoService.excluir(this.compromissoFormVM.id)
      .subscribe({
          next: (compromissoId) => this.processarSucesso(compromissoId),
          error: (erro) => this.processarFalha(erro)
        });
  }

  private processarSucesso(id: string) {
    this.router.navigate(['/compromissos/listar']);
  }

  private processarFalha(erro: any) {
    if(erro)
      console.log(erro);
  }
}
