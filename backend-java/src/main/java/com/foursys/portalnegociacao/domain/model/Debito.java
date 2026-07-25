package com.foursys.portalnegociacao.domain.model;

import com.foursys.portalnegociacao.domain.model.valueobject.CPF;
import java.math.BigDecimal;
import java.util.UUID;

public class Debito {
    private final UUID id;
    private final CPF cpf;
    private final String credor;
    private final String numeroContrato;
    private final BigDecimal valorOriginal;
    private final BigDecimal valorAtualizado;
    private final int diasAtraso;
    private String status; // ACTIVE, IN_NEGOTIATION, SETTLED

    public Debito(UUID id, CPF cpf, String credor, String numeroContrato, 
                  BigDecimal valorOriginal, BigDecimal valorAtualizado, int diasAtraso, String status) {
        this.id = id;
        this.cpf = cpf;
        this.credor = credor;
        this.numeroContrato = numeroContrato;
        this.valorOriginal = valorOriginal;
        this.valorAtualizado = valorAtualizado;
        this.diasAtraso = diasAtraso;
        this.status = status != null ? status : "ACTIVE";
    }

    public UUID getId() { return id; }
    public CPF getCpf() { return cpf; }
    public String getCredor() { return credor; }
    public String getNumeroContrato() { return numeroContrato; }
    public BigDecimal getValorOriginal() { return valorOriginal; }
    public BigDecimal getValorAtualizado() { return valorAtualizado; }
    public int getDiasAtraso() { return diasAtraso; }
    public String getStatus() { return status; }

    public void marcarEmNegociacao() {
        if (!"ACTIVE".equals(this.status)) {
            throw new IllegalStateException("Apenas débitos ativos podem ser colocados em negociação.");
        }
        this.status = "IN_NEGOTIATION";
    }

    public void liquidar() {
        this.status = "SETTLED";
    }
}
