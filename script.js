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

// --- Função startTimer MODIFICADA ---
function startTimer() {
    clearInterval(timerInterval); // Limpa qualquer timer anterior
    timerSeconds = 5.00; // Reseta os segundos para 5.00
    timerDisplay.textContent = `Caixa vai abrir em: ${timerSeconds.toFixed(2)}s`; // Mostra imediatamente

    timerInterval = setInterval(() => {
        // Decrementa em 0.01 a cada intervalo de 10ms
        timerSeconds -= 0.01; // <<< AJUSTADO

        // Garante que não mostremos números negativos devido a pequenas imprecisões
        const displaySeconds = Math.max(0, timerSeconds);
        timerDisplay.textContent = `Caixa vai abrir em: ${displaySeconds.toFixed(2)}s`;

        // Para o intervalo quando o tempo chegar a zero ou menos
        if (timerSeconds <= 0) {
            clearInterval(timerInterval);
            // Garante que a exibição final seja exatamente 0.00
            timerDisplay.textContent = `Caixa vai abrir em: 0.00s`;
        }
    }, 10); // <<< AJUSTADO para 10ms (100 vezes por segundo)
}

// --- Função resetTimer (sem mudanças na lógica, mas garante estado inicial) ---
function resetTimer() {
    clearInterval(timerInterval); // Para o timer se estiver rodando
    timerSeconds = 5.00; // Reseta o valor base dos segundos
    timerDisplay.textContent = `Caixa vai abrir em: ${timerSeconds.toFixed(2)}s`; // Reseta a exibição
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
        startTimer(); // Chama a função startTimer modificada

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
