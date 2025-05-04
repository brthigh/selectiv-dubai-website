document.addEventListener('DOMContentLoaded', function() {
    // Language switcher functionality
    const languageSwitchers = document.querySelectorAll('.btn-language');
    
    languageSwitchers.forEach(button => {
        button.addEventListener('click', function() {
            const selectedLang = this.getAttribute('data-lang');
            
            // Set active button
            languageSwitchers.forEach(btn => {
                btn.classList.remove('active');
            });
            this.classList.add('active');
            
            // Update content for all elements with data-[lang] attributes
            document.querySelectorAll('[data-' + selectedLang + ']').forEach(element => {
                const translations = {};
                
                // Get all language translations available for this element
                for (const attr of element.attributes) {
                    if (attr.name.startsWith('data-')) {
                        const lang = attr.name.replace('data-', '');
                        translations[lang] = attr.value;
                    }
                }
                
                // Set content to selected language if available, or fallback to Dutch
                if (translations[selectedLang]) {
                    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                        element.placeholder = translations[selectedLang];
                    } else {
                        element.innerHTML = translations[selectedLang];
                    }
                }
            });
            
            // Store language preference
            localStorage.setItem('preferredLanguage', selectedLang);
        });
    });
    
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
        const langButton = document.querySelector(`.btn-language[data-lang="${savedLanguage}"]`);
        if (langButton) {
            langButton.click();
        }
    }
    
    // Email popup functionality
    const popupOverlay = document.getElementById('popupOverlay');
    const emailPopup = document.getElementById('emailPopup');
    const closePopup = document.getElementById('closePopup');
    
    if (emailPopup && popupOverlay && closePopup) {
        // Show popup after 5 seconds
        setTimeout(() => {
            popupOverlay.style.display = 'block';
            emailPopup.style.display = 'block';
        }, 5000);
        
        // Close popup on button click
        closePopup.addEventListener('click', () => {
            popupOverlay.style.display = 'none';
            emailPopup.style.display = 'none';
        });
        
        // Close popup when clicking outside
        popupOverlay.addEventListener('click', () => {
            popupOverlay.style.display = 'none';
            emailPopup.style.display = 'none';
        });
        
        // Prevent closing when clicking inside popup
        emailPopup.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
    
    // Form submission handling
    const contactForms = document.querySelectorAll('.contact-form, .popup-form');
    
    contactForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would normally send the form data to a server
            // For now, we'll just simulate a successful submission
            
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            submitButton.disabled = true;
            submitButton.innerHTML = 'Verzenden...';
            
            setTimeout(() => {
                form.reset();
                submitButton.innerHTML = 'Verzonden!';
                
                setTimeout(() => {
                    submitButton.disabled = false;
                    submitButton.innerHTML = originalText;
                    
                    // If this is the popup form, close the popup
                    if (form.classList.contains('popup-form') && popupOverlay && emailPopup) {
                        popupOverlay.style.display = 'none';
                        emailPopup.style.display = 'none';
                    }
                }, 2000);
            }, 1500);
        });
    });
});
