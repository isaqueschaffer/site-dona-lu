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
    
    // Atualizar todos os links do whatsapp genéricos e contextuais
    document.querySelectorAll("[data-whatsapp]").forEach(el => {
        let msg = defaultMsg;
        const customMsg = el.getAttribute("data-wa-msg");
        if (customMsg) {
            msg = customMsg;
        }
        el.href = `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;
        el.target = "_blank";
        el.rel = "noopener noreferrer";
    });

    // Atualizar todos os links de produtos específicos (WhatsApp com mensagem pré-preenchida)
    document.querySelectorAll("[data-whatsapp-product]").forEach(el => {
        const productName = el.getAttribute("data-whatsapp-product");
        let price = "";
        
        // Buscar o preço no card do produto, se existir
        const card = el.closest(".product-card");
        if (card) {
            const priceEl = card.querySelector(".price-current");
            if (priceEl) {
                price = " - " + priceEl.textContent.trim();
            }
        }
        
        const productMsg = `Olá! Gostaria de comprar o ${productName}${price} - 1 unidade.`;
        el.href = `https://wa.me/${waNumber}?text=${encodeURIComponent(productMsg)}`;
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
