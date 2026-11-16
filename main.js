// 1. Banco de dados dos projetos (fácil de adicionar novos depois!)
const projetos = [
  {
    titulo: "Personal Bookmarker",
    resumo: "App Full-Stack para salvar e organizar links favoritos.",
    detalhes: "Desenvolvido com front-end responsivo e API REST conectada ao MongoDB.",
    tags: ["JavaScript", "Node.js"]
  },
  {
    titulo: "Sistema de Autenticação",
    resumo: "Back-end seguro com criptografia de senhas.",
    detalhes: "Utiliza Node.js, Express, bcryptjs para hash de senhas e banco MongoDB.",
    tags: ["Node.js"]
  },
  {
    titulo: "Super Trunfo em C",
    resumo: "Jogo de cartas interativo rodando no terminal.",
    detalhes: "Implementa structs, cadastro de cartas e lógica de comparação de atributos.",
    tags: ["C"]
  },
  {
    titulo: "43 Exercícios em Python",
    resumo: "Repositório de algoritmos e lógica de programação.",
    detalhes: "Coleção de problemas resolvidos cobrindo estruturas de repetição, listas e funções.",
    tags: ["Python"]
  }
];

// 2. Renderizar os cards na tela
const grid = document.getElementById("grid-projetos");

function renderizarProjetos(filtro = "todos") {
  grid.innerHTML = ""; // Limpa o grid antes de desenhar

  const filtrados = filtro === "todos"
    ? projetos
    : projetos.filter(p => p.tags.includes(filtro));

  filtrados.forEach(projeto => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <h3>${projeto.titulo}</h3>
      <p>${projeto.resumo}</p>
      <div class="tags">
        ${projeto.tags.map(t => `<span class="tag">${t}</span>`).join("")}
      </div>
      <button class="btn-detalhes">Ver Detalhes</button>
    `;

    // Abre o modal ao clicar no botão do card
    card.querySelector(".btn-detalhes").addEventListener("click", () => abrirModal(projeto));
    grid.appendChild(card);
  });
}

// 3. Lógica dos Botões de Filtro
const botoesFiltro = document.querySelectorAll(".filtro-btn");
botoesFiltro.forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector(".filtro-btn.ativo").classList.remove("ativo");
    btn.classList.add("ativo");
    renderizarProjetos(btn.dataset.filter);
  });
});

// 4. Lógica do Modal
const modal = document.getElementById("modal");
function abrirModal(projeto) {
  document.getElementById("modal-titulo").textContent = projeto.titulo;
  document.getElementById("modal-descricao").textContent = projeto.detalhes;
  document.getElementById("modal-tags").innerHTML = projeto.tags.map(t => `<span class="tag">${t}</span>`).join("");
  modal.classList.add("aberto");
}

document.getElementById("fechar-modal").addEventListener("click", () => modal.classList.remove("aberto"));
modal.addEventListener("click", (e) => { if (e.target === modal) modal.classList.remove("aberto"); });

// 5. Alternar Tema Claro / Escuro
const themeBtn = document.getElementById("theme-toggle");
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  const isLight = document.body.classList.contains("light-mode");
  themeBtn.textContent = isLight ? "☀️ Modo Claro" : "🌙 Modo Escuro";
});

// 6. Efeito Typewriter (Digitação automática)
const textos = ["Full-Stack", "Back-End Node.js", "Estudante de Ciência da Computação"];
let idxTexto = 0, idxLetra = 0, apagando = false;
const spanType = document.getElementById("typewriter");

function animarTexto() {
  const palavraAtual = textos[idxTexto];
  spanType.textContent = palavraAtual.substring(0, idxLetra);

  if (!apagando && idxLetra < palavraAtual.length) {
    idxLetra++;
    setTimeout(animarTexto, 100);
  } else if (apagando && idxLetra > 0) {
    idxLetra--;
    setTimeout(animarTexto, 50);
  } else {
    apagando = !apagando;
    if (!apagando) idxTexto = (idxTexto + 1) % textos.length;
    setTimeout(animarTexto, 1000);
  }
}

// Inicializa a página
renderizarProjetos();
animarTexto();