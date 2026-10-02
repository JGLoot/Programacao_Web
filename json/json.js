const STORAGE_KEY = 'catalogo_filmes_dados';

// PASSO 3: Recuperar lista (getItem + JSON.parse ou um array vazio na primeira vez)
let registros = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

// Captura os elementos do DOM
const form = document.getElementById('form-cadastro');
const lista = document.getElementById('lista');
const btnLimpar = document.getElementById('btn-limpar');

// PASSO 5: Mostrar (percorrer o array com for...of e desenhar no DOM)
function renderizarLista() {
    lista.innerHTML = ''; // Limpa a lista atual na tela
    
    if (registros.length === 0) {
    lista.innerHTML = '<p class="empty-msg">Nenhum filme cadastrado ainda.</p>';
    return;
    }

    for (const filme of registros) {
    const li = document.createElement('li');
    li.className = 'registro-item';
    li.innerHTML = `
        <h3>${filme.titulo} (${filme.ano})</h3>
        <p>Diretor: ${filme.diretor}</p>
    `;
    lista.appendChild(li);
    }
}

// PASSO 1: Capturar valores no submit e evitar o recarregamento (preventDefault)
form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // PASSO 2: Criar objeto juntando os valores do formulário
    const novoFilme = {
    titulo: document.getElementById('titulo').value,
    diretor: document.getElementById('diretor').value,
    ano: document.getElementById('ano').value
    };
    
    // PASSO 4: Adicionar no array e salvar no localStorage convertendo para texto
    registros.push(novoFilme);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(registros));
    
    // Limpa os campos do formulário após o cadastro e atualiza a interface
    form.reset(); 
    renderizarLista();
});

// Funcionalidade extra solicitada: Botão para limpar os registros
btnLimpar.addEventListener('click', function() {
    if (confirm('Tem certeza que deseja apagar todos os registros do navegador?')) {
    registros = []; // Zera o array
    localStorage.removeItem(STORAGE_KEY); // Remove do storage
    renderizarLista(); // Atualiza a tela para exibir vazio
    }
});

// PASSO 6: Persistir (chamar a exibição no carregamento da página)
renderizarLista();