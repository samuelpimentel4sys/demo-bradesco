package com.foursys.portalnegociacao.domain.model;

import com.foursys.portalnegociacao.domain.model.valueobject.CPF;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.UUID;

public class Acordo {
    private final UUID id;
    private final CPF cpf;
    private final List<Debito> debitosNegociados;
    private final BigDecimal valorOriginalTotal;
    private final BigDecimal descontoAplicado;
    private final BigDecimal valorFinal;
    private final int numeroParcelas;
    private final BigDecimal valorParcela;
    private String status; // PENDING_PAYMENT, PAID, CANCELLED

    public Acordo(UUID id, CPF cpf, List<Debito> debitosNegociados, int numeroParcelas, BigDecimal descontoPercentual) {
        this.id = id != null ? id : UUID.randomUUID();
        this.cpf = cpf;
        this.debitosNegociados = debitosNegociados;
        this.numeroParcelas = numeroParcelas;
        
        // Calcula valores consolidados
        BigDecimal somaOriginal = BigDecimal.ZERO;
        for (Debito d : debitosNegociados) {
            somaOriginal = somaOriginal.add(d.getValorAtualizado());
        }
        this.valorOriginalTotal = somaOriginal;

        // Aplica desconto (Ex: 0.90 para 90% no pagamento à vista)
        this.descontoAplicado = valorOriginalTotal.multiply(descontoPercentual).setScale(2, RoundingMode.HALF_UP);
        this.valorFinal = valorOriginalTotal.subtract(descontoAplicado).setScale(2, RoundingMode.HALF_UP);

        // Calcula parcelas
        this.valorParcela = valorFinal.divide(BigDecimal.valueOf(numeroParcelas), 2, RoundingMode.HALF_UP);
        
        // Valida as regras de negócio críticas do Bureau/Foursys
        validarRegras();

        this.status = "PENDING_PAYMENT";
    }

    private void validarRegras() {
        if (debitosNegociados == null || debitosNegociados.isEmpty()) {
            throw new IllegalArgumentException("Nenhum débito foi selecionado para negociação");
        }
        
        // RN-NEG-02: Parcela mínima de R$ 50,00 para parcelamento
        if (numeroParcelas > 1 && valorParcela.compareTo(BigDecimal.valueOf(50.00)) < 0) {
            throw new IllegalStateException("O valor mínimo de parcela permitido é de R$ 50,00");
        }
    }

    public UUID getId() { return id; }
    public CPF getCpf() { return cpf; }
    public List<Debito> getDebitosNegociados() { return debitosNegociados; }
    public BigDecimal getValorOriginalTotal() { return valorOriginalTotal; }
    public BigDecimal getDescontoAplicado() { return descontoAplicado; }
    public BigDecimal getValorFinal() { return valorFinal; }
    public int getNumeroParcelas() { return numeroParcelas; }
    public BigDecimal getValorParcela() { return valorParcela; }
    public String getStatus() { return status; }

    public void liquidar() {
        this.status = "PAID";
        for (Debito d : debitosNegociados) {
            d.liquidar();
        }
    }
}
