document.addEventListener('DOMContentLoaded', function() {
    var wheel = document.getElementById("wheel");
    var spinButton = document.getElementById("spinButton");
    var loadNamesButton = document.getElementById("loadNamesButton");
    var selectedNameElement = document.getElementById("selectedName");
    var spinSound = document.getElementById("spinSound");
    var degree = 0;
    var names = [];

    // Función para cargar los nombres desde el archivo noms.txt
    function loadNames() {
        playClickSound();
        fetch('noms.txt')
            .then(function(response) {
                return response.text();
            })
            .then(function(data) {
                names = data.split('\n').filter(function(name) {
                    return name.trim() !== '';
                });
                console.log(names);
                createSegments(); // Crear segmentos después de cargar los nombres
                alert('Noms carregats!');
            })
            .catch(function(error) {
                console.error('Error al carregar els noms:', error);
            });
    }

    // Función para crear segmentos de la ruleta
    function createSegments() {
        wheel.innerHTML = ''; // Limpiar la ruleta antes de crear nuevos segmentos
        var numSegments = names.length;
        var angleStep = 360 / numSegments;

        for (var i = 0; i < numSegments; i++) {
            var segment = document.createElement('div');
            segment.className = 'segment';
            segment.style.transform = 'rotate(' + (angleStep * i) + 'deg)';

            var segmentText = document.createElement('div');
            segmentText.className = 'segment-text';
            segmentText.textContent = names[i];

            segment.appendChild(segmentText);
            wheel.appendChild(segment);
        }
    }

    // Función para girar la rueda
    function spinWheel() {
        playClickSound();
        if (names.length === 0) {
            alert('No hi ha noms carregats. Carrega els noms abans de girar.');
            return;
        }
        
        spinSound.play();
        var numSegments = names.length;
        var angleStep = 360 / numSegments;
        var randomSegment = Math.floor(Math.random() * numSegments);
        var targetDegree = randomSegment * angleStep + (Math.random() * angleStep);

        degree = Math.floor(5000 + Math.random() * 5000) + targetDegree; // Gira entre 5000 y 10000 grados más el ángulo objetivo
        wheel.style.transition = "transform 10s ease-out";
        wheel.style.transform = 'rotate(' + degree + 'deg)';
        
        // Restablece para un nuevo giro
        setTimeout(function() {
            wheel.style.transition = "none";
            wheel.style.transform = 'rotate(' + (degree % 360) + 'deg)';
            var selectedSegmentIndex = Math.floor((degree % 360) / angleStep);
            selectedNameElement.textContent = names[selectedSegmentIndex];
            spinSound.pause();
            spinSound.currentTime = 0;
        }, 10000);
    }

    // Función para reproducir el sonido de clic
    function playClickSound() {
        var clickSound = document.getElementById("clickSound");
        clickSound.currentTime = 0; // Reiniciar el sonido si estaba reproduciéndose
        clickSound.play();
    }

    spinButton.addEventListener("click", spinWheel);
    loadNamesButton.addEventListener("click", loadNames);
});