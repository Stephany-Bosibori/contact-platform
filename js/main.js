document.addEventListener('DOMContentLoaded', () => {
    initThemeControl();
    initPortfolioFiltering();
    initFormValidation();
});

/**
 * INTERACTIVE FEATURE 1: Dark / Light Mode Toggle Switch (With Persistence)
 */
function initThemeControl() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (!themeToggleBtn) return;
    const icon = themeToggleBtn.querySelector('i');

    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
        transformToggleIcon(icon, true);
    }

    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const isDarkNow = document.body.classList.contains('dark-theme');
        localStorage.setItem('theme', isDarkNow ? 'dark' : 'light');
        transformToggleIcon(icon, isDarkNow);
    });
}

function transformToggleIcon(iconElement, isDark) {
    if (isDark) {
        iconElement.classList.replace('fa-moon', 'fa-sun');
        iconElement.style.color = '#ffca28';
    } else {
        iconElement.classList.replace('fa-sun', 'fa-moon');
        iconElement.style.color = '';
    }
}

/**
 *  INTERACTIVE  FEATURE 2: Dynamic Live Category Card Filterings
 */
function initPortfolioFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const filterItems = document.querySelectorAll('.filter-item');
    if (filterButtons.length === 0) return;

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('btn-success', 'active'));
            filterButtons.forEach(b => b.classList.add('btn-outline-success'));
            btn.classList.remove('btn-outline-success');
            btn.classList.add('btn-success', 'active');

            const selectedCategory = btn.getAttribute('data-filter');
            filterItems.forEach(item => {
                if (selectedCategory === 'all' || item.classList.contains(selectedCategory)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

/**
 *  INTERACTIVE FEATURE 3: Real-time Form Validation Handlers
 */
function initFormValidation() {
    const registrationForm = document.getElementById('enrollmentForm');
    if (!registrationForm) return;

    registrationForm.addEventListener('submit', function (event) {
        if (!registrationForm.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }
        registrationForm.classList.add('was-validated');
    }, false);
}