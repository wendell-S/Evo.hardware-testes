document.addEventListener('DOMContentLoaded', function() {
    // Função para alterar o conteúdo de um elemento
    document.getElementById('myElement').textContent = 'Conteúdo alterado pelo JavaScript';

    // Função para rolar entre seções
    const sections = document.querySelectorAll('section');
    let currentSection = 0;

    document.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY + window.innerHeight / 2;
        sections.forEach((section, index) => {
            if (scrollPosition >= section.offsetTop) {
                currentSection = index;
            }
        });
        updateSectionContent(currentSection);
    });

    function updateSectionContent(index) {
        const content = [
            'A Era das Válvulas (década de 1940): Os primeiros computadores, como o ENIAC, utilizavam válvulas de vácuo, componentes grandes, frágeis e que consumiam muita energia. Esses computadores eram enormes e realizavam cálculos simples, mas representaram um marco inicial na computação.',
            'Segunda geração: Transistores',
            'Terceira geração: Circuitos integrados',
            'Quarta geração: Microprocessadores',
            'Quinta geração: Inteligência artificial'
        ];
        document.getElementById('myElement').textContent = content[index];
    }

    // Função para mover os bloquinhos coloridos
    const blocks = document.querySelectorAll('.block');
    blocks.forEach(block => {
        block.addEventListener('dragstart', dragStart);
        block.addEventListener('dragend', dragEnd);
        block.addEventListener('dragover', dragOver);
        block.addEventListener('drop', drop);
        block.addEventListener('click', changeColor); // Adicionar evento de clique para mudar a cor
    });

    function dragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.id);
        setTimeout(() => {
            e.target.style.display = 'none';
        }, 0);
    }

    function dragEnd(e) {
        e.target.style.display = 'block';
    }

    function dragOver(e) {
        e.preventDefault();
    }

    function drop(e) {
        e.preventDefault();
        const id = e.dataTransfer.getData('text/plain');
        const draggable = document.getElementById(id);
        const dropTarget = e.target;

        if (dropTarget.classList.contains('block')) {
            swapBlocks(draggable, dropTarget);
        }
    }

    // Função para trocar os blocos de lugar
    function swapBlocks(block1, block2) {
        const parent = block1.parentNode;
        const sibling = block1.nextSibling === block2 ? block1 : block1.nextSibling;
        block2.before(block1);
        parent.insertBefore(block2, sibling);
    }

    // Função para mudar a cor do bloco ao clicar
    function changeColor(e) {
        const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
        e.target.style.backgroundColor = randomColor;
    }

    // Função para mostrar uma letra aleatória dentro dos blocos a cada piscada
    function randomLetter() {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        blocks.forEach(block => {
            const randomIndex = Math.floor(Math.random() * letters.length);
            block.setAttribute('data-letter', letters[randomIndex]);
        });
    }

    setInterval(randomLetter, 1000); // Atualizar a letra a cada segundo

    // Função para mostrar letras aleatórias na tela
    function showRandomLetters() {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const randomIndex = Math.floor(Math.random() * letters.length);
        const letterElement = document.createElement('div');
        letterElement.textContent = letters[randomIndex];
        letterElement.style.position = 'absolute';
        letterElement.style.top = `${Math.random() * window.innerHeight}px`;
        letterElement.style.left = `${Math.random() * window.innerWidth}px`;
        letterElement.style.fontSize = '2rem';
        letterElement.style.color = '#ffffff';
        document.body.appendChild(letterElement);

        setTimeout(() => {
            document.body.removeChild(letterElement);
        }, 1000);
    }

    setInterval(showRandomLetters, 1000); // Mostrar letras aleatórias na tela a cada segundo

    // Função para acompanhar o movimento do mouse
    const images = document.querySelectorAll('section img');
    images.forEach(img => {
        img.addEventListener('mousemove', followMouse);
    });

    function followMouse(e) {
        const rect = e.target.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        const moveX = (x - 0.5) * 10; // Ajustar a intensidade do movimento
        const moveY = (y - 0.5) * 10; // Ajustar a intensidade do movimento
        e.target.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
    }

    images.forEach(img => {
        img.addEventListener('mouseleave', () => {
            img.style.transform = 'translate(0, 0) scale(1)';
        });
    });

    // Função para alterar o tema do site
    const themeToggleButton = document.createElement('button');
    themeToggleButton.textContent = 'Alterar Tema';
    themeToggleButton.style.position = 'fixed';
    themeToggleButton.style.top = '10px';
    themeToggleButton.style.right = '10px';
    document.body.appendChild(themeToggleButton);

    themeToggleButton.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
    });

    // Função para exibir uma mensagem de boas-vindas
    function showWelcomeMessage() {
        const welcomeMessage = document.createElement('div');
        welcomeMessage.textContent = 'Bem-vindo ao site Evo. Hardwares!';
        welcomeMessage.style.position = 'fixed';
        welcomeMessage.style.bottom = '10px';
        welcomeMessage.style.right = '10px';
        welcomeMessage.style.backgroundColor = '#4caf50';
        welcomeMessage.style.color = '#ffffff';
        welcomeMessage.style.padding = '10px';
        welcomeMessage.style.borderRadius = '5px';
        document.body.appendChild(welcomeMessage);

        setTimeout(() => {
            document.body.removeChild(welcomeMessage);
        }, 5000);
    }

    showWelcomeMessage();

    // Função para adicionar um botão de voltar ao topo
    const backToTopButton = document.createElement('button');
    backToTopButton.textContent = 'Voltar ao Topo';
    backToTopButton.style.position = 'fixed';
    backToTopButton.style.bottom = '10px';
    backToTopButton.style.left = '10px';
    backToTopButton.style.display = 'none';
    document.body.appendChild(backToTopButton);

    backToTopButton.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', function() {
        if (window.scrollY > 200) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    // Função para exibir a data e hora atual
    function showDateTime() {
        const dateTimeElement = document.createElement('div');
        dateTimeElement.style.position = 'fixed';
        dateTimeElement.style.top = '10px';
        dateTimeElement.style.left = '10px';
        dateTimeElement.style.backgroundColor = '#1f1f1f';
        dateTimeElement.style.color = '#ffffff';
        dateTimeElement.style.padding = '10px';
        dateTimeElement.style.borderRadius = '5px';
        document.body.appendChild(dateTimeElement);

        function updateDateTime() {
            const now = new Date();
            dateTimeElement.textContent = now.toLocaleString();
        }

        setInterval(updateDateTime, 1000);
        updateDateTime();
    }

    showDateTime();

    // Remover a funcionalidade do mural dos leitores
    // const muralForm = document.getElementById('mural-form');
    // const muralList = document.getElementById('mural-list');
    // const displayName = document.getElementById('display-name');

    // Carregar nomes salvos do localStorage
    // const savedNames = JSON.parse(localStorage.getItem('muralNames')) || [];
    // savedNames.forEach(name => {
    //     const nameElement = document.createElement('div');
    //     nameElement.classList.add('mural-item');
    //     nameElement.textContent = name;
    //     muralList.appendChild(nameElement);
    // });

    // muralForm.addEventListener('submit', function(e) {
    //     e.preventDefault(); // Prevenir o comportamento padrão do formulário
    //     const nameInput = document.getElementById('name-input');
    //     const name = nameInput.value.trim();
    //     if (name) {
    //         const nameElement = document.createElement('div');
    //         nameElement.classList.add('mural-item');
    //         nameElement.textContent = name;
    //         muralList.appendChild(nameElement);

    //         // Exibir nome na tela
    //         displayName.textContent = `Último nome adicionado: ${name}`;

    //         // Salvar nome no localStorage
    //         savedNames.push(name);
    //         localStorage.setItem('muralNames', JSON.stringify(savedNames));

    //         nameInput.value = '';
    //     }
    // });

    // Adicionar feedback visual ao clicar em um botão
    const buttons = document.querySelectorAll('#menu button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(btn => btn.classList.remove('active-button'));
            button.classList.add('active-button');
        });
    });

    // Adicionar animação ao passar o mouse sobre os botões
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale(1.1)';
            button.style.boxShadow = '0 6px 10px rgba(0, 0, 0, 0.3)';
        });

        button.addEventListener('mouseleave', () => {
            if (!button.classList.contains('active-button')) {
                button.style.transform = 'scale(1)';
                button.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.2)';
            }
        });

        button.addEventListener('mousedown', () => {
            button.style.transform = 'scale(0.95)';
            button.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.2)';
        });

        button.addEventListener('mouseup', () => {
            if (!button.classList.contains('active-button')) {
                button.style.transform = 'scale(1.1)';
                button.style.boxShadow = '0 6px 10px rgba(0, 0, 0, 0.3)';
            }
        });
    });
});

function mostrarTodasGeracoes() {
    // Oculta todas as seções de conteúdo
    const secoes = document.querySelectorAll('.conteudo-secao');
    secoes.forEach(secao => secao.style.display = 'none');

    // Mostra todas as seções sobre as gerações de hardware
    const secoesGeracoes = document.querySelectorAll('#section1, #section2, #section3, #section4, #section5');
    secoesGeracoes.forEach(secao => secao.style.display = 'block');
}
