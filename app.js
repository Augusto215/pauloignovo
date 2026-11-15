(() => {
  const D = EXPOSICAO;
  const $ = (id) => document.getElementById(id);
  const codigos = Object.keys(D.idiomas);

  /* ---------- textos do idioma atual ---------- */
  // null/ausente = sem tradução -> usa o português
  let idiomaAtual = codigos[0];
  const t = (chave) => {
    const v = D.idiomas[idiomaAtual].textos[chave];
    return v ?? D.idiomas.pt.textos[chave] ?? "";
  };

  /* ---------- links de vídeo ---------- */
  function lerVideo(url) {
    if (!url) return null;
    let m;
    if ((m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/))([\w-]{11})/)))
      return { tipo: "iframe", src: `https://www.youtube.com/embed/${m[1]}?autoplay=1&rel=0` };
    if ((m = url.match(/vimeo\.com\/(?:video\/)?(\d+)/)))
      return { tipo: "iframe", src: `https://player.vimeo.com/video/${m[1]}?autoplay=1` };
    if ((m = url.match(/drive\.google\.com\/(?:file\/d\/|open\?id=)([\w-]+)/)))
      return { tipo: "iframe", src: `https://drive.google.com/file/d/${m[1]}/preview` };
    return { tipo: "arquivo", src: url };
  }

  /* ---------- miniatura ---------- */
  // "Sr. Pedro Tupinikim" -> "assets/thumbs/sr-pedro-tupinikim.webp"
  const slug = (t) => t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase()
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const thumbPadrao = (nome) => `assets/thumbs/${slug(nome)}.webp`;

  /* ---------- ícone de vídeo ---------- */
  function criarTela(url, titulo, thumb) {
    const btn = $("tpl-tela").content.firstElementChild.cloneNode(true);
    btn.querySelector(".em-breve").textContent = t("emBreve");
    if (thumb) {
      const img = document.createElement("img");
      img.className = "tela-img";
      img.alt = "";
      img.loading = "lazy";
      img.onload = () => btn.classList.add("com-img");
      img.onerror = () => img.remove();
      img.src = thumb;
      btn.prepend(img);
    }
    const v = lerVideo(url);
    if (!v) {
      btn.disabled = true;
      btn.setAttribute("aria-label", `${titulo}: ${t("emBreve")}`);
      return btn;
    }
    btn.setAttribute("aria-label", `${t("assistir")}: ${titulo}`);
    btn.addEventListener("click", () => abrirPlayer(v, titulo, thumb));
    return btn;
  }

  /* ---------- player ---------- */
  const player = $("player");
  function abrirPlayer(v, titulo, thumb) {
    const tela = $("player-tela");
    tela.replaceChildren();
    $("player-nome").textContent = titulo;
    player.classList.add("cheia");

    if (v.tipo === "iframe") {
      const el = document.createElement("iframe");
      el.allow = "autoplay; fullscreen; picture-in-picture";
      el.allowFullscreen = true;
      el.title = titulo;
      el.src = v.src;
      tela.appendChild(el);
      player.showModal();
      entrarTelaCheia(document.documentElement);
      return;
    }

    /* Arquivo de vídeo do próprio site: já começa a tocar e abre em tela
       cheia nativa. Tudo precisa acontecer dentro do toque na miniatura,
       senão o navegador bloqueia. */
    const el = document.createElement("video");
    el.controls = true;
    el.preload = "auto";
    if (thumb) el.poster = thumb;
    // iPhone não tem requestFullscreen: sem "playsinline" o play() já abre
    // o player nativo do iOS em tela cheia.
    const iPhone = !el.requestFullscreen && !el.webkitRequestFullscreen && !!el.webkitEnterFullscreen;
    el.playsInline = !iPhone;
    el.src = v.src;
    el.addEventListener("ended", fecharPlayer);
    el.addEventListener("webkitendfullscreen", fecharPlayer); // iPhone: tocou em "OK"/fechar
    tela.appendChild(el);
    player.showModal();
    Promise.resolve(el.play()).catch(() => {});
    if (iPhone) {
      try { el.webkitEnterFullscreen(); } catch (e) { /* o play() já abre em tela cheia */ }
    } else {
      entrarTelaCheia(el);
    }
  }
  function fecharPlayer() {
    $("player-tela").replaceChildren(); // para o vídeo
    if (player.open) player.close();
  }

  /* O vídeo sempre abre em tela cheia (computador e celular). No Android
     também gira a tela para deitado. Se o navegador recusar, fica a tela
     cheia via CSS (classe .cheia). */
  function entrarTelaCheia(alvo) {
    const pedir = alvo.requestFullscreen || alvo.webkitRequestFullscreen;
    if (!pedir) return;
    try {
      Promise.resolve(pedir.call(alvo, { navigationUI: "hide" }))
        .then(() => screen.orientation && screen.orientation.lock && screen.orientation.lock("landscape"))
        .catch(() => {});
    } catch (e) { /* navegador não deixou: segue com a tela cheia via CSS */ }
  }
  function sairTelaCheia() {
    try { screen.orientation && screen.orientation.unlock && screen.orientation.unlock(); } catch (e) {}
    const el = document.fullscreenElement || document.webkitFullscreenElement;
    if (!el) return;
    const sair = document.exitFullscreen || document.webkitExitFullscreen;
    if (sair) Promise.resolve(sair.call(document)).catch(() => {});
  }
  // botão "voltar" do Android sai da tela cheia: fecha o vídeo junto
  const aoMudarTelaCheia = () => {
    if (!(document.fullscreenElement || document.webkitFullscreenElement) && player.open) fecharPlayer();
  };
  document.addEventListener("fullscreenchange", aoMudarTelaCheia);
  document.addEventListener("webkitfullscreenchange", aoMudarTelaCheia);

  $("fechar").addEventListener("click", fecharPlayer);
  player.addEventListener("close", () => {
    $("player-tela").replaceChildren();
    sairTelaCheia();
  });
  player.addEventListener("click", (e) => { if (e.target === player) fecharPlayer(); });

  /* ---------- montagem da página ---------- */
  function montar(cod) {
    idiomaAtual = cod;
    const L = D.idiomas[cod];
    const sub = L.textos.subtitulo === "" ? "" : t("subtitulo");
    document.documentElement.lang = L.lang || cod;
    document.title = sub ? `${L.titulo} — ${sub}` : L.titulo;

    const img = $("titulo");
    img.src = L.tituloImg;
    img.alt = L.titulo;
    img.classList.toggle("fino", cod === "gn");
    $("subtitulo").textContent = sub;
    $("faixa").src = L.faixa;

    $("video-curadores").replaceChildren(criarTela(D.curadores.video, t("curadores"), D.curadores.thumb));
    $("texto-curadores").textContent = t("curadores");
    $("rotulo-artistas").textContent = t("artistas");
    $("rotulo-sem-video").textContent = t("tambemParticipam");
    $("rotulo-realizacao").textContent = t("realizacao");
    $("fechar").setAttribute("aria-label", t("fechar"));
    $("idiomas").setAttribute("aria-label", t("idioma"));
    const aldeia = (a) => `${t("aldeia")} ${a.aldeia}`;

    const comVideo = D.artistas.filter((a) => a.video !== null);
    const semVideo = D.artistas.filter((a) => a.video === null);

    $("lista-artistas").replaceChildren(...comVideo.map((a) => {
      const li = document.createElement("li");
      const texto = document.createElement("div");
      const p = document.createElement("p");
      p.className = "vermelho";
      p.append(a.nome);
      const s = document.createElement("span");
      s.className = "aldeia";
      s.textContent = aldeia(a);
      p.append(s);
      texto.append(p);
      li.append(texto, criarTela(a.video, `${a.nome} — ${aldeia(a)}`, a.thumb || thumbPadrao(a.nome)));
      return li;
    }));

    $("sem-video").hidden = semVideo.length === 0;
    $("lista-sem-video").replaceChildren(...semVideo.map((a) => {
      const li = document.createElement("li");
      li.append(a.nome);
      const s = document.createElement("small");
      s.textContent = aldeia(a);
      li.append(s);
      return li;
    }));

    document.querySelectorAll("#idiomas a").forEach((a) => {
      if (a.dataset.cod === cod) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
  }

  // ilustrações espalhadas: alternam esquerda/direita, com tamanho,
  // inclinação e distância da borda variando (sempre igual a cada carregamento)
  function espalhar() {
    const lista = D.ilustracoes;
    const n = lista.length;
    const r = (k) => { const x = Math.sin(k * 99.13) * 43758.5453; return x - Math.floor(x); };
    $("espalhadas").replaceChildren(...lista.map((nome, i) => {
      const img = document.createElement("img");
      const lado = i % 2 === 0 ? "e" : "d";
      const t = Math.round(120 + r(i + 1) * 70);              // 120–190px
      const topo = 3 + (i / n) * 92 + (r(i + 7) - .5) * 4;     // % da altura
      const f = (.12 + r(i + 13) * .6).toFixed(2);             // posição dentro da margem
      img.src = `assets/ilustracoes/${nome}.webp`;
      img.alt = "";
      img.loading = "lazy";
      img.className = lado;
      img.style.setProperty("--t", `${t}px`);
      img.style.setProperty("--r", `${Math.round((r(i + 21) - .5) * 50)}deg`);
      img.style.top = `${topo}%`;
      img.style[lado === "e" ? "left" : "right"] = `max(0px, calc((50vw - 410px - ${t}px) * ${f}))`;
      return img;
    }));
  }
  espalhar();

  // logos do rodapé
  $("logos").replaceChildren(...D.logos.map((l) => {
    const li = document.createElement("li");
    const img = document.createElement("img");
    img.src = `assets/logos/${l.arquivo}.webp`;
    img.alt = l.nome;
    img.title = l.nome;
    img.loading = "lazy";
    li.append(img);
    return li;
  }));

  // botões de idioma
  $("idiomas").replaceChildren(...codigos.map((c) => {
    const a = document.createElement("a");
    a.href = `#${c}`;
    a.dataset.cod = c;
    a.textContent = D.idiomas[c].nome;
    return a;
  }));

  const atual = () => (codigos.includes(location.hash.slice(1)) ? location.hash.slice(1) : codigos[0]);
  window.addEventListener("hashchange", () => { fecharPlayer(); montar(atual()); window.scrollTo(0, 0); });
  montar(atual());
})();
