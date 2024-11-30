export function setupModeToggle() {
  function initializeToggle() {
    const darkButton = document.querySelector('.dark');
    const lightButton = document.querySelector('.light');
    const weatherCard = document.querySelector('.weather-card');
    const h1 = document.querySelector('.h1');
    const item = document.querySelectorAll('.detail-item');
    const label = document.querySelectorAll('.detail-label');
    const value = document.querySelectorAll('.detail-value');
    const temp = document.querySelector('.temperature-value');
    const tempture = document.querySelector('.temperature-description');
    const loc = document.querySelector('.location-badge');

    if (weatherCard && darkButton && lightButton) {
      weatherCard.classList.add('lightback');

      darkButton.addEventListener('click', function () {
        weatherCard.classList.remove('lightback');
        weatherCard.classList.add('darkback');
        item.forEach(detailItem => {
          detailItem.style.backgroundColor = '#3F3F3F';
          detailItem.style.boxShadow = 'none';
        });
        label.forEach(labels => {
          labels.style.color = 'white';
        });
        value.forEach(values => {
          values.style.color = 'white';
        });
        temp.style.color = 'white';
        tempture.style.color = 'white';
        h1.style.color = 'white';
      });

      lightButton.addEventListener('click', function () {
        weatherCard.classList.remove('darkback');
        weatherCard.classList.add('lightback');
        item.forEach(detailItem => {
          detailItem.style.backgroundColor = '#EFF6FFCC';
          detailItem.style.boxShadow =
            '2px 2px 5px rgba(0, 0, 0, 0.1), -2px -2px 5px rgba(255, 255, 255, 0.8)';
        });
        label.forEach(labels => {
          labels.style.color = '#6b7280';
        });
        value.forEach(values => {
          values.style.color = '#1f2937';
        });
        temp.style.color = '#1f2937';
        tempture.style.color = '#4b5563';
        h1.style.color = '#1f2937';
      });
    }
  }

  initializeToggle();

  document.addEventListener('weatherCardInserted', initializeToggle);
}
