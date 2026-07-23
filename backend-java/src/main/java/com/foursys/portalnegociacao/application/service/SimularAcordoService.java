package com.foursys.portalnegociacao.application.service;

import com.foursys.portalnegociacao.domain.model.Acordo;
import com.foursys.portalnegociacao.domain.model.Debito;
import com.foursys.portalnegociacao.domain.model.valueobject.CPF;
import com.foursys.portalnegociacao.domain.port.in.SimularAcordoUseCase;
import com.foursys.portalnegociacao.domain.port.out.DebitoRepositoryPort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Service
public class SimularAcordoService implements SimularAcordoUseCase {

    private final DebitoRepositoryPort debitoRepositoryPort;

    public SimularAcordoService(DebitoRepositoryPort debitoRepositoryPort) {
        this.debitoRepositoryPort = debitoRepositoryPort;
    }

    @Override
    @Transactional(readOnly = true)
    public Acordo simular(CPF cpf, List<UUID> debitosIds, int numeroParcelas) {
        List<Debito> debitos = debitoRepositoryPort.buscarPorIds(debitosIds);
        
        // Valida se todos os debitos pertencem ao CPF consultado
        boolean pertenceTodos = debitos.stream()
                .allMatch(d -> d.getCpf().valor().equals(cpf.valor()));
        if (!pertenceTodos) {
            throw new IllegalArgumentException("Algum débito selecionado não pertence ao CPF autenticado.");
        }

        // Determina desconto comercial parametrizado:
        // Se for à vista (1x), concede até 90% de desconto (0.90)
        // Se parcelado, aplica desconto decrescente ou juros
        BigDecimal descontoPercentual = numeroParcelas == 1 ? BigDecimal.valueOf(0.90) : BigDecimal.valueOf(0.10);

        return new Acordo(null, cpf, debitos, numeroParcelas, descontoPercentual);
    }
}
