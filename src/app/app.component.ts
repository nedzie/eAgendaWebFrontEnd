import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LocalStorageService } from './auth/services/local-storage.service';
import { UsuarioService } from './core/services/usuario.service';

@Component({
  selector: 'app-root',
  template: `
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {

  constructor(
    titulo: Title,
    private usuarioService: UsuarioService,
    private localStorage: LocalStorageService
    ) {
    titulo.setTitle("Início — eAgenda Web");
    this.logarUsuarioPersistido();
  }

  private logarUsuarioPersistido() {
    const usuarioPersistido = this.localStorage.obterUsuarioLogado();

    if(usuarioPersistido)
      this.usuarioService.logarUsuario(usuarioPersistido);
  }

}
