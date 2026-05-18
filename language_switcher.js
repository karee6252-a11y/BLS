// language-switcher.js - نظام تبديل اللغة الكامل

class LanguageSwitcher {
  constructor() {
    this.currentLang = this.getSavedLanguage() || 'en';
    this.init();
  }

  init() {
    // تطبيق اللغة المحفوظة عند تحميل الصفحة
    this.applyLanguage(this.currentLang);
    
    // إضافة مستمعي الأحداث لأزرار تغيير اللغة
    this.attachEventListeners();
  }

  getSavedLanguage() {
    return localStorage.getItem('siteLanguage');
  }

  saveLanguage(lang) {
    localStorage.setItem('siteLanguage', lang);
  }

  switchLanguage(lang) {
    if (lang === this.currentLang) return;
    
    this.currentLang = lang;
    this.saveLanguage(lang);
    this.applyLanguage(lang);
  }

  applyLanguage(lang) {
    // تغيير اتجاه الصفحة
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    document.body.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

    // إضافة/إزالة class للعربي
    if (lang === 'ar') {
      document.body.classList.add('rtl');
    } else {
      document.body.classList.remove('rtl');
    }

    // ترجمة جميع العناصر
    this.translateElements(lang);

    // تحديث حالة الأزرار
    this.updateButtonStates(lang);
  }

  translateElements(lang) {
    // ترجمة العناصر بناءً على data-translate
    const elements = document.querySelectorAll('[data-translate]');
    
    elements.forEach(element => {
      const key = element.getAttribute('data-translate');
      const translation = this.getTranslation(key, lang);
      
      if (translation) {
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
          element.placeholder = translation;
        } else {
          element.innerHTML = translation;
        }
      }
    });
  }

  getTranslation(key, lang) {
    // تقسيم المفتاح (مثل: nav.home)
    const keys = key.split('.');
    let translation = translations[lang];
    
    for (const k of keys) {
      if (translation && translation[k]) {
        translation = translation[k];
      } else {
        return null;
      }
    }
    
    return translation;
  }

  updateButtonStates(lang) {
    // تحديث أزرار اللغة
    const langButtons = document.querySelectorAll('[data-lang]');
    
    langButtons.forEach(button => {
      const btnLang = button.getAttribute('data-lang');
      if (btnLang === lang) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    });
  }

  attachEventListeners() {
    // مستمع لأزرار تغيير اللغة
    document.addEventListener('click', (e) => {
      const langButton = e.target.closest('[data-lang]');
      if (langButton) {
        const lang = langButton.getAttribute('data-lang');
        this.switchLanguage(lang);
      }
    });
  }
}

// تشغيل عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
  window.languageSwitcher = new LanguageSwitcher();
});