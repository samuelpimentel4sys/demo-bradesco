package com.foursys.portalnegociacao.domain.model;

import com.foursys.portalnegociacao.domain.model.valueobject.CPF;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class CPFTest {

    @Test
    void deveAceitarCpfValido() {
        assertDoesNotThrow(() -> new CPF("52998224725"));
    }

    @Test
    void deveRejeitarCpfInvalido() {
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            new CPF("12345678909");
        });
        assertEquals("CPF inválido ou mal formatado", exception.getMessage());
    }

    @Test
    void deveRejeitarCpfComDigitosRepetidos() {
        assertThrows(IllegalArgumentException.class, () -> new CPF("11111111111"));
    }
}
