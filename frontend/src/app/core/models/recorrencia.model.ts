
export interface Recorrencia {
  id: number;
  beneficiario: string;
  valor: number;
  status: 'ativa' | 'pausada' | 'pendente_aprovacao';
}
