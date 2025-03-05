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
});
