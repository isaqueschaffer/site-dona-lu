import os

html_content = """<!DOCTYPE html>
<html lang="pt-BR" dir="ltr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dona Lu — Distribuidora de Produtos de Limpeza Profissional</title>
  
  <meta name="description" content="A Dona Lu oferece as melhores soluções em produtos de limpeza profissional, equipamentos e serviços para empresas, condomínios e indústrias.">

  <!-- Google Fonts - Poppins -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">

  <!-- CSS -->
  <link rel="stylesheet" href="/assets/css/reset.css">
  <link rel="stylesheet" href="/assets/css/tokens.css">
  <link rel="stylesheet" href="/assets/css/layout.css">
  <link rel="stylesheet" href="/assets/css/components.css">
  <link rel="stylesheet" href="/assets/css/pages/home.css">

  <script src="/config/settings.js" defer></script>
  <script src="/assets/js/components/whatsapp.js" defer></script>
  <script src="/assets/js/components/header.js" defer></script>

  <!-- Estilos Específicos do Redesign -->
  <style>
    /* Adaptações Rápidas RP Clean Style */
    .topbar { background-color: var(--color-secondary); color: var(--color-white); padding: 10px 0; font-size: 14px; text-align: center; }
    .topbar a { color: var(--color-yellow); font-weight: 600; }
    
    .hero-rp { background: linear-gradient(90deg, #006DD9 0%, #0050A0 100%); padding: 100px 0; color: white; text-align: left; }
    .hero-rp h1 { font-size: 48px; font-weight: 700; margin-bottom: 20px; line-height: 1.2; }
    .hero-rp h1 span { color: var(--color-yellow); }
    .hero-rp p { font-size: 18px; margin-bottom: 30px; font-weight: 300; max-width: 600px; }
    .hero-rp .btn-hero { background-color: var(--color-yellow); color: var(--color-secondary); font-weight: 700; font-size: 18px; padding: 15px 30px; border-radius: 8px; display: inline-block; transition: 0.3s; }
    .hero-rp .btn-hero:hover { transform: scale(1.05); }

    .section-title-rp { font-size: 32px; color: var(--color-primary); font-weight: 700; text-align: center; margin-bottom: 40px; }
    .section-title-rp span { color: var(--color-secondary); }
    
    .cat-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-top: 40px; }
    .cat-card { background: white; border-radius: 12px; box-shadow: var(--shadow-md); padding: 30px 20px; text-align: center; transition: 0.3s; border-bottom: 4px solid var(--color-primary); }
    .cat-card:hover { transform: translateY(-5px); border-color: var(--color-yellow); }
    .cat-card img { height: 60px; margin-bottom: 20px; filter: invert(21%) sepia(87%) saturate(3025%) hue-rotate(200deg) brightness(97%) contrast(106%); }
    .cat-card h3 { font-weight: 600; font-size: 18px; color: var(--color-secondary); }

    .product-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px; margin-top: 40px; }
    .product-card { background: white; border-radius: 12px; box-shadow: var(--shadow-sm); overflow: hidden; text-align: center; padding-bottom: 20px; transition: 0.3s; }
    .product-card:hover { box-shadow: var(--shadow-lg); }
    .product-card .img-bg { background-color: var(--color-bg-tertiary); padding: 40px 20px; }
    .product-card img { height: 150px; object-fit: contain; }
    .product-card h3 { font-size: 16px; font-weight: 600; color: var(--color-secondary); padding: 20px 10px 10px; }
    .product-card .btn-prod { background-color: var(--color-green); color: var(--color-secondary); padding: 8px 20px; border-radius: 20px; font-weight: 600; font-size: 14px; margin-top: 10px; display: inline-block; transition: 0.3s; }
    .product-card .btn-prod:hover { background-color: var(--color-yellow); }

    .cta-rp { background: var(--color-secondary); padding: 80px 0; color: white; display: flex; align-items: center; justify-content: space-between; }
    .cta-rp h2 { font-size: 40px; color: var(--color-yellow); font-weight: 700; margin-bottom: 10px; }
    .cta-rp p { font-size: 20px; font-weight: 300; }
    .cta-rp .btn-cta { background-color: var(--color-green); color: var(--color-secondary); font-size: 20px; font-weight: 700; padding: 15px 40px; border-radius: 12px; transition: 0.3s; display: inline-block; }
    .cta-rp .btn-cta:hover { transform: scale(1.05); }
    
    .footer-rp { background-color: var(--color-secondary); padding: 60px 0 20px; color: white; }
    .footer-rp h3 { color: var(--color-yellow); font-size: 18px; margin-bottom: 20px; font-weight: 600; text-transform: uppercase; }
    .footer-rp a { color: white; transition: 0.3s; display: block; margin-bottom: 10px; font-size: 14px; }
    .footer-rp a:hover { color: var(--color-yellow); }
    .footer-rp .copyright { background: var(--color-secondary-dark); padding: 15px 0; margin-top: 40px; text-align: center; font-size: 14px; }
  </style>
</head>
<body class="page-home">

  <div class="topbar">
    <div class="container">
      Fale Conosco: <a href="#" data-whatsapp id="topbar-wa">17 98132-1919</a> | Produtos de Limpeza Profissional em São José do Rio Preto
    </div>
  </div>

  <header class="header" style="background: white; border-bottom: 1px solid #eaeaea;">
    <div class="container" style="display: flex; justify-content: space-between; align-items: center; height: 90px;">
      <a href="/index.html">
        <img src="/assets/images/logo/logo-donalu.jpg" alt="Dona Lu" style="height: 60px;">
      </a>
      
      <nav class="header__nav" id="main-nav" style="display: flex; gap: 30px; align-items: center;">
        <a href="/index.html" style="color: var(--color-primary); font-weight: 600;">Início</a>
        <a href="/produtos.html" style="color: var(--color-secondary); font-weight: 500;">Produtos</a>
        <a href="/locacao.html" style="color: var(--color-secondary); font-weight: 500;">Locação</a>
        <a href="/solucoes.html" style="color: var(--color-secondary); font-weight: 500;">Soluções</a>
        <a href="/empresa.html" style="color: var(--color-secondary); font-weight: 500;">Empresa</a>
        <a href="/contato.html" style="background: var(--color-yellow); color: var(--color-secondary); padding: 10px 25px; border-radius: 8px; font-weight: 600;">Contato</a>
      </nav>
    </div>
  </header>

  <main>
    <!-- HERO -->
    <section class="hero-rp">
      <div class="container">
        <h1>Produtos de Limpeza Profissional<br><span>para o seu negócio</span></h1>
        <p>Mais que uma distribuidora, somos parceiros para soluções em higienização de condomínios, indústrias, clínicas e restaurantes.</p>
        <a href="/produtos.html" class="btn-hero">Conhecer Produtos</a>
      </div>
    </section>

    <!-- CATEGORIAS -->
    <section class="section" style="padding: 80px 0; background: var(--color-bg-secondary);">
      <div class="container">
        <h2 class="section-title-rp">Nossas <span>Linhas de Atuação</span></h2>
        
        <div class="cat-grid">
          <a href="/produtos.html#limpeza-geral" class="cat-card">
            <img src="https://www.rpclean.com.br/images/alt-arrow-down.svg" alt="Limpeza Geral">
            <h3>Limpeza Geral</h3>
          </a>
          <a href="/produtos.html#automotiva" class="cat-card">
            <img src="https://www.rpclean.com.br/images/alt-arrow-down.svg" alt="Automotiva">
            <h3>Automotiva</h3>
          </a>
          <a href="/produtos.html#pisos" class="cat-card">
            <img src="https://www.rpclean.com.br/images/alt-arrow-down.svg" alt="Tratamento de Pisos">
            <h3>Tratamento de Pisos</h3>
          </a>
          <a href="/produtos.html#lavanderia" class="cat-card">
            <img src="https://www.rpclean.com.br/images/alt-arrow-down.svg" alt="Lavanderia">
            <h3>Lavanderia</h3>
          </a>
          <a href="/produtos.html#equipamentos" class="cat-card">
            <img src="https://www.rpclean.com.br/images/alt-arrow-down.svg" alt="Equipamentos">
            <h3>Equipamentos</h3>
          </a>
        </div>
      </div>
    </section>

    <!-- MAIS VENDIDOS -->
    <section class="section" style="padding: 80px 0;">
      <div class="container">
        <h2 class="section-title-rp">Os Mais <span>Vendidos</span></h2>
        
        <div class="product-grid">
          <div class="product-card">
            <div class="img-bg">
              <img src="https://via.placeholder.com/200x250?text=Produto+1" alt="Produto 1">
            </div>
            <h3>Detergente Concentrado 5L</h3>
            <a href="#" class="btn-prod">Ver Produto</a>
          </div>
          <div class="product-card">
            <div class="img-bg">
              <img src="https://via.placeholder.com/200x250?text=Produto+2" alt="Produto 2">
            </div>
            <h3>Desinfetante Hospitalar</h3>
            <a href="#" class="btn-prod">Ver Produto</a>
          </div>
          <div class="product-card">
            <div class="img-bg">
              <img src="https://via.placeholder.com/200x250?text=Produto+3" alt="Produto 3">
            </div>
            <h3>Limpador Multiúso</h3>
            <a href="#" class="btn-prod">Ver Produto</a>
          </div>
          <div class="product-card">
            <div class="img-bg">
              <img src="https://via.placeholder.com/200x250?text=Produto+4" alt="Produto 4">
            </div>
            <h3>Cera Acrílica Piso</h3>
            <a href="#" class="btn-prod">Ver Produto</a>
          </div>
        </div>
      </div>
    </section>

    <!-- CALL TO ACTION -->
    <section class="cta-rp">
      <div class="container" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 30px;">
        <div>
          <h2>Consultoria Especializada</h2>
          <p>Encontre a solução de limpeza ideal para o seu negócio.</p>
        </div>
        <a href="/contato.html" class="btn-cta">Falar com Especialista</a>
      </div>
    </section>

    <!-- PARCEIROS (Mantido conforme solicitado) -->
    <section class="section" style="padding: 80px 0;">
      <div class="container">
        <h2 class="section-title-rp">Parceria de <span>Sucesso</span></h2>
        
        <div style="display: flex; justify-content: center; margin-top: 40px;">
          <a href="https://www.startquimica.com.br/pt-BR" target="_blank" rel="noopener noreferrer" style="text-decoration: none; text-align: center; display: block; max-width: 450px; padding: 30px; background: white; border-radius: 12px; box-shadow: var(--shadow-sm); transition: 0.3s; border: 1px solid #eee;">
            <img src="https://www.startquimica.com.br/images/start-cor-fundo-transparente@2x.png" alt="Logo Start Química" style="height: 60px; width: auto; object-fit: contain; margin-bottom: 20px;">
            <h3 style="font-size: 24px; font-weight: 700; margin-bottom: 15px; color: var(--color-secondary);">Start Química</h3>
            <p style="font-size: 14px; color: #666; line-height: 1.6;">
              A <strong>Start Química</strong> é uma de nossas parceiras oficiais. Com foco em soluções profissionais inovadoras e sustentáveis, nos ajuda a entregar resultados impecáveis e seguros para sua empresa, condomínio ou indústria.
            </p>
          </a>
        </div>
      </div>
    </section>

  </main>

  <footer class="footer-rp">
    <div class="container" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 40px;">
      <div>
        <img src="/assets/images/logo/logo-donalu.jpg" alt="Dona Lu" style="height: 80px; margin-bottom: 20px;">
        <p style="font-size: 14px; line-height: 1.6;">Produtos de limpeza, equipamentos e soluções profissionais de higienização.</p>
      </div>
      <div>
        <h3>Institucional</h3>
        <a href="/index.html">Início</a>
        <a href="/empresa.html">A Empresa</a>
        <a href="/solucoes.html">Soluções</a>
        <a href="/contato.html">Contato</a>
      </div>
      <div>
        <h3>Produtos</h3>
        <a href="/produtos.html#limpeza-geral">Limpeza Geral</a>
        <a href="/produtos.html#automotiva">Linha Automotiva</a>
        <a href="/produtos.html#pisos">Tratamento de Pisos</a>
        <a href="/locacao.html">Locação de Equipamentos</a>
      </div>
      <div>
        <h3>Fale Conosco</h3>
        <a href="#" data-whatsapp>Whatsapp: 17 98132-1919</a>
        <a href="mailto:contato@donalu.com.br">contato@donalu.com.br</a>
        <p style="font-size: 14px; margin-top: 10px;">Av. Exemplo, 1234 - São José do Rio Preto, SP</p>
      </div>
    </div>
    <div class="copyright">
      <div class="container">
        &copy; 2026 Dona Lu. Todos os direitos reservados.
      </div>
    </div>
  </footer>

</body>
</html>
"""

with open(r"c:\Users\amand\OneDrive\Área de Trabalho\Site lucimara\index.html", "w", encoding="utf-8") as f:
    f.write(html_content)

print("Generated new index.html!")
