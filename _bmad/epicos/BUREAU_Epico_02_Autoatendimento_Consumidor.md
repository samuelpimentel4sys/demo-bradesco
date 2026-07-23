# Documento de Épico: Portal de Autoatendimento para Consulta e Negociação de Dívidas (PACD)

> **Documento elaborado com agente The Visionary (BMAD UpStream)**
> **Fase 5 do Framework The Visionary**
> **ID de Referência:** EP-PACD-002 | **Status:** Aprovado para Desenvolvimento | **Versão:** v1.00
> **Período de Referência:** 2024 - 2026

---

## 1. Identificação

*   **Nome do Épico:** Portal de Autoatendimento para Consulta e Negociação de Dívidas (PACD)
*   **ID do Épico:** EP-PACD-002
*   **Produto Associado:** Plataforma de Recuperação de Crédito / Bureau Digital de Autoatendimento
*   **Release Target:** Release 2.0 (Ciclo de Negociação Integrada)
*   **Responsável Executivo (Sponsor):** Diretor de Negócios e Recuperação de Ativos / Head do Bureau de Crédito
*   **Product Manager Responsável:** Lead Product Manager (Upstream Strategy)
*   **Status Atual:** Aprovado e Mapeado para Desenvolvimento

---

## 2. Resumo do Épico

Implementar um portal de autoatendimento digital unificado, de alta usabilidade e focado no consumidor, que permita à base de 1 milhão de CPFs inadimplentes consultar suas pendências financeiras consolidadas e negociá-las diretamente com credores. A plataforma integrará de ponta a ponta a autenticação segura (KYC), consulta consolidada das dívidas sob gestão do Bureau, simulação flexível de parcelas, pagamento instantâneo via Pix com conciliação em tempo real e comando automatizado de baixa da negativação em até 5 dias úteis, eliminando canais físicos onerosos de cobrança e maximizando o índice de recuperação financeira.

---

## 3. Contexto e Problema de Negócio

O processo de cobrança tradicional baseado em contatos telefônicos ativos gera alto atrito emocional para o devedor e custos de operação insustentáveis para o credor. Com uma base de **1 milhão de CPFs negativados**, o Bureau de Crédito enfrenta dificuldades para rentabilizar esses registros de forma escalável devido a três dores principais:
1.  **Baixa Conversão e Custos Altos de Canais de Voz:** O custo de call centers e SMS é cobrado por tentativa, não por sucesso, o que resulta em margens baixas e baixa conversão por aversão natural dos consumidores a ligações de cobrança.
2.  **Processos Fragmentados de Liquidação e Baixa:** O consumidor, mesmo quando quer pagar, sofre com a falta de canais centralizados para simular e emitir pagamentos rápidos (como Pix) e aguarda dias ou semanas para ver seu nome limpo, devido a integrações manuais e ineficientes com os credores.
3.  **Falta de Discrição e Conveniência:** A ausência de um portal amigável de autoatendimento impede que o consumidor realize simulações de forma privada em horários não comerciais (ex: fins de semana ou período noturno).

**Benchmark de Mercado:** Plataformas modernas de autoatendimento financeiro que operam com Pix e liquidação instantânea registram aumentos de até 40% na taxa de conversão espontânea e reduzem em 80% o tempo médio de baixa de restrições de crédito (negativação), tornando o processo fluido e atrativo para as classes socioeconômicas mais afetadas pela inadimplência.

---

## 4. Proposta de Valor e Benefícios de Negócio

A disponibilização do portal de autoatendimento desbloqueia o valor adormecido da base de 1 milhão de CPFs do Bureau. Ele cria uma jornada fluida onde o consumidor retoma o controle de sua saúde financeira através de ofertas atrativas com alta taxa de desconto (deságio médio de 70%), enquanto os credores parceiros recuperam valores de forma rápida com custos marginais baixíssimos de operação.

### 4.1 Retorno Sobre o Investimento (ROI) Detalhado

O estudo de viabilidade econômica e financeira do projeto para o horizonte de **2024-2026** apresenta os seguintes resultados consolidados:

1.  **Benefícios Financeiros Diretos (Receita/Recuperação Incremental):**
    *   **Cenário Conservador (1,5% de Conversão):**
        *   Conversão de **15.000 CPFs** da base total de 1.000.000.
        *   Cálculo: $1.000.000 \times 1,5\% = 15.000$ acordos liquidados.
        *   Volume Financeiro Recuperado no Ano 1: **R$ 6.750.000** (considerando o ticket médio recuperável de R$ 450).
    *   **Cenário Otimista (3,5% de Conversão):**
        *   Conversão de **35.000 CPFs** da base total de 1.000.000.
        *   Cálculo: $1.000.000 \times 3,5\% = 35.000$ acordos liquidados.
        *   Volume Financeiro Recuperado no Ano 1: **R$ 15.750.000** (considerando o ticket médio recuperável de R$ 450).

2.  **Redução de Custos / Eficiência Operacional:**
    *   Redução drástica no custo de envio de cartas de notificação físicas e ligações de call center ativo.
    *   Processo de conciliação e baixa automatizado que economiza aproximadamente **R$ 250.000/ano** em despesas de retaguarda (backoffice) e suporte operacional.

3.  **Investimento Estimado (CAPEX/OPEX):**
    *   **Ano 1 (Lançamento e Desenvolvimento):** **R$ 1.640.000** (inclui desenvolvimento de software, integração com gateways de Pix, segurança de dados/KYC e marketing de ativação de base).
    *   **Anos Seguintes (Ano 2 e Ano 3 - 2025/2026):** **R$ 600.000/ano** (manutenção evolutiva, custos de infraestrutura em nuvem, licenciamento SaaS de KYC e campanhas contínuas de engajamento).

4.  **Cálculo do Retorno Sobre o Investimento (ROI):**
    *   *Fórmula:* $ROI = \frac{\text{Retorno Financeiro} - \text{Investimento}}{\text{Investimento}} \times 100$
    *   **ROI Cenário Conservador (Ano 1):**
        $$ROI = \frac{6.750.000 - 1.640.000}{1.640.000} \times 100 = \mathbf{311,58\%}$$
    *   **ROI Cenário Conservador (Anos Seguintes - Base Anual):**
        $$ROI = \frac{6.750.000 - 600.000}{600.000} \times 100 = \mathbf{1.025,00\%}$$
    *   **ROI Cenário Otimista (Ano 1):**
        $$ROI = \frac{15.750.000 - 1.640.000}{1.640.000} \times 100 = \mathbf{860,37\%}$$
    *   **ROI Cenário Otimista (Anos Seguintes - Base Anual):**
        $$ROI = \frac{15.750.000 - 600.000}{600.000} \times 100 = \mathbf{2.525,00\%}$$

5.  **Período de Payback Estimado (Retorno do Capital):**
    *   **Cenário Conservador (~2,9 meses pós-lançamento):**
        *   Fluxo mensal médio recuperado: R$ 562.500 (R$ 6.750.000 / 12 meses).
        *   Payback: $\frac{1.640.000}{562.500} = \mathbf{2,91\text{ meses}}$ (~3 meses pós-lançamento).
    *   **Cenário Otimista (~1,25 meses pós-lançamento):**
        *   Fluxo mensal médio recuperado: R$ 1.312.500 (R$ 15.750.000 / 12 meses).
        *   Payback: $\frac{1.640.000}{1.312.500} = \mathbf{1,25\text{ meses}}$ (~1,5 meses pós-lançamento).

6.  **Premissas Financeiras:**
    *   Base qualificada de 1.000.000 de CPFs sob gestão com pelo menos uma restrição cadastrada ativa.
    *   Dívida original média de **R$ 1.500** por CPF.
    *   **Deságio parametrizado de 70%**, resultando em um **ticket médio recuperável de R$ 450** por CPF negociado.
    *   Uso preferencial do Pix (à vista ou entrada) como método preferencial de pagamento, garantindo a liquidação imediata da transação financeira.
    *   Para simulação de parcelamentos, prevê-se um índice máximo tolerável de quebra de acordo (inadimplência da carteira de acordos) de 15% sobre as parcelas futuras de boletos.

7.  **Métricas de ROI Alinhadas ao Modelo SMART (2024-2026):**
    *   **Specific (Específico):** Aumentar o volume de recuperação de crédito do Bureau migrando o fluxo de negociações para um canal digital de autoatendimento.
    *   **Measurable (Mensurável):** Monitorar o volume de receita líquida recuperada (com metas de R$ 6,75M a R$ 15,75M no Ano 1) e o número de CPFs regularizados (15.000 a 35.000).
    *   **Achievable (Atingível):** Baseado na taxa de conversão realista de mercado de 1,5% (Cenário Conservador) a 3,5% (Cenário Otimista) sobre a base qualificada de 1M de CPFs ativos.
    *   **Relevant (Relevante):** Contribui diretamente para o aumento de liquidez dos credores parceiros, melhora do score do consumidor final e monetização de base do próprio Bureau.
    *   **Time-bound (Temporal):** Recuperar o investimento total de R$ 1,64M de CAPEX em um período entre 1,5 a 3 meses pós-lançamento comercial (Ano 1) e consolidar a operação lucrativa no biênio 2025-2026.

---

## 5. Descrição Detalhada (Mapeamento dos 4 Épicos Integrados)

O projeto é viabilizado tecnicamente por meio da integração harmônica de quatro sub-épicos modulares, que compõem o escopo de entrega do produto:

### 5.1 Épico 1: Portal de Autenticação Segura (KYC) e Consulta Consolidada
Garantir a legitimidade do acesso do consumidor aos seus dados restritivos em conformidade estrita com a LGPD.
*   **Fluxo de KYC Automatizado:** Processo ágil de validação em duas etapas (2FA) via WhatsApp ou SMS com cruzamento de dados cadastrais para confirmar a posse da linha pelo detentor do CPF.
*   **Consulta Consolidada de Dívidas:** Dashboard simples e direto que lista ao consumidor todas as suas dívidas ativas associadas ao Bureau, detalhando de forma clara o credor original, a data de inclusão, o valor original de R$ 1.500 e o valor com desconto atualizado.

### 5.2 Épico 2: Motor de Simulação de Parcelas e Negociação
Capacitar o devedor a planejar o pagamento que melhor se ajusta à sua realidade orçamentária atual.
*   **Ajuste Interativo:** Barras de simulação dinâmicas onde o usuário arrasta para escolher o valor da entrada, o número de parcelas desejado (com teto parametrizado pelo credor) e visualiza instantaneamente os juros aplicados e o valor da parcela mensal resultante.
*   **Aplicação do Deságio de 70%:** O motor aplica de forma automática e imediata o abatimento de 70% sobre a dívida de R$ 1.500, gerando a proposta de quitação de R$ 450 à vista ou a distribuição do valor simulado em parcelas.

### 5.3 Épico 3: Gateway de Pagamentos Omnichannel com Emissão de Pix
Reduzir as fricções no momento decisivo do pagamento para garantir a conversão imediata do acordo.
*   **Pix Copia e Cola / QR Code:** Geração instantânea do QR Code dinâmico do Pix para pagamentos de acordos à vista ou parcelas de entrada.
*   **Conciliação Instantânea:** O gateway de pagamentos se comunica com o banco liquidante em menos de 10 segundos após a transferência, confirmando a transação e alterando o status do acordo no portal de "Pendente" para "Liquidado".

### 5.4 Épico 4: Integração Automatizada de Baixa de Negativação
Assegurar o encerramento do ciclo de cobrança e o reestabelecimento do nome limpo do consumidor com agilidade.
*   **Comando Automatizado de Baixa:** Integração via API direta ou Webhooks com o sistema do Bureau de Crédito para comandar a exclusão automática do registro de inadimplência no banco de dados em até 5 dias úteis pós-confirmação do pagamento (conforme prazo legal).
*   **Notificação de Quitação:** Emissão e envio automatizado da Carta de Quitação e do comprovante do acordo finalizado para o e-mail e WhatsApp do devedor.

---

### 5.5 Escopo Incluído (In Scope)
*   Interface do portal totalmente responsiva e acessível (Mobile-First).
*   Módulo de KYC integrado com APIs de verificação cadastral.
*   Motor de simulação financeira e regras de desconto flexíveis (até 70%).
*   Integração com PSP (Provedor de Serviços de Pagamento) para geração e conciliação de Pix.
*   Mecanismo de Webhooks de sincronização de baixa de restrição no Bureau.
*   Painel administrativo para credores acompanharem em tempo real os acordos fechados e os pagamentos efetuados.

### 5.6 Escopo Excluído (Out of Scope)
*   Cobrança telefônica ativa por operadores humanos.
*   Suporte a cartões de crédito, débito ou outras formas de pagamento não especificadas (ex: criptomoedas, boleto impresso via Correios).
*   Negociação de dívidas ativas judiciais que requeiram trâmite em cartórios.

---

## 6. Critérios de Aceite

1.  **CA-PACD-001 (Segurança de Acesso):** O portal só deve exibir dados financeiros de dívidas após o usuário passar com sucesso pela validação de dois fatores (2FA) enviada para o telefone ou e-mail vinculado ao CPF consultado.
2.  **CA-PACD-002 (Velocidade de Consulta):** O painel de consulta consolidada de dívidas deve ser exibido em até **2 segundos** após a autenticação segura do usuário, sob volumetria de acessos simultâneos de até 15.000 usuários.
3.  **CA-PACD-003 (Exatidão do Cálculo de Desconto):** O motor de negociação deve garantir que o desconto aplicado às propostas à vista seja de exatamente 70% sobre o saldo devedor original de R$ 1.500, gerando a oferta líquida de R$ 450, sem arredondamentos indevidos.
4.  **CA-PACD-004 (Flexibilidade de Parcelas):** No modo de simulação, o usuário deve ser capaz de escolher parcelas mínimas de R$ 50, com recálculo de juros simples de amortização conforme políticas pré-carregadas pelo credor.
5.  **CA-PACD-005 (Emissão de Pix):** O QR Code dinâmico do Pix e o código Copia e Cola gerados para o pagamento devem ter prazo de validade ajustável (padrão: 24 horas) e conter os metadados corretos do ID do acordo correspondente.
6.  **CA-PACD-006 (Tempo de Conciliação):** A confirmação de pagamento do Pix deve ser processada pelo sistema e refletida como "Liquidado" no banco de dados do portal em no máximo **10 segundos** após o recebimento da notificação do banco liquidante.
7.  **CA-PACD-007 (Comando de Baixa):** Após a liquidação do Pix (ou da primeira parcela de entrada do acordo), o sistema deve encaminhar automaticamente a requisição de exclusão da negativação para a fila de processamento do Bureau em no máximo **1 hora**.
8.  **CA-PACD-008 (Comunicação de Confirmação):** O comprovante em PDF e a notificação de confirmação do acordo devem ser disparados para o WhatsApp/E-mail cadastrado em até **3 minutos** após a liquidação financeira bem-sucedida.
9.  **CA-PACD-009 (Resiliência do Gateway de Pagamentos):** Caso o provedor primário de Pix apresente indisponibilidade, o portal deve fazer fallback automático para o provedor secundário de pagamentos em até **5 segundos** sem perda de dados da transação do usuário.
10. **CA-PACD-010 (Acessibilidade Digital):** A interface web do portal de autoatendimento deve cumprir as diretrizes de acessibilidade WCAG 2.1 (Nível AA), com legibilidade otimizada para dispositivos móveis de telas pequenas.

---

## 7. Features Sugeridas

| ID da Feature | Nome da Feature | Descrição Curta | Épico Associado |
| :--- | :--- | :--- | :--- |
| **FT-PACD-001** | Autenticação Rápida 2FA via WhatsApp | Envio do token temporário de 6 dígitos diretamente para o WhatsApp do usuário para login seguro sem fricção. | Épico 1 |
| **FT-PACD-002** | Painel Unificado de Pendências | Visualização limpa que consolida todas as dívidas ativas da base de dados do Bureau para o CPF autenticado. | Épico 1 |
| **FT-PACD-003** | Régua de Simulação Dinâmica de Acordos | Controle deslizante para simular o valor das parcelas alterando a quantidade de meses ou o valor da entrada em tempo real. | Épico 2 |
| **FT-PACD-004** | Geração e Conciliação Instantânea de Pix | Motor de emissão de QR Code Pix integrado ao gateway parceiro para confirmação do pagamento em segundos. | Épico 3 |
| **FT-PACD-005** | API Automática de Baixa de Restrição | Serviço de integração rápida para remoção automática da negativação nos sistemas do Bureau de Crédito pós-pagamento. | Épico 4 |
| **FT-PACD-006** | Envio de Alertas de Vencimento | Notificações preventivas automáticas via WhatsApp e e-mail antes do vencimento das parcelas de acordos fechados. | Épico 3 |

---

## 8. Pré-condições e Dependências

1.  **Integração Cadastral com Bureau de Crédito:** Disponibilização e homologação da base de dados contendo o cadastro atualizado de 1.000.000 de CPFs negativados, seus respectivos saldos devedores (R$ 1.500 de média) e as chaves de relacionamento com os credores parceiros.
2.  **Credenciamento PSP/Banco Liquidante:** Contratação e homologação do Gateway de Pagamentos / Instituição Financeira responsável pela custódia, processamento técnico e tarifa do Pix dinâmico.
3.  **Provedor de Serviços KYC:** Homologação da ferramenta parceira de validação cadastral e envio massivo de mensagens SMS/WhatsApp para suporte ao fluxo de 2FA.

---

## 9. Riscos e Mitigações

*   **Risco 1: Fraude por Engenharia Social (Falso acesso a dados financeiros de terceiros por roubo de chip/identidade).**
    *   *Probabilidade:* Média | *Impacto:* Altíssimo
    *   *Mitigação:* Implementar validação multifator rígida (2FA), cruzamento inteligente de chaves cadastrais com dados das operadoras telefônicas e ocultar detalhes sensíveis do credor original antes da autenticação ser concluída com sucesso.
*   **Risco 2: Baixa adesão de credores na concessão de descontos e baixa de negativações automáticas.**
    *   *Probabilidade:* Baixa | *Impacto:* Alto
    *   *Mitigação:* Estabelecer contratos padrão unificados de adesão que pré-autorizam o deságio de 70% sob as dívidas de R$ 1.500 no modelo white-label oferecido pelo Bureau.
*   **Risco 3: Falha na conciliação instantânea do Pix resultando em duplicidade ou não liberação do nome limpo.**
    *   *Probabilidade:* Baixa | *Impacto:* Altíssimo
    *   *Mitigação:* Arquitetura de microsserviços idempotentes de conciliação de pagamentos com filas de retentativa automatizadas e alarmagem em tempo real em caso de falha de retorno do banco liquidante.

---

## 10. Stakeholders

*   **Diretoria de Operações e Negócios do Bureau:** Patrocinadora (Sponsor) da plataforma e responsável pelas metas de rentabilidade e monetização.
*   **Equipe de Segurança da Informação e Compliance:** Garantir a conformidade total dos fluxos com a LGPD e políticas internas de segurança bancária.
*   **Equipe de Tecnologia e Arquitetura:** Responsáveis pelo desenvolvimento de software, hospedagem em nuvem e APIs de backend.
*   **Credores Parceiros (Bancos, Varejo, Utilities):** Proprietários originais do direito de crédito e principais beneficiários do retorno financeiro.

---

## 11. Métricas de Sucesso

| Categoria | Curto Prazo (0 a 3 meses) | Médio Prazo (3 a 6 meses) | Longo Prazo (+12 meses - 2025/2026) |
| :--- | :--- | :--- | :--- |
| **Engajamento** | > 80.000 acessos únicos ao portal no primeiro trimestre. | > 350.000 CPFs únicos que navegaram pela plataforma de autoatendimento. | > 70% de penetração da base ativa de 1M de CPFs na plataforma. |
| **Conversão** | Taxa de conversão de simulados para acordos criados > 10%. | Conversão global acumulada superior a 1,5% da base total (Cenário Conservador). | Conversão global acumulada acima de 3,5% da base de CPFs (Cenário Otimista). |
| **Financeiro** | Volume recuperado de R$ 1,5M nos primeiros 90 dias de operação. | Atingimento do ponto de equilíbrio (payback total do investimento inicial de R$ 1,64M). | Volume recuperado acumulado superior a R$ 15,75M com ROI superando 860%. |
| **Operacional** | SLA de baixa da restrição financeira no Bureau < 48 horas úteis. | SLA de baixa automatizado consolidado em < 24 horas úteis pós-confirmação Pix. | 100% de baixa automática via webhooks integrados, eliminando totalmente intervenções manuais. |

---

## 12. Observações

### Próximos Passos Recomendados:
1.  **Alinhamento de Contratos de Deságio:** Validar e formalizar as regras de deságio fixo de 70% com a carteira de credores piloto associada ao Bureau.
2.  **Desenvolvimento do Protótipo Funcional (UI/UX):** Focar no fluxo de simulação intuitivo do motor de parcelas para evitar evasão do devedor durante a jornada móvel.
3.  **Configuração de Ambiente de Sandbox:** Preparar o ambiente mockado das APIs de Pix e KYC para validação da esteira técnica de desenvolvimento.

*Este documento representa as diretrizes estratégicas e funcionais do Portal de Autoatendimento para Negociação de Dívidas (PACD) sob o framework de valor corporativo.*

---
*Nota: Documento elaborado de forma consolidada e estratégica sob a metodologia BMAD UpStream (Agente The Visionary).*
