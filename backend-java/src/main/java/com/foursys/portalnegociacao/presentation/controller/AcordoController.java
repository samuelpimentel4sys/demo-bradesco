package com.foursys.portalnegociacao.presentation.controller;

import com.foursys.portalnegociacao.domain.model.Acordo;
import com.foursys.portalnegociacao.domain.model.valueobject.CPF;
import com.foursys.portalnegociacao.domain.port.in.SimularAcordoUseCase;
import com.foursys.portalnegociacao.presentation.dto.SimulacaoRequestDTO;
import com.foursys.portalnegociacao.presentation.dto.SimulacaoResponseDTO;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/negotiations")
public class AcordoController {

    private final SimularAcordoUseCase simularAcordoUseCase;

    public AcordoController(SimularAcordoUseCase simularAcordoUseCase) {
        this.simularAcordoUseCase = simularAcordoUseCase;
    }

    @PostMapping("/simulate")
    public ResponseEntity<SimulacaoResponseDTO> simular(@RequestBody @Valid SimulacaoRequestDTO request) {
        CPF cpf = new CPF(request.getCpf());
        Acordo acordo = simularAcordoUseCase.simular(cpf, request.getDebitosIds(), request.getNumeroParcelas());
        
        SimulacaoResponseDTO response = new SimulacaoResponseDTO(
                acordo.getId(),
                acordo.getCpf().valor(),
                acordo.getValorOriginalTotal(),
                acordo.getDescontoAplicado(),
                acordo.getValorFinal(),
                acordo.getNumeroParcelas(),
                acordo.getValorParcela(),
                acordo.getStatus()
        );
        
        return ResponseEntity.ok(response);
    }
}
