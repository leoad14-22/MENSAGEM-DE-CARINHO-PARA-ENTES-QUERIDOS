// Dados das mensagens e estilos
const loveMessages = [
    {
        title: "Amor Eterno",
        text: "Você é a razão do meu sorriso todos os dias. Cada momento ao seu lado é um presente que guardo no coração com todo carinho.",
        icon: "💕"
    },
    {
        title: "Minha Estrela Guia",
        text: "Em meio a tantas pessoas no mundo, você brilha como a estrela mais especial do meu universo, iluminando todos os meus caminhos.",
        icon: "⭐"
    },
    {
        title: "Coração Acelerado",
        text: "Meu coração dispara toda vez que você sorri. Você tem o poder mágico de tornar qualquer dia cinzento em um dia perfeito e colorido.",
        icon: "💓"
    },
    {
        title: "Meu Porto Seguro",
        text: "Nos seus braços encontro a paz que sempre procurei. Você é meu lar, meu amor, minha felicidade e minha razão de viver.",
        icon: "🏡"
    },
    {
        title: "Alma Gêmea",
        text: "Você não é apenas meu amor, é a outra metade da minha alma. Juntos somos completos, invencíveis e eternamente conectados.",
        icon: "👫"
    },
    {
        title: "Promessa Sagrada",
        text: "Prometo amar você hoje, amanhã e por todos os dias da minha vida. Meu amor por você é infinito como o universo.",
        icon: "💍"
    },
    {
        title: "Meu Maior Tesouro",
        text: "Você vale mais que todos os tesouros do mundo. É o presente mais precioso que a vida me deu e o que mais protejo.",
        icon: "💎"
    },
    {
        title: "Sonho Realizado",
        text: "Você transformou todos os meus sonhos em realidade. Com você, até os impossíveis se tornam possíveis e os miracles acontecem.",
        icon: "🌟"
    },
    {
        title: "Minha Inspiração",
        text: "Você me inspira a ser uma pessoa melhor a cada dia. Seu amor me dá forças para enfrentar qualquer desafio da vida.",
        icon: "🦋"
    },
    {
        title: "Momento Eterno",
        text: "Cada segundo ao seu lado parece uma eternidade de felicidade. Quero viver milhões desses momentos mágicos com você.",
        icon: "⏰"
    },
    {
        title: "Meu Sol",
        text: "Você ilumina minha vida como o sol ilumina o mundo. Sem você, tudo seria escuro e sem sentido.",
        icon: "☀️"
    },
    {
        title: "Conexão Única",
        text: "Nossa conexão é algo raro e especial. É como se nossas almas se reconhecessem desde o início dos tempos.",
        icon: "🔗"
    }
];

const balloonColors = [
    'linear-gradient(135deg, #ff6b9d, #c44569)',
    'linear-gradient(135deg, #a8edea, #fed6e3)',
    'linear-gradient(135deg, #ffeaa7, #fab1a0)',
    'linear-gradient(135deg, #fd79a8, #fdcb6e)',
    'linear-gradient(135deg, #6c5ce7, #a29bfe)',
    'linear-gradient(135deg, #ff7675, #fd79a8)',
    'linear-gradient(135deg, #00b894, #00cec9)',
    'linear-gradient(135deg, #e17055, #fdcb6e)',
    'linear-gradient(135deg, #ff9ff3, #f368e0)',
    'linear-gradient(135deg, #3742fa, #5352ed)'
];

const heartEmojis = ['💖', '💕', '💗', '💓', '💘', '💝', '💜', '💙', '🧡', '💚'];
const particleEmojis = ['✨', '⭐', '💫', '🌟', '💖', '💕', '🌹', '🦋'];

// Elementos DOM
const particlesContainer = document.getElementById('particles');
const balloonCounterElement = document.getElementById('balloonCounter');
const messageModal = document.getElementById('message');
const messageOverlay = document.getElementById('overlay');
const messageIcon = messageModal.querySelector('.message-icon');
const messageTitle = document.getElementById('messageTitle');
const messageText = document.getElementById('messageText');

let balloonCount = 0;
let currentMessage = null; // Armazena a mensagem atualmente exibida
let particleInterval; // Para controlar o intervalo das partículas
let balloonGenerationInterval; // Para controlar o intervalo de geração de balões

/**
 * Retorna a quantidade ideal de balões com base na largura da janela.
 * @returns {number} O número alvo de balões.
 */
function getTargetBalloonCount() {
    return window.innerWidth < 768 ? 6 : 10; // 6 para telas pequenas, 10 para telas maiores
}

/**
 * Atualiza o contador de balões exibido na tela.
 */
function updateBalloonCounter() {
    balloonCounterElement.textContent = `🎈 Balões: ${balloonCount}`;
}

/**
 * Cria partículas românticas que flutuam na tela.
 * Garante que não haja partículas em excesso.
 */
function createRomanticParticles() {
    // Limpa qualquer intervalo anterior para evitar duplicação
    if (particleInterval) clearInterval(particleInterval);

    particleInterval = setInterval(() => {
        const currentParticles = document.querySelectorAll('.particle').length;
        // Limita o número de partículas para evitar sobrecarga de performance
        if (currentParticles < (window.innerWidth < 768 ? 10 : 20)) { 
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.textContent = particleEmojis[Math.floor(Math.random() * particleEmojis.length)];
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 5 + 's';
            particle.style.animationDuration = (10 + Math.random() * 10) + 's';
            particlesContainer.appendChild(particle);
            
            // Remove a partícula após sua animação para limpar o DOM
            particle.addEventListener('animationend', () => particle.remove(), { once: true });
        }
    }, 1500); // Gera novas partículas a cada 1.5 segundos
}

/**
 * Cria e adiciona um novo balão à página.
 */
function createBalloon() {
    const balloon = document.createElement('div');
    balloon.className = 'balloon';
    balloon.setAttribute('role', 'button'); // Indica que é um elemento clicável
    balloon.setAttribute('aria-label', 'Clique para uma mensagem de amor'); // Descrição para leitores de tela
    
    const balloonBody = document.createElement('div');
    balloonBody.className = 'balloon-body';
    const colorIndex = Math.floor(Math.random() * balloonColors.length);
    balloonBody.style.background = balloonColors[colorIndex];
    
    const balloonShine = document.createElement('div');
    balloonShine.className = 'balloon-shine';
    balloonBody.appendChild(balloonShine);
    
    const balloonString = document.createElement('div');
    balloonString.className = 'balloon-string';
    
    balloon.appendChild(balloonBody);
    balloon.appendChild(balloonString);
    
    // Posição inicial dos balões na tela
    // Balões precisam ser posicionados dentro da área de conteúdo (ou viewport)
    // Usamos Math.random() * 100 para cobrir a largura total da viewport.
    // O JS define `left` e CSS usa `vw` para posicionamento horizontal.
    balloon.style.left = Math.random() * 100 + 'vw'; 
    balloon.style.bottom = '-100px'; // Sempre começa abaixo da tela

    // Animações com variação de tempo
    balloon.style.animationDelay = Math.random() * 4 + 's';
    balloon.style.animationDuration = (6 + Math.random() * 4) + 's';
    
    // Evento de clique para balão
    balloon.addEventListener('click', function(e) {
        e.preventDefault();
        popBalloon(balloon);
        showMessage();
    });

    // Adiciona o balão ao corpo do documento
    document.body.appendChild(balloon);
    balloonCount++;
    updateBalloonCounter();
}

/**
 * Simula o "estourar" de um balão e libera corações.
 * @param {HTMLElement} balloon - O elemento balão a ser "estourado".
 */
function popBalloon(balloon) {
    balloon.classList.add('pop-effect'); // Adiciona a classe que ativa a animação de "estouro"
    balloon.style.pointerEvents = 'none'; // Desabilita cliques enquanto estourando
    
    // Cria múltiplos corações flutuantes no local do balão
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            createHeart(
                balloon.offsetLeft + balloon.offsetWidth / 2 + (Math.random() - 0.5) * 80, 
                balloon.offsetTop + balloon.offsetHeight / 2 + (Math.random() - 0.5) * 40
            );
        }, i * 100); // Pequeno delay entre a criação dos corações
    }
    
    // Remove o balão após a animação de "estouro"
    setTimeout(() => {
        if (balloon.parentNode) {
            balloon.remove(); // Esta linha remove o balão do DOM
            balloonCount--;
            updateBalloonCounter();
        }
        // Garante que novos balões sejam criados para manter a quantidade ideal
        checkAndCreateBalloons();
    }, 800); // O tempo (800ms) corresponde à duração da animação 'balloonPop' no CSS
}

/**
 * Cria e adiciona um coração flutuante na tela.
 * @param {number} x - Posição X inicial.
 * @param {number} y - Posição Y inicial.
 */
function createHeart(x, y) {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heart.style.animationDelay = Math.random() * 0.5 + 's';
    document.body.appendChild(heart);
    
    // Remove o coração após a animação
    heart.addEventListener('animationend', () => heart.remove(), { once: true });
}

/**
 * Exibe o modal de mensagem com uma mensagem aleatória.
 */
function showMessage() {
    const randomMessage = loveMessages[Math.floor(Math.random() * loveMessages.length)];
    currentMessage = randomMessage; // Guarda a mensagem para compartilhamento
    
    messageIcon.textContent = randomMessage.icon;
    messageTitle.textContent = randomMessage.title;
    messageText.textContent = randomMessage.text;
    
    messageOverlay.classList.add('show');
    messageModal.classList.add('show');
    messageModal.setAttribute('aria-hidden', 'false');
    messageOverlay.setAttribute('aria-hidden', 'false');
    // Foca o botão de fechar para acessibilidade por teclado
    messageModal.querySelector('.close-btn').focus();
}

/**
 * Fecha o modal de mensagem.
 */
function closeMessage() {
    messageOverlay.classList.remove('show');
    messageModal.classList.remove('show');
    messageModal.setAttribute('aria-hidden', 'true');
    messageOverlay.setAttribute('aria-hidden', 'true');
}

/**
 * Compartilha a mensagem atual utilizando a Web Share API ou fallback.
 */
function shareMessage() {
    if (!currentMessage) return;

    const shareData = {
        title: currentMessage.title,
        text: `${currentMessage.title}: ${currentMessage.text}\n`,
        url: window.location.href
    };

    if (navigator.share) {
        navigator.share(shareData)
            .then(() => console.log('Mensagem compartilhada com sucesso!'))
            .catch((error) => {
                // Usuário cancelou ou erro, tentar fallback
                console.error('Erro ao compartilhar via Web Share API:', error);
                fallbackShare(shareData.text);
            });
    } else {
        // Fallback para ambientes que não suportam Web Share API
        fallbackShare(shareData.text);
    }
}

/**
 * Fallback para compartilhamento: copia a mensagem para a área de transferência.
 * @param {string} textToCopy - O texto a ser copiado.
 */
function fallbackShare(textToCopy) {
    navigator.clipboard.writeText(textToCopy)
        .then(() => alert('Mensagem copiada para a área de transferência! 💖')) // Sugestão: Considerar um "toast" temporário no lugar de alert
        .catch(err => {
            console.error('Erro ao copiar: ', err);
            // Último fallback: alert com a mensagem para cópia manual
            alert('Não foi possível copiar automaticamente. Por favor, copie a mensagem manualmente:\n\n' + textToCopy);
        });
}

/**
 * Inicializa a criação dos balões na página.
 * Controla a quantidade ideal de balões baseada na largura da tela.
 */
function initializeBalloons() {
    const targetBalloons = getTargetBalloonCount(); // Usa a função unificada
    // Remove balões existentes antes de criar novos para evitar duplicação em resize
    document.querySelectorAll('.balloon').forEach(b => b.remove());
    balloonCount = 0; // Reseta o contador

    for (let i = 0; i < targetBalloons; i++) {
        setTimeout(() => {
            createBalloon();
        }, i * 1000 + Math.random() * 500); // Pequeno delay e aleatoriedade na criação inicial
    }
    updateBalloonCounter(); // Atualiza o contador após a inicialização
}

/**
 * Verifica a quantidade de balões e cria novos se estiver abaixo do ideal.
 */
function checkAndCreateBalloons() {
    const currentBalloons = document.querySelectorAll('.balloon').length;
    const targetBalloons = getTargetBalloonCount(); // Usa a função unificada

    if (currentBalloons < targetBalloons) {
        createBalloon();
    }
}

// --- Event Listeners e Inicialização ---

// Expõe funções globais para o HTML
window.closeMessage = closeMessage;
window.shareMessage = shareMessage;

// Fecha o modal ao clicar no overlay
messageOverlay.addEventListener('click', closeMessage);

// Fecha o modal ao pressionar ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && messageModal.classList.contains('show')) {
        closeMessage();
    }
});

// Inicialização da página
window.addEventListener('load', function() {
    initializeBalloons();
    createRomanticParticles();
});

// Reajuste de balões e partículas em redimensionamento da janela
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        initializeBalloons(); // Re-inicializa os balões para ajustar posições e quantidade
        createRomanticParticles(); // Re-inicializa as partículas
    }, 500); // Espera 500ms após o resize para otimizar
});

// Intervalo para manter a quantidade de balões ideal
balloonGenerationInterval = setInterval(checkAndCreateBalloons, 4000);
