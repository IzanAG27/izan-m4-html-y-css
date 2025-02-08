document.addEventListener('DOMContentLoaded', function() {
    // Cargar el tema desde localStorage al cargar la página
    var savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }

    // Event listener para cambiar el tema
    document.getElementById('themeToggle').addEventListener('click', function() {
        playClickSound();
        document.body.classList.toggle('dark-theme');
        var isDarkTheme = document.body.classList.contains('dark-theme');
        localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
    });

    // Función para reproducir el sonido de clic
    function playClickSound() {
        var clickSound = document.getElementById("clickSound");
        clickSound.currentTime = 0; // Reiniciar el sonido si estaba reproduciéndose
        clickSound.play();
    }

    // Añadir event listeners a todos los botones para reproducir el sonido de clic
    var buttons = document.querySelectorAll('button');
    buttons.forEach(function(button) {
        button.addEventListener('click', playClickSound);
    });
});