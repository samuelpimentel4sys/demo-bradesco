package com.foursys.portalnegociacao.domain.port.in;

import com.foursys.portalnegociacao.domain.model.Acordo;
import com.foursys.portalnegociacao.domain.model.valueobject.CPF;
import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

public interface SimularAcordoUseCase {
    Acordo simular(CPF cpf, List<UUID> debitosIds, int numeroParcelas);
}
