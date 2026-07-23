package com.foursys.portalnegociacao.presentation.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.foursys.portalnegociacao.domain.model.Acordo;
import com.foursys.portalnegociacao.domain.model.Debito;
import com.foursys.portalnegociacao.domain.model.valueobject.CPF;
import com.foursys.portalnegociacao.domain.port.in.SimularAcordoUseCase;
import com.foursys.portalnegociacao.presentation.dto.SimulacaoRequestDTO;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(AcordoController.class)
class AcordoControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private SimularAcordoUseCase simularAcordoUseCase;

    @Test
    void deveSimularAcordoComSucesso() throws Exception {
        CPF cpf = new CPF("52998224725");
        UUID debitoId = UUID.randomUUID();
        
        Debito debito = new Debito(
                debitoId,
                cpf,
                "Credor Teste",
                "CTR-101",
                BigDecimal.valueOf(100.00),
                BigDecimal.valueOf(100.00),
                90,
                "ACTIVE"
        );
        
        Acordo acordoMock = new Acordo(UUID.randomUUID(), cpf, List.of(debito), 1, BigDecimal.valueOf(0.90));
        
        Mockito.when(simularAcordoUseCase.simular(any(CPF.class), any(), anyInt()))
                .thenReturn(acordoMock);

        SimulacaoRequestDTO request = new SimulacaoRequestDTO();
        request.setCpf("52998224725");
        request.setDebitosIds(List.of(debitoId));
        request.setNumeroParcelas(1);

        mockMvc.perform(post("/api/v1/negotiations/simulate")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.cpf").value("52998224725"))
                .andExpect(jsonPath("$.valorOriginalTotal").value(100.00))
                .andExpect(jsonPath("$.descontoAplicado").value(90.00))
                .andExpect(jsonPath("$.valorFinal").value(10.00));
    }

    @Test
    void deveRetornarBadRequestAoEnviarCpfInvalido() throws Exception {
        SimulacaoRequestDTO request = new SimulacaoRequestDTO();
        request.setCpf("00000000000"); // CPF inválido
        request.setDebitosIds(List.of(UUID.randomUUID()));
        request.setNumeroParcelas(1);

        mockMvc.perform(post("/api/v1/negotiations/simulate")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.error").value("CPF inválido ou mal formatado"));
    }
}
