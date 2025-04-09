// Seleciona os elementos do HTML
const uselessSwitch = document.getElementById('useless-switch');
const uselessArm = document.getElementById('useless-arm');
const timerDisplay = document.getElementById('timer-display');

// Variáveis para a lógica de cliques e timer
let clickCount = 0;
let timerInterval = null;
let timerSeconds = 5.00;

// Define o texto inicial do timer
timerDisplay.textContent = `Caixa vai abrir em: ${timerSeconds.toFixed(2)}s`;

// Função para iniciar/atualizar o timer
function startTimer() {
    clearInterval(timerInterval);
    timerSeconds = 5.00;
    timerDisplay.textContent = `Caixa vai abrir em: ${timerSeconds.toFixed(2)}s`;
    timerInterval = setInterval(() => {
        timerSeconds--;
        if (timerSeconds >= 0) {
            timerDisplay.textContent = `Caixa vai abrir em: ${timerSeconds.toFixed(2)}s`;
        } else {
            clearInterval(timerInterval);
        }
    }, 1000);
}

// Função para resetar/limpar o timer display
function resetTimer() {
    clearInterval(timerInterval);
    timerSeconds = 5.00;
    timerDisplay.textContent = `Caixa vai abrir em: ${timerSeconds.toFixed(2)}s`;
}

// Função que executa a sequência de animação da caixa (COM TEMPOS AJUSTADOS PARA 0.8s)
function runAnimationSequence() {
    // 1. Desabilita o switch temporariamente
    uselessSwitch.disabled = true;

    // 2. Adiciona a classe 'active' ao braço para iniciar a animação CSS (que agora dura 0.8s)
    uselessArm.classList.add('active');

    // 3. Define um tempo para DESLIGAR o switch (via código)
    //    Ajustado proporcionalmente para a animação de 0.8s
    setTimeout(() => {
        uselessSwitch.checked = false; // Desliga o switch!
    }, 470); // Ajustado de 700ms para ~470ms (era ~58% de 1.2s, agora ~58% de 0.8s)

    // 4. Define um tempo para RESETAR tudo após a animação terminar
    //    DEVE CORRESPONDER à duração da animação no CSS
    setTimeout(() => {
        uselessArm.classList.remove('active'); // Remove a classe da animação
        uselessSwitch.disabled = false; // Reabilita o switch
        resetTimer(); // Reseta a exibição do timer para o estado inicial
    }, 800); // Ajustado de 1200ms para 800ms (0.8s)
}


// Adiciona um ouvinte de eventos para quando o estado do switch mudar
uselessSwitch.addEventListener('change', function() {
    if (this.checked) {
        clickCount++;
        startTimer();

        // Verifica a condição APENAS para o DELAY (não para a duração da animação)
        if (clickCount > 4 && clickCount <= 14) {
            // Calcula um delay aleatório entre 1s (1000ms) e 4.5s (4500ms)
            const randomDelay = Math.random() * (4500 - 1000) + 1000;
            console.log(`Click ${clickCount}: Delay de ${(randomDelay / 1000).toFixed(1)}s antes da animação (0.8s)`);

            this.disabled = true; // Desabilita durante o delay

            // Executa a animação (com duração fixa de 0.8s) APÓS o delay aleatório
            setTimeout(() => {
                // Verifica se ainda está marcado caso algo externo o desmarque durante o delay
                if (this.checked) {
                    runAnimationSequence(); // Chama a animação padrão (0.8s)
                } else {
                    // Se foi desmarcado, apenas reseta o timer e reabilita
                    resetTimer();
                    this.disabled = false;
                }
            }, randomDelay);

        } else {
            // Cliques 1 a 4 ou após o 14º: executa a animação (0.8s) imediatamente
            console.log(`Click ${clickCount}: Animação imediata (0.8s)`);
            runAnimationSequence(); // Chama a animação padrão (0.8s)
        }
    }
});

// Opcional: Prevenir arrastar
uselessArm.addEventListener('dragstart', (e) => {
    e.preventDefault();
});
