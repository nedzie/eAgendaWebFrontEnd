import { Injectable } from "@angular/core";
import { TokenViewModel, UsuarioTokenViewModel } from "../view-models/token.view-model";

@Injectable()
export class LocalStorageService {

  public salvarDadosDoUsuario(resposta: TokenViewModel): void {
    this.salvarTokenUsuario(resposta.chave);
    this.salvarUsuario(resposta.usuarioToken);
  }

  public salvarTokenUsuario(token: string): void {
    localStorage.setItem('eAgenda.token', token);
  }

  public salvarUsuario(usuario: UsuarioTokenViewModel): void {
    localStorage.setItem('eAgenda.usuario', JSON.stringify(usuario));
  }

  public obterUsuarioLogado(): UsuarioTokenViewModel | null {
    const usuarioJson = localStorage.getItem('eAgenda.usuario');

    if(usuarioJson)
      return JSON.parse(usuarioJson) as UsuarioTokenViewModel;

    return null;
  }

  public obterTokenUsuario(): string {
    return localStorage.getItem('eAgenda.token') ?? ''; // Operador ternário simplificado
  }
}
