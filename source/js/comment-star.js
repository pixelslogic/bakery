document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('starRating');
  if (!container) return;

  const stars = container.querySelectorAll('.star');
  let currentRating = 0;

  stars.forEach(star => {
    star.addEventListener('mouseenter', () => {
      const value = parseInt(star.dataset.value);
      updateStars(value, true);
    });

    star.addEventListener('click', () => {
      currentRating = parseInt(star.dataset.value);
      updateStars(currentRating, false);
    });
  });

  container.addEventListener('mouseleave', () => {
    updateStars(currentRating, false);
  });

  function updateStars(rating, isHover) {
    stars.forEach(star => {
      const value = parseInt(star.dataset.value);
      star.classList.remove('active', 'hovered');

      if (value <= rating) {
        star.classList.add(isHover ? 'hovered' : 'active');
      }
    });
  }
});