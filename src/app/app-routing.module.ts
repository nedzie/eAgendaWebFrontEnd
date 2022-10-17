import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { AuthGuard } from './auth/services/auth.guard';
import { LoginGuard } from './auth/services/login.guard';

const routes: Routes = [
  { path: '', redirectTo: 'conta/registrar', pathMatch: 'full' },
  { path: 'conta/autenticar', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'conta/registrar', component: RegistroComponent, canActivate: [LoginGuard] },
  { path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module')
      .then(m => m.DashboardModule), // Lazy loading
      canActivate: [AuthGuard]
  },
  { path: 'tarefas',
    loadChildren: () => import('./tarefas/tarefa.module')
      .then(m => m.TarefaModule)
  },
  { path: 'contatos',
    loadChildren: () => import('./contatos/contato.module')
      .then(m => m.ContatoModule)
  },
  {
    path: 'compromissos',
    loadChildren: () => import('./compromissos/compromisso.module')
      .then(m => m.CompromissoModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
