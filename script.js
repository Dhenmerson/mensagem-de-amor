// Configuração inicial do Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#solarSystem'),
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Luzes
const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);
const sunLight = new THREE.PointLight(0xffffff, 2, 300);
scene.add(sunLight);

// Dados dos planetas
const planets = [
    {
        name: "Mercúrio",
        size: 0.8,
        distance: 5,
        color: 0x888888,
        description: "💝 Meu amor mais próximo! Assim como Mercúrio orbita o Sol, meu coração orbita ao redor do seu. Cada momento ao seu lado é como um novo amanhecer, cada sorriso seu ilumina meu dia. Você é minha estrela mais brilhante, meu amor mais verdadeiro, minha razão para sorrir todos os dias. Mesmo com as distâncias da vida, você sempre está perto de mim, aquecendo minha alma com seu amor infinito!",
        loveMessage: "Você é o planeta mais próximo do meu coração, meu amor eterno! 💖"
    },
    {
        name: "Vênus",
        size: 1.2,
        distance: 7,
        color: 0xe39e1c,
        description: "💖 Minha deusa do amor! Como Vênus brilha no céu, você ilumina minha vida com sua presença divina. Seu amor é tão intenso quanto a temperatura de Vênus, e sua beleza supera qualquer estrela no universo. Cada olhar seu me faz perder o fôlego, cada toque seu me faz flutuar. Você é minha inspiração diária, minha musa, minha razão para ser melhor a cada dia. Com você, cada momento é mágico, cada segundo é precioso!",
        loveMessage: "Seu amor é mais quente que o sol de Vênus, meu amor infinito! 🔥"
    },
    {
        name: "Terra",
        size: 1.5,
        distance: 10,
        color: 0x2233ff,
        description: "💕 Meu lar, meu amor! Assim como a Terra é única no universo, você é única no meu coração. Nossos momentos juntos são como as estações do ano - cada uma especial à sua maneira, cada uma trazendo novas cores ao nosso amor. Você é meu porto seguro, meu lugar favorito no mundo, minha casa. Com você, encontrei meu lar, encontrei meu propósito, encontrei o amor verdadeiro. Você é minha Terra, meu mundo, meu tudo!",
        loveMessage: "Você é meu mundo inteiro, meu amor eterno! 🌍"
    },
    {
        name: "Marte",
        size: 1.0,
        distance: 13,
        color: 0xc1440e,
        description: "💗 Meu planeta vermelho de paixão! Como Marte, você me faz sonhar com o impossível, me faz acreditar que tudo é possível quando estamos juntos. Sua coragem e força me inspiram todos os dias a ser melhor, a lutar por nossos sonhos. Juntos, podemos conquistar qualquer desafio, como verdadeiros exploradores do amor. Você é minha paixão, minha aventura, minha jornada mais bonita!",
        loveMessage: "Meu coração bate mais forte por você, meu amor infinito! ❤️"
    },
    {
        name: "Júpiter",
        size: 3.0,
        distance: 18,
        color: 0xd8ca9d,
        description: "💝 Meu gigante gentil! Como Júpiter protege a Terra, você protege meu coração com seu amor imenso. Seu amor é tão vasto quanto as tempestades de Júpiter, e tão duradouro quanto sua Grande Mancha Vermelha. Você é meu guardião, meu protetor, meu amor verdadeiro. Com você, me sinto segura, amada, completa. Seu amor é tão grande que preenche todo o espaço do meu coração!",
        loveMessage: "Meu amor por você é maior que Júpiter, meu amor eterno! 💫"
    },
    {
        name: "Saturno",
        size: 2.8,
        distance: 23,
        color: 0xead6b8,
        description: "💖 Meu planeta dos anéis! Como os anéis de Saturno, nosso amor é único e especial. Cada anel representa um momento especial que compartilhamos - nossos primeiros beijos, nossos abraços, nossas risadas, nossas lágrimas, nossas conquistas. Você é o anel que completa meu coração, que me faz inteira, que me faz feliz. Com você, cada momento é precioso, cada memória é um tesouro!",
        loveMessage: "Você é o anel que completa meu coração, meu amor infinito! 💍"
    }
];

// Criar o Sol
const sunGeometry = new THREE.SphereGeometry(3, 32, 32);
const sunMaterial = new THREE.MeshPhongMaterial({
    color: 0xffff00,
    emissive: 0xffff00,
    emissiveIntensity: 0.5,
    shininess: 100
});
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

// Adicionar estrelas ao fundo
function addStars() {
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({
        color: 0xFFFFFF,
        size: 0.1,
        transparent: true
    });

    const starsVertices = [];
    for (let i = 0; i < 10000; i++) {
        const x = (Math.random() - 0.5) * 2000;
        const y = (Math.random() - 0.5) * 2000;
        const z = (Math.random() - 0.5) * 2000;
        starsVertices.push(x, y, z);
    }

    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);
}

// Criar textos flutuantes para os planetas
const textMeshes = [];
function createPlanetLabels() {
    planets.forEach((planet, index) => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 512;
        canvas.height = 128;
        
        context.font = 'Bold 60px Arial';
        context.fillStyle = 'white';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(planet.name, canvas.width/2, canvas.height/2);
        
        const texture = new THREE.CanvasTexture(canvas);
        const material = new THREE.SpriteMaterial({ 
            map: texture,
            transparent: true,
            opacity: 0.9
        });
        const sprite = new THREE.Sprite(material);
        
        sprite.scale.set(4, 1, 1);
        sprite.position.copy(planetMeshes[index].position);
        sprite.position.y += planet.size + 1;
        
        scene.add(sprite);
        textMeshes.push(sprite);
    });
}

// Sistema de partículas para os planetas
const particleSystems = [];
function createParticleSystem(planet, position) {
    const particleCount = 1000;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    const color = new THREE.Color(planet.color);
    
    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const radius = planet.size * 1.5;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        
        positions[i3] = position.x + radius * Math.sin(phi) * Math.cos(theta);
        positions[i3 + 1] = position.y + radius * Math.sin(phi) * Math.sin(theta);
        positions[i3 + 2] = position.z + radius * Math.cos(phi);
        
        colors[i3] = color.r;
        colors[i3 + 1] = color.g;
        colors[i3 + 2] = color.b;
    }
    
    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const material = new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        transparent: true,
        opacity: 0.6
    });
    
    const particleSystem = new THREE.Points(particles, material);
    particleSystem.userData = {
        originalPositions: positions.slice(),
        velocities: new Float32Array(particleCount * 3),
        isExploding: false,
        planet: planet
    };
    
    scene.add(particleSystem);
    particleSystems.push(particleSystem);
    return particleSystem;
}

// Criar os planetas (agora fixos)
const planetMeshes = planets.map(planet => {
    const geometry = new THREE.SphereGeometry(planet.size, 32, 32);
    const material = new THREE.MeshPhongMaterial({ 
        color: planet.color,
        shininess: 30
    });
    const mesh = new THREE.Mesh(geometry, material);
    
    // Posicionar o planeta em um círculo
    const angle = (planets.indexOf(planet) / planets.length) * Math.PI * 2;
    mesh.position.x = Math.cos(angle) * 15;
    mesh.position.z = Math.sin(angle) * 15;
    mesh.userData = planet;
    
    // Criar sistema de partículas para o planeta
    createParticleSystem(planet, mesh.position);
    
    scene.add(mesh);
    return mesh;
});

// Adicionar estrelas e labels
addStars();
createPlanetLabels();

// Configurar a câmera
camera.position.z = 30;

// Raycaster para interação com o mouse
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Variáveis para controle da câmera
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };
let cameraRotation = { x: 0, y: 0 };

// Substituir array de fotos por mensagens de amor
const loveMessages = [
    {
        title: "Nosso Amor",
        message: "Cada momento ao seu lado é uma nova aventura de amor. Você é minha inspiração diária, minha razão para sorrir, meu amor eterno. 💖"
    },
    {
        title: "Nossa História",
        message: "Desde 2021, construímos uma história linda juntos. Cada dia é uma nova página de amor, cada momento um tesouro precioso. 💝"
    },
    {
        title: "Meu Coração",
        message: "Meu coração bate mais forte quando estou com você. Você é meu presente mais precioso, meu amor verdadeiro. ❤️"
    },
    {
        title: "Nossos Sonhos",
        message: "Juntos, podemos conquistar o mundo. Nossos sonhos são mais bonitos quando compartilhados. Você é minha parceira de vida. 💫"
    },
    {
        title: "Nossa Jornada",
        message: "Cada passo que damos juntos é uma nova aventura. Você é minha companheira de vida, meu amor infinito. 🌟"
    }
];

// Variáveis para controle do estado
let explodedPlanets = new Set();
let isRocketFlying = false;
let currentView = 'planets';
let fireworks = [];
let loveCards = [];
let currentCardIndex = 0;

// Elementos do DOM
const rocket = document.getElementById('rocket');
const backButton = document.getElementById('backButton');
const loveDays = document.getElementById('loveDays');

// Data do início do namoro
const loveStartDate = new Date('2021-01-01');

// Função para calcular dias de namoro
function calculateLoveDays() {
    const today = new Date();
    const diffTime = Math.abs(today - loveStartDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

// Função para atualizar o contador de dias
function updateLoveDays() {
    const days = calculateLoveDays();
    loveDays.textContent = `Juntos há ${days} dias de amor! 💖`;
}

// Evento de clique na tela (para planetas e cards)
window.addEventListener('click', (event) => {
    if (isRocketFlying) return;

    // Atualizar posição do mouse
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Verificar cliques baseado na view atual
    if (currentView === 'planets') {
        console.log('Verificando clique em planeta...');
        raycaster.setFromCamera(mouse, camera);
        const availablePlanets = planetMeshes.filter(p => !explodedPlanets.has(p));
        const intersects = raycaster.intersectObjects(availablePlanets);

        if (intersects.length > 0) {
            const clickedPlanet = intersects[0].object;
            console.log('Planeta clicado:', clickedPlanet.userData.name);
            launchRocket(clickedPlanet);
        } else {
            console.log('Nenhum planeta clicado');
        }
    } else if (currentView === 'cards') {
        console.log('Verificando clique em card...');
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(loveCards);

        if (intersects.length > 0) {
            console.log('Card clicado:', intersects[0].object.userData.cardIndex);
            expandCard(intersects[0].object);
        }
    }
});

// Função para lançar o foguete
function launchRocket(targetPlanet) {
    if (isRocketFlying) return;
    console.log('Iniciando lançamento do foguete para:', targetPlanet.userData.name);
    isRocketFlying = true;

    // Posição inicial do foguete (centro da tela)
    const rocketStartX = window.innerWidth / 2;
    const rocketStartY = window.innerHeight / 2;

    // Posição do planeta na tela
    const planetScreenPos = getPlanetScreenPosition(targetPlanet);
    console.log('Posição do planeta:', planetScreenPos);
    
    // Calcular distância para o planeta
    const targetX = planetScreenPos.x - rocketStartX;
    const targetY = planetScreenPos.y - rocketStartY;
    
    // Resetar posição do foguete para o centro
    rocket.style.transform = 'rotate(-45deg)';
    rocket.style.left = `${rocketStartX}px`;
    rocket.style.top = `${rocketStartY}px`;
    
    // Forçar reflow
    rocket.offsetHeight;
    
    // Definir animação
    rocket.style.setProperty('--targetX', `${targetX}px`);
    rocket.style.setProperty('--targetY', `${targetY}px`);
    rocket.classList.add('flying');
    
    // Explodir planeta após a animação
    setTimeout(() => {
        console.log('Foguete chegou ao destino');
        explodePlanet(targetPlanet);
        
        // Resetar foguete
        setTimeout(() => {
            rocket.classList.remove('flying');
            rocket.style.transform = 'rotate(-45deg)';
            rocket.style.left = '';
            rocket.style.top = '';
            isRocketFlying = false;
        }, 500);
    }, 1500);
}

// Função para explodir planeta
function explodePlanet(planetMesh) {
    const planet = planetMesh.userData;
    const particleSystem = particleSystems[planetMeshes.indexOf(planetMesh)];
    const planetIndex = planetMeshes.indexOf(planetMesh);
    
    if (particleSystem && !explodedPlanets.has(planetMesh)) {
        console.log('Explodindo planeta:', planet.name);
        explodedPlanets.add(planetMesh);
        planetMesh.visible = false;
        
        // Esconder o nome do planeta
        if (textMeshes[planetIndex]) {
            textMeshes[planetIndex].visible = false;
        }
        
        particleSystem.userData.isExploding = true;
        
        const positions = particleSystem.geometry.attributes.position.array;
        const velocities = particleSystem.userData.velocities;
        
        for (let i = 0; i < positions.length; i += 3) {
            velocities[i] = (Math.random() - 0.5) * 0.2;
            velocities[i + 1] = (Math.random() - 0.5) * 0.2;
            velocities[i + 2] = (Math.random() - 0.5) * 0.2;
        }
        
        // Mostrar mensagem do planeta
        showPlanetInfo(planet);
        currentView = 'message';
        backButton.classList.add('visible');
        
        // Verificar se todos os planetas explodiram
        checkAllPlanetsExploded();
    }
}

// Função para verificar se todos os planetas explodiram
function checkAllPlanetsExploded() {
    console.log('Verificando explosão total. Planetas explodidos:', explodedPlanets.size, 'de', planets.length);
    
    if (explodedPlanets.size === planets.length) {
        console.log('Todos os planetas explodiram! Iniciando explosão total...');
        
        // Esconder o sol com animação
        sun.visible = false;
        
        // Criar explosão massiva de fogos de artifício
        createMassiveFireworks();
        
        // Mostrar cards de amor após os fogos
        setTimeout(() => {
            console.log('Criando cards de amor...');
            createLoveCards();
            currentView = 'cards';
        }, 5000);
    }
}

// Função para criar fogos de artifício em grande quantidade
function createMassiveFireworks() {
    console.log('Criando fogos de artifício massivos...');
    const fireworkCount = 20;
    const colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff, 0xff8800, 0x88ff00];
    
    for (let i = 0; i < fireworkCount; i++) {
        setTimeout(() => {
            const x = (Math.random() - 0.5) * window.innerWidth;
            const y = (Math.random() - 0.5) * window.innerHeight;
            
            // Criar múltiplos fogos de artifício em cada posição
            for (let j = 0; j < 3; j++) {
                setTimeout(() => {
                    createFirework(
                        x + (Math.random() - 0.5) * 100,
                        y + (Math.random() - 0.5) * 100,
                        colors[Math.floor(Math.random() * colors.length)]
                    );
                }, j * 200);
            }
        }, i * 300);
    }
}

// Função para obter posição do planeta na tela
function getPlanetScreenPosition(planetMesh) {
    const vector = new THREE.Vector3();
    vector.setFromMatrixPosition(planetMesh.matrixWorld);
    vector.project(camera);
    
    // Converter para coordenadas da tela
    const x = (vector.x * 0.5 + 0.5) * window.innerWidth;
    const y = (-vector.y * 0.5 + 0.5) * window.innerHeight;
    
    // Ajustar para o centro do planeta
    const planetSize = planetMesh.userData.size;
    const sizeOffset = planetSize * 30;
    
    console.log('Posição calculada do planeta:', { x, y, sizeOffset });
    
    return { 
        x: x,
        y: y - sizeOffset
    };
}

// Função para criar fogos de artifício
function createFirework(x, y, color = null) {
    const particles = [];
    const particleCount = 150; // Aumentado para mais partículas
    const colors = color ? [color] : [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff, 0xff8800, 0x88ff00];
    
    for (let i = 0; i < particleCount; i++) {
        const geometry = new THREE.SphereGeometry(0.15, 8, 8);
        const material = new THREE.MeshBasicMaterial({
            color: colors[Math.floor(Math.random() * colors.length)],
            transparent: true,
            opacity: 1
        });
        const particle = new THREE.Mesh(geometry, material);
        
        particle.position.set(x, y, 0);
        particle.velocity = new THREE.Vector3(
            (Math.random() - 0.5) * 0.8,
            (Math.random() - 0.5) * 0.8,
            (Math.random() - 0.5) * 0.8
        );
        particle.life = 1.0;
        
        scene.add(particle);
        particles.push(particle);
    }
    
    fireworks.push({ particles, life: 1.0 });
}

// Event listeners para controle da câmera
window.addEventListener('mousedown', (e) => {
    isDragging = true;
    previousMousePosition = {
        x: e.clientX,
        y: e.clientY
    };
});

window.addEventListener('mouseup', () => {
    isDragging = false;
});

window.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const deltaMove = {
            x: e.clientX - previousMousePosition.x,
            y: e.clientY - previousMousePosition.y
        };

        cameraRotation.y += deltaMove.x * 0.005;
        cameraRotation.x += deltaMove.y * 0.005;

        // Limitar a rotação vertical
        cameraRotation.x = Math.max(-Math.PI/2, Math.min(Math.PI/2, cameraRotation.x));

        previousMousePosition = {
            x: e.clientX,
            y: e.clientY
        };
    }

    // Atualizar posição do mouse para o raycaster
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
});

// Função para expandir card
function expandCard(cardSprite) {
    if (cardSprite.userData.isExpanded) return;
    
    console.log('Expandindo card:', cardSprite.userData.cardIndex);
    cardSprite.userData.isExpanded = true;
    cardSprite.userData.originalScale = cardSprite.scale.x;
    cardSprite.userData.originalPosition = cardSprite.position.clone();
    cardSprite.userData.originalRotation = cardSprite.rotation.clone();
    
    // Mover para o centro e aumentar significativamente
    cardSprite.scale.set(20, 10, 1); // Aumentado MUITO o tamanho
    cardSprite.position.set(0, 0, 5); // Centralizar e trazer para frente
    cardSprite.rotation.set(0, 0, 0); // Remover rotação
    
    // Esconder outros cards
    loveCards.forEach(card => {
        if (card !== cardSprite) {
            card.visible = false;
        }
    });
    
    // Mostrar botão voltar
    backButton.classList.add('visible');
    currentView = 'card';
}

// Função para voltar à visualização dos cards
function returnToCards() {
    console.log('Voltando para visualização dos cards');
    loveCards.forEach(card => {
        // Restaurar visibilidade de todos os cards
        card.visible = true;
        
        if (card.userData.isExpanded) {
            // Animar de volta para a posição original
            card.scale.set(card.userData.originalScale, card.userData.originalScale/2, 1);
            card.position.copy(card.userData.originalPosition);
            card.rotation.copy(card.userData.originalRotation);
            card.userData.isExpanded = false;
        }
    });
    
    backButton.classList.remove('visible');
    currentView = 'cards';
}

// Função para criar cards de amor atualizada
function createLoveCards() {
    // Remover cards existentes
    loveCards.forEach(card => scene.remove(card));
    loveCards = [];

    // Criar novos cards
    loveMessages.forEach((message, index) => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 1024; // Aumentado para melhor qualidade
        canvas.height = 512; // Aumentado para melhor qualidade
        
        // Desenhar fundo do card
        context.fillStyle = 'rgba(0, 0, 0, 0.8)';
        context.fillRect(0, 0, canvas.width, canvas.height);
        
        // Adicionar borda
        context.strokeStyle = '#ff69b4';
        context.lineWidth = 8;
        context.strokeRect(4, 4, canvas.width - 8, canvas.height - 8);
        
        // Adicionar título
        context.font = 'Bold 80px Arial';
        context.fillStyle = '#ff69b4';
        context.textAlign = 'center';
        context.fillText(message.title, canvas.width/2, 120);
        
        // Adicionar mensagem
        context.font = '48px Arial';
        context.fillStyle = 'white';
        const words = message.message.split(' ');
        let line = '';
        let y = 240;
        
        words.forEach(word => {
            const testLine = line + word + ' ';
            if (context.measureText(testLine).width > canvas.width - 80) {
                context.fillText(line, canvas.width/2, y);
                line = word + ' ';
                y += 60;
            } else {
                line = testLine;
            }
        });
        context.fillText(line, canvas.width/2, y);
        
        const texture = new THREE.CanvasTexture(canvas);
        const material = new THREE.SpriteMaterial({
            map: texture,
            transparent: true,
            opacity: 0.95
        });
        
        const sprite = new THREE.Sprite(material);
        sprite.scale.set(6, 3, 1); // Aumentado o tamanho inicial
        
        // Posicionar em um círculo
        const angle = (index / loveMessages.length) * Math.PI * 2;
        const radius = 15;
        sprite.position.x = Math.cos(angle) * radius;
        sprite.position.z = Math.sin(angle) * radius;
        sprite.position.y = (Math.random() - 0.5) * 5;
        
        sprite.userData = {
            type: 'card',
            cardIndex: index,
            originalScale: 6,
            isExpanded: false,
            originalPosition: sprite.position.clone(),
            originalRotation: sprite.rotation.clone()
        };
        
        scene.add(sprite);
        loveCards.push(sprite);
    });
}

// Função para mostrar informações do planeta atualizada
function showPlanetInfo(planet) {
    const planetInfo = document.getElementById('planetInfo');
    const planetName = document.getElementById('planetName');
    const planetDescription = document.getElementById('planetDescription');

    planetName.textContent = planet.name;
    planetDescription.textContent = planet.description;
    updateLoveDays();
    planetInfo.classList.add('visible');
}

// Função de animação atualizada
function animate() {
    requestAnimationFrame(animate);

    // Atualizar fogos de artifício
    for (let i = fireworks.length - 1; i >= 0; i--) {
        const firework = fireworks[i];
        firework.life -= 0.015; // Mais lento para durar mais
        
        firework.particles.forEach(particle => {
            particle.position.add(particle.velocity);
            particle.velocity.y -= 0.01; // gravidade
            particle.material.opacity = firework.life;
            particle.scale.setScalar(1 + (1 - firework.life)); // Partículas crescem ao explodir
        });
        
        if (firework.life <= 0) {
            firework.particles.forEach(particle => scene.remove(particle));
            fireworks.splice(i, 1);
        }
    }

    // Animar cards de amor
    if (currentView === 'cards') {
        loveCards.forEach((card, index) => {
            if (!card.userData.isExpanded) {
                const time = Date.now() * 0.001;
                const angle = (index / loveMessages.length) * Math.PI * 2 + time * 0.1;
                const radius = 15;
                
                card.position.x = Math.cos(angle) * radius;
                card.position.z = Math.sin(angle) * radius;
                card.position.y = Math.sin(time + index) * 2;
                
                card.rotation.y = Math.sin(time * 0.2 + index) * 0.1;
            }
        });
    }

    // Rotacionar o Sol lentamente
    sun.rotation.y += 0.0005;

    // Atualizar partículas
    particleSystems.forEach((particleSystem, index) => {
        const positions = particleSystem.geometry.attributes.position.array;
        const velocities = particleSystem.userData.velocities;
        const planetMesh = planetMeshes[index];
        
        if (particleSystem.userData.isExploding) {
            // Atualizar posições durante explosão
            for (let i = 0; i < positions.length; i += 3) {
                positions[i] += velocities[i];
                positions[i + 1] += velocities[i + 1];
                positions[i + 2] += velocities[i + 2];
                
                // Adicionar gravidade
                velocities[i + 1] -= 0.001;
            }
        } else if (!explodedPlanets.has(planetMesh)) {
            // Movimento normal das partículas apenas para planetas não explodidos
            const time = Date.now() * 0.001;
            const radius = planetMesh.userData.size * 1.5;
            
            for (let i = 0; i < positions.length; i += 3) {
                const i3 = i / 3;
                const theta = (i3 / 1000) * Math.PI * 2 + time;
                const phi = Math.sin(time * 0.5 + i3) * 0.5 + Math.PI * 0.5;
                
                positions[i] = planetMesh.position.x + radius * Math.sin(phi) * Math.cos(theta);
                positions[i + 1] = planetMesh.position.y + radius * Math.sin(phi) * Math.sin(theta);
                positions[i + 2] = planetMesh.position.z + radius * Math.cos(phi);
            }
        }
        
        particleSystem.geometry.attributes.position.needsUpdate = true;
    });

    // Atualizar posição da câmera
    const radius = 30;
    camera.position.x = Math.cos(cameraRotation.y) * Math.cos(cameraRotation.x) * radius;
    camera.position.y = Math.sin(cameraRotation.x) * radius;
    camera.position.z = Math.sin(cameraRotation.y) * Math.cos(cameraRotation.x) * radius;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
}

// Ajustar tamanho da janela
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Função para resetar o estado
function resetState() {
    console.log('Resetando estado...');
    explodedPlanets.clear();
    isRocketFlying = false;
    currentView = 'planets';
    fireworks = [];
    loveCards.forEach(card => scene.remove(card));
    loveCards = [];
    
    // Resetar visibilidade dos planetas e seus nomes
    planetMeshes.forEach((planet, index) => {
        planet.visible = true;
        if (textMeshes[index]) {
            textMeshes[index].visible = true;
        }
    });
    
    // Resetar sistemas de partículas
    particleSystems.forEach(system => {
        system.userData.isExploding = false;
    });
    
    // Resetar sol
    sun.visible = true;
    
    // Resetar foguete
    rocket.classList.remove('flying');
    rocket.style.transform = 'rotate(-45deg)';
    rocket.style.left = '';
    rocket.style.top = '';
    
    // Esconder botão voltar
    backButton.classList.remove('visible');
    
    console.log('Estado resetado. View atual:', currentView);
}

// Adicionar evento para resetar o estado quando a página carregar
window.addEventListener('load', () => {
    console.log('Página carregada, estado inicial:', {
        currentView,
        explodedPlanets: explodedPlanets.size,
        isRocketFlying,
        loveCards: loveCards.length
    });
    resetState();
});

// Evento do botão voltar
backButton.addEventListener('click', () => {
    console.log('Botão voltar clicado. View atual:', currentView);
    
    if (currentView === 'message') {
        const planetInfo = document.getElementById('planetInfo');
        planetInfo.classList.remove('visible');
        backButton.classList.remove('visible');
        currentView = 'planets';
        console.log('Voltando para view dos planetas');
    } else if (currentView === 'card') {
        returnToCards();
        console.log('Voltando para view dos cards');
    }
});

// Iniciar animação
animate(); 