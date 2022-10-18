import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { VisualizarCategoriaViewModel } from "../view-models/visualizar-categoria.view-model";
import { CategoriaService } from "./categoria.service";

@Injectable()
export class VisualizarCategoriaResolver implements Resolve<VisualizarCategoriaViewModel> {
  constructor(private categoriaService: CategoriaService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<VisualizarCategoriaViewModel> {
    return this.categoriaService.selecionarCategoriaCompletaPorId(route.params['id']);
  }
}
