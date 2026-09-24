// Seleção de elementos do DOM
const teamForm = document.querySelector('#team-form');
const teamInput = document.querySelector('#team-input');
const submitBtn = document.querySelector('#submit-btn');
const formTitle = document.querySelector('#form-title');
const formDesc = document.querySelector('#form-desc');
const formLabel = document.querySelector('#form-label');

// Inicialização do Áudio
const anthemAudio = new Audio('https://hinomp3.com/hinos/v/hino-vasco-da-gama.mp3');

// Guarda os textos originais para poder restaurar ao clicar em "Voltar"
const originalTitle = formTitle.textContent;
const originalDesc = formDesc.textContent;
const originalLabel = formLabel.textContent;

// Variável de controlo de estado da página
let isShowingResult = false;

// Função utilitária para limpar o texto (remove acentos e passa para minúsculas)
function sanitizeInput(text) {
    let lowerText = text.toLowerCase(); 
    let withoutAccents = lowerText.normalize('NFD').replace(/[\u0300-\u036f]/g, ""); 
    return withoutAccents.trim(); 
}

// Retorna o formulário e a interface ao seu estado inicial
function resetForm() {
    anthemAudio.pause();
    anthemAudio.currentTime = 0;

    formTitle.textContent = originalTitle;
    formTitle.style.color = '#FFFFFF';
    formDesc.textContent = originalDesc;
    formLabel.textContent = originalLabel;
    
    formDesc.classList.remove('hidden');
    formLabel.classList.remove('hidden');
    teamInput.classList.remove('hidden');
    
    teamInput.value = '';
    teamInput.style.borderColor = 'white';
    submitBtn.textContent = 'Confirmar';
    
    isShowingResult = false;
}

// Avalia a submissão do utilizador e processa o resultado
function evaluateTeam(event) {
    event.preventDefault(); 
    
    // Se o resultado já estiver visível, o botão funciona como a ação de "Voltar"
    if (isShowingResult) {
        resetForm();
        return;
    }

    const inputValue = teamInput.value;
    
    // Validação de campo vazio
    if (inputValue === '') {
        teamInput.style.borderColor = 'red'; 
        return; 
    }

    const cleanedInput = sanitizeInput(inputValue);

    // Altera o estado para o modo "Resultado" e esconde elementos desnecessários
    isShowingResult = true;
    teamInput.classList.add('hidden');
    formDesc.classList.add('hidden');

    if (cleanedInput === 'vasco' || cleanedInput === 'vasco da gama' || cleanedInput === 'vaxco') {
        // Cenário de sucesso: Vascaíno
        formTitle.textContent = "SAUDAÇÕES VASCAÍNAS!";
        formLabel.textContent = "Você provou ser um de nós.";
        
        anthemAudio.play().catch(e => console.log('Autoplay bloqueado pelo navegador'));
    } else {
        // Cenário de erro: Outros times
        formTitle.textContent = "TENHO PENA DE VOCÊ";
        formTitle.style.color = "red";
        formLabel.textContent = "Escolha errada...";
    }

    // Altera o botão para assumir a nova função
    submitBtn.textContent = 'Voltar';
}

// REGISTO DE EVENTOS

// Evento 1: click no botão principal
submitBtn.addEventListener('click', evaluateTeam);

// Evento 2: input no campo de texto para limpar o aviso de erro (borda vermelha)
teamInput.addEventListener('input', function() {
    teamInput.style.borderColor = 'white'; 
});