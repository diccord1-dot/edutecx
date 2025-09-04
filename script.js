document.addEventListener("DOMContentLoaded", () => {
    const includes = document.querySelectorAll('[data-include]');
    
    includes.forEach(el => {
        const file = el.getAttribute("data-include");
        
        fetch(file)
            .then(response => {
                if (!response.ok) throw new Error("Erro ao carregar " + file);
                return response.text();
            })
            .then(data => el.innerHTML = data)
            .catch(error => console.error("Erro:", error));
    });
});

/* === LOADER === */

const MIN_TIME = 1350;
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");

    const startTime = performance.timing.navigationStart;
    const elapsed = Date.now() - startTime;
    const remaining = MIN_TIME - elapsed;

    setTimeout(() => {
        document.body.classList.add("loaded");

        setTimeout(() => {
            loader.style.display = "none";
        }, 800);
    }, remaining > 0 ? remaining : 0);
});