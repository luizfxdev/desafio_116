// Espera o DOM carregar completamente
document.addEventListener('DOMContentLoaded', function () {
    // Seleciona os elementos do DOM
    const decipherBtn = document.getElementById('decipher-btn');
    const resetBtn = document.getElementById('reset-btn');
    const numberInput = document.getElementById('number-input');
    const resultOutput = document.getElementById('result');

    // Inicializa a animação dos botões
    initBubbleButtons();

    // Adiciona evento de clique no botão Decifrar
    decipherBtn.addEventListener('click', function () {
        // Obtém o valor do input e remove espaços em branco
        const inputValue = numberInput.value.trim();

        // Valida a entrada
        if (!inputValue) {
            showError('Por favor, digite uma sequência numérica');
            return;
        }

        if (!/^\d+$/.test(inputValue)) {
            showError('A entrada deve conter apenas dígitos (0-9)');
            return;
        }

        // Calcula o resultado do enigma
        const result = calculateGalacticEnigma(inputValue);

        // Exibe o resultado
        resultOutput.textContent = result;
        resultOutput.style.color = '#90feb5'; // Cor verde alienígena
    });

    // Adiciona evento de clique no botão Retornar
    resetBtn.addEventListener('click', function () {
        // Limpa o input e o resultado
        numberInput.value = '';
        resultOutput.textContent = '--';
        resultOutput.style.color = '#9d65ff'; // Volta à cor padrão
    });

    // Função para calcular o enigma galáctico 
    function calculateGalacticEnigma(numStr) {
        let totalSum = 0;
        const n = numStr.length;

        // Gera todos os subconjuntos não vazios
        // O número de subconjuntos não vazios é 2^n - 1
        for (let i = 1; i < (1 << n); i++) {
            let product = 1;

            // Constrói o subconjunto baseado nos bits ativos
            for (let j = 0; j < n; j++) {
                if (i & (1 << j)) {
                    const digit = parseInt(numStr[j]);
                    product *= digit;
                }
            }

            // Adiciona o produto ao total
            totalSum += product;
        }

        return totalSum;
    }

    // Função para exibir mensagens de erro
    function showError(message) {
        resultOutput.textContent = message;
        resultOutput.style.color = '#ff4df0'; // Cor rosa para erros
    }

    // Função para inicializar a animação dos botões com efeito bubble
    function initBubbleButtons() {
        const buttons = document.querySelectorAll('.button--bubble');

        buttons.forEach(function (button) {
            const $circlesTopLeft = button.parentElement.querySelectorAll('.circle.top-left');
            const $circlesBottomRight = button.parentElement.querySelectorAll('.circle.bottom-right');

            // Cria a timeline para a animação
            const tl = new TimelineLite();
            const tl2 = new TimelineLite();
            const btTl = new TimelineLite({ paused: true });

            // Configura a animação para os círculos do canto superior esquerdo
            tl.to($circlesTopLeft, 1.2, { x: -25, y: -25, scaleY: 2, ease: SlowMo.ease.config(0.1, 0.7, false) });
            tl.to($circlesTopLeft[0], 0.1, { scale: 0.2, x: '+=6', y: '-=2' });
            tl.to($circlesTopLeft[1], 0.1, { scaleX: 1, scaleY: 0.8, x: '-=10', y: '-=7' }, '-=0.1');
            tl.to($circlesTopLeft[2], 0.1, { scale: 0.2, x: '-=15', y: '+=6' }, '-=0.1');
            tl.to($circlesTopLeft[0], 1, { scale: 0, x: '-=5', y: '-=15', opacity: 0 });
            tl.to($circlesTopLeft[1], 1, { scaleX: 0.4, scaleY: 0.4, x: '-=10', y: '-=10', opacity: 0 }, '-=1');
            tl.to($circlesTopLeft[2], 1, { scale: 0, x: '-=15', y: '+=5', opacity: 0 }, '-=1');

            const tlBt1 = new TimelineLite();
            tlBt1.set($circlesTopLeft, { x: 0, y: 0, rotation: -45 });
            tlBt1.add(tl);

            // Configura a animação para os círculos do canto inferior direito
            tl2.set($circlesBottomRight, { x: 0, y: 0 });
            tl2.to($circlesBottomRight, 1.1, { x: 30, y: 30, ease: SlowMo.ease.config(0.1, 0.7, false) });
            tl2.to($circlesBottomRight[0], 0.1, { scale: 0.2, x: '-=6', y: '+=3' });
            tl2.to($circlesBottomRight[1], 0.1, { scale: 0.8, x: '+=7', y: '+=3' }, '-=0.1');
            tl2.to($circlesBottomRight[2], 0.1, { scale: 0.2, x: '+=15', y: '-=6' }, '-=0.2');
            tl2.to($circlesBottomRight[0], 1, { scale: 0, x: '+=5', y: '+=15', opacity: 0 });
            tl2.to($circlesBottomRight[1], 1, { scale: 0.4, x: '+=7', y: '+=7', opacity: 0 }, '-=1');
            tl2.to($circlesBottomRight[2], 1, { scale: 0, x: '+=15', y: '-=5', opacity: 0 }, '-=1');

            const tlBt2 = new TimelineLite();
            tlBt2.set($circlesBottomRight, { x: 0, y: 0, rotation: 45 });
            tlBt2.add(tl2);

            // Combina as timelines
            btTl.add(tlBt1);
            btTl.to(button.parentElement.querySelector('.button.effect-button'), 0.8, { scaleY: 1.1 }, 0.1);
            btTl.add(tlBt2, 0.2);
            btTl.to(button.parentElement.querySelector('.button.effect-button'), 1.8, {
                scale: 1,
                ease: Elastic.easeOut.config(1.2, 0.4)
            }, 1.2);

            btTl.timeScale(2.6);

            // Adiciona o evento de mouseover para acionar a animação
            button.addEventListener('mouseover', function () {
                btTl.restart();
            });
        });
    }
});