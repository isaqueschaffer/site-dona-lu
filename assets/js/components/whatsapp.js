document.addEventListener("DOMContentLoaded", () => {
    // Pegar as configurações globais de DONALU_CONFIG se existirem
    let waNumber = "5517981321919"; // fallback
    let defaultMsg = "Olá! Gostaria de falar com a Dona Lu.";

    if (typeof DONALU_CONFIG !== 'undefined' && DONALU_CONFIG.contact.whatsapp) {
        waNumber = DONALU_CONFIG.contact.whatsapp;
        defaultMsg = DONALU_CONFIG.whatsapp.defaultMessage || defaultMsg;
    }

    const encodedMsg = encodeURIComponent(defaultMsg);
    const baseUrl = `https://wa.me/${waNumber}?text=${encodedMsg}`;
    
    // Atualizar todos os links do whatsapp
    document.querySelectorAll("[data-whatsapp]").forEach(el => {
        el.href = baseUrl;
        el.target = "_blank";
        el.rel = "noopener noreferrer";
    });

    // Atualizar os textos visíveis, como o do footer
    const footerWa = document.getElementById("footer-whatsapp-text");
    if(footerWa) {
        // Formata para (17) 98132-1919
        footerWa.textContent = "(17) 98132-1919";
    }
});
