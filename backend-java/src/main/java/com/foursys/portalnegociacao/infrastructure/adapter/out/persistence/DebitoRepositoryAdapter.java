package com.foursys.portalnegociacao.infrastructure.adapter.out.persistence;

import com.foursys.portalnegociacao.domain.model.Debito;
import com.foursys.portalnegociacao.domain.model.valueobject.CPF;
import com.foursys.portalnegociacao.domain.port.out.DebitoRepositoryPort;
import com.foursys.portalnegociacao.infrastructure.adapter.out.persistence.entity.DebitoEntity;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class DebitoRepositoryAdapter implements DebitoRepositoryPort {

    private final JpaDebitoRepository jpaDebitoRepository;

    public DebitoRepositoryAdapter(JpaDebitoRepository jpaDebitoRepository) {
        this.jpaDebitoRepository = jpaDebitoRepository;
    }

    @Override
    public List<Debito> buscarPorCpf(CPF cpf) {
        return jpaDebitoRepository.findByCpf(cpf.valor()).stream()
                .map(this::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public List<Debito> buscarPorIds(List<UUID> ids) {
        return jpaDebitoRepository.findAllById(ids).stream()
                .map(this::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public void salvarTodos(List<Debito> debitos) {
        List<DebitoEntity> entities = debitos.stream()
                .map(this::toEntity)
                .collect(Collectors.toList());
        jpaDebitoRepository.saveAll(entities);
    }

    private Debito toDomain(DebitoEntity entity) {
        return new Debito(
                entity.getId(),
                new CPF(entity.getCpf()),
                entity.getCredor(),
                entity.getContractNumber(),
                entity.getOriginalValue(),
                entity.getUpdatedValue(),
                entity.getDaysPastDue(),
                entity.getStatus()
        );
    }

    private DebitoEntity toEntity(Debito domain) {
        DebitoEntity entity = new DebitoEntity();
        entity.setId(domain.getId());
        entity.setCpf(domain.getCpf().valor());
        entity.setCredor(domain.getCredor());
        entity.setContractNumber(domain.getNumeroContrato());
        entity.setOriginalValue(domain.getValorOriginal());
        entity.setUpdatedValue(domain.getValorAtualizado());
        entity.setDaysPastDue(domain.getDiasAtraso());
        entity.setStatus(domain.getStatus());
        return entity;
    }
}
