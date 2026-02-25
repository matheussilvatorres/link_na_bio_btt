document.addEventListener('DOMContentLoaded', () => {
    const sliderTrack = document.getElementById('js-slider-track');
    const btnPrev = document.getElementById('js-btn-prev');
    const btnNext = document.getElementById('js-btn-next');
    const lojaSection = document.getElementById('loja-section');
    const lojaTitle = document.getElementById('js-loja-title');
    const linhaButtons = document.querySelectorAll('.gwf-linha-toggle');

    const BASE_URL = 'https://landing-page.betterequipments.com.br/produtos';
    const intervalTime = 4000;

    // ── PRODUTOS POR LINHA ── edite aqui para personalizar depois
    const produtos = {
        tt: [
            {
                nome: 'SUPINO',
                preco: 'Sob Encomenda',
                img: 'https://blacknovember30off.fit4go.com.br/wp-content/uploads/2026/01/12.SUPINO-TT-SERIES-BH01-0.jpg',
                link: BASE_URL
            },
            {
                nome: 'ESTEIRA',
                preco: 'Sob Encomenda',
                img: 'https://blacknovember30off.fit4go.com.br/wp-content/uploads/2026/01/1.ESTEIRA-TT-SERIES-2.png',
                link: BASE_URL
            },
            {
                nome: 'CROSS OVER ANGULAR',
                preco: 'Sob Encomenda',
                img: 'https://blacknovember30off.fit4go.com.br/wp-content/uploads/2026/01/42.CROSS-OVER-ANGULAR-AR-SERIES-BH22-0.jpg',
                link: BASE_URL
            },
            {
                nome: 'FLEXORA DEITADA',
                preco: 'Sob Encomenda',
                img: 'https://blacknovember30off.fit4go.com.br/wp-content/uploads/2026/01/24.FLEXORA-DEITADA-TT-SERIES-BH13-1.png',
                link: BASE_URL
            }
        ],
        ar: [
            {
                nome: 'AGACHAMENTO LIVRE',
                preco: 'Sob Encomenda',
                img: 'https://blacknovember30off.fit4go.com.br/wp-content/uploads/2026/02/85.AGACHAMENTO-LIVRE-AR-SERIES-TB50.jpg',
                link: BASE_URL
            },
            {
                nome: 'BANCO SUPINO INCLINADO',
                preco: 'Sob Encomenda',
                img: 'https://blacknovember30off.fit4go.com.br/wp-content/uploads/2026/02/74.BANCO-SUPINO-INCLINADO-AR-SERIES-TM42-0.jpg',
                link: BASE_URL
            },
            {
                nome: 'PANTURRILHA SENTADA',
                preco: 'Sob Encomenda',
                img: 'https://blacknovember30off.fit4go.com.br/wp-content/uploads/2026/02/72.PANTURRILHA-SENTADA-AR-SERIES-TB62.jpg',
                link: BASE_URL
            },
            {
                nome: 'FLEXORA EM PE ARTICULADA',
                preco: 'Sob Encomenda',
                img: 'https://blacknovember30off.fit4go.com.br/wp-content/uploads/2026/02/66.FLEXORA-EM-PE-ARTICULADA-AR-SERIES-TM66.jpg',
                link: BASE_URL
            }
        ]
    };

    // ── ESTADO
    let currentIndex = 0;
    let totalSlides = 0;
    let autoSlideInterval;
    let linhaAtiva = null;

    // ── CARROSSEL
    function updatePosition() {
        sliderTrack.style.transition = 'transform 0.3s ease';
        sliderTrack.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updatePosition();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updatePosition();
    }

    function startAuto() {
        stopAuto();
        if (totalSlides > 1) autoSlideInterval = setInterval(nextSlide, intervalTime);
    }

    function stopAuto() {
        clearInterval(autoSlideInterval);
    }

    // ── RECONSTRÓI O TRACK com apenas os slides da linha
    function buildSlides(linha) {
        sliderTrack.innerHTML = '';
        sliderTrack.style.transition = 'none';
        sliderTrack.style.transform = 'translateX(0)';

        const lista = produtos[linha] || [];
        lista.forEach(function (p) {
            const article = document.createElement('article');
            article.className = 'gwf-bio__carrossel-slide';
            article.innerHTML =
                '<a href="' + p.link + '" target="_blank" class="gwf-bio__links-item-produtos" aria-label="' + p.nome + '">' +
                '<img src="' + p.img + '" alt="' + p.nome + '" class="gwf-bio__carrossel-image">' +
                '</a>' +
                '<div class="gwf-bio__carrossel-info">' +
                '<a href="' + p.link + '" target="_blank" class="gwf-bio__links-item-produtos" aria-label="' + p.nome + '">' +
                '<div class="gwf-bio__carrossel-details">' +
                '<h3 class="gwf-bio__carrossel-product-name">' + p.nome + '</h3>' +
                '<p class="gwf-bio__carrossel-product-price">' + p.preco + '</p>' +
                '</div>' +
                '</a>' +
                '</div>' +
                '<button class="gwf-bio__loja-button" aria-label="Compre Agora">' +
                '<a href="' + p.link + '" target="_blank" class="gwf-bio__loja-link">Compre Agora</a>' +
                '</button>';
            sliderTrack.appendChild(article);
        });

        totalSlides = lista.length;
        currentIndex = 0;
    }

    // ── ABRE / FECHA A SEÇÃO POR LINHA
    function showLinha(linha) {
        if (linhaAtiva === linha) {
            // Toggle: fecha ao clicar no mesmo botão
            lojaSection.style.display = 'none';
            linhaAtiva = null;
            linhaButtons.forEach(function (btn) {
                btn.style.opacity = '1';
            });
            stopAuto();
            return;
        }

        linhaAtiva = linha;

        // Visual: ativo normal, inativo levemente esmaecido (sem blur)
        linhaButtons.forEach(function (btn) {
            if (btn.dataset.linha === linha) {
                btn.style.backgroundColor = '#2a2b24';
                btn.style.opacity = '1';
            } else {
                btn.style.backgroundColor = '';
                btn.style.opacity = '1';
            }
        });

        lojaTitle.textContent = linha === 'tt' ? 'LINHA TT SERIES' : 'LINHA AR SERIES';

        buildSlides(linha);
        lojaSection.style.display = 'block';

        setTimeout(function () {
            lojaSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 60);

        startAuto();
    }

    // ── EVENTOS LINHA
    linhaButtons.forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            showLinha(btn.dataset.linha);
        });
    });

    // ── CONTROLES
    btnNext.addEventListener('click', function () { nextSlide(); startAuto(); });
    btnPrev.addEventListener('click', function () { prevSlide(); startAuto(); });

    // ── SWIPE TOUCH
    var startX = 0, currentX = 0, isDragging = false;

    sliderTrack.addEventListener('touchstart', function (e) {
        stopAuto();
        startX = e.touches[0].clientX;
        isDragging = true;
        sliderTrack.style.transition = 'none';
    });

    sliderTrack.addEventListener('touchmove', function (e) {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
        var diff = currentX - startX;
        sliderTrack.style.transform = 'translateX(calc(-' + (currentIndex * 100) + '% + ' + diff + 'px))';
    });

    sliderTrack.addEventListener('touchend', function () {
        isDragging = false;
        var diff = currentX - startX;
        if (diff > 50) prevSlide();
        else if (diff < -50) nextSlide();
        else updatePosition();
        startAuto();
    });
});