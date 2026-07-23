package com.foursys.portalnegociacao.infrastructure.adapter.out.persistence;

import com.foursys.portalnegociacao.infrastructure.adapter.out.persistence.entity.DebitoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface JpaDebitoRepository extends JpaRepository<DebitoEntity, UUID> {
    List<DebitoEntity> findByCpf(String cpf);
}
