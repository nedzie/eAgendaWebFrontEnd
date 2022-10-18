import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/services/auth.guard';
import { CategoriaAppComponent } from './categoria-app.component';
import { EditarCategoriaComponent } from './editar/editar-categoria.component';
import { ExcluirCategoriaComponent } from './excluir/excluir-categoria.component';
import { InserirCategoriaComponent } from './inserir/inserir-categoria.component';
import { ListarCategoriaComponent } from './listar/listar-categoria.component';
import { FormsCategoriaResolver } from './services/forms-categoria.resolver';
import { VisualizarCategoriaResolver } from './services/visualizar-compromisso.resolver';

const routes: Routes = [
  { path: '', component: CategoriaAppComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'listar', pathMatch: 'full'},
      { path: 'listar', component: ListarCategoriaComponent },
      { path: 'inserir', component: InserirCategoriaComponent },
      {
        path: 'editar/:id',
        component: EditarCategoriaComponent,
        resolve: { categoria: FormsCategoriaResolver }
      },
      {
        path: 'excluir/:id',
        component: ExcluirCategoriaComponent,
        resolve: { categoria: VisualizarCategoriaResolver }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriaRoutingModule { }
