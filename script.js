(function() {
  "use strict";

  // Número de telefone principal (substitua pelo seu - atualmente: 999999999)
  const telefoneBase = "999999999";
  
  /**
   * Formata o número de telefone para exibição no padrão (99) 99999-9999
   * @param {string} numero - Número puro sem formatação
   * @returns {string} Número formatado
   */
  function formatarTelefone(numero) {
    // Remove qualquer caractere não numérico
    const numeroLimpo = numero.replace(/\D/g, '');
    
    if (numeroLimpo.length === 9) {
      return `(${numeroLimpo.substring(0, 2)}) ${numeroLimpo.substring(2, 7)}-${numeroLimpo.substring(7, 11)}`;
    } else if (numeroLimpo.length === 11) {
      return `(${numeroLimpo.substring(0, 2)}) ${numeroLimpo.substring(2, 7)}-${numeroLimpo.substring(7, 11)}`;
    }
    return numero;
  }

  const telefoneFormatado = formatarTelefone(telefoneBase);

  /**
   * Atualiza todos os elementos na página que exibem o número de telefone
   */
  function atualizarTelefonesNaTela() {
    const elementosTelefone = document.querySelectorAll('#telefoneDisplay, #footerTel');
    elementosTelefone.forEach(el => {
      if (el) el.textContent = telefoneFormatado;
    });
  }

  /**
   * Abre o WhatsApp com o número configurado e uma mensagem padrão
   */
  function abrirWhatsApp() {
    const numeroLimpo = telefoneBase.replace(/\D/g, '');
    const mensagem = encodeURIComponent(
      "Olá, vim pelo site da MLcell. Gostaria de informações sobre conserto de Android."
    );
    const url = `https://wa.me/55${numeroLimpo}?text=${mensagem}`;
    window.open(url, '_blank');
  }

  /**
   * Configura os event listeners nos botões de WhatsApp
   */
  function configurarBotoes() {
    const heroBtn = document.getElementById('ctaHeroBtn');
    const contatoBtn = document.getElementById('btnWhatsappContato');

    if (heroBtn) {
      heroBtn.addEventListener('click', abrirWhatsApp);
    }
    if (contatoBtn) {
      contatoBtn.addEventListener('click', abrirWhatsApp);
    }
  }

  /**
   * Configura scroll suave para links internos (âncoras)
   */
  function configurarScrollSuave() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === "#") return;
        
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
        }
      });
    });
  }

  /**
   * Função de inicialização
   */
  function init() {
    atualizarTelefonesNaTela();
    configurarBotoes();
    configurarScrollSuave();
    console.log('✅ MLcell | Site carregado com sucesso.');
  }

  // Aguarda o DOM estar completamente carregado
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();