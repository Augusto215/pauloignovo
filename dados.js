/* =====================================================================
   DADOS DA EXPOSIÇÃO — é só editar este arquivo.
   ---------------------------------------------------------------------
   video: pode ser
     - link do Google Drive (arquivo compartilhado "qualquer pessoa com o link")
     - arquivo de vídeo do site  ex: "videos/ara-guarani.mp4"  (já começa a
       tocar sozinho; os arquivos ficam na pasta videos/ do servidor, fora do git — ver README)
     - link do YouTube   ex: "https://youtu.be/XXXXXXXXXXX"
     - link do Vimeo     ex: "https://vimeo.com/123456789"
     - ""   (vazio)  = tem vídeo, mas o link ainda não foi colocado ("em breve")
     - null          = artista sem vídeo (aparece em "Também participam")

   thumb (opcional): imagem que aparece dentro do quadro do vídeo.
     Se não colocar, o site procura sozinho em assets/thumbs/ pelo nome
     do artista sem acento, ex: "Sr. Pedro Tupinikim" -> sr-pedro-tupinikim.webp

   Vídeos: pasta "VIDEOS ARTISTAS" do Drive do projeto.
   ===================================================================== */

const DRIVE = (id) => `https://drive.google.com/file/d/${id}/view`;

/* ---------------------------------------------------------------------
   IDIOMAS — todos os textos do site, em cada língua.
   A ordem aqui é a ordem dos botões no topo.

   Nos textos de qualquer idioma:
     null  = sem tradução -> o site mostra o texto em português
     ""    = não mostrar nada (só para o subtítulo)
   Nomes de pessoas e de aldeias não são traduzidos.
   --------------------------------------------------------------------- */
const EXPOSICAO = {
  idiomas: {
    pt: {
      nome: "Português",
      lang: "pt-BR",
      tituloImg: "assets/titulo-pt.png",
      titulo: "Reencontro",
      faixa: "assets/ilustracoes/faixa-tupinikim.webp",
      textos: {
        subtitulo: "Exposição de Arte Indígena",
        curadores: "Jocelino Tupinikim e Marcelo Guarani - Curadores",
        artistas: "Artistas",
        aldeia: "Aldeia",                 // aparece antes do nome: "Aldeia Nova Esperança"
        tambemParticipam: "Também participam",
        realizacao: "Realização",
        emBreve: "vídeo em breve",
        assistir: "Assistir vídeo",       // leitores de tela
        fechar: "Fechar",                 // botão × do vídeo
        idioma: "Idioma",                 // leitores de tela
      },
    },
    gn: {
      nome: "Guarani",
      lang: "gn",
      tituloImg: "assets/titulo-gn.png",
      titulo: "Djadjoetxa'idjewy",
      faixa: "assets/ilustracoes/faixa-guarani.webp",
      textos: {
        // REVISAR com os curadores: tradução feita pelo assistente, não por falante nativo.
        subtitulo: "Ava kuery rembiapo ojexauka",
        curadores: "Jocelino Tupinikim ha'e Marcelo Guarani - Onhangareko va'ekuery",
        artistas: "A'erêramã",
        aldeia: "Tekoa",
        tambemParticipam: "Avei oĩ",
        realizacao: "Ojapo va'ekuery",
        emBreve: "vídeo ou ta",
        assistir: "Ema'ẽ vídeo re",
        fechar: "Embotypa",
        idioma: "Ayvu",
      },
    },
    tp: {
      nome: "Tupi",
      lang: "tpw",
      tituloImg: "assets/titulo-tp.png",
      titulo: "Gûasemybé",
      faixa: "assets/ilustracoes/faixa-tupinikim.webp",
      textos: {
        // REVISAR com os curadores: tradução feita pelo assistente, não por falante nativo.
        subtitulo: "Abá rembiapó sepîakaba",
        curadores: "Jocelino Tupinikim, Marcelo Guarani abé - Mba'e rerekoaretá",
        artistas: "Tera",
        aldeia: "Taba",
        tambemParticipam: "Amõ abé",
        realizacao: "Moñangaretá",
        emBreve: "vídeo oúrama",
        assistir: "Epîak vídeo",
        fechar: "Opab",
        idioma: "Nhe'enga",
      },
    },
  },

  curadores: {
    video: DRIVE("1KCgTQuIaspnuQ0GErDFl5ahwgl2QbcP-"),
    thumb: "assets/thumbs/curadores.webp",
  },

  artistas: [
    { nome: "Ará Guarani",              aldeia: "Piraque-Açu",     video: DRIVE("1a9QF9ACGC0Sv8TwWemvoR9w1TUM1zoIB") },
    { nome: "Cláudia Guarani",          aldeia: "Nova Esperança",  video: DRIVE("1Ohdti0yBqOyg0ID_IQSe8OHiJFW5LC1s") },
    { nome: "Cláudiomiro Guarani",      aldeia: "Boa Esperança",   video: DRIVE("1K5VKBprUbL6Xva05LCSL2vv6kTqSVJ5p") },
    { nome: "Daniela Tupinikim",        aldeia: "Caieiras Velha",  video: DRIVE("1nGhdiL7yHzacNyNZxfoas4qvBLQVl05C") },
    { nome: "Fran Guarani",             aldeia: "Boa Esperança",   video: DRIVE("1qYZHiy7MWj4GlMsKG2TgWHv7Veacbuzb") },
    // No Drive também existe "FRANCISCO GONCALVES - 13.mp4" (id 1izqjZmfh1_3hbE9bK4cQW7_IyYnPEJnB)
    { nome: "Francisco Guarani",        aldeia: "Nova Esperança",  video: "https://youtu.be/wCjBs_zH9fA" },
    { nome: "Josias Guarani",           aldeia: "Boa Esperança",   video: "https://youtu.be/bm502-q0HLU" },
    { nome: "Lua Tupinikim",            aldeia: "Caieiras Velha",  video: "https://youtu.be/DYcFBi5EnhA" },
    { nome: "Marcelo Guarani",          aldeia: "Nova Esperança",  video: "https://youtu.be/niUBXWh-K9Y" },
    { nome: "Margarida Tupinikim",      aldeia: "Caieiras Velha",  video: "https://youtu.be/j-awc6S2Q-M" },
    { nome: "Mestre Mizinho Tupinikim", aldeia: "Caieiras Velha",  video: "https://youtu.be/BFO17YkXJAU" },
    { nome: "Michel Tupinikim",         aldeia: "Caieiras Velha",  video: DRIVE("1RGnyDP5CUZE7EdJKmmY89Q7MZXLFe8Dt") },
    { nome: "Nobert Tupinikim",         aldeia: "Caieiras Velha",  video: DRIVE("19sTKQkBPtsz8KnLPxwpMMXC4Yx3iPKCU") },
    { nome: "Reinalda Tupinikim",       aldeia: "Caieiras Velha",  video: DRIVE("1ULT9XrVl3tuk4Rt5hcWbK2jQcMFVf7H4") },
    { nome: "Rogério Tupinikim",        aldeia: "Pau Brasil",      video: "https://youtu.be/UNzmrpkZ6Gs" },
    { nome: "Sr. Pedro Tupinikim",      aldeia: "Areal",           video: "https://youtu.be/jjkAFJAJGBA" },
    { nome: "Selenilda Tupinikim",      aldeia: "Caieiras Velha",  video: "https://youtu.be/96aG_bXzrnQ" },
    { nome: "Sônia Guarani",            aldeia: "Boa Esperança",   video: "https://youtu.be/j8LzwBzsTrY" },

    // ---- sem vídeo ----
    { nome: "Jocelino Tupinikim",       aldeia: "Nova Esperança",  video: null },
    { nome: "Maynõ Guarani",            aldeia: "Nova Esperança",  video: null },
    { nome: "Deusdéia Tupinikim",       aldeia: "Pau Brasil",      video: null },
    { nome: "Rodrigo Guarani",          aldeia: "Piraque-Açu",     video: null },
    { nome: "Alex Tupinikim",           aldeia: "Caieiras Velha",  video: null },
    { nome: "Tiago Mateus Tupinikim",   aldeia: "Córrego do Ouro", video: null },
    { nome: "Amãdau Guarani",           aldeia: "Nova Esperança",  video: null },
    { nome: "Bárbara Tupinikim",        aldeia: "Pau Brasil",      video: null },
  ],

  // Ilustrações espalhadas pelas laterais da página (de cima pra baixo,
  // alternando esquerda e direita). Arquivos em assets/ilustracoes/.
  ilustracoes: [
    "flor-vermelha", "flauta", "peixe", "folhas-trio", "flor-azul", "rabeca",
    "cestos", "flor-amarela", "tambores", "folha-dir", "flor-lilas", "flor-verde",
    "folha-esq", "flor-branca",
  ],

  // Logos do rodapé (pasta assets/logos)
  logos: [
    { arquivo: "aitg",            nome: "Associação Indígena Tupiniquim e Guarani (AITG)" },
    { arquivo: "aigkp",           nome: "Associação Indígena Guarani Ka'agwy Porã (AIGKP)" },
    { arquivo: "maes",            nome: "Museu de Arte do Espírito Santo (MAES)" },
    { arquivo: "funcultura",      nome: "Funcultura" },
    { arquivo: "secult",          nome: "Governo do Estado do Espírito Santo — Secretaria da Cultura" },
    { arquivo: "aldir-blanc",     nome: "Política Nacional Aldir Blanc de Fomento à Cultura" },
    { arquivo: "snc",             nome: "Sistema Nacional de Cultura" },
    { arquivo: "minc",            nome: "Ministério da Cultura" },
    { arquivo: "governo-federal", nome: "Governo do Brasil — Do lado do povo brasileiro" },
  ],
};
