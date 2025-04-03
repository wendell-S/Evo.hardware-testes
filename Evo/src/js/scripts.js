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

function mostrarGeracaoProcessadores(geracaoId) {
    if (geracaoId) {
        // Oculta todas as seções de conteúdo
        const secoes = document.querySelectorAll('.conteudo-secao');
        secoes.forEach(secao => secao.style.display = 'none');

        // Mostra a seção de detalhes da geração
        const detalhesGeracao = document.getElementById('detalhes-geracao');
        const tituloGeracao = document.getElementById('titulo-geracao');
        const conteudoGeracao = document.getElementById('conteudo-geracao');

        if (detalhesGeracao && tituloGeracao && conteudoGeracao) {
            detalhesGeracao.style.display = 'block';

            // Define o título e o conteúdo com base na geração selecionada
            switch (geracaoId) {
                case 'section1':
                    tituloGeracao.textContent = '1ª Geração - Válvulas Eletrônicas';
                    conteudoGeracao.innerHTML = `
                        <p>Os processadores da 1ª geração utilizavam válvulas eletrônicas e marcaram o início da computação moderna.</p>
                        <ul>
                            <li>Intel 4004 (1971): Este é amplamente reconhecido como o primeiro microprocessador comercialmente disponível.</li>
                            <li>Intel 8008 (1972): O sucessor do 4004, este processador de 8 bits representou um avanço significativo em capacidade de processamento.</li>
                            <li>ENIAC (1946) - Primeiro computador eletrônico de grande escala.</li>
                            <li>UNIVAC I (1951) - Primeiro computador comercial.</li>
                            <li>IBM 701 (1952) - Primeiro computador da IBM.</li>
                        </ul>
                    `;
                    break;
                case 'section2':
                    tituloGeracao.textContent = '2ª Geração - Transistores';
                    conteudoGeracao.innerHTML = `
                        <p>Os processadores da 2ª geração substituíram as válvulas por transistores, tornando os computadores menores e mais eficientes.</p>
                        <ul>
                            <li>IBM 1401 (1959) - Primeiro computador amplamente adotado.</li>
                            <li>PDP-1 (1960) - Primeiro computador interativo.</li>
                            <li>IBM System/360 (1964) - Introduziu a compatibilidade entre modelos.</li>
                        </ul>
                    `;
                    break;
                case 'section3':
                    tituloGeracao.textContent = '3ª Geração - Circuitos Integrados';
                    conteudoGeracao.innerHTML = `
                        <p>Os processadores da 3ª geração utilizaram circuitos integrados, permitindo maior compactação e eficiência.</p>
                        <ul>
                            <li>Intel 4004 (1971) - Primeiro microprocessador comercial.</li>
                            <li>Intel 8008 (1972) - Primeiro processador de 8 bits.</li>
                            <li>IBM System/370 (1970) - Computador mainframe avançado.</li>
                        </ul>
                    `;
                    break;
                case 'section4':
                    tituloGeracao.textContent = '4ª Geração - Microprocessadores';
                    conteudoGeracao.innerHTML = `
                        <p>Os processadores da 4ª geração introduziram os microprocessadores, revolucionando a computação pessoal.</p>
                        <ul>
                            <li>Intel 8080 (1974) - Base para os primeiros PCs.</li>
                            <li>Intel 8086 (1978) - Arquitetura x86 amplamente utilizada.</li>
                            <li>Motorola 68000 (1979) - Usado em computadores Apple e Atari.</li>
                        </ul>
                    `;
                    break;
                case 'section5':
                    tituloGeracao.textContent = '5ª Geração - Inteligência Artificial';
                    conteudoGeracao.innerHTML = `
                        <p>Os processadores da 5ª geração focam em inteligência artificial e aprendizado de máquina.</p>
                        <ul>
                            <li>Intel Core i7 (2008) - Processador de alto desempenho.</li>
                            <li>AMD Ryzen 9 (2019) - Processador multicore avançado.</li>
                            <li>Apple M1 (2020) - Chip baseado em ARM com foco em eficiência.</li>
                        </ul>
                    `;
                    break;
                default:
                    tituloGeracao.textContent = '';
                    conteudoGeracao.innerHTML = '';
                    break;
            }
        }
    }
}

function voltarParaProcessadores() {
    // Oculta a seção de detalhes e volta para a seção de processadores
    const detalhesGeracao = document.getElementById('detalhes-geracao');
    if (detalhesGeracao) {
        detalhesGeracao.style.display = 'none';
    }

    const processadores = document.getElementById('processadores');
    if (processadores) {
        processadores.style.display = 'block';
    }
}

function mostrarDetalhesPlacasVideo() {
    // Oculta todas as seções
    const secoes = document.querySelectorAll('.conteudo-secao');
    secoes.forEach(secao => secao.style.display = 'none');

    // Mostra a seção de detalhes de placas de vídeo
    const detalhesPlacasVideo = document.getElementById('detalhes-placas-video');
    const tituloPlacasVideo = document.getElementById('titulo-placas-video');
    const conteudoPlacasVideo = document.getElementById('conteudo-placas-video');

    if (detalhesPlacasVideo && tituloPlacasVideo && conteudoPlacasVideo) {
        detalhesPlacasVideo.style.display = 'block';
        tituloPlacasVideo.textContent = 'Detalhes sobre Placas de Vídeo';
        conteudoPlacasVideo.innerHTML = `
            <p>Informações detalhadas sobre placas de vídeo...</p>
            <ul>
                <li>Placa de Vídeo 1: Detalhes...</li>
                <li>Placa de Vídeo 2: Detalhes...</li>
            </ul>
        `;
    }
}

function voltarParaPlacasVideo() {
    // Oculta a seção de detalhes e volta para a seção de placas de vídeo
    const detalhesPlacasVideo = document.getElementById('detalhes-placas-video');
    if (detalhesPlacasVideo) {
        detalhesPlacasVideo.style.display = 'none';
    }

    const placasVideo = document.getElementById('placas-video');
    if (placasVideo) {
        placasVideo.style.display = 'block';
    }
}

function mostrarDetalhesMemoriaRAM() {
    const secoes = document.querySelectorAll('.conteudo-secao');
    secoes.forEach(secao => secao.style.display = 'none');

    const detalhesMemoriaRAM = document.getElementById('detalhes-memoria-ram');
    const tituloMemoriaRAM = document.getElementById('titulo-memoria-ram');
    const conteudoMemoriaRAM = document.getElementById('conteudo-memoria-ram');

    if (detalhesMemoriaRAM && tituloMemoriaRAM && conteudoMemoriaRAM) {
        detalhesMemoriaRAM.style.display = 'block';
        tituloMemoriaRAM.textContent = 'Detalhes sobre Memória RAM';
        conteudoMemoriaRAM.innerHTML = `
            <p>Informações detalhadas sobre memória RAM...</p>
            <ul>
                <li>Módulo RAM 1: Detalhes...</li>
                <li>Módulo RAM 2: Detalhes...</li>
            </ul>
        `;
    }
}

function voltarParaMemoriaRAM() {
    const detalhesMemoriaRAM = document.getElementById('detalhes-memoria-ram');
    if (detalhesMemoriaRAM) {
        detalhesMemoriaRAM.style.display = 'none';
    }

    const memoriaRAM = document.getElementById('memoria-ram');
    if (memoriaRAM) {
        memoriaRAM.style.display = 'block';
    }
}

function mostrarDetalhesPlacasMae() {
    const secoes = document.querySelectorAll('.conteudo-secao');
    secoes.forEach(secao => secao.style.display = 'none');

    const detalhesPlacasMae = document.getElementById('detalhes-placas-mae');
    const tituloPlacasMae = document.getElementById('titulo-placas-mae');
    const conteudoPlacasMae = document.getElementById('conteudo-placas-mae');

    if (detalhesPlacasMae && tituloPlacasMae && conteudoPlacasMae) {
        detalhesPlacasMae.style.display = 'block';
        tituloPlacasMae.textContent = 'Detalhes sobre Placas-mãe';
        conteudoPlacasMae.innerHTML = `
            <p>Informações detalhadas sobre placas-mãe...</p>
            <ul>
                <li>Placa-mãe 1: Detalhes...</li>
                <li>Placa-mãe 2: Detalhes...</li>
            </ul>
        `;
    }
}

function voltarParaPlacasMae() {
    const detalhesPlacasMae = document.getElementById('detalhes-placas-mae');
    if (detalhesPlacasMae) {
        detalhesPlacasMae.style.display = 'none';
    }

    const placasMae = document.getElementById('placas-mae');
    if (placasMae) {
        placasMae.style.display = 'block';
    }
}

function mostrarDetalhesFonteAlimentacao() {
    const secoes = document.querySelectorAll('.conteudo-secao');
    secoes.forEach(secao => secao.style.display = 'none');

    const detalhesFonteAlimentacao = document.getElementById('detalhes-fonte-alimentacao');
    const tituloFonteAlimentacao = document.getElementById('titulo-fonte-alimentacao');
    const conteudoFonteAlimentacao = document.getElementById('conteudo-fonte-alimentacao');

    if (detalhesFonteAlimentacao && tituloFonteAlimentacao && conteudoFonteAlimentacao) {
        detalhesFonteAlimentacao.style.display = 'block';
        tituloFonteAlimentacao.textContent = 'Detalhes sobre Fonte de Alimentação';
        conteudoFonteAlimentacao.innerHTML = `
            <p>Informações detalhadas sobre fonte de alimentação...</p>
            <ul>
                <li>Fonte 1: Detalhes...</li>
                <li>Fonte 2: Detalhes...</li>
            </ul>
        `;
    }
}

function voltarParaFonteAlimentacao() {
    const detalhesFonteAlimentacao = document.getElementById('detalhes-fonte-alimentacao');
    if (detalhesFonteAlimentacao) {
        detalhesFonteAlimentacao.style.display = 'none';
    }

    const fonteAlimentacao = document.getElementById('fonte-alimentacao');
    if (fonteAlimentacao) {
        fonteAlimentacao.style.display = 'block';
    }
}

function mostrarGeracaoPlacasVideo(geracaoId) {
    if (geracaoId) {
        const secoes = document.querySelectorAll('.conteudo-secao');
        secoes.forEach(secao => secao.style.display = 'none');

        const detalhesPlacasVideo = document.getElementById('detalhes-placas-video');
        const tituloPlacasVideo = document.getElementById('titulo-placas-video');
        const conteudoPlacasVideo = document.getElementById('conteudo-placas-video');

        if (detalhesPlacasVideo && tituloPlacasVideo && conteudoPlacasVideo) {
            detalhesPlacasVideo.style.display = 'block';

            switch (geracaoId) {
                case 'video-gen1':
                    tituloPlacasVideo.textContent = '1ª Geração - Placas de Vídeo';
                    conteudoPlacasVideo.innerHTML = `
                        <p>Informações detalhadas sobre as placas de vídeo da 1ª geração...</p>
                    `;
                    break;
                case 'video-gen2':
                    tituloPlacasVideo.textContent = '2ª Geração - Placas de Vídeo';
                    conteudoPlacasVideo.innerHTML = `
                        <p>Informações detalhadas sobre as placas de vídeo da 2ª geração...</p>
                    `;
                    break;
                case 'video-gen3':
                    tituloPlacasVideo.textContent = '3ª Geração - Placas de Vídeo';
                    conteudoPlacasVideo.innerHTML = `
                        <p>Informações detalhadas sobre as placas de vídeo da 3ª geração...</p>
                    `;
                    break;
                default:
                    tituloPlacasVideo.textContent = '';
                    conteudoPlacasVideo.innerHTML = '';
                    break;
            }
        }
    }
}

function mostrarGeracaoMemoriaRAM(geracaoId) {
    if (geracaoId) {
        const secoes = document.querySelectorAll('.conteudo-secao');
        secoes.forEach(secao => secao.style.display = 'none');

        const detalhesMemoriaRAM = document.getElementById('detalhes-memoria-ram');
        const tituloMemoriaRAM = document.getElementById('titulo-memoria-ram');
        const conteudoMemoriaRAM = document.getElementById('conteudo-memoria-ram');

        if (detalhesMemoriaRAM && tituloMemoriaRAM && conteudoMemoriaRAM) {
            detalhesMemoriaRAM.style.display = 'block';

            switch (geracaoId) {
                case 'ram-gen1':
                    tituloMemoriaRAM.textContent = '1ª Geração - Memória RAM';
                    conteudoMemoriaRAM.innerHTML = `
                        <p>Informações detalhadas sobre a memória RAM da 1ª geração...</p>
                    `;
                    break;
                case 'ram-gen2':
                    tituloMemoriaRAM.textContent = '2ª Geração - Memória RAM';
                    conteudoMemoriaRAM.innerHTML = `
                        <p>Informações detalhadas sobre a memória RAM da 2ª geração...</p>
                    `;
                    break;
                case 'ram-gen3':
                    tituloMemoriaRAM.textContent = '3ª Geração - Memória RAM';
                    conteudoMemoriaRAM.innerHTML = `
                        <p>Informações detalhadas sobre a memória RAM da 3ª geração...</p>
                    `;
                    break;
                default:
                    tituloMemoriaRAM.textContent = '';
                    conteudoMemoriaRAM.innerHTML = '';
                    break;
            }
        }
    }
}

function mostrarGeracaoPlacasMae(geracaoId) {
    if (geracaoId) {
        const secoes = document.querySelectorAll('.conteudo-secao');
        secoes.forEach(secao => secao.style.display = 'none');

        const detalhesPlacasMae = document.getElementById('detalhes-placas-mae');
        const tituloPlacasMae = document.getElementById('titulo-placas-mae');
        const conteudoPlacasMae = document.getElementById('conteudo-placas-mae');

        if (detalhesPlacasMae && tituloPlacasMae && conteudoPlacasMae) {
            detalhesPlacasMae.style.display = 'block';

            switch (geracaoId) {
                case 'mae-gen1':
                    tituloPlacasMae.textContent = '1ª Geração - Placas-mãe';
                    conteudoPlacasMae.innerHTML = `
                        <p>Informações detalhadas sobre as placas-mãe da 1ª geração...</p>
                    `;
                    break;
                case 'mae-gen2':
                    tituloPlacasMae.textContent = '2ª Geração - Placas-mãe';
                    conteudoPlacasMae.innerHTML = `
                        <p>Informações detalhadas sobre as placas-mãe da 2ª geração...</p>
                    `;
                    break;
                case 'mae-gen3':
                    tituloPlacasMae.textContent = '3ª Geração - Placas-mãe';
                    conteudoPlacasMae.innerHTML = `
                        <p>Informações detalhadas sobre as placas-mãe da 3ª geração...</p>
                    `;
                    break;
                default:
                    tituloPlacasMae.textContent = '';
                    conteudoPlacasMae.innerHTML = '';
                    break;
            }
        }
    }
}

function mostrarGeracaoFonteAlimentacao(geracaoId) {
    if (geracaoId) {
        const secoes = document.querySelectorAll('.conteudo-secao');
        secoes.forEach(secao => secao.style.display = 'none');

        const detalhesFonteAlimentacao = document.getElementById('detalhes-fonte-alimentacao');
        const tituloFonteAlimentacao = document.getElementById('titulo-fonte-alimentacao');
        const conteudoFonteAlimentacao = document.getElementById('conteudo-fonte-alimentacao');

        if (detalhesFonteAlimentacao && tituloFonteAlimentacao && conteudoFonteAlimentacao) {
            detalhesFonteAlimentacao.style.display = 'block';

            switch (geracaoId) {
                case 'fonte-gen1':
                    tituloFonteAlimentacao.textContent = '1ª Geração - Fonte de Alimentação';
                    conteudoFonteAlimentacao.innerHTML = `
                        <p>Informações detalhadas sobre as fontes de alimentação da 1ª geração...</p>
                    `;
                    break;
                case 'fonte-gen2':
                    tituloFonteAlimentacao.textContent = '2ª Geração - Fonte de Alimentação';
                    conteudoFonteAlimentacao.innerHTML = `
                        <p>Informações detalhadas sobre as fontes de alimentação da 2ª geração...</p>
                    `;
                    break;
                case 'fonte-gen3':
                    tituloFonteAlimentacao.textContent = '3ª Geração - Fonte de Alimentação';
                    conteudoFonteAlimentacao.innerHTML = `
                        <p>Informações detalhadas sobre as fontes de alimentação da 3ª geração...</p>
                    `;
                    break;
                default:
                    tituloFonteAlimentacao.textContent = '';
                    conteudoFonteAlimentacao.innerHTML = '';
                    break;
            }
        }
    }
}

function mostrarSecao(id) {
    // Oculta todas as seções de conteúdo
    const secoes = document.querySelectorAll('.conteudo-secao');
    secoes.forEach(secao => secao.style.display = 'none');

    // Oculta as seções sobre as gerações de hardware
    const secoesGeracoes = document.querySelectorAll('#section1, #section2, #section3, #section4, #section5');
    secoesGeracoes.forEach(secao => secao.style.display = 'none');

    // Mostra a seção selecionada
    const secaoSelecionada = document.getElementById(id);
    if (secaoSelecionada) {
        secaoSelecionada.style.display = 'block';
    }
}

function mostrarGeracaoProcessadores(geracaoId) {
    if (geracaoId) {
        // Oculta todas as seções de conteúdo
        const secoes = document.querySelectorAll('.conteudo-secao');
        secoes.forEach(secao => secao.style.display = 'none');

        // Mostra a seção de detalhes da geração
        const detalhesGeracao = document.getElementById('detalhes-geracao');
        const tituloGeracao = document.getElementById('titulo-geracao');
        const conteudoGeracao = document.getElementById('conteudo-geracao');

        if (detalhesGeracao && tituloGeracao && conteudoGeracao) {
            detalhesGeracao.style.display = 'block';

            // Define o título e o conteúdo com base na geração selecionada
            switch (geracaoId) {
                case 'section1':
                    tituloGeracao.textContent = '1ª Geração - Válvulas Eletrônicas';
                    conteudoGeracao.innerHTML = `
                        <p>Informações detalhadas sobre os processadores da 1ª geração...</p>
                        <ul>
                            <li>Intel 4004 (1971): <br> 
                            >O primeiro microprocessador comercial, um chip de 4 bits que marcou o início da era da computação pessoal. <br>
                            >Desenvolvido para calculadoras, demonstrou a viabilidade de integrar unidades de processamento em um único chip. </li>
                            
                        </ul>
                        <img src="data:image/jpeg;base64,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" alt="Descrição da imagem">

                        <li>Intel 8008 (1972):: <br>
                        >Sucessor do 4004, foi o primeiro processador de 8 bits da Intel, permitindo maior capacidade de processamento. <br>
                        >Foi usado nos primeiros computadores pessoais, pavimentando o caminho para processadores mais avançados.</li> <br>

                        <img src="data:image/jpeg;base64,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" alt="Descrição da imagem">
                    `;
                    break;
                case 'section2':
                    tituloGeracao.textContent = '2ª Geração - Transistores';
                    conteudoGeracao.innerHTML = `
                        <p>Informações detalhadas sobre os processadores da 2ª geração...</p>
                        <ul>
                            <li>Intel 8080 (1974): <br>
                            >Um processador de 8 bits que se tornou o "cérebro" do Altair 8800, um dos primeiros computadores pessoais.<br>
                            >Possuia maior capacidade de endereçamento de memória e um conjunto de instruções mais rico que seu antecessor, o 8008. <br>
                            </li> <br>

                            <li>Motorola 6800 (1974): <br>
                            >Um concorrente direto do Intel 8080, também um processador de 8 bits.<br>
                            >Usado em diversos sistemas embarcados e nos primeiros computadores da Apple, com uma arquitetura considerada mais elegante por alguns.<br>
                            </li> <br>

                            <li>Zilog Z80 (1976): <br>
                            >Uma evolução do Intel 8080, com um conjunto de instruções aprimorado e recursos adicionais.<br>
                            >Tornou-se extremamente popular em computadores pessoais como o TRS-80 e o Sinclair ZX Spectrum.<br>
                            </li> <br>

                            <li>MOS Technology 6502 (1975): <br>
                            >Um processador de 8 bits de baixo custo que ganhou popularidade em computadores como o Apple II, o Commodore 64 e o Nintendo Entertainment System (NES).<br>
                            >Sua simplicidade e baixo preço o tornaram uma escolha popular para sistemas de jogos e computadores domésticos.<br>
                            </li> <br>

                             <li>Intel Core i3: <br>
                            >Processadores de nível básico, ideais para tarefas cotidianas como navegação na web, edição de documentos e reprodução de mídia.<br>
                            >Geralmente com menos núcleos e recursos em comparação com os i5 e i7.<br>
                            >Foco em custo benefício.<br>
                            > geração 3: i3-2100, i3-2120, i3-2100T, i3-2310M.<br>
                            </li> <br>

                             <li>Intel Core i5: <br>
                            ><br>
                            ><br>
                            ><br>
                            </li> <br>

                             <li>Intel Core i7: <br>
                            ><br>
                            ><br>
                            ><br>
                            </li> <br>
                        </ul>
                    `;
                    break;
                case 'section3':
                    tituloGeracao.textContent = '3ª Geração - Circuitos Integrados';
                    conteudoGeracao.innerHTML = `
                        <p>Informações detalhadas sobre os processadores da 3ª geração...</p>
                        <ul>
                            <li>Processador 1: Detalhes...</li>
                            <li>Processador 2: Detalhes...</li>
                        </ul>
                    `;
                    break;
                case 'section4':
                    tituloGeracao.textContent = '4ª Geração - Microprocessadores';
                    conteudoGeracao.innerHTML = `
                        <p>Informações detalhadas sobre os processadores da 4ª geração...</p>
                        <ul>
                            <li>Processador 1: Detalhes...</li>
                            <li>Processador 2: Detalhes...</li>
                        </ul>
                    `;
                    break;
                case 'section5':
                    tituloGeracao.textContent = '5ª Geração - Inteligência Artificial';
                    conteudoGeracao.innerHTML = `
                        <p>Informações detalhadas sobre os processadores da 5ª geração...</p>
                        <ul>
                            <li>Processador 1: Detalhes...</li>
                            <li>Processador 2: Detalhes...</li>
                        </ul>
                    `;
                    break;
                default:
                    tituloGeracao.textContent = '';
                    conteudoGeracao.innerHTML = '';
                    break;
            }
        }
    }
}