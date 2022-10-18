import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompromissoRoutingModule } from './compromisso-routing.module';
import { CompromissoAppComponent } from './compromisso-app.component';
import { InserirCompromissoComponent } from './inserir/inserir-compromisso.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';
import { ListarCompromissoComponent } from './listar/listar-compromisso.component';
import { CompromissoService } from './services/compromisso.service';
import { ContatoService } from '../contatos/services/contato.service';
import { EditarCompromissoComponent } from './editar/editar-compromisso.component';
import { FormsCompromissoResolver } from './services/forms-compromisso.resolver';
import { ExcluirCompromissoComponent } from './excluir/excluir-compromisso.component';
import { VisualizarCompromissoResolver } from './services/visualizar-compromisso.resolver';
import { CompromissosPassadosComponent } from './passados/compromissos-passados.component';
import { CompromissosFuturosComponent } from './futuros/compromissos-futuros.component';


@NgModule({
  declarations: [
    CompromissoAppComponent,
    InserirCompromissoComponent,
    ListarCompromissoComponent,
    EditarCompromissoComponent,
    ExcluirCompromissoComponent,
    CompromissosPassadosComponent,
    CompromissosFuturosComponent
  ],
  imports: [
    CommonModule,
    CompromissoRoutingModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  providers: [CompromissoService, ContatoService, FormsCompromissoResolver, VisualizarCompromissoResolver]
})
export class CompromissoModule { }
