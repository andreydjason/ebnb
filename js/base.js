function sanitizeInput(str) {
  return str.replace(/[<>"'/\\&]/g, '');
}

$(document).ready(function() {
  const barra_navegacao = $('#barra_navegacao').offset().top - 1;

  // Bloqueia o click de links maliciosos
  $('a').on('click', function(clickEvent) {
    const href = $(this).attr('href').trim().toLowerCase();

    if (
      !href || 
      href.startsWith('javascript:') || 
      href.startsWith('data:') || 
      href.startsWith('vbscript:')
    ) {
      clickEvent.preventDefault(); // Bloqueia a navegação
      // INCLUIR AVISO DO LADO DO SERVIDOR
    }
  });

  // Mostra Versículo Aleatório no Cabeçalho cada vez que entra
  const versiculos = [
    '“Porque Deus amou o mundo de tal maneira...” – João 3:16',
    '“O Senhor é meu pastor, nada me faltará.” – Salmos 23:1',
    '“Tudo posso naquele que me fortalece.” – Filipenses 4:13',
    '“Sede fortes e corajosos, não temais.” – Deuteronômio 31:6',
    '“Alegrai-vos na esperança, sede pacientes na tribulação.” – Romanos 12:12'
  ];
  let ultimoIndex = -1;

  function mostrarVersiculo() {
    let novoIndex;

    // Garante que não repita o mesmo versículo consecutivamente
    do {
      novoIndex = Math.floor(Math.random() * versiculos.length);
    } while (novoIndex === ultimoIndex);

    ultimoIndex = novoIndex;

    $("#header_versiculos").text(versiculos[novoIndex]);
  }

  // Input de Pesquisa
  $('#search').on('input change keyup', function () {
    const termo = sanitizeInput($(this).val().toLowerCase().trim());

    if (termo !== '') {
      $('#ensinamentos .ensinamento').each(function () {
        const texto = $(this).text().toLowerCase();
        $(this).toggle(texto.includes(termo));
      });
    } else {
      // Se o campo está vazio, mostra todos os posts
      $('#ensinamentos .ensinamento').show();
    }
  });

  // INCLUIR button_pesquisar

  // Carrega o artigo clicado
  $('a.carregar-artigo').on('click', function(clickEvent) {
    var artigo_href = $(this).attr('href').trim().toLowerCase();

    $("#conteudo-artigo").removeClass('visually-hidden');
    $('#conteudo-artigo-html').empty();
    $("#conteudo-artigo-continue-lendo").hide();
    $('#loader').show();

    // Scroll para o conteúdo
    $('html, body').animate({
        scrollTop: barra_navegacao
    }, 'fast');

    setTimeout(() => {

      $('#conteudo-artigo-html').load(artigo_href, function (response, status, xhr) {
        $('#loader').hide();

        if (status === "error") { // Se der erro
          $('#conteudo-artigo-html').html("<div id=\"erro_ao_carregar\" class=\"border-1 rounded-1 list-group-item list-group-item-danger pt-3 my-0\"\><p class=\"text-center\">❌ Desculpe, houve um erro ao carregar o artigo.</p><h6 class=\"text-center py-0 my-0 mb-4\"\>Leia outro artigo enquanto resolvemos o problema — Ou tente novamente mais tarde.</h6\></div>");

          $("#conteudo-artigo-continue-lendo").hide();

          clickEvent.preventDefault();
        } else { // Se não der erro
          // Scroll para o conteúdo
          $('html, body').animate({
              scrollTop: barra_navegacao
          }, 'fast');

          $("#conteudo-artigo-continue-lendo").removeClass('visually-hidden');
          $("#conteudo-artigo-continue-lendo").show();

          $(".voltar-conteudo").on("click", function(clickEventVoltar) {
            $('#conteudo-artigo-html').empty();
            $("#conteudo-artigo").addClass('visually-hidden');

            // Scroll para os ensinamentos
            $('html, body').animate({
                scrollTop: barra_navegacao
            }, 'fast');

            clickEvent.preventDefault();
            clickEventVoltar.preventDefault();
        });
        }
      });

    }, 1500);
    
    clickEvent.preventDefault();
  });

  mostrarVersiculo();
});