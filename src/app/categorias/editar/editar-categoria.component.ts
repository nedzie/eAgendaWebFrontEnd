import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from '../services/categoria.service';
import { FormsCategoriaViewModel } from '../view-models/forms-categoria.view-model';

@Component({
  selector: 'app-editar-categoria',
  templateUrl: './editar-categoria.component.html'
})
export class EditarCategoriaComponent implements OnInit {
  public formCategoria: FormGroup;
  public formCategoriaVM: FormsCategoriaViewModel = new FormsCategoriaViewModel();

  constructor(
    titulo: Title,
    private fb: FormBuilder,
    private categoriaService: CategoriaService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formCategoriaVM = this.route.snapshot.data['categoria'];

    this.formCategoria = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(3)]]
    })

    this.formCategoria.patchValue({
      id: this.formCategoriaVM.id,
      titulo: this.formCategoriaVM.titulo
    });
  }

  get titulo() {
    return this.formCategoria.get('titulo');
  }

  public gravar() {
    if(this.formCategoria.invalid)
      return;

    this.formCategoriaVM = Object.assign({}, this.formCategoriaVM, this.formCategoria.value);

    this.categoriaService.editar(this.formCategoriaVM)
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
