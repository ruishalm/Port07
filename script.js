// Seleciona os elementos do HTML pelos seus IDs
const uselessSwitch = document.getElementById('useless-switch');
const uselessArm = document.getElementById('useless-arm');

// Adiciona um ouvinte de eventos para quando o estado do switch mudar
uselessSwitch.addEventListener('change', function() {

    // Verifica se o switch foi LIGADO (checked)
    if (this.checked) {

        // 1. Desabilita o switch temporariamente
        //    Isso previne cliques múltiplos enquanto a animação ocorre.
        this.disabled = true;

        // 2. Adiciona a classe 'active' ao braço para iniciar a animação CSS
        uselessArm.classList.add('active');

        // 3. Define um tempo para DESLIGAR o switch (via código)
        //    O tempo (em milissegundos) deve coincidir com o momento
        //    em que a animação do braço "atinge" o switch.
        //    (60% da animação de 1.2s = 720ms, arredondando um pouco)
        setTimeout(() => {
            this.checked = false; // Desliga o switch!
        }, 700); // Ajuste este valor se mudar a duração da animação

        // 4. Define um tempo para RESETAR tudo após a animação terminar
        //    O tempo deve ser igual ou ligeiramente maior que a duração
        //    total da animação CSS (1.2s = 1200ms).
        setTimeout(() => {
            uselessArm.classList.remove('active'); // Remove a classe da animação
            this.disabled = false; // Reabilita o switch para o próximo clique
        }, 1200); // Duração total da animação

    }
    // Se o switch foi desligado pelo usuário (o que não deveria acontecer
    // se o disable estiver funcionando), não fazemos nada.
});

// Opcional: Prevenir que o usuário arraste a imagem do braço (melhora a experiência)
uselessArm.addEventListener('dragstart', (e) => {
    e.preventDefault();
});
