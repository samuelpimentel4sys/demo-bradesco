package com.foursys.portalnegociacao.presentation.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
public class SimulacaoRequestDTO {
    @NotBlank(message = "O CPF é obrigatório")
    private String cpf;
    
    @NotEmpty(message = "Pelo menos um débito deve ser selecionado")
    private List<UUID> debitosIds;
    
    @NotNull(message = "O número de parcelas deve ser informado")
    private Integer numeroParcelas;
}
