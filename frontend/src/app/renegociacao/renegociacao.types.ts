export enum PaymentType {
  A_VISTA = 'A_VISTA',
  PARCELADO = 'PARCELADO'
}

export interface Debito {
  id: string;
  creditorName: string;
  contractNumber: string;
  originalValue: number;
  updatedValue: number;
  daysPastDue: number;
  status: 'ACTIVE' | 'IN_NEGOTIATION' | 'SETTLED';
}

export interface SimulacaoRequest {
  cpf: string;
  debitosIds: string[];
  numeroParcelas: number;
}

export interface SimulacaoResponse {
  id: string;
  cpf: string;
  valorOriginalTotal: number;
  descontoAplicado: number;
  valorFinal: number;
  numeroParcelas: number;
  valorParcela: number;
  status: string;
}
