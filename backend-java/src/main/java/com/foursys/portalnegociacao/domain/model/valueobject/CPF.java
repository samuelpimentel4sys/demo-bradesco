package com.foursys.portalnegociacao.domain.model.valueobject;

public record CPF(String valor) {
    public CPF {
        if (valor == null || !validarCPF(valor)) {
            throw new IllegalArgumentException("CPF inválido ou mal formatado");
        }
    }

    private static boolean validarCPF(String cpf) {
        String limpo = cpf.replaceAll("\\D", "");
        if (limpo.length() != 11) return false;
        
        // Ignora CPFs conhecidos com todos digitos iguais
        if (limpo.matches("(\\d)\\1{10}")) return false;

        try {
            int soma = 0;
            for (int i = 0; i < 9; i++) {
                soma += (limpo.charAt(i) - '0') * (10 - i);
            }
            int r1 = 11 - (soma % 11);
            int dig1 = (r1 == 10 || r1 == 11) ? 0 : r1;

            soma = 0;
            for (int i = 0; i < 10; i++) {
                soma += (limpo.charAt(i) - '0') * (11 - i);
            }
            int r2 = 11 - (soma % 11);
            int dig2 = (r2 == 10 || r2 == 11) ? 0 : r2;

            return (limpo.charAt(9) - '0' == dig1) && (limpo.charAt(10) - '0' == dig2);
        } catch (Exception e) {
            return false;
        }
    }
}
