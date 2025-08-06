document.getElementById('gerar').addEventListener('click', async () => {
  const texto = document.getElementById('texto').value;
  const resumoDiv = document.getElementById('resumo');
  resumoDiv.innerHTML = '<em>Gerando resumo com IA...</em>';

  try {
    const resposta = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // *** MUDAR PARA REQUISIÇÃO NO SERVIDOR OU FAZER UM RESUMO COM IA E SALVAR ISSO NO SITE ***
        'Authorization': 'Bearer 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'
        // *** MUDAR PARA REQUISIÇÃO NO SERVIDOR OU FAZER UM RESUMO COM IA E SALVAR ISSO NO SITE ***
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'Resuma o texto de forma clara e objetiva.' },
          { role: 'user', content: texto }
        ]
      })
    });

    const dados = await resposta.json();
    resumoDiv.innerHTML = '<strong>Resumo:</strong><br>' + dados.choices[0].message.content;
  } catch (erro) {
    resumoDiv.innerHTML = '<span class="text-danger">Erro ao gerar resumo: ' + erro.message + '</span>';
  }
});
