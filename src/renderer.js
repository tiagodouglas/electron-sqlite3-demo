const remote = require('electron').remote;

document.onreadystatechange = () => {
    if (document.readyState == "complete") {
        handleWindowControls();
    }
};

function handleWindowControls() {
    let window = remote.getCurrentWindow();
    const minButton = document.getElementById('min-button'),
        maxButton = document.getElementById('max-button'),
        restoreButton = document.getElementById('restore-button'),
        closeButton = document.getElementById('close-button');

    minButton.addEventListener("click", event => {
        window = remote.getCurrentWindow();
        window.minimize();
    });

    maxButton.addEventListener("click", event => {
        window = remote.getCurrentWindow();
        window.maximize();
    });

    restoreButton.addEventListener("click", event => {
        window = remote.getCurrentWindow();
        window.unmaximize();
    });
    toggleMaxRestoreButtons();
    window.on('maximize', toggleMaxRestoreButtons);
    window.on('unmaximize', toggleMaxRestoreButtons);

    closeButton.addEventListener("click", event => {
        window = remote.getCurrentWindow();
        window.close();
    });

    function toggleMaxRestoreButtons() {
        window = remote.getCurrentWindow();
        if (window.isMaximized()) {
            maxButton.style.display = "none";
            restoreButton.style.display = "flex";
        } else {
            restoreButton.style.display = "none";
            maxButton.style.display = "flex";
        }
    }
}