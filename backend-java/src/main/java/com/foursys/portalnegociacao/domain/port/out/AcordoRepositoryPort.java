package com.foursys.portalnegociacao.domain.port.out;

import com.foursys.portalnegociacao.domain.model.Acordo;
import java.util.Optional;
import java.util.UUID;

public interface AcordoRepositoryPort {
    Acordo salvar(Acordo acordo);
    Optional<Acordo> buscarPorId(UUID id);
}
