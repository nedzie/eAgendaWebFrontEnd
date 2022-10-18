import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CategoriaService } from '../services/categoria.service';
import { FormsCategoriaViewModel } from '../view-models/forms-categoria.view-model';

@Component({
  selector: 'app-inserir-categoria',
  templateUrl: './inserir-categoria.component.html'
})
export class InserirCategoriaComponent implements OnInit {
  public formCategoria: FormGroup;
  public formCategoriaVM: FormsCategoriaViewModel = new FormsCategoriaViewModel();

  constructor(
    titulo: Title,
    private fb: FormBuilder,
    private categoriaService: CategoriaService,
    private router: Router
  ) {
    titulo.setTitle('Cadastro de Categoria — eAgenda');
  }

  ngOnInit(): void {
    this.formCategoria = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(3)]]
    })
  }

  get titulo() {
    return this.formCategoria.get('titulo');
  }

  public gravar() {
    if(this.formCategoria.invalid)
      return;

    this.formCategoriaVM = Object.assign({}, this.formCategoriaVM, this.formCategoria.value);

    this.categoriaService.inserir(this.formCategoriaVM)
      .subscribe({
        next: (categoriaInserida) => this.processarSucesso(categoriaInserida),
        error: (erro) => this.processarFalha(erro)
      });
  }

  private processarSucesso(categoria: FormsCategoriaViewModel) {
    this.router.navigate(['/categorias/listar']);
  }

  private processarFalha(erro: any) {
    if(erro)
      console.log(erro);
  }
}
