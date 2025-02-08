document.addEventListener('DOMContentLoaded', function() {
    var endTimeInput = document.getElementById("endTime");
    var durationInput = document.getElementById("duration");
    var startEndTimeButton = document.getElementById("startEndTime");
    var startDurationButton = document.getElementById("startDuration");
    var clockElement = document.getElementById("clock");
    var countdownLabel = document.getElementById("countdown-label");
    var currentTimeElement = document.getElementById("current-time");
    var alertSound = document.getElementById("alertSound");
    var countdownInterval;
    var currentTimeInterval;

    // Función para mostrar la hora actual
    function showCurrentTime() {
        var now = new Date();
        var hours = String(now.getHours()).padStart(2, '0');
        var minutes = String(now.getMinutes()).padStart(2, '0');
        var seconds = String(now.getSeconds()).padStart(2, '0');
        currentTimeElement.textContent = hours + ':' + minutes + ':' + seconds;
    }

    // Iniciar la muestra de la hora actual
    currentTimeInterval = setInterval(showCurrentTime, 1000);

    // Función para iniciar el temporizador basado en la hora de finalización
    function startEndTime() {
        playClickSound();
        var endTime = new Date();
        var timeParts = endTimeInput.value.split(':');
        if (timeParts.length !== 2) {
            alert('Format de hora incorrecte. Utilitza HH:MM.');
            return;
        }
        endTime.setHours(timeParts[0], timeParts[1], 0, 0);
        startCountdown(endTime);
    }

    // Función para iniciar el temporizador basado en la duración
    function startDuration() {
        playClickSound();
        var timeParts = durationInput.value.split(':').map(Number);
        if (timeParts.length !== 3 || isNaN(timeParts[0]) || isNaN(timeParts[1]) || isNaN(timeParts[2])) {
            alert('Format de duració incorrecte. Utilitza HH:MM:SS.');
            return;
        }
        var duration = timeParts[0] * 3600 + timeParts[1] * 60 + timeParts[2];
        var endTime = new Date(Date.now() + duration * 1000);
        startCountdown(endTime);
    }

    // Función para iniciar el conteo regresivo
    function startCountdown(endTime) {
        // Mostrar el label y el elemento del contador
        countdownLabel.style.display = 'block';
        clockElement.style.display = 'block';

        clearInterval(countdownInterval);
        countdownInterval = setInterval(function() {
            var now = new Date();
            var diff = Math.max((endTime - now) / 1000, 0);
            var hours = Math.floor(diff / 3600);
            var minutes = Math.floor((diff % 3600) / 60);
            var seconds = Math.floor(diff % 60);
            clockElement.textContent = String(hours).padStart(2, '0') + ':' + String(minutes).padStart(2, '0') + ':' + String(seconds).padStart(2, '0');
            if (diff <= 0) {
                clearInterval(countdownInterval);
                alertSound.play();
            }
        }, 1000);
    }

    // Función para reproducir el sonido de clic
    function playClickSound() {
        var clickSound = document.getElementById("clickSound");
        clickSound.currentTime = 0; // Reiniciar el sonido si estaba reproduciéndose
        clickSound.play();
    }

    startEndTimeButton.addEventListener("click", startEndTime);
    startDurationButton.addEventListener("click", startDuration);
});