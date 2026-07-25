package com.foursys.portalnegociacao.domain.port.out;

import com.foursys.portalnegociacao.domain.model.Debito;
import com.foursys.portalnegociacao.domain.model.valueobject.CPF;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface DebitoRepositoryPort {
    List<Debito> buscarPorCpf(CPF cpf);
    List<Debito> buscarPorIds(List<UUID> ids);
    void salvarTodos(List<Debito> debitos);
}
