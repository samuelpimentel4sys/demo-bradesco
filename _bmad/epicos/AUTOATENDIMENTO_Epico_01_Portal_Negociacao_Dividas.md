# Documento de Épico Guarda-chuva: Portal de Autoatendimento para Negociação de Dívidas (PAND)

> **Documento elaborado com agente The Visionary (BMAD UpStream)**
> **Fase 5 do Framework The Visionary**
> **ID de Referência:** EP-PAND-001 | **Status:** Aprovado para Desenvolvimento | **Versão:** v1.00

---

## 1. Identificação

*   **Nome do Épico:** Portal de Autoatendimento para Negociação de Dívidas (PAND)
*   **ID do Épico:** EP-PAND-001
*   **Produto Associado:** Core Recuperação de Crédito / Plataforma Digital de Autoatendimento
*   **Release Target:** Release 1.0 (MVP Consolidado)
*   **Responsável Executivo (Sponsor):** Chief Product Officer (CPO) / Diretor de Operações de Crédito
*   **Product Manager Responsável:** Lead Product Manager (Upstream Strategy)
*   **Status Atual:** Aprovado e Mapeado para Desenvolvimento

---

## 2. Resumo do Épico

Implementar um canal digital de autoatendimento fim a fim (white-label e direto ao consumidor) que permita aos 5 milhões de CPFs constantes na base do bureau de crédito consultar, simular e liquidar suas dívidas de forma digital, amigável e segura. O portal unifica a autenticação rigorosa (KYC), um motor de renegociação orientado por inteligência de dados, um gateway omnichannel focado em Pix/Boleto Recorrente e uma camada de Open API para integração ágil com credores, reduzindo drasticamente os custos operacionais de call center ativo e maximizando as taxas de recuperação sob um modelo de *success fee* de 12%.

---

## 3. Contexto e Problema de Negócio

No modelo tradicional de recuperação de crédito, o contato com o devedor é predominantemente ativo e altamente custoso, dependendo de assessorias de cobrança e call centers terceirizados que operam com margens apertadas e canais de baixíssima conversão (como ligações frias e SMS genéricos). Este formato gera três grandes gargalos:
1.  **Falta de Privacidade e Atrito Emocional:** Consumidores evitam ligações telefônicas devido ao constrangimento e preferem resolver suas pendências de forma privada e discreta.
2.  **Custo Operacional Elevado (CAC de Cobrança):** A manutenção de equipes de call center e o disparo massivo de chamadas geram altos custos fixos e variáveis, diluindo a margem do bureau.
3.  **Dificuldade de Integração e Escala:** Credores demoram semanas para subir suas bases de inadimplentes e parametrizar regras de desconto flexíveis, o que engessa a operação.

**Benchmark de Mercado:** Plataformas líderes em renegociação de dívidas no Brasil demonstram que a migração para o autoatendimento web/mobile eleva a taxa de recuperação em até 35% nos primeiros meses, atraindo principalmente o público das classes C, D e E que prefere a agilidade do Pix Copia e Cola na tela do celular e ofertas sob medida.

---

## 4. Proposta de Valor e Benefícios de Negócio

A criação deste portal desbloqueia o valor oculto da base de 5 milhões de CPFs ativos, transformando dados brutos de inadimplência em acordos financeiros recorrentes. O valor para o consumidor reside na reconquista de sua saúde financeira em menos de 5 minutos, enquanto para o credor reside no menor custo de recuperação (líquido) do mercado.

### 4.1 Retorno Sobre o Investimento (ROI) Detalhado

O caso de negócios para esta iniciativa é estruturado com base nos seguintes parâmetros minuciosos:

1.  **Benefícios Financeiros Diretos (Receita Incremental):**
    *   Faturamento gerado através de uma taxa de *success fee* de **12%** sobre o montante recuperado.
    *   **Cenário Conservador:** Recuperação de **R$ 30.000.000** em dívidas (equivalente a 75.000 acordos liquidados, ou **1,5% de conversão** da base ativa com ticket médio de R$ 400).
        *   *Receita Incremental (Success Fee de 12%):* **R$ 3.600.000/ano**.
    *   **Cenário Otimista:** Recuperação de **R$ 64.000.000** em dívidas (equivalente a 160.000 acordos liquidados, ou **3,2% de conversão** da base ativa com ticket médio de R$ 400).
        *   *Receita Incremental (Success Fee de 12%):* **R$ 7.680.000/ano**.

2.  **Redução de Custos / Eficiência Operacional:**
    *   **Economia Direta Consolidada de R$ 960.000/ano** com a digitalização dos acordos.
    *   Substituição de tarifas de chamadas e comissões de call centers tradicionais por interações 100% automatizadas no portal.
    *   Redução drástica no envio de correspondências físicas e SMS informativos caros.

3.  **Investimento Estimado (CAPEX/OPEX de Lançamento):**
    *   Total de **R$ 850.000** alocados em:
        *   Desenvolvimento de software e design de experiência (UX/UI): R$ 450.000
        *   Segurança da Informação e Infraestrutura em Nuvem autoescalável (SaaS): R$ 150.000
        *   Marketing de atração e campanhas de ativação de base de CPFs: R$ 250.000

4.  **Cálculo do Retorno Sobre o Investimento (ROI):**
    *   Fórmula Utilizada: $ROI = \frac{(Retorno\ Incremental\ +\ Economia\ Operacional)\ -\ Investimento}{Investimento} \times 100$
    *   **ROI Cenário Conservador:**
        $$\frac{(3.600.000 + 960.000) - 850.000}{850.000} \times 100 = \frac{3.710.000}{850.000} \times 100 = \mathbf{436,47\%}$$
    *   **ROI Cenário Otimista:**
        $$\frac{(7.680.000 + 960.000) - 850.000}{850.000} \times 100 = \frac{7.790.000}{850.000} \times 100 = \mathbf{916,47\%}$$

5.  **Período de Payback Estimado (Retorno do Capital):**
    *   **Cenário Conservador:** Geração média mensal de R$ 380.000 (R$ 4.56M/ano).
        *   *Payback:* R$ 850.000 / R$ 380.000 = **2,2 meses**.
    *   **Cenário Otimista:** Geração média mensal de R$ 720.000 (R$ 8.64M/ano).
        *   *Payback:* R$ 850.000 / R$ 720.000 = **1,18 meses (~1,2 meses)**.

6.  **Premissas Financeiras:**
    *   Base total de 5.000.000 de CPFs cadastrados com pelo menos uma dívida ativa sob gestão do bureau.
    *   Ticket médio real de dívida de **R$ 400** (após aplicação de descontos acordados).
    *   Adoção massiva de canais de notificação eletrônica (E-mail e WhatsApp) com custo marginal próximo a zero.
    *   Não há inadimplência reversa significativa sobre os acordos de boleto recorrente (estimado em no máximo 15%).

---

## 5. Descrição Detalhada (Mapeamento dos 4 Épicos Integrados)

Para viabilizar este portal de autoatendimento, o Épico Guarda-chuva é composto pela integração técnica de 4 sub-épicos modulares, descritos abaixo:

### 5.1 Épico 1: Portal de Autenticação Segura (KYC) e Consulta Consolidada
Garantir que apenas o detentor legítimo dos dados tenha acesso às dívidas, cumprindo as exigências da LGPD e prevenindo fraudes de engenharia reversa.
*   **Fluxo de KYC:** Validação em duas etapas (2FA) via SMS/WhatsApp associado ao CPF cadastrado, complementado por autenticação biométrica facial opcional para dívidas de alta criticidade.
*   **Consulta Consolidada:** Painel limpo e intuitivo que lista todas as dívidas ativas daquele CPF agrupadas por credor, destacando juros, multa e o valor total original.

### 5.2 Épico 2: Motor Inteligente de Renegociação
Coração algorítmico do portal que processa as regras de negócio enviadas pelos credores e apresenta propostas personalizadas para o consumidor em tempo real.
*   **Personalização Dinâmica:** Oferece opções de pagamento à vista com descontos agressivos (até 90% conforme política do credor) ou parcelamentos flexíveis ajustados à capacidade de pagamento autodeclarada do devedor.
*   **Simulador Interativo:** Barras de rolagem em tempo real que permitem ao usuário simular o valor das parcelas alterando a quantidade de meses ou o valor da entrada, calculando os juros automaticamente.

### 5.3 Épico 3: Gateway de Pagamentos Omnichannel (Pix/Boleto Recorrente)
Garantir o menor atrito possível no momento do pagamento para maximizar a conversão imediata.
*   **Pix Copia e Cola:** Geração instantânea de QR Code com conciliação imediata em menos de 10 segundos, disparando e-mail de quitação e comandando a baixa automática da restrição no banco de dados do bureau.
*   **Boleto Recorrente:** Para acordos parcelados, o sistema emite e agenda o envio mensal dos boletos via WhatsApp e e-mail com lembrete inteligente 3 dias antes do vencimento.

### 5.4 Épico 4: Portal de Integração de Credores (Open API)
Uma camada robusta de serviços (APIs baseadas em REST/JSON) para que os parceiros (credores) automatizem o ecossistema sem intervenção manual.
*   **Endpoints de Sincronização:** Envio de lotes de novas dívidas, atualização de saldos devedores e regras de precificação/descontos permitidos para o motor.
*   **Webhooks de Notificação:** Disparo em tempo real informando ao credor sobre a quitação ou quebra de acordos, possibilitando a atualização imediata nos sistemas legados do credor.

---

### 5.5 Escopo Incluído (In Scope)
*   Desenvolvimento do front-end responsivo (foco total em acessibilidade móvel - Mobile First).
*   Mecanismo de autenticação KYC integrado com parceiros de telecomunicações para validação cadastral de chips (Carrier Billing/SIM Swap check básico).
*   Geração de QR Code Pix dinâmico integrado a grandes bancos parceiros liquidantes.
*   Painel administrativo para acompanhamento financeiro consolidado do bureau (dashboard de receitas em success fee geradas em tempo real).

### 5.6 Escopo Excluído (Out of Scope)
*   Atendimento ao cliente via telefone/humano (o portal é puramente focado em autoatendimento digital).
*   Cobrança judicial/contenciosa de inadimplentes.
*   Suporte a cartões de crédito internacionais ou financiamentos bancários diretos pelo bureau.

---

## 6. Critérios de Aceite

1.  **CA-001 (Segurança):** O usuário só pode visualizar os detalhes de suas dívidas após validar o token de segurança de 6 dígitos enviado ao celular validado no CPF, em conformidade total com a LGPD.
2.  **CA-002 (Performance de Consulta):** O tempo máximo de resposta para carregar e exibir a lista consolidada de dívidas ativas do CPF na tela após a autenticação não deve exceder **2,5 segundos** sob carga de 50.000 usuários simultâneos.
3.  **CA-003 (Exatidão do Simulador):** Qualquer alteração nas barras de rolagem de entrada e quantidade de parcelas no motor inteligente de renegociação deve reajustar instantaneamente os cálculos, impedindo que o valor final negociado fique abaixo do piso mínimo estipulado pelo credor parceiro.
4.  **CA-004 (Conciliação Pix):** Ao realizar o pagamento via Pix Copia e Cola, o gateway deve reconhecer a liquidação em até **15 segundos**, atualizar o status do acordo no portal de "Pendente" para "Liquidado" e gerar o comprovante de quitação em PDF para download imediato.
5.  **CA-005 (Envio de Recorrência):** No caso de acordos parcelados, a esteira de cobrança deve gerar e enviar o link do boleto correspondente via WhatsApp e E-mail de forma automatizada exatamente **5 dias antes** do vencimento de cada parcela.
6.  **CA-006 (Consumo de APIs):** A Open API de integração de credores deve ser capaz de receber lotes de até **100.000 registros de dívidas por requisição** e processá-los de forma assíncrona com taxa de sucesso superior a 99,99%.
7.  **CA-007 (Notificação por Webhook):** No momento exato da liquidação da dívida pelo consumidor, o sistema deve disparar um webhook para o credor informando o status de quitação com tempo máximo de latência de **5 segundos**.
8.  **CA-008 (Estorno/Cancelamento):** Caso um pagamento via boleto seja cancelado por falha bancária, o motor deve estornar o status da dívida para "Inadimplente" em menos de 10 minutos, restabelecendo o saldo original na tela do usuário.
9.  **CA-009 (Acessibilidade):** A interface do portal de autoatendimento deve atingir pontuação mínima de **95%** no Google Lighthouse para Acessibilidade e Performance.
10. **CA-010 (Suporte a Falhas):** Se a Open API de um credor específico estiver fora do ar temporariamente, o portal deve omitir as dívidas desse credor de forma elegante ou alertar o usuário que "as dívidas do credor X estão sendo atualizadas", sem travar a navegação e visualização de outras pendências.

---

## 7. Features Sugeridas

| ID da Feature | Nome da Feature | Descrição Curta | Épico Associado |
| :--- | :--- | :--- | :--- |
| **FT-PAND-001** | Autenticação Segura 2FA via WhatsApp | Envia tokens temporários de login diretamente para o número validado do usuário para autenticação de dois fatores ágil. | Épico 1 |
| **FT-PAND-002** | Simulador Financeiro de Parcelas | Interface visual interativa para ajuste dinâmico do valor de entrada e parcelas mensais, validando faixas de desconto em real-time. | Épico 2 |
| **FT-PAND-003** | Checkout Pix e Link de Copia e Cola | Integração bancária direta para emissão de Pix estático e dinâmico com processamento e conciliação instantânea (em segundos). | Épico 3 |
| **FT-PAND-004** | Régua de Notificação Automatizada (WhatsApp/SMS) | Mecanismo de notificação recorrente e preventiva que avisa sobre vencimentos de parcelas de acordos vigentes. | Épico 3 |
| **FT-PAND-005** | API de Carga de Dívidas e Descontos | Endpoint rest de alta performance para credores realizarem o upload em lote de CPFs e regras específicas de abatimento financeiro. | Épico 4 |
| **FT-PAND-006** | Webhook de Baixa de Pendência | Disparador de eventos em tempo real para sincronização de baixa de negativação junto ao sistema ERP dos credores. | Épico 4 |

---

## 8. Pré-condições e Dependências

1.  **Assinatura Digital de Parcerias:** Formalização comercial das regras de desconto homologadas e permissões legais de uso dos dados com os credores pilotos (bancos e varejistas de grande porte) antes do início da fase de testes.
2.  **Credenciamento junto a Bancos Liquidantes (PSP):** Integração finalizada com o Banco Central/Instituição de Pagamento parceira para geração, custódia e recebimento de Pix com tarifas competitivas.
3.  **Conformidade de KYC:** Parceria técnica fechada com Bureau de Antifraude/Validação de Operadoras móveis para garantia da autenticidade da linha telefônica vinculada ao CPF.

---

## 9. Riscos e Mitigações

*   **Risco 1: Fraude de identidade por Engenharia Social (Falso Devedor acessando dados alheios).**
    *   *Probabilidade:* Média | *Impacto:* Altíssimo
    *   *Mitigação:* Validação rigorosa em dois fatores (2FA) e verificação do cadastro da linha celular junto à operadora (SIM Swap Check), além de não expor informações detalhadas do credor original antes da autenticação ser 100% concluída.
*   **Risco 2: Baixa adesão inicial do consumidor devedor por desconfiança de canais de golpe.**
    *   *Probabilidade:* Alta | *Impacto:* Alto
    *   *Mitigação:* Selo de segurança visual robusto, campanhas institucionais pesadas, certificação HTTPS padrão bancário e links de redirecionamento vindos diretamente de canais oficiais já conhecidos do bureau de crédito.
*   **Risco 3: Indisponibilidade das APIs dos credores parceiros durante a baixa automática.**
    *   *Probabilidade:* Média | *Impacto:* Médio
    *   *Mitigação:* Arquitetura de mensageria baseada em fila (ex: RabbitMQ/SQS) com políticas de retentativa e armazenamento offline de transações pendentes para garantir entrega garantida.

---

## 10. Stakeholders

*   **Comercial e Parcerias:** Alinhamento de novos credores e contratos de success fee.
*   **Segurança da Informação e Compliance (LGPD):** Auditoria contínua de vazamento de dados de inadimplentes e conformidade legal de consentimento.
*   **Equipe de Desenvolvimento e Engenharia:** Responsáveis pela sustentabilidade e escala do portal e das APIs.
*   **Clientes Finais (Consumidores):** Fornecem feedbacks contínuos através de NPS e canais de atendimento digital integrado.

---

## 11. Métricas de Sucesso

| Categoria | Curto Prazo (0 a 3 meses) | Médio Prazo (3 a 6 meses) | Longo Prazo (+12 meses) |
| :--- | :--- | :--- | :--- |
| **Engajamento** | > 200.000 CPFs únicos acessando o portal no primeiro mês. | > 1.000.000 de acessos únicos acumulados. | Penetração de mais de 50% da base ativa de 5 milhões de CPFs. |
| **Conversão** | Taxa de conversão de simulados em acordos gerados > 8%. | Taxa de conversão > 12% com melhorias no motor de descontos. | Taxa consolidada de quitação de acordos gerados > 20%. |
| **Financeiro** | R$ 300 mil recuperados em success fee (Piloto). | Retorno financeiro acumulado superando o investimento inicial de R$ 850k. | ROI superior a 436% (cenário conservador) atingindo receita recorrente sustentável. |
| **Operacional** | Redução de 15% nas chamadas recebidas para renegociação manual. | Redução de 35% de sobrecarga de call center ativo de cobrança. | Economia operacional auditada de R$ 960.000/ano garantida. |

---

## 12. Observações

### Próximos Passos Recomendados:
1.  **Kick-off de Arquitetura Técnica:** Mapear os esquemas de dados JSON para a Open API com foco em segurança da informação.
2.  **Desenvolvimento do Protótipo de Alta Fidelidade (UX):** Realizar testes de usabilidade com devedores reais para refinar o tom de voz e evitar termos de conotação agressiva.
3.  **Ambiente de Homologação Sandbox:** Disponibilizar o ambiente simulado para os 3 credores piloto testarem o consumo da API de envio de acordos.

*Documento salvo e versionado no repositório com integridade de dados e aderência total ao framework de valor corporativo.*

---
*Nota: Documento elaborado de forma consolidada e estratégica sob a metodologia BMAD UpStream (Agente The Visionary).*
