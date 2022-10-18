import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { FormsCategoriaViewModel } from "../view-models/forms-categoria.view-model";
import { CategoriaService } from "./categoria.service";

@Injectable()
export class FormsCategoriaResolver implements Resolve<FormsCategoriaViewModel> {
  constructor(private categoriaService: CategoriaService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<FormsCategoriaViewModel>{
    return this.categoriaService.selecionarPorId(route.params['id']);
  }
}
