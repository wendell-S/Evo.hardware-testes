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
                            
                            <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTExMVFRUXGB0aGBcYGBcYFRoaGhoaGBcXFxoYHSggGB0lHR0XITEiJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGhAQGi0lICUtLy8tNy0tLy0xLS41NystMCstLS0tLS0vLS8rLi0tLS0tKy0tMi0tLS8tLS0tLS0tK//AABEIAL0BCwMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAABAAIDBAUGBwj/xAA9EAABAwMDAgMFBgYABQUAAAABAAIRAwQhBRIxQWEGIlETMnGBkVKhscHR8AcUI0Ji4UOCstLxJDNjcpL/xAAZAQEAAwEBAAAAAAAAAAAAAAAAAQIDBAX/xAAsEQACAgEBBwMEAwEBAAAAAAAAAQIRAyEEEjFBUWGBcZHwIqHR4TKxwfET/9oADAMBAAIRAxEAPwCyQgnFIIAFEJEJIAgopA4RBQBhEBCU5ACEdqEIhAOQSQlAOCMqNzkx1VAWGlOCqCuFIyuEBMU6UAZRhAJGChCcgAkUSEgEAIQhOCagFCEJxCCABQT4TQEAv3+/31SIRhABAIBFIhIhAIpwhBKEBRRBSIQQBQSaiQgCAnJoTkAAnpm5IuQBlElRmpymOqoCVzlGaigqV+6p17xAXKtzCpVbxZ1zf91kXepd0BtVtSjqoWa7BglYmnWlxdv2UKbnnqR7o/8As7gL0nw1/DilSh9y72r+dvFIfLl/zx2QEegb64ljSW/a4b9eq6i20McvcSe2AP1WtRobRAgAcADACka1QDlr+wdTOcjoVVhdpWphzdpEg9FzWoWLqZ/x6H8igKMIBOKSkDYQcnpqACRRAQhAAhKE4BCEACEkSlCABRCSRQAhO+aSdI7IQZxKRSKKEgASd3RlCUA6UCVGSo31EBK5yY6oqr6yqV7uEBefcQqdW7WZcXvdZlzqMdUBs177usq61Duso3bnna0FxPAGT9yv2+hk+aqZP2Gn/qcPwH1WWXNDGrkzTHinkdRRTZUqVninSaXucYAHJ/Rd14X/AIZOf/UvTA6UmnP/ADuH4D6rL02uKZAa0NH2R5R84/HJ/P0nQNda8BjjzgOMZP2Xf5d+CufFtkZyp6GuXZZY1Zr2Gn0qLG06TGsa3hrRAVopwCQXacwkkiggHAptRgcIIkJzWk9E2/uGW7PaVASJgfHvH5SqyaStkpWc9qGmGnLhJZPPofQrOIWv4h1QvftAIaBAbIjdE7jGD6QstUx5VNtLt7MmUaSYyENqLigFqVAQlCJQCAR/0gU5AhAABJJFABJKEQEAgkWpI7T6fcpIM5IFM3JoMKCR5Kjc5B9X6qrVrQgJqlRUq9xCr17lZd1eIC3XvFmXN+sy6v8A0VajQq1fda4jq6DsbJA8zuByFDdcQtSW4vyeFesfD9Wp5qpNNvp/xD8j7n/NnsVuaTpTaBI2g1miS45lpMB9OeG9DGQZB6TJcXu18VPKHQA8kBhdOGZMyYnjovL2jbpXu415/B6GDZItb0387kFOlTothjQPWMvPUbnH84CdTecOMBp6EZM8R3+5H+UAMgSeAeYjoepHOSmXFac7JOAYPlzkCevY/wC15977vi3zZ3pbqpaITfNJggYg9D+hHEK9p94WO9RwR0I5gxx8en41aTyRmO3rHQHpI/JIj0VLp6F3HeWp6boGvBwDHuno1x5B+w/v6HqugK8i0+s4kMa1zn8ANBJd/iQOfyXovhG4qvaRVa5rWD3n4gzBYSeY9eoXrbHtbl9Mvf8Ax/n37+TtGDddo2WiVMyiJAcRJmB1x2WZqmvUaLqbA5pdUnMzt9JaBOcjP0XL1NTqXF07eBTa5haG8jp7xPJ2znC6cu0KKda0r8djnjjbevxm1qniYeyrCk0EtOwEOIMnlwc3kdgQuUv6jqlOgXu8xB29M7pJjienyUVnVijVbTg7hLZ6FsT9QD9FVbT9swhzX03sdxxBIGWnhwwP2FRQk53Lk37NfktaUdOa+5pajqvnHkc1johwzDiSHTHEmRKvhyzbKi9rQHODiJ8wG2cnpJyrpqLfFj3FXj2spOW8xxeozUUFWsqda7AWpQ0PbJ7KsrnK+owqg14NKA7RILF07W2EDMkmABkk+gAXSWelVaha6fZs5ILZc7/tH35UWTRUhIhXb2wdTOcj1/VVYUkDYShOhCEA0BJzR1TkdyAw3OUVSqqlW4VGvec5QF2tcrOubzus+6v+6xrrUkBqXV/HVZZqvqvDKbS5x4a0Ek/ILofDvgK6uXB1aaFLqXe+4ejW9PifoV6t4d8N29m2KVMAn3nnL3fF35cKLBwPhf8Ahg54D7wln/xNImP83Dj4N+q9NtNJo06XsWUmtpwRtjEHmfWe6utKcFIPP9c0YUCA6fYyfZVRl9FxxtdPvNPGcEQDmCucv7QODmVGyD7w6EdHNPoeh5BwYIXsFei17S14BaRBByIXAeINGNAgEk0p/p1OTSccbX/aYcDPMDghpHmbVstfVHh/Xdduq8o7dnztOn/39nM2drsYGBznACJfkkd8Z9E6lRDQABgYHYenwUtUuDi1zdrxG5syIPDmn+5joMHsQYIIGlpOi1a+QAyn1e6Q3uG9XnsJXkuORya5/NT1FOCipcjM9mVv6T4SfUg1Jpg5DYmq4H0b0Hd0D4rqtK0GnbbXZBJgPeJquMTFNvFPrkyccqvV8Us9uKVuHBkO3vI2uLgCZG4Euz6joV1Q2VRTlk5a12+fGcmTam3uwL1na21ox5J2BjfOGy554AFR7cmSR5RAWHqviKrXtopj2bXPIMAe6ONp6Tnv3WZaFx/mDVe573tJnklzA4lv5/JULe49pRdSY7a5pD9p5Gdp+RkfRehGLi6XJrzF/s4ZO9XzX3RY1OswGiXPzsbDiSdpbgNJPwKZf3dRlX2pYXMO0naCS0gDoMkSOiNtNSmWVacFpIPBa4ENyO0zg55Vq2t2tY1owAIAycSTGfitsWFJLta8WUlO/syBtiBV9pTcW5MgZa4EEZHz5C0GNhR7gFFVuFuo0Zt2TufCq1bhVa15CybvUAFYgv3V4sW91IBZl9qii0TSa97V9nSa4/adEtbjEnAz6SoboEN3qRPBW94b8FXV2GvP9Om6Zc4HdExhp5np06r0Dwn/AA6o2zd1fbWqzOWja0iIDZzj1XaFscYUaskwtC8M0LX3GAu6uIErYJSeZwnAypSogje0EQQsG/sywz/aeFuuKLmgiD1QHKEIrS1DTyzI937ws+FIGQgSnJBAecX9xtWDd6l6LY1WiTIXJXVItMFCDV0nSLi8eG0gIJy4kBre56/cvVPDfge2ttr3NFWqBl7uAfVrSSG/ivMfBGvG1rdnRuHqIH3he4adXbVYHscC05Cqu5Zl0EKVpUQClYVJBKCnB6jCla1SAkptag2oCxwBBEEHhWKdAkoXN7Tovax/vOyJwIHMep7Ks5qC3pcCUm3SOQqeCKntGmWupMJdT3F29okbqePfYYHlODA6gRoalrNKjQdUaXveDspxAAIExH9gHwnOO2bd+In1jcmnvYwM8pJh4bkn3cAYiO/KwAYtiGDcQ6QfUHn4+nzC4d1Kf0rhKn6PmunE3tuOr5aF3Wb2rVNu9z3CGhzRuO3dhxcJzJkDKz73URTrh5lo8pa/uRBB6Z4yotzbimIcWupmP8mbhIEemCVat6DnUw2rtecgkDDhJIJaesHK0xYeG9rVxfoVlPjXZkBZUp1t7POwv8zScwTktJwcdOqu07du8OLRIBEwN0GJE+mBjsFIykABHQAfJB1SF0xhXHojNskAAUNStCr1rqFm3d93Vyper3cLLutRjqsq91Lusa4vC4wFANS71VZjq76hhoJ/fUnhX9N8PueN9Z2xv2RG8/L+3557L0fQfDBayXNbQtiOHNDqlQngjcNwMdTHHos5ZUuBdQZw2j+FN5a55L+HFrHRicEHaZPYwPkvQfBXiFxqOoVGNYP+HUAdFUzLfMQA5xZsPxn0gcp4ue61e1rPbMtS2Cdx3+Ylzn4y0uJI+BHECBbXDtvtqTxVYeWuGZJB3BwGCCO8zB6JvxsjdZ7MHSkQuU0DxCaoyDGBuOc/Zd90E857T1NJ0jKsp26IrmMDU4hP2pzKMlWIIPZqWjal3H1U9bZTANUxJgAc/cucvPE5fXfQt9zGtY6HbQDuGOHZiYHE9uqxyZowTvlx7F4wcjWvr6ixjw0h9QeUCDtBMj4eq5TbgGd0gGePiI6RwqVnVc2lWO4vduDgJ97MHnrk57hHTb8VN2HDaY2uBBEwSDPOScrKEsjya8m0++lpl2oqPiyyWoH5J6aV2GJxt7aAhcxqenyDhd1VpzhZt/ZSOEB5TcsLTnEHB/Bdx4B8ZuovFN8lp5/7h+YWZrWlT0XNC3cxw5BBwQooH1LZvbUaHNO4ESCOFLRh26J8vOMf7XkvgPxg6iAypJYee3+Q7dl7HpZ9s0Oblp4PA+XqgGCmTwFNcuFGm6q8YYM5H3+n7wsu+8TUqbKuxhc5jhTgOAIcZySJ2geon9ON1G9fUtqZqu8pe6QCQNxJgkcGAOfQrnlnVpLm2vR+lGig9W/U6HXfFPmosptJBANTzeQh3AkZMc5j9OdrXBN0XVXue4e9uMnaRwOgAngeiralVfFN7Gh0Nhw+0RGfp+JUFagy4a17S9jyInh4c0lp3AjPHVYwxymvr5pxfqvjNHJR/jydoRrObVNOox217i0FsluZhro47E+ilsrJ1N52u8jgZYehwQQemRx+zotYTBJk9Txnr96kcuqMNNexi5dCGnQAnAkiJ+sD8VJwmvqqnWuYWhUmq1Vm3d1Cgu71YN9qPdAW7vUQsW61GVULn1DDWucfRoLj9Au18P8A8Natanvrk0ifdEiY/wAhHJz1xChyomjkrLTqtciAQ0x53A7YLg2R9rJ6LotF8KXD7kU7bYCwA1Hvbva2ZkvfIa3jDWmfktSw1ivb1BaXLXUzsc1rmghrwBgiDnGSO2FB/Ws7iaNR7xVHno1Q5jagZHUkhpBMAziYIVW96Nomqep6FpOkULclzIr1WjNV2KLD/iJwYxKh1TWgCS0+1qdXmNo9CAcCAeT9Fz+oa3Ur0t9Np2sdtNCQxzdp87IyN8ZEnPryBVp1G1Wh7HA0zxHM9Q4HLXDrOfiuKEJZZNN0l7/r11fSjeUlBJ8bJL1ouNziQ5xEEOOHeozz2j/a4O6pusahfT3PokgVKfBaesH58/6XY1yGZcYHQDLp/L44WXr2sNc2IG6PdAJn1Dh1/L8bS3cMlFap8uLXf0+IR3sivoSWl9j29Ae0pPEPp9HAxuBHQgzgrvPC/ilj9jCXAOO1jnjIMDyVDJgzIBPJEHJE+X+FvD7hvqbqga4ODqLGOJBGeRLj5fsiRuA6L0bT/BdBraZrb6Ti8v8AZUt297cgB0kkgxPSJ4kSulNQVyehi1vPQ9FpWx64WLrviqlQpH2e4vOGwMYiXScR+fRYdx4mqXIrtZ7Sk0N8vmAIHPm+IDsg/NYlW4FO1aHBz9j+BkhjtzpHaZx2WUszct1LS6flaO0WUKV9rRd1i6q1X0Hve8gBjthOBnzEbY6deVSudUZTujnaXGGuPDt0boPU8kfBQ3DjXp06lGrBa0taY3MIDsBw64gH4K4ygYYHQSIzGMfFUhgcl9XRxfuWlNJ6dUyhY2lWm8Q8OpwcO98HnB6hbNIkcpbByE5diSuzGwlNLv3CMpFWIMcZTKrB++6kPOEQEBk3mnhwXO3ui54XcFqgqWwKA4uwsQMFdnT1asab9ztuxga2CRggtIGcTjjqs+600EYwUyyFXfseyWhph4gjkYI5B/RZZse/Gu6/svCVP3NHT6zXW9WmwCXeYeoIgkfQT8lVtq+/dRrMIdG4GPK6DBg8A+bjt2TqOnAVGvYXNIPmA91wMyHA/iPRajKUFQsSTdc2n5+Ib+i9inp9lsDmh7i2ZaDBLehAPpxyrtIRz6p7cKKq5apVwK2OdUhQVLhVbm4hZF5fx1Qgv3F4Ase71IDqsq+1PuqlraV7hwbSpvfuMCAYnnJ4GMo3QJLvUieFreG/Bl1dvBcx1OlPme7ykiOGA8njPH4LtvC38NaVPZUuR7SoAJZM0w76DdHdegspgCBhRqyeBheGfCNvZtOxsvd7z3ZJiY7CJPC34QRClEFDXNFpXVPZUHdrhhzXDhzT0IK81v2/y9RtteirUMuFOo2NlRtQ5Jkja5pMloxA4OI9dCy/EGh0rukadQcEFrgYc1wyHNIyCEB4/RD6L3Phu8NggkNL2F2GwQY2xMjIOTyQrIvGMirSfs3TuBAgkT7w+00/3DnuCqviCi+1qvpXLiHCn/Rq8NcGmWuBMw8Y3CM5PVc/p2m3F5FKgx9RxAiAcAkmXSY65XLnhbUk6fU3xPk1aNoV3Vy80z5WjdUqQTAz6AxweYAieMrS8M+EKl2N1MloE+1rPaRTDYnyuImo44kNMN2nK6vwt4YbZWzWXj3VnUtz/wCXojyN3HdtqkGKhl05xxzAVvUtVqXNrIcaTA4tfTbhgEgMAIiRBEg4yFjBQg6426669y8pSkizXuaOntp0reiXPcP/AHSA0RJGCZJM9TODzlZ9VgN77Rz3xu/ucXOEt8ufjHYBVb+tttqIaw1CwkPDeQ3mQOp4OFWuLN1RwqtqPY8hu6RIdgAhzTH+lZRnl/lzTT9bK2o8OqY6lft9rUokOYXh4GI3NAccH1HHzUmm2b2bm+03tMbZHmETjcDkZ/8AKvBkmfUqZrV0xxpa+n2MnJkFGiAIgDPwU4CJSC1KChJKUipAkNyQSQGOE9qjTuyAeEHIbkkAxzUqTIKeAnAIAsblSNKATgEAFWrhWlFVagOa1apAK429vySQu61a1kLidVsCCSEAPD9pSuKzaT6jmOcREARHUyeq998P6FQtaQZRZA6uOXH1JK+aW1zTqMcOQSvcfAPi9temGPd5hhUqmTZ3QenzKhcB/wCEW4wrEEoKcFFvT2lAStT2NTqFEu+Co6z4ho2tM7T7Spw1oE59SeAFDkloSkS6xottVp/+qY17PRw69IjM/Bc0zUKNvVbZ2dB1GnJ3ub5HuMSYLpccdTlZ3iO9qXAoOc94aW7hTJABPJjbzggAn7lS1bVW0bgPzthpbUiRJb19AQYyuGc3lX0rjFtdU13N4x3OPUn8PtY2vUD3E7g5hJJLt24YJPMxyeypWl42qypbvDmOjc5hxMFo3A9cR9EL3TiXmpTqFj5Jn3gc/wBw6rVaJcXEDOfqtlhuW913X5X5KOdKvUo6ZZuY0tNQvAMtkZAjgnrHqtIDAn0SaxPXQklwM27CEpQagpIHFAoJKQJIJFBAOTYSShAYxTggUJQDgigiQgHdkWpoTgEA8J4KjCc39/NAOScEAnICrcUJXParp3ZdQ5iiuKEygPI9a0wgkjoqOj37qNUHeWDqYJ4GMDrMD5r0rVtJmcLidS0UgyAoaB6/4H8ZNuKbWvPmjr+a7RxPlhu6fTgd182aOH03+UkH9F7X4A151Yezqua1zR7xIEj5qLriSdg2hn1VhzadIbqrw0RMdcSTgLIv/FtCnVZRpS9zjDngbg3I7iflxC5mjd1H3j31KxPvMidoH2RtGIInHqRyufLtG6nu6tK/BpDHdWat94rdWZcCjuptYIa7aMifMc5bgHp9CufuHH+THNR9JwDRydhJcfkc/wD5Co2GpND327gWOqAtEiNzQ1xlp9YHHdO062qU3ObvD6RGAfea4EEZ6jB+qp/5ylJ2+Ek16c/9LbyS8NANRl3RbDnNNIluPK5hhpEj9yIV62oODGhztxAguiJyckfcpaVLnHPVTtYuiGNR+/3MnJsZ7MeilYEoRWhUMpIFI8IBNCRSlBSBJApJqAcUEikgCCnAJo/fxS2oDGn/AEkSjOE2UA8lLqmwkEBIOE4JrU4BAGU6mE2EWoBwKcCmtRBQBRKCLUAyrSn9/JZl9pYd0ytcJRKA4i50raSQ1Saa7a9pwHNIIkYJBmD2PC691IHos+509jhDmqGk1TCdCv8AU203sqOJLYBLzJ2luBuPMQISv6T6j/5ihUDXPAdBywiBAxxiIITtN01tNjm7nOBMgOO6BHE8kfH1Whb2zWtAAAAEAAQAOwC58eBRq+Sa8Gksl/2O9nJ3ED1HXKmbTRaITguhKkZhCcE0FJKA5IFNlFSAoJsohAEFIoIIAwkgg1AOH4pIJAoAhGUEigMZ6KIbP7+H6pAoAhIQl0RagDCKATggCE9MCdOEA5IprfwCd0QgAGIT4QATihIWhIFI/v8ABOjHzQAcFGWSpQOEi3KAYximHCYU9AORQhJAFEIf6SCACP77ppcnAIAwgEC5IIApSmuOU9qABSaEgMpwCAa5KE4BIIBsIj98IxwmuOUIP//Z" alt="Descrição da imagem">

                            </li> <br>

                            <li>Motorola 6800 (1974): <br>
                            >Um concorrente direto do Intel 8080, também um processador de 8 bits.<br>
                            >Usado em diversos sistemas embarcados e nos primeiros computadores da Apple, com uma arquitetura considerada mais elegante por alguns.<br>
                            
                            <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEBUQEBIQFREVFRUWEBAVFRAVFRUVFRUWFhUWGBUZHSggGBolGxUVITEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0OGhAQGi0lHSUtLS0tLS0tLS0tLS0rLS0tLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIALEBHQMBEQACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAAAQIDBAUGBwj/xAA9EAACAQIDBAYIBAUEAwAAAAAAAQIDEQQSIQUGMUEiUWFxgZEHEzJSkqGxwSMzQmIUFaLR8DRygtJDY7L/xAAaAQEAAwEBAQAAAAAAAAAAAAAAAQIDBAUG/8QALxEBAAICAQMCBAUEAwEAAAAAAAECAxEEEiExQVEFEzJxIoGRsfAUM0JhI6HBcv/aAAwDAQACEQMRAD8A9xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAFwAEgAAAABAEgAAAAAAAAAAAAAAAAAAAAAAAAABAABcCLgRcBmCTMBEqqSvJpJcW3ZLxIHO7V37wFC6dZVJL9FJZ38S6PzLaWilpcdtP0tyemGoRS5Tqtyfwxsl5saXjFHrLtNyN5FjsMpuyrQeWtFaK/KSXU191yKRPpKuSnTPbw6G5ZmASAAkAAAAAAAAAAAAAAAAAAAIAAAIuBFwGYhKnMBS5gY+LxtOlHNVnCEfelJRXmwnTldq+kjBUrqEp1pf+tdH45WXlcnS8Y5lx+1PSjiZ6UIU6K6/wAyfm1b5E9K8Y49XIbS2zXxDvXrVanZKTaXdHgvAtpeIiPDCzBZFwh0e4m8LwWLjOTfqp9Csv2t6S74vXz6zO8esEx1Rp77Gaaummnqn1p8xE7ckqrgTckSmEJAkAAAAAAAAAAAAAAABAC4EXAXCUNgUuRApcgMHaO16FCOavVpwX7pJPwXFjSYjfhx+1PShhYXVCFWrLk7erg/F9L+knS8Y59XHbU9I+Nq3UJQox6qavL45XflYnTSMdYcni8ZUqyzVZznL3pylJ+bJ0vEa8LLZKQILhKLhCQlKYQ9j9Fe8XrqH8LUf4lFdC/GVLl8L07mjHxOmeWv+TvEyzBUmBWmBKJQkCQAAAAAAAAAABAC4EXAi4ShsgRmApcwNNtLejCUNKlaGb3I3nP4Y3a8R4Wilp8Q0GM35nLTD4afZUrPIu/IrtryOa/Lw0/y39m9eNafLS4zaeLrfnYmcYv9FBKmvi1k/M4cnxOf8K/q6a8WseXnu0qMoVZRm25J+0+LT1Tv2o9XBljLji8M7V6Z0wmzVRDZIi4C4BsAEouEJuBNwNlsDas8LiIV6fGD1XvRekovvV0UtXcJ7T2l9CbPxsK1KFam7wnFSi+x/fkUiduW0anTLiWVVpgVolCQJAAAAAAAAARcBcCm4ShsClyIFupWUU3JpJcW2kl4gc/jt9MJTbjGbrTX6KMXU/qXR+ZW1q1jdp00ritbxDRYzfPFTdqFCFJe/Vlml8MdF5s5b8/DWPO29eLb1aXFTr1v9TiKs1zgnkh8EbJnDl+J3n6I06acaseVGHoQp6Qil3f3OLJnyZPqltWkR4XGzJcIGi3nweaCqpax0l/tb08n9T0/hufpv8ufE/uwzV3G3KSPdckqQQEiLAAJQEASBIBEI09M9E28GWTwNR6SvOg3ylxnDx499+szmNTtXJXcb9nqaYYK4slC4iRKCFQAAAAARcCLgQ2BDkBS5EJYuN2hSpLNVqQguuUox+vEJiNuU2p6ScHTuqfrK0v2rLH4pW+SZOl4xzLkNqekvFVLqjGnRXWlnn5y0+RPSvGOPVj7OxKxUc1edSrVTeZVJylFdTjDglY8jn5s2O2onVXbhpTXhtNIq0UkupJJeSPHm02ndpdEKHUuNJYc9pQ1tnkk7OUYycb3tbNwevUbRht6qdcL+Hrxmm4vh7SaaafU09UylqzXytE7XbFNpJMCicVJOLV01ZrvLRMxO4Q4XaWEdKpKD5cH1p8GfT8bNGXHFnDkr0zpiG6gwBIAAJAWCUWIE3JF/C4iVOcakG1OLUoyXJp3TKzG/JD6B3Y2xHF4aFdaNq1SPuzXtL7rsaM4lzXr0zpuIslRcRIrRKEgQAuBFwIbAjMBS5BLVbU3iwuH/Or04v3b3n8Ebv5DUpisz4cjtT0pUI3WHpTqP3ptU4+WrfkielpGKfVyG0/SBjq2iqKlHqpKz+J3l5NExDSMdYczXxMpvNOUpSfGUm5N+L1JXWXMILgbPYON9XVV/Zl0Zdl+D8/ucXOwfNxTrzHdriv0z3dplPmdu1jbRoylRqRh7UoSUXw1a015F8Voi8TPhW0bidNaqKquShJQg6UIypNWcWnK+n6WlblqdPV0eY3O97U1vwqw6f8AEJwk5QjTcZzdnd3TjFyWkmulr2kWn/j7+d9oI+rsz6lVLi0tG3dq9lxMIiZ8NJnSxUx0Veybsru+mXW2qetldN9jTNIxyr1L2GqqcU7WfOL4prSS8GZ2r0zpaJ3DW7yYLPT9Yl0oce2PPy4+Z3fD8/Rk6Z8T+7LNTcbcjJH0DjQgBIASiAsSlKIF2GGm1dRdubtovEjqjetp6ZdJs/cXEVI55uEI2Ts3eTTV/ZX+ann5PiWKJ6a95X6PdvN1dz6UqaqV6U223ZSc4aK1nbnd36jDm8nLS/TXtHumIjT0TYOz40KeWMYxUnmUY3srxXXz0OviUvFN3ncy48tomezbROpkuJAVIlCbgUtgQ2BRKaWrenNgc/tTfXA0NJVozn7lL8R36ujon3tDS8UmXHbU9Kzd1hqCXVOq7v4I/wDYnTSMXvLkNqb343EXVSvNRf6Ifhx8o2v43LaaRSsejRuQWU3JAgAICACYsgh22wsb6ykrvpR6Mvs/FfO581z+P8vJMxHae7ux33VsWmcTRrtqVYxy56akmpWm0moySuk1xs9dexnRirNt6nTO869FiNeUotNuMnFRjBLo5mkmuvjrx9lovNYrPv8Az+fmbmVTwk272StpZ8OFuF3dK81yupdhHzKx2/n88HTMr6wUb9JttrLHWzcUn1avR69y6inzJ12W6YUutTjapGCtKeSc7ZXF3yrMmr8bLxT4E9Np/DM/7hG48s1wuY70u4jbGB9VUcf0vWHc+XhwPpuHn+diiZ8+rhyV6Za86mYBNglsdn7CxNf8qjUl22aXm9DDJycWP6rLdEt5sDcqVec41KmT1c8k0lmbldppPwObk875dazWN7ja0Uj1dBT3SoUMXTSjKdFRcqsqii+laWVWS7mZVzZc2C0+JnxrsRaIl1G1NkQqUo0H0aejywUY8OHBHNwKTOTqmfEfurkvps8JTUY2stGvJJWNK8aK8jUR28/z81LZJmm17FPpQ/c8vg7XOnm0i8Uj/ev1Z4p1v7M+MTtiNRqGK7GJOkLiRKEgUNgUSkBalUIS8q9LlSr66HTn6pwX4d3kvmld24X4fImG+LWnnbZdqi5IXAXAAAJRABCACA2+wZzhUU1GThwm7O1u85OVFL0msyvXcTt2S115cj5m9ZpbUu2s7jairTUuOtmmu9cBFpjwnTBxGMVNyio6pdG7SUnlulFc+rTma1x9WpmVZtolVbcOmn0o54w4OM1JRfWuXPkNa32/X3g2plhpZZqKSlGpmoyfDhFvttdzTJ643Ez7dzplelg82fM+jUilOCsle1nJPje1l4Ip8zWtenqnpZlCg8tleyXtSlbzlJ6lJ/FKfDR70epcLKrCdVPoxgpS705W/wAser8Px5qW3rtPnbDLMWhpdmbAxFeeSnB3WrvaNl1u56eXk48Veq09mMUmW+qbkSo1KEa04v1s8rUH7Mbxu8z/ANxz05vzK2mseITFY267Ebp4alh5qlSj6ySyxqybk7vmurvRw4M+fLljqntE/YtaIhutg08mHUGrOnBRv72nG3eV5GD/AJp957/qrN9xtRsvAqnPMtM0m52/VKV9X4s7eVij5W/bTOt9zpl+oUpNyS1N8GPppFWVrd9r9Ok3FSWui+Rnw6RFJmPeVss/iXcGnOU1llFJrVpq+iuXrEzntOvSEW1FI7r/APLW5wln6MW3ltxb7TTJi65rO/E7UrfUTHu2CibKJRKFQACzJgY9WZEpYdSqQly+/ezvX4ZyteVO77cr9r6J/wDERLTHOpeOVIuLafFGsN1FyUAAgAlWBKAz8HsavU9mnK3vPorzfE5cvMw4/Nv07rxjtLZx3cp09cVXhH9kbX83/Y45+IXydsNJn+fz1X+XWPqlP8ywVH8mi6kvfn1+P9iP6fl5v7l9R7QnrpXxDCxm8NWo37ME+UUuHe7/ACsdeHh0xxrz92Nr9Ut7u5jPWU8sn0o8e7keX8S4/Tbrjw3wW9G2cTy3SxsRhYztmzaclKST1T1SdnqkaUvNfCJiJXYYZQTlaEIt3cnlgm+u7tcR1XnUblEzEMWttPDw0zyqS92kr/1vR+Fzsx8DLP1doUnLHopxWKxKjGUMOqMJSUY1Kicptvha/DyOjFxOPuYm3VMd1JvZtq25zlCdTFYirUmotqEVljmS0XnbhYpj5e7xXHSI/dWZ1DabmbIowpRbpw9cszm3FOSvJ5dX2JE82Lzk7z+H0U6u3ZfweEccTUrL/wAjSne2kY2Wnkb5METx4j2hnGTvpn4zDKdTXkrL7l+Fj6afdTJbuvypNwjHlHl3aIYMURkvPtP7ovbcQmhlc8itfLdrnxL5e+fHH3RH0TLIlgqqayKLV1e7asjXPjtfHNaq0tETuWfLARkrSX1Rvpntdw2FjTioQVorh9SuPHXHXpr4LXm07lesXVSAJAAAAsyAxqsSEsKrEhLHqxTTT1TVmutPiQl49vRsKdOvNRjJxWt0pS6L1i3bs08GTOWtfqnTqp+KNuelGxpExPgmEIkTGDbstXyREzERuSIbXB7vYiprkyrrn0flx+Rx5fiGCnrv7NYxWlsP5Jh6P+prpv3I8fu/kjm/rc+X+zT85/mlvl0jzKpbbw1HTD4e7X65aPzd39CP6LkZf7t/yg+ZWPEMHHbx16mmbJH3Yaf1cTpw/DsOP03P+1LZbS1EpNu7bb62dsRERqGaCdICBsthYxUqycnaL6Mn1J8H4OzObl4pyYpiPLTHMRbu6Wpt6jG+XPVfLL0Y+LkvoeNj+G5beezpnLHozKGE2hWi3CnToQ96XtPThd3fyLRTiY51ubSpa9le7O7NPEwVfEzq1G5SWTNbRc2+JvyuRbBboxxEQpvs2uD2XChi5VKdOKpZMkILVqXRvLXtTJtW+Xjfinv5U6/xabna+D9Y4RnqovMr62a0T+pT4fjnVpn7KZL68MnLelkd5ST6TfHrXyaL0w65Mx7d1bW/DtcwtC3s800zfk0iej76UpbyVaThFtRb00sm9eR0ZI1jtr2lWve0NgsHmSeqvrws14EYK6x1+ytp/FK7gsBkTzScm23eyVuwtjxdE2nfmS196ZUaEU7pK/XZX8zTUb2puVxIlCQBIEASAAAAAtyQFmpEDErRIWYVREDQ7w4b2aqXDoz7Yt6Pwl/9M5OZh+Zj7eY7unjX6ba93A47YNWvVclGNON3rJq763ZXOTBzceCmpncuy+Prna3/AC7BUPzqzqSX6I8PKOq8Waf1HLzf266j3lTpx18yPeOnTVsNQhH90rX8l/cmPh18nfNeZJza+mGsxm2q9X2qkre7Hor5cfE7MXCw4/pr+vdnOS0tfdnUoASkBNgLtDC1J6QhKXcm/oZ3yVr9U6TqW62HurVxKcs0YQTytvM3eyekUrvijk5POphtFdblaKbjbe4LdGlTxap1PxKShdzkpRTk+C0MbcjLl4/XTtO/+kxqJdRtzYNN0YUIQhBZlLoRS9lNeLebj2GHBi03m9p3Olb3baOtF3UVLhZfL5FK8aK5+mIRN912owWEUGpRtqrff7HVzce6RPtKmO/fS7Gkot5ufM7KUitYqxmdztk0sNnipRtqtGYcOP8Aij81ss6sv4PBTvJ1Ekm9LO91ZL7F647fOtefGohFrR0xEMqOzYZlLW66m0vFGt8VbTEz6d1IvMRplxikaKqrBAAAEgAAAAAAAAApkgLckBjVYkJhgVohLDr0lKLi1o0012MhMdnlO/TmsRKOaWWyTjwWa127c73uYcbjVxxPaN7dk36ocudaiqwAlKpDYztn7KrVpZaNOc32J2Xe+Rjlz48X1zpaKzLc4LdCq8THDVn6uTi5u1pWWr5PsMMnNiMU5KRvvr2WisbdBtfcqjSox9RnlWlJdKbVstneyXgcvF5eXLfdvBaYh12DpRjQ/CWVJWy2jFXS6lyPPnBb53Ted7mEzeJja1u/gVQWWOkG27cek7a37kejzcW69evH7Ma33OmT/CqU22uLudOHHrHFZZWt33DLqUXK0uLSMuJSIifvMfonJPdVhoZpOOVp2V7rv/uX1vkR/wDP/qP8PzZP8sldNTsk7tWvya08zXNi+ZXp37K1vFZ2zv4aL0aT7zZntcp0oxVopJLgkrIrWsVjUE2mfKssgJAAAAAAAAAAAAAAACGBRJAWKiCWFWgQliTiBxnpC2TnpKtFaq0ZfPK/N28UTEtcc99PL3HX6k7aTE7Z+zdjVq9RU6cbytfVpaLnry1MsvIpjr1Wns0ikzLfbR3JqYelGrUnGUpTUfVwTbV1J6v/AI9Rz4edXNfprHotqIdvszdnB04ZlQU9Pan0n26cLnlW5HIyZOmZ1/0vMxEdlW6ezJUI+rcr3bldaLVJWt4HR8Qw9Uxk/L92dckT2Zs8ApVXPTNwUueVcr9XE6uNi1hirG+TuzcRTzZXbRLRfUz4WLp6v9Tr9DJZco0U+iuGl126mt6x/UVn/UqxP4JXJ4apFdCGbq1S+pryK2tjmsQrSY6tyz/4BNam0R2Z7X8NhFBWTb7XqyuPHFI1H3Ta3UvpGiiQAAkAAAAAAAAAAAAAAAAAABS0BanEDGqwISxJ0wljYvBqpTlTlwkmn48wROpc9sTdKFOSlOnDPrnnJZru79lXsjxOZ8+bTFp1XfZ30yU128tlT2BFV3iG5OpZRtoo2XZ4HVh4sTxopP3/ADZWzz1dmyxVBO3Mjg4umJmVcl1UKPQcFw/y5pkxR8+s+/8A4rFvwrUrQXS64280jXkxvFZGP6oZiwTesdGa0+mFJnuycJg5KNqmVu74Xt8yuHFNN79ZmS9onwyKeEgnmUVm5s06K76td1eqdaXkiyqQBIAAAAAAAAAAAAAAAAAAAAAAAAFLQFqUALUqITtQ6JAt4lJRzdTXzaX3ObmVicUz7d2mKfxK5U7apXN6xERGlJ8qMPTc07prVpXVtEY4ImJv95XvPj7LlPZ9pZszsk1l7y9sW71tvxv/ALRF9RMMtUl1I10ptWkEJAEgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAsBGUBlAs4jCRmsrvZ8bPxKXpF6zWfErVtNZ3C7GNi0RqNI2qJQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH//Z" alt="Descrição da imagem">

                            </li> <br>

                            <li>Zilog Z80 (1976): <br>
                            >Uma evolução do Intel 8080, com um conjunto de instruções aprimorado e recursos adicionais.<br>
                            >Tornou-se extremamente popular em computadores pessoais como o TRS-80 e o Sinclair ZX Spectrum.<br>
                            
                            <img src="data:image/jpeg;base64,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" alt="Descrição da imagem">

                            </li> <br>

                            <li>MOS Technology 6502 (1975): <br>
                            >Um processador de 8 bits de baixo custo que ganhou popularidade em computadores como o Apple II, o Commodore 64 e o Nintendo Entertainment System (NES).<br>
                            >Sua simplicidade e baixo preço o tornaram uma escolha popular para sistemas de jogos e computadores domésticos.<br>
                            
                            <img src="data:image/jpeg;base64,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" alt="Descrição da imagem">
                            
                            </li> <br>

                             <li>Intel Core i3: <br>
                            >Processadores de nível básico, ideais para tarefas cotidianas como navegação na web, edição de documentos e reprodução de mídia.<br>
                            >Geralmente com menos núcleos e recursos em comparação com os i5 e i7.<br>
                            >Foco em custo benefício.<br><br>
                            > geração 2: i3-2100, i3-2120, i3-2100T, i3-2310M.<br>
                            
                            <img src="data:image/jpeg;base64,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" alt="Descrição da imagem">
                            
                            </li> <br>

                             <li>Intel Core i5: <br>
                            >Processadores de gama média, oferecendo um bom equilíbrio entre desempenho e preço.<br>
                            >Adequados para jogos, edição de fotos e vídeos leves, e multitarefa.<br>
                            >Boa opção para a maioria dos usuários.<br><br>
                            
                            <img src="data:image/jpeg;base64,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" alt="Descrição da imagem">
                            
                            >Geração 2: i5-2300, i5-2390T, i5-2400, i5-2400S, i5-2500, i5-2500K, i5-2500S, i5-2500T, i5-2410M, i5-2520M, i5-2537M, i5-2540M.<br>
                            </li> <br>

                             <li>Intel Core i7: <br>
                            >Processadores de alto desempenho, projetados para tarefas exigentes como edição de vídeo profissional, modelagem 3D e jogos de última geração.<br>
                            >Geralmente com mais núcleos, threads e recursos avançados.<br>
                            >Foco em desempenho máximo.<br><br>
                            
                            <img src="data:image/jpeg;base64,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" alt="Descrição da imagem">
                            
                            >Geração 2: i7-2600, i7-2600K, i7-2600S, i7-2617M, i7-2620M, i7-2629M, i7-2630QM, i7-2635QM, i7-2649M, i7-2657M, i7-2720QM, i7-2820QM, i7-2920XM.<br>
                            </li> <br>
                        </ul>
                    `;
                    break;
                case 'section3':
                    tituloGeracao.textContent = '3ª Geração - Circuitos Integrados';
                    conteudoGeracao.innerHTML = `
                        <p>Informações detalhadas sobre os processadores da 3ª geração...</p>
                        <ul>
                             <li>Intel Core i3: <br>
                            >Processadores de nível básico, ideais para tarefas cotidianas como navegação na web, edição de documentos e reprodução de mídia.<br>
                            >Geralmente com menos núcleos e recursos em comparação com os i5 e i7.<br>
                            >Foco em custo benefício.<br><br>
                            
                            <img src="data:image/jpeg;base64,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" alt="Descrição da imagem">
                            
                            >Geração 3: i3-3210, i3-3220, i3-3225, i3-3240, i3-3250, i3-3250T, i3-3320M, i3-3110M.
                            </li> <br>

                             <li>Intel Core i5: <br>
                            >Processadores de gama média, oferecendo um bom equilíbrio entre desempenho e preço.<br>
                            >Adequados para jogos, edição de fotos e vídeos leves, e multitarefa.<br>
                            >Boa opção para a maioria dos usuários.<br><br>
                            
                            <img src="data:image/jpeg;base64,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" alt="Descrição da imagem">
                            
                            >Geração 3: i5-3330, i5-3330S, i5-3335, i5-3340, i5-3350P, i5-3450, i5-3450S, i5-3470, i5-3470S, i5-3475S, i5-3550, i5-3550S, i5-3570, i5-3570K, i5-3210M, i5-3230M, i5-3320M, i5-3340M, i5-3360M, i5-3380M, i5-3427U, i5-3437U, i5-3610ME.
                            </li> <br>

                             <li>Intel Core i7: <br>
                            >Processadores de alto desempenho, projetados para tarefas exigentes como edição de vídeo profissional, modelagem 3D e jogos de última geração.<br>
                            >Geralmente com mais núcleos, threads e recursos avançados.<br>
                            >Foco em desempenho máximo.<br><br>
                            
                            <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEhUSEhIWFRUXFxoVGBUXGBgVFxcXFxgYFxgXFRUYHSggGBolHRcVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OFxAQFy8dHR8tLSstLS0tKy0tLS0tKy8tLjctLSsrLSstLSsrLS0tLSsrKystLTItMS0tLS0rLS4tLf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAAAQIDBQYEBwj/xABLEAABAwEEAwkKCwkAAgMAAAABAAIRAwQSITEFBkETIlFhcZGxsvAHIzI0UnJzgdHSFBckM0JTYpKhosEVFkNUY4KTwuFEs2SDo//EABgBAQEBAQEAAAAAAAAAAAAAAAABAgME/8QALBEBAAEDAAcHBQEAAAAAAAAAAAECAxEEEhQxM1FxEyEyQaGx8CIjUmHRkf/aAAwDAQACEQMRAD8A9xQhCAQhCAQhCAQhCAQhEoBCEIBCJRKAQhCAQhCAQhCAQhCAQhCAQhEoBCEIBCEIBZ/XO2Po0L7HFpDhiDGEFaBZjugj5IfOHQUcb84t1THJktMact9CgKz6stwkA75t7LGOhZs90K0fWP8AvlZzSGma9VjaVSq5zGxDcNmUmJMcargGqURVj6nGqinyz/st3YNe61So1j7Q+m05vLnGMMMBw5K4Gma+F60124G9vau9MwwHjdsXlTTBwwOfMtRQ1oZDN1bWe4gmo7dCL72xuZABwA9XrWLsV76Vooo3Tn/Z/rV/tm0R4zXvXfBu1Pnc9ynhSu01acbtqrOyDd5U3zpO6AebGKyX70sjwa165evbqfGIjdI4I2ZcSH600hN1lYQBc76d64kmqc/pTx+pcvvcvZvUtc/WWu/blo2WqtEiDcfjTwvVOQExzcKRunrThNqrASS47m7e08bjzhk4jtCyJ1po4xTrBt4NaN1OFGBfp57SDz5iEh1poyL1OsQXEOG6nfUhO5sz+iSD6szKfe5ey9na5+s/1r26wWrCbTWBg3huR3ryRcZlm6e0o/eK1wYtFUm7AG5Z1cSaeI2AZrHM1ppmL1OqTBLu/O31SRub8/ogdGcJjtaacGKdW9ckO3Z2FYyHVc9oP/Exe+YNS1z9Z/rau1itRJu2msZIuxR8IAgVD4OF3FNdrFac/hNa7MzuUd5j5zLhwj8FjKmtNKTdpVW4tud/fvRINUZ/SxR+89L6mpdvRd3Z8bjEGlHBOMJi98wdnb+TLY/t21YXrTaBBN/vZ3rSSKZ/uw5OJR/tm1RjXtIddhwunCqYLac8YOeXGskzWanIvUHuxdems/fNx3Np83DmTGayMgTReTcN47s/fVcLtXlEdoVxd+YOztfMtdV0taoN2tanOIhg3wvVRN9hM4ARnlniVmqmutrBINSrIMEbo/MYcK5qusLS1wbRc0lguu3V8tqY36g4zPaVQOpumYcduRzXa1FXfrOVy1RO73lo366WrbVf/kd7VCdcbT5bvvu9qzzqTicjzFK2g7Y05bAV0wx2NEfJX3752gfTd953tSVNcbQ7N5PK5x6Ss98GefoO+6fYpHWdwGLHDlBCYamzRHl7rh2tNbaen2pDrTW8rp9qo6vClDRCYTsrfJd/vRW8rp9qv9XtMCo+h31xqGoA5kENDbwgg7diwMq71PPyql5zesFJhLlqimiZiH0+EqQJVHvCEIQCzPdB8UPnDoK0yzmvY+SnLw2nHEZ7RwI46Rw6uj52qjFd+gNC1LVVbRpwCZc5xya0ZuPbMhaLW2zU306lpa0PdurWbvThtGLo3op3iSZwJxx27B09y1wBtJ27mweovx6ApRc1qcszRMVRC5s2otiYAHB9VwzcXFo9TWRA5046o6P+pH+Wp7yu31MBhM5A5QDF4+tK21uG38BCmZd4ojkpW6rWAZUR995/2Uo1dsX1X53+1XLbe/i5gg293D+A9iq6sKkau2L6r89T3kn7v2IfwfzVPeVt8Ndw/gPYj4a7h6PYhqqYaCsQyo/nq+8lGhbH9T+ar7yuPhjuwHsSG2O7AexF1VP+xrH9R+NX3ko0TZB/4456nvK4+GO4ehJ8Mchqqr9mWX+XH/6H/ZPGjbN/Lj8/tVp8MdwoFrdwoaqtOjbMMrO3mcUx1gs/8s0/2Eq1+Fu4fxQbW7hPOhhVCx0dlmb/AI/+JPgdLZZm/wCIexWotbuE86cLW7hPOhqqb4LT/lmf4m+xOFjZssrP8LPYrY2x3CecpjrW47TzlDCsNnpgw6hSHnUmD/VVWtGqlGvTcaTGU6wktLBda8gTdcwYY7HDatNUfIg4g7DiFXPbcfEkjAtJ2DgRKqYeGg4q71R8ap+cOsFU2od8fxPd0lWeqRPwhhjAOGPrC28d7wVPqYJUgSrL2BCEIBc9ssrKjCyo0OadhXQqnWfSDqFndUZEiBjjmYRi5MU0zM7nh+v2jRZ672MJuXzvZwmAQYymDC7u5h/5XDcZ1is9rHpM16hMk4klxzcTtV/3MDvrUP6Tev8A9Vl5dFzqxn5Hk3lfKn6JvS5REqWv/D9E3rPUcrD3wCU0oKUBAQkcE4BEoCEOanFCqmhqW6nhCIaGoDU5KEU2EAJ0JAgbGSUJYQc0DXBI1KcUkIFXHpDw6fm/7Fdjlx6R8Ol5v+xRJeJaSb3x/nFet9xzQNGox9V7Q4tLQAcpImSvJNJO79U8934EhabUPWOtZ6rW03RegEHEETk4HpWpeK73TFU98Q+kmpUjUqj1hCEIBZ3X3xKpyt6VolndfB8iqcrelHHSOFX0l85bStp3OjFS0cdID84PtWb0PoZ1ptFOgx0Go67JBgDEk+oAn1L1SyaDoWQGnRk7HPcZc8jaYwAzgBWpi1GZzDqtDvA9ED+Z6bKS1Z0vRDrvRCw9ZUoCAllANCFFaK1xrnBpdA8ERJ5JKR1oxIAmMySAOOOGMOLHNBMELnNsaBe5cDgRd8IuJyA2nplOs9qDs8JEjgIBg5wZG0EDNUTNKd26E2dk7MtvKnFApQ5KAmygUJAnJAgEFE49uJI5ABNnBLPb1pkoHFcOlHb+l5pP5iu56rtLeFT809YqE7ni+kmFtaoHAg7o7l8Iru1a8YZyjpW+1j0JStFmqvLQK1Om6oyoIBIY0uLHHaCARjkvPtXD8oZy+xbicvHfjFE9H1c1KkalUeqAhCEAs9r14nU5W9YLQrPa9eJv5W9KOOk8KvpLyHUOtFvob2AC/wBUU3r0CqZxWB1GouNtY5xMNDznmS1w5oP4LeVDh6la97Gix9CO1Z0/RDrvSAotWdP0Q6700FYeuEgKUJg7c6LyDn0vZTVovpti84QJwEyDjzLh0jo8PJDi4YPALWudeFQh1110HCQJG2Bxqztle5Tc+7eui9AwmNi4/wBsAuqsDCX0w5xBIAIbdxB2TePraUC2izugujF17DO7JYWkgZjeCQPKPAltVF9ZjgWN8BwAdeDS52AzaHQBBmBJTBpbfFpYAQWTv/LLBhvccHD1iE7SdqLJOxpaI32JcSSYbiYGzlQO+AONobWJAAZEbQd8CMsQZBk+TlirNcFmtBAJdkKbakTeuyHEtDvpAXcCm1NIOaATTxLTUgOneNuyRvcXb7LizVFjKAqtulpvwzwX3MC4j6ecMJneTAB8Icagt9Wu1w3O+QahBkSGsimTGGXhieM8CC8CAua12ktBugEgtBBMeEYEQDjPCmV7ZdLYbgXhhJDmwTAES2CONB1kpFxfCnXS66yd03PN0E3rmGHlSP7SmaO0garqrbsBhAaZ8IEubPKHMcEHcSmuSlMJQSP7cyrdLnfU/NPWKsSqzTJ31LzXdZJJQV/mqg4aVQc7HBeWavgiuwHYvUK3zb58h/UcvN7C27axjOM+ogEfgVY3PLpPgno+p2pU2mcByBOR3jcEIQihZ7XvxN/K3pWhWe178Tfyt6wRx0nhV9JeV6iEfCAROJjP7NT2Lauy9SxOofz+Ub8dWpzrb1grXvTRu63Dntf8L0Q670wJ9r/heiHXeomrD0we0p0picgStSD2lhmCIMEgxyjEKIWCnLnBmLmlpOMlrjJHOnWxpNNwEzh4MznOEEHmMqodTtF681rgNzIDb7vCuOiS4wMbu+xIJA4VRa1LAx0yDjdnfPAlsXTAOYuiDxKU2Yb0g5RnvpjImTJIxxmc1Q0LFaTTHfHgim+AXGS4mpdad9AiaeJki6MQZVvZWvFIipLnb6S04uzMtM72dgkRlslQdNGgGiBBnA4QIGwDIDiTDo+nAFwQMsSYyEZ5QBhlguCjTr7huYBvkP3znEQ29ABMucHFpwziM1zsstovBxvYUGtIv4Fxa28JnB0gweM4qi7NlZ5HNIP0jmDwvd95TxsVJTo1iRALGBzTdk4tFQk/TN3e5jGcuJd2jWkBxLHNJdMOdegRAjfHZnxkoOk0hMwJwMxtGR9UpH0WkhzmgluIJ2cn4J6QFA0MECAMMRhgDwjgOJ50jKTWyWtAvGTAiTwnhKfCbP6ICUxx6UT0JpP6dKCVxVXpnwqXI7rKyJVVpp2NHkf0hJSUFZ3e3+Y7qledWfxser8WBeh1fm3+a7qlee0h8rHI3/1hWNzzaTw5fUlPIcgTkyid6OQdCejvG4IQhFCz2vXib+VvWC0Kz2vfidTlb1gjhpPCr6S8s1LqjdhGMPHUqLbWgRzLD6hHvwImL7cD5tRbOu+cc1a96aNGLcGWvOl6Idd6iUlt/hehHWeo2rL1QVHbpQlIQMtNobTBc8w0RJziTdBw2SUyjbqbrsPm85zG/acybw9V0otVnFRpY7wSRPHDg6OQxHOoKWiKbTTiRubi5gBwaS8OMCMcBd5CeVB0i2MimSY3Rwa2RBJMwCNmRS0LU1znNbm2LwjLMQePAnkg7VyN0S26xrnvcGG8zwRdIIIOAExG3hK66dBrXPcM3uDjyhob0AIOicAlTGnp9qH1AMSYHCUD5wSqKlUByIPDxTlITwUQoQEhOSQFAIJSIJQMPb8Uh9iWdqjJRUx/QdCqtN50uR/SFaPOfIFU6cPzP9/S1JSXLXqgMM4TvfWRC89pk/CafmN6i9Hpu3pGBkEQRIyXnFM/KmeY38Wz+qsbnDSOHV0l9TWfwW8g6FIorN4DfNHQpUdY3BCEIoWe168Tfyt6wWhKzuvnib+VvWCOGk8KvpLzDUo9+HnDqvWpqOwWP7n4m0taJzGe3B4w51rqhVrTRY+1EHWw/Nehb13qNpT7b/C9EOs9RNPQsvVB6D+qRJPSghtte6wvmILJOBwLgDPqJx2LitWkXirDIFPc3uFQtvNLgGkGQfBExG0lWrNiUlBV1dIPmz3QbjxL6gaCMWOOGOEEXstkLldbq/eA0kzUcHOugh7A9rcw0ZtcTIAyJ2Y3rdieT25kFPUtr9xDm1Lz90I3rQL4DzDYIP0YIxE8IzXVpY1JZcMGTGRxkZXsL12/E8a7vWiqAQQRI4DkiOGyipuvfCJjCMgy6BBGzfCcSc3QVZg4LnpMDfBAGOMKUoD2JED/AJ0pCUDimOPb1JQe3qSOKBoKYSnkJr0D3beT9FV6dyo/39LSrRxw9X6Kp1g8Gjyv/wBUklDRMhecsd8opcO5tB5j+kL0WxNkgDaQF5vRd8opjgYwfkn9VYcL/Dq6S+qbEe9s81vQFMoLB81T8xvQFOjrTugIQhFCzuvh+R1OVvWC0RWc1/8AEqnK3rBHDSeFX0l49qbpRtC1UX1N628J4ACc/Ut3pcXKhAILTvmkGQWnIgrxh9Q8JWv1Ptr6jXUy6dzbeg5wXNGH3j+C1V3s2PpjVbe1nCif6Q6z1C12CW3HeUY+pb1nqFhwWHrhMDKdt9ajBTgckD2nt6gkGxMd25k4lA5hTtnbgCjlOB7cqBwcllRk/r+qcP1RCzwdsE4nt6ky8lB7epAEnt60jtqCe3rSO40DgmzjHbNBPQkntzoByaTKHH9P0TbyCZ+UKo1jO8o+c/oYrWe3OqjWc97pec/oahLm0dpKlQBr1nQGAlrdr3kQ0DinM7F5xYKl6uHbJgcQAgfgAp9Z7RNU05O9uzy3BAA4pPrcVyaII3RvLh/1XHc81+foq6S+sNHHvVPzG9ULoXLov5ml6NnVC6kd6d0BCEIoWb7oPiVTlb0rSLNd0HxKpyt6UcNJ4VXR84vWq1CG/tB/+Of/AGU1l3BazUCnjajwUI+9UZ7FqdzNG+G0t7t7Q9C3rPXK15xU9vdvLPx0QOYk/qudvbt2yWHqTMdsKln8P+KBntTpRUpclB7c6jlLKB7SiegKMFKD0IHpb3T7FHKS8iJCU48CiDk4lBK449uL2JhKjLp7cCcXIHPPbmQD2502925kgKBx9ijJhBPb1KJzsUV1NdIVNrYe90vOd0NVmx6q9bfmqZ+24fg1El5nrE35TU5W9Rqh0X863l/Rd2suNYuGUNHrDG/oQuHRx74zlWvJ5bvhqj9S+sNEfMUvRs6oXWuLQh+T0fRM6oXao70eGAhCEaCzXdCPyKpyt6VpVmu6F4lU5W9KQ4aTwquj52IWr1IJuWs/02f+wLMgdtq12oDbzbWzbuId917Z6Qukx3MW5zVDR23GlZz/AEx0/wDFA1DnEMa05NktPEcxzptNw4VyeuEoPAnAkIaRwp7YO1AocErSgAcKcI4UDAUsp5c3hCYHN4QgAgBOvt4e2KN0aPpDnQNKJ7erag1W+UOdArs8oc4QCAEjrTT8pvOEwWyl9Y3nCCQgpIULrdS8tvOk/aVLLdBzoJyJyURTTpOl5bedQv0nSmL450HRTCrNbX96Z6Q/g1dD9LUmiS8R2y4VR6Ut+7EGIa0EAcJdmeZRJZTWA77jJB5qVILi0ee+M5QuzWT51vE1p52tPQuLR3zjPOC35PPd3VdH1ZoE/JqHomdQLvVfq94rQ9FT6oVgo62/DHQIQhGwsz3Q/EqnK3pWmWX7op+Qv5QkOOkcKro+fge0Kz1b0t8GrioQXMc11Oo0YF1N2d3jBgjkXZrHoHc++0hNOJc0fQ4SPs9HJlnrwXSiumuMw56s0S9M0fbqNTwXywnCSAR5w2Fd/wAEszsd3Z6yAf8AuxeSipwH8UGpx/irqN9p+np9fRlA5VmH+4KvtGjG7KreKHBYCSfpEbMCoXk+Uecqap2rcVLDH8QYcY9qr7U0NmagMbJx6VlzUdledzlVT2CSpqtxVldaX0pdF2m6XHMgyGN4AZi8ceQDjVJ8KqeW77x9qS6rXVu106VRzqhhpZd8EvnvlNxaWggwWteJnamGlWbXU+sd94pDbKn1jucre0NaLM0td4bpJdLHBovYG4LxwAGRwJMi6BBiZp+xgeFVGIIa0ENbjLoJkuBECHTlszTCMK61v8t3OUx1pf5bucrUWTSdEaR3e+WUsMS0vMBjQ5pwnGCJjbsGUrNKWanuRpudjTszKrLsAXKu6VjEQXYGM/DwPAwMgLS/MPdygnpWo0NpOjUZFapudYfScQGVG7DOTXjIzngc5VVrLXZVtNWpTxY50jMTvQCcccSCccTKqoUmFeh2S0UJE2qkP/sb7VYV6lmu4WulPnheYWYb4cqsHsHMphiqrEtZWNH+Zp/eH6KOm2gcDXaeQrLliSpzphntP01z2UR4Lg7lIw481BX0pRbMm99lpBJ4pGXKsuAM01o4kxDWultdY1Kjqjhi4zAwA4ABwAQPUl0eO+M84dKjlWGiLA953RoF1jm3sQDicIG1J7t7nV4auj6d1c8VoeiZ1QrFVurXilD0TOqFZKO1vwU9AhCEbCr9OaJbaqRpPcQ0kGWxOHKrBCJVTFUYlj/i/o/zFo++PYuT4q7Fwv8Aye6t2hXOHLZ7fL1lg/iqsXC/8nupfirsXC/mZ7q3aEzKbPb5e7CN7lljGTn/AJPdS/FZY+F/Mz3VukJrSbNb5e7CjuW2PhfzM91NPcpsP2uZnureITMmz2+XuwfxU2H7XMz3UfFVYvtczPdW8QmZXZ7fL1lhPiqsX2uZnuo+Kqw/a5me6t2hMmz2+Xuwg7lVh4HczPdS/FVYOB3Mz3VukKZOwt8mFHcqsHku/J7qX4qrB5Lvye6tyhDsLfJhh3K7ANj/AMnuqT4sbF/U52+6tqhDZ7f4sT8WFh/qc7fdR8V9h4H87fdW2Qhs9r8WI+K+wcD+dvupR3L7B5L+dvurbIQ2e3+LFfFhYPJfzt91Op9zSwtMgPHrb7q2aENnt/igsNlbSptptm60BonOBgJU6EI6xGIxAQhCKEIQgEIQgEIQgEIQgEIQgEIQgEIQgEIQgEIQgEIQgEIQgEIQgEIQgEIQgEIQg//Z" alt="Descrição da imagem">
                            
                            >Geração 3: i7-3770, i7-3770K, i7-3770S, i7-3770T, i7-3820QM, i7-3840QM, i7-3920XM, i7-3940XM, i7-3517U, i7-3537U, i7-3610QM, i7-3612QM, i7-3615QM, i7-3630QM, i7-3632QM, i7-3720QM, i7-3740QM.
                            </li>
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