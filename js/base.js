function mostrarVersiculo() {
  const versiculos = [
    '“Porque Deus amou o mundo de tal maneira...” – João 3:16',
    '“O Senhor é meu pastor, nada me faltará.” – Salmos 23:1',
    '“Tudo posso naquele que me fortalece.” – Filipenses 4:13',
    '“Sede fortes e corajosos, não temais.” – Deuteronômio 31:6',
    '“Alegrai-vos na esperança, sede pacientes na tribulação.” – Romanos 12:12'
  ];
  
  const aleatorio = versiculos[Math.floor(Math.random() * versiculos.length)];
  document.getElementById("header_versiculos").textContent = aleatorio;
}

mostrarVersiculo();