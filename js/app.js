const supportedLanguages = {
  de: 'Deutsch',
  en: 'English',
  ja: '日本語',
  fr: 'Français',
  es: 'Español',
  it: 'Italiano',
  nl: 'Nederlands',
  pt: 'Português',
  pl: 'Polski',
  sv: 'Svenska'
};

const languageKey = 'portfolio-language';
const themeKey = 'portfolio-theme';
const translationCache = new Map();
let activeTranslations = {};

const getTranslationValue = (translations, key) => {
  return key.split('.').reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : null), translations);
};

const updateTextContent = (translations) => {
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const value = getTranslationValue(translations, element.dataset.i18n);
    if (value !== null) {
      element.textContent = value;
    }
  });

  document.querySelectorAll('[data-i18n-attr]').forEach((element) => {
    const mappings = element.dataset.i18nAttr.split(',');
    mappings.forEach((mapping) => {
      const [attr, key] = mapping.split(':').map((part) => part.trim());
      if (!attr || !key) return;
      const value = getTranslationValue(translations, key);
      if (value !== null) {
        element.setAttribute(attr, value);
      }
    });
  });
};

const applyTranslations = (translations, lang) => {
  activeTranslations = translations;
  document.documentElement.setAttribute('lang', lang);
  if (translations.meta?.title) {
    document.title = translations.meta.title;
  }
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription && translations.meta?.description) {
    metaDescription.setAttribute('content', translations.meta.description);
  }
  updateTextContent(translations);
};

const loadTranslations = async (lang) => {
  if (translationCache.has(lang)) {
    return translationCache.get(lang);
  }
  const response = await fetch(`locales/${lang}.json`);
  if (!response.ok) {
    throw new Error(`Missing translations for ${lang}`);
  }
  const data = await response.json();
  translationCache.set(lang, data);
  return data;
};

const setLanguage = async (lang) => {
  const languageSelect = document.getElementById('languageSelect');
  document.body.classList.add('is-switching');
  try {
    const translations = await loadTranslations(lang);
    applyTranslations(translations, lang);
    if (languageSelect) {
      languageSelect.value = lang;
    }
    localStorage.setItem(languageKey, lang);
  } catch (error) {
    if (lang !== 'de') {
      await setLanguage('de');
    }
  } finally {
    window.setTimeout(() => document.body.classList.remove('is-switching'), 200);
  }
};

const setTheme = (theme) => {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(themeKey, theme);
};

const setupThemeToggle = () => {
  const themeToggle = document.getElementById('themeToggle');
  const storedTheme = localStorage.getItem(themeKey);
  const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  setTheme(storedTheme || preferredTheme);

  themeToggle?.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
  });
};

const setupLanguageSelect = () => {
  const languageSelect = document.getElementById('languageSelect');
  if (!languageSelect) return;
  Object.entries(supportedLanguages).forEach(([code, label]) => {
    const option = document.createElement('option');
    option.value = code;
    option.textContent = label;
    languageSelect.append(option);
  });

  languageSelect.addEventListener('change', (event) => {
    setLanguage(event.target.value);
  });

  const storedLanguage = localStorage.getItem(languageKey);
  const browserLanguage = navigator.language?.split('-')[0];
  const initialLanguage = storedLanguage || (supportedLanguages[browserLanguage] ? browserLanguage : 'de');
  setLanguage(initialLanguage);
};

const setupContactForm = () => {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (!form || !status) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = {
      name: document.getElementById('name').value.trim(),
      email: document.getElementById('email').value.trim(),
      subject: document.getElementById('subject').value.trim(),
      message: document.getElementById('message').value.trim()
    };

    if (!data.name || !data.email || !data.subject || !data.message) {
      status.textContent = activeTranslations.contact?.form?.statusIncomplete || '';
      return;
    }

    status.textContent = activeTranslations.contact?.form?.statusSending || '';
    const body = `From: ${data.name} (${data.email})\n\n${data.message}`;
    const mailto = `mailto:sundramsivasanthosh@gmail.com?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  });
};

const setupNavToggle = () => {
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.querySelectorAll('.nav-list a');
  navToggle?.addEventListener('click', () => {
    document.body.classList.toggle('nav-open');
  });
  navLinks.forEach((link) => {
    link.addEventListener('click', () => document.body.classList.remove('nav-open'));
  });
};

document.addEventListener('DOMContentLoaded', () => {
  setupThemeToggle();
  setupLanguageSelect();
  setupContactForm();
  setupNavToggle();
});
