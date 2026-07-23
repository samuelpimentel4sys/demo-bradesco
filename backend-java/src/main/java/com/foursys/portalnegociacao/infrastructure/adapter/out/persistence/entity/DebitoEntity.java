package com.foursys.portalnegociacao.infrastructure.adapter.out.persistence.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;
import java.util.UUID;

@Entity
@Table(name = "debts")
@Getter
@Setter
public class DebitoEntity {
    @Id
    private UUID id;
    
    @Column(nullable = false, length = 11)
    private String cpf;
    
    @Column(nullable = false)
    private String credor;
    
    @Column(name = "contract_number", nullable = false)
    private String contractNumber;
    
    @Column(name = "original_value", nullable = false)
    private BigDecimal originalValue;
    
    @Column(name = "updated_value", nullable = false)
    private BigDecimal updatedValue;
    
    @Column(name = "days_past_due", nullable = false)
    private int daysPastDue;
    
    @Column(nullable = false)
    private String status;
}
