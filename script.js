document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const openBtn = document.getElementById('openModal');
    const closeBtn = document.querySelector('#modal .close');
  
    if (!modal || !openBtn || !closeBtn) return;
  
    const openModal = (e) => {
      if (e) e.preventDefault();
      modal.classList.add('is-open');
    };
  
    const closeModal = () => {
      modal.classList.remove('is-open');
    };
  
    openBtn.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });
  });