/**
 * DONA LU — Configurações do Site
 *
 * Edite este arquivo para atualizar dados de contato, WhatsApp,
 * redes sociais e outras configurações em todo o site.
 *
 * NÃO coloque credenciais, senhas ou chaves de API aqui.
 */

const DONALU_CONFIG = Object.freeze({

  /* =========================================
     EMPRESA
  ========================================= */
  company: {
    name:        'Dona Lu',
    fullName:    'Dona Lu — Produtos e Soluções de Limpeza',
    slogan:      'Soluções profissionais para limpeza e higienização',
    cnpj:        '',                    // Ex: '00.000.000/0001-00'
    city:        '',                    // Ex: 'São Paulo, SP'
    address:     '',                    // Ex: 'Rua Exemplo, 123 - Bairro - Cidade/UF'
    postalCode:  '',
  },

  /* =========================================
     CONTATO
  ========================================= */
  contact: {
    phone:       '',                    // Ex: '(11) 9 9999-9999'
    phoneRaw:    '',                    // Ex: '11999999999' (somente dígitos)
    email:       'donalumateriais@gmail.com',
    whatsapp:    '5517981321919',       // Ex: '5511999999999' (com DDI)
  },

  /* =========================================
     WHATSAPP — Mensagens Contextualizadas
  ========================================= */
  whatsapp: {
    defaultMessage:
      'Olá! Gostaria de solicitar um orçamento. Pode me ajudar?',
    quoteMessage:
      'Olá! Gostaria de solicitar um orçamento. Produto/serviço de interesse: ',
    machineMessage:
      'Olá! Tenho interesse em locação de equipamento: ',
    segmentMessage:
      'Olá! Estou buscando soluções de limpeza para: ',
    contactMessage:
      'Olá! Gostaria de entrar em contato com a Dona Lu.',
  },

  /* =========================================
     REDES SOCIAIS
  ========================================= */
  social: {
    instagram:   'https://www.instagram.com/donalumateriaisdelimpeza/',
    facebook:    '',                    // Ex: 'https://facebook.com/donalu'
    linkedin:    '',
  },

  /* =========================================
     SEO
  ========================================= */
  seo: {
    siteName:    'Dona Lu',
    siteUrl:     '',                    // Ex: 'https://www.donalu.com.br'
    defaultImage: '/assets/images/og-image.jpg',
    twitterHandle: '',
  },

  /* =========================================
     LGPD / PRIVACIDADE
  ========================================= */
  privacy: {
    dataController:       'Dona Lu',   // Nome do controlador de dados
    dataControllerCnpj:   '',
    dataControllerEmail:  '',           // E-mail para assuntos de privacidade
    lastUpdated:          '2025-09-13',
  },

});

// Exporta para uso em módulos (se necessário)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DONALU_CONFIG;
}
