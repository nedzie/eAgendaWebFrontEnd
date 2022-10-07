import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { TarefaService } from '../services/tarefa.service';
import { FormsTarefaViewModel, ItemTarefaViewModel } from '../view-models/forms-tarefa.view-model';
import { PrioridadeTarefaEnum } from '../view-models/prioridade-tarefa.enum';
import { StatusItemTarefa } from '../view-models/status-item-tarefa.enum';

@Component({
  selector: 'app-editar-tarefa',
  templateUrl: './editar-tarefa.component.html'
})
export class EditarTarefaComponent implements OnInit {
  public formTarefa: FormGroup;
  public formItens: FormGroup;
  public prioridades = Object
    .values(PrioridadeTarefaEnum)
      .filter(v => !Number.isFinite(v)); // Atribui os valores do PrioridadeTarefaEnum e atribui para 'prioridades'
  public tarefaFormVM: FormsTarefaViewModel = new FormsTarefaViewModel;

  constructor(
    titulo: Title,
    private fb: FormBuilder,
    private tarefaService: TarefaService,
    private route: ActivatedRoute
  ) {
    titulo.setTitle('Editar Tarefa — eAgenda')
  }

  ngOnInit(): void {
    // O resolver, antes de carregar a página, se comunica com o db e trás a tarefa do id que está nos params da rota.
    this.tarefaFormVM = this.route.snapshot.data['tarefa']; // Isso fica disponível aqui, e agora está no tarefaFormVM

    this.formTarefa = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(3)]],
      prioridade: ['', [Validators.required]]
    });

    this.formItens = this.fb.group({
      tituloItem: ['']
    });

    // patchValue permite edição parcial | setValue apenas edição completa
    this.formTarefa.patchValue({
      id: this.tarefaFormVM.id,
      titulo: this.tarefaFormVM.titulo,
      prioridade: this.tarefaFormVM.prioridade
    });
  }

  get titulo() {
    return this.formTarefa.get('titulo');
  }

  get prioridade() {
    return this.formTarefa.get('prioridade');
  }

  get tituloItem() {
    return this.formItens.get('tituloItem');
  }

  get itens(): ItemTarefaViewModel[] {
    return this.tarefaFormVM.itens.filter(x => x.status !== StatusItemTarefa.Removido);
  }

  public adicionarItem(): void {
    if(this.tituloItem) {
      let item = new ItemTarefaViewModel();
      item.titulo = this.tituloItem.value;
      item.status = StatusItemTarefa.Adicionado;

      this.tarefaFormVM.itens.push(item);

      this.formItens.reset();
    }
  }

  public removerItem(item: ItemTarefaViewModel): void {
    if(item) {
      this.tarefaFormVM.itens.forEach((x, index) => {
        if(x === item)
          item.status = StatusItemTarefa.Removido;
      });
    }
  }

  public atualizarItem(item: ItemTarefaViewModel): void {
    if(item) {
      this.tarefaFormVM.itens.forEach((x) => {
        if(x === item)
          item.concluido = !item.concluido;
      })
    }
  }

  public gravar() {
    if(this.formTarefa.invalid)
      return;

    this.tarefaFormVM = Object.assign({}, this.tarefaFormVM, this.formTarefa.value);

    this.tarefaService.editar(this.tarefaFormVM)
      .subscribe({
        next: (tarefaEditada) => this.processarSucesso(tarefaEditada),
        error: (erro) => this.processarFalha(erro)
      });
  }

  private processarSucesso(tarefaEditada: FormsTarefaViewModel) {
    this.router
  }

  private processarFalha(erro: any) {

  }

}
