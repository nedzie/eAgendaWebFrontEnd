export class TokenViewModel {
  chave: string;
  dataExpiracao: Date;
  usuarioToken: UsuarioTokenViewModel;
}

export class UsuarioTokenViewModel {
  nome: string;
  id: string;
  email: string;
}
