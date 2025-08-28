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