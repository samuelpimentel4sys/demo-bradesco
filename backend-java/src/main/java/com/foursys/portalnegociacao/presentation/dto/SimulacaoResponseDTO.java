package com.foursys.portalnegociacao.presentation.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SimulacaoResponseDTO {
    private UUID id;
    private String cpf;
    private BigDecimal valorOriginalTotal;
    private BigDecimal descontoAplicado;
    private BigDecimal valorFinal;
    private int numeroParcelas;
    private BigDecimal valorParcela;
    private String status;
}
