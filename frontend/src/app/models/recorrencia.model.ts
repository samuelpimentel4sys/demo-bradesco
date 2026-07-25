export interface Recorrencia {
  id: string;
  favorecido: string;
  documento: string;
  valorMaximo: number;
  dataFim: string; // ou Date
  status: 'PENDENTE_APROVACAO' | 'ATIVO' | 'PAUSADO' | 'CANCELADO';
}
