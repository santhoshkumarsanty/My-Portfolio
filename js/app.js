/* ============================================================
   Global theme + i18n controller
   ============================================================ */
const supportedLanguages = ["de", "en", "ja", "fr", "es", "it", "nl", "pt", "pl", "sv"];
const fallbackLanguage = "de";
const translationCache = new Map();
let currentLanguage = null;

const languageSelect = document.getElementById("languageSelect");
const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle.querySelector(".theme-icon");

const getNestedValue = (obj, path) =>
  path.split(".").reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);

const detectBrowserLanguage = () => {
  const candidates = navigator.languages?.length ? navigator.languages : [navigator.language || fallbackLanguage];
  for (const lang of candidates) {
    const code = lang.toLowerCase().split("-")[0];
    if (supportedLanguages.includes(code)) {
      return code;
    }
  }
  return fallbackLanguage;
};

const loadTranslations = async (lang) => {
  if (translationCache.has(lang)) {
    return translationCache.get(lang);
  }
  const response = await fetch(`locales/${lang}.json`, { cache: "force-cache" });
  if (!response.ok) {
    throw new Error(`Missing translations for ${lang}`);
  }
  const data = await response.json();
  translationCache.set(lang, data);
  return data;
};

const applyTranslations = (translations, fallbackTranslations) => {
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    const value = getNestedValue(translations, key) ?? getNestedValue(fallbackTranslations, key);
    if (value !== undefined) {
      element.textContent = value;
    }
  });

  document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
    const key = element.dataset.i18nAria;
    const value = getNestedValue(translations, key) ?? getNestedValue(fallbackTranslations, key);
    if (value !== undefined) {
      element.setAttribute("aria-label", value);
    }
  });

  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    const description =
      translations.meta?.description ?? fallbackTranslations.meta?.description ?? metaDescription.content;
    metaDescription.setAttribute("content", description);
  }

  if (translations.meta?.title || fallbackTranslations.meta?.title) {
    document.title = translations.meta?.title ?? fallbackTranslations.meta?.title ?? document.title;
  }
};

const setLanguage = async (lang) => {
  const normalized = supportedLanguages.includes(lang) ? lang : fallbackLanguage;
  if (currentLanguage === normalized) {
    return;
  }
  let resolvedLanguage = normalized;
  document.body.classList.add("is-translating");
  let translations = null;
  let fallbackTranslations = null;

  try {
    translations = await loadTranslations(normalized);
    fallbackTranslations =
      normalized === fallbackLanguage ? translations : await loadTranslations(fallbackLanguage);
  } catch (error) {
    resolvedLanguage = fallbackLanguage;
    translations = await loadTranslations(fallbackLanguage);
    fallbackTranslations = translations;
  }

  if (languageSelect.value !== resolvedLanguage) {
    languageSelect.value = resolvedLanguage;
  }

  applyTranslations(translations, fallbackTranslations);
  document.documentElement.lang = resolvedLanguage;
  localStorage.setItem("preferredLanguage", resolvedLanguage);
  currentLanguage = resolvedLanguage;

  setTimeout(() => document.body.classList.remove("is-translating"), 200);
};

const setTheme = (theme) => {
  const resolvedTheme = theme === "dark" ? "dark" : "light";
  document.documentElement.dataset.theme = resolvedTheme;
  themeToggle.setAttribute("aria-pressed", resolvedTheme === "dark");
  themeIcon.textContent = resolvedTheme === "dark" ? "☾" : "☀";
  localStorage.setItem("preferredTheme", resolvedTheme);
};

const initTheme = () => {
  const storedTheme = localStorage.getItem("preferredTheme");
  if (storedTheme) {
    setTheme(storedTheme);
    return;
  }
  const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
  setTheme(prefersDark ? "dark" : "light");
};

const initLanguage = async () => {
  const storedLanguage = localStorage.getItem("preferredLanguage");
  const initialLanguage = storedLanguage || detectBrowserLanguage();
  await setLanguage(initialLanguage);
};

languageSelect.addEventListener("change", async (event) => {
  await setLanguage(event.target.value);
});

themeToggle.addEventListener("click", () => {
  const currentTheme = document.documentElement.dataset.theme;
  setTheme(currentTheme === "dark" ? "light" : "dark");
});

document.addEventListener("DOMContentLoaded", async () => {
  const yearElement = document.getElementById("currentYear");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  initTheme();
  await initLanguage();
});
