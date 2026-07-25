package com.foursys.portalnegociacao.domain.model;

import com.foursys.portalnegociacao.domain.model.valueobject.CPF;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

class AcordoTest {

    private final CPF cpfValido = new CPF("52998224725");

    @Test
    void deveCriarAcordoValidoAVistaComDesconto() {
        Debito debito = new Debito(
                UUID.randomUUID(),
                cpfValido,
                "Credor Teste",
                "CTR-999",
                BigDecimal.valueOf(100.00),
                BigDecimal.valueOf(100.00),
                120,
                "ACTIVE"
        );

        Acordo acordo = new Acordo(null, cpfValido, List.of(debito), 1, BigDecimal.valueOf(0.90)); // 90% desconto

        assertEquals(BigDecimal.valueOf(100.00), acordo.getValorOriginalTotal());
        assertEquals(BigDecimal.valueOf(90.00), acordo.getDescontoAplicado());
        assertEquals(BigDecimal.valueOf(10.00), acordo.getValorFinal());
        assertEquals(BigDecimal.valueOf(10.00), acordo.getValorParcela());
    }

    @Test
    void deveFalharSeParcelaForMenorQue50Reais() {
        Debito debito = new Debito(
                UUID.randomUUID(),
                cpfValido,
                "Credor Teste",
                "CTR-999",
                BigDecimal.valueOf(100.00),
                BigDecimal.valueOf(100.00),
                120,
                "ACTIVE"
        );

        // Tentativa de parcelar R$ 90,00 (pós desconto de 10% sobre R$ 100) em 5x.
        // Parcela resultaria em R$ 18,00, violando a regra de parcela mínima de R$ 50,00.
        Exception exception = assertThrows(IllegalStateException.class, () -> {
            new Acordo(null, cpfValido, List.of(debito), 5, BigDecimal.valueOf(0.10));
        });

        assertEquals("O valor mínimo de parcela permitido é de R$ 50,00", exception.getMessage());
    }

    @Test
    void deveRejeitarAcordoSemDebitos() {
        assertThrows(IllegalArgumentException.class, () -> {
            new Acordo(null, cpfValido, Collections.emptyList(), 1, BigDecimal.valueOf(0.90));
        });
    }
}
