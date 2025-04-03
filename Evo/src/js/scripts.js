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