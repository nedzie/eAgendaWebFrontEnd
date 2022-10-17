import { Timestamp } from "rxjs";
import { FormsContatoViewModel } from "src/app/contatos/view-models/forms-contato.view-model";
import { TipoLocalizacaoCompromissoEnum } from "./tipo-localizacao-compromisso.enum";

export class VisualizarCompromissoViewModel {
  id: string;
  assunto: string;
  tipoLocalizacaoCompromisso: TipoLocalizacaoCompromissoEnum;
  local: string;
  link: string;
  data: Date;
  horaInicio: Timestamp<Number>;
  horaTermino: Timestamp<Number>;
  contato: FormsContatoViewModel;
  contatoId: string;
}
