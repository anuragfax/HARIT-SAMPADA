const translations = (typeof HaritTranslations !== "undefined") ? HaritTranslations : {
    en: {},
    hi: {}
};

let currentLanguage = "en";
let currentAnalysisResult = null;
let selectedWater = "low";
let selectedBudget = "low";

function translate(key) {
    if (translations[currentLanguage] && translations[currentLanguage][key] !== undefined) {
        return translations[currentLanguage][key];
    }
    if (translations.en && translations.en[key] !== undefined) {
        return translations.en[key];
    }
    return key;
}

function applyLanguage(language) {
    currentLanguage = language;
    document.documentElement.lang = language === "hi" ? "hi" : "en";

    document.querySelectorAll("[data-i18n]").forEach(element => {
        const key = element.dataset.i18n;
        element.textContent = translate(key);
    });

    document.querySelectorAll("[data-i18n-html]").forEach(element => {
        const key = element.dataset.i18nHtml;
        element.innerHTML = translate(key);
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(element => {
        const key = element.dataset.i18nPlaceholder;
        element.placeholder = translate(key);
    });

    const langBtn = document.getElementById("languageButton");
    if (langBtn) {
        langBtn.textContent = language === "hi" ? "EN" : "हि";
        langBtn.title = language === "hi" ? "Switch to English" : "हिंदी में बदलें";
        langBtn.setAttribute("aria-label", langBtn.title);
    }

    const helpBtn = document.getElementById("helpButton");
    if (helpBtn) {
        helpBtn.title = language === "hi" ? "मदद" : "Help";
        helpBtn.setAttribute("aria-label", helpBtn.title);
    }

    const helpClose = document.getElementById("helpClose");
    if (helpClose) {
        helpClose.title = language === "hi" ? "मदद बंद करें" : "Close Help panel";
        helpClose.setAttribute("aria-label", helpClose.title);
    }

    const settingsBtn = document.getElementById("settingsButton");
    if (settingsBtn) {
        settingsBtn.title = language === "hi" ? "सेटिंग्स" : "Settings";
        settingsBtn.setAttribute("aria-label", settingsBtn.title);
    }

    const aboutBtn = document.getElementById("aboutButton");
    if (aboutBtn) {
        aboutBtn.title = language === "hi" ? "हरित संपदा के बारे में" : "About Harit Sampada";
        aboutBtn.setAttribute("aria-label", aboutBtn.title);
    }

    const aboutClose = document.getElementById("aboutClose");
    if (aboutClose) {
        aboutClose.title = language === "hi" ? "बंद करें" : "Close About panel";
        aboutClose.setAttribute("aria-label", aboutClose.title);
    }

    const themeBtn = document.getElementById("themeButton");
    if (themeBtn) {
        const isDark = document.body.classList.contains("dark-mode");
        const titleKey = isDark ? "themeToggleToLight" : "themeToggleToDark";
        themeBtn.title = translate(titleKey);
        themeBtn.setAttribute("aria-label", translate(titleKey));
    }

    if (currentAnalysisResult) {
        renderAnalysisResult(currentAnalysisResult);
    }
}

const introScreen = document.getElementById("introScreen");
const brand = document.getElementById("brand");
const farmer = document.getElementById("farmer");
const farmerCharacter = document.getElementById("farmerCharacter");
const startScreen = document.getElementById("startScreen");
const loadingScreen = document.getElementById("loadingScreen");
const resultScreen = document.getElementById("resultScreen");
const recommendation = document.getElementById("recommendation");
const landForm = document.getElementById("landForm");
const landCode = document.getElementById("landCode");
const toast = document.getElementById("toast");

window.addEventListener("load", () => {
    setTimeout(() => {
        if (introScreen) introScreen.classList.add("hide");
        if (brand) brand.classList.add("visible");
    }, 2100);
});

function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2800);
}

function renderAnalysisResult(result) {
    if (!result || !result.success) return;

    const district = result.district;
    const lang = currentLanguage;

    const regionVal = document.getElementById("regionValue");
    if (regionVal) regionVal.textContent = district.name[lang] || district.name.en;

    const soilVal = document.getElementById("soilValue");
    if (soilVal) {
        soilVal.textContent = district.soil ? (district.soil[lang] || district.soil.en) : translate("notAvailable");
    }

    const areaVal = document.getElementById("areaValue");
    if (areaVal) {
        if (district.cultivableLand && district.cultivableLand.value !== null) {
            areaVal.textContent = `${district.cultivableLand.value.toLocaleString("en-IN")} ${translate("hectares")}`;
        } else {
            areaVal.textContent = translate("notAvailable");
        }
    }

    const seasonVal = document.getElementById("seasonValue");
    if (seasonVal) seasonVal.textContent = translate("activeSeason");

    const districtHeroName = document.getElementById("districtHeroName");
    if (districtHeroName) {
        districtHeroName.textContent = district.name[lang] || district.name.en;
    }

    const landCodeBadge = document.getElementById("landCodeBadge");
    if (landCodeBadge) landCodeBadge.textContent = result.landCode;

    const zoneBadge = document.getElementById("zoneBadge");
    if (zoneBadge) {
        zoneBadge.textContent = district.agroClimaticZone ? (district.agroClimaticZone[lang] || district.agroClimaticZone.en) : "";
    }

    const cropGrid = document.getElementById("cropGrid");
    if (cropGrid) {
        cropGrid.innerHTML = "";
        const top3 = (result.primaryRecommendations || []).slice(0, 3);
        top3.forEach((rec, index) => {
            const card = createCropCard(rec, index + 1, lang);
            cropGrid.appendChild(card);
        });
    }

    const confidenceBadge = document.getElementById("confidenceBadge");
    if (confidenceBadge) {
        confidenceBadge.className = `confidence-badge confidence-${result.confidence}`;
        if (result.confidence === "high") {
            confidenceBadge.textContent = translate("confidenceHigh");
        } else if (result.confidence === "medium") {
            confidenceBadge.textContent = translate("confidenceMedium");
        } else {
            confidenceBadge.textContent = translate("confidenceLimited");
        }
    }

    const transparencyGrid = document.getElementById("transparencyGrid");
    if (transparencyGrid) {
        const trans = result.transparencyData;
        const waterText = trans.selectedWater === "low" ? translate("lowOption") : (trans.selectedWater === "medium" ? translate("mediumOption") : translate("highOption"));
        const budgetText = trans.selectedBudget === "low" ? translate("lowOption") : (trans.selectedBudget === "medium" ? translate("mediumOption") : translate("highOption"));

        const items = [
            { label: translate("regionLabel"), val: `${trans.districtName[lang] || trans.districtName.en} (${trans.landCode})` },
            { label: translate("landLabel"), val: trans.cultivableLand ? trans.cultivableLand.formatted : translate("notAvailable") },
            { label: translate("soilLabel"), val: trans.soil ? (trans.soil[lang] || trans.soil.en) : translate("notAvailable") },
            { label: translate("rainfall"), val: trans.rainfall ? trans.rainfall : translate("notAvailable") },
            { label: translate("agroZone"), val: trans.agroClimaticZone ? (trans.agroClimaticZone[lang] || trans.agroClimaticZone.en) : translate("notAvailable") },
            { label: `${translate("waterQuestion").split(" ")[0]} / ${translate("budgetQuestion").split(" ")[0]}`, val: `${waterText} / ${budgetText}` }
        ];

        transparencyGrid.innerHTML = items.map(item => `
            <div class="transparency-item">
                <div class="transparency-label">${item.label}</div>
                <div class="transparency-val">${item.val}</div>
            </div>
        `).join("");
    }
}

function createCropCard(rec, rankNumber, lang) {
    const crop = rec.crop;
    const card = document.createElement("div");
    card.className = "crop-card";

    const rank = document.createElement("div");
    rank.className = "rank";
    rank.textContent = `#${rankNumber}`;

    const emoji = document.createElement("div");
    emoji.className = "crop-emoji";
    emoji.textContent = crop.emoji || "🌱";

    const name = document.createElement("div");
    name.className = "crop-name";
    name.textContent = crop.name[lang] || crop.name.en;

    const suitabilityBadge = document.createElement("div");
    suitabilityBadge.className = "suitability-badge";
    suitabilityBadge.textContent = `${rec.score}% ${translate("suitability")}`;

    const tags = document.createElement("div");
    tags.className = "crop-tags";

    const seasonTag = document.createElement("span");
    seasonTag.className = "crop-tag";
    seasonTag.textContent = crop.seasons.join(" / ");
    tags.appendChild(seasonTag);

    const waterTag = document.createElement("span");
    waterTag.className = "crop-tag";
    const waterLabel = crop.waterRequirement === "low" ? translate("lowOption") : (crop.waterRequirement === "medium" ? translate("mediumOption") : translate("highOption"));
    waterTag.textContent = `💧 ${waterLabel}`;
    tags.appendChild(waterTag);

    const catTag = document.createElement("span");
    catTag.className = "crop-tag";
    catTag.textContent = crop.category ? crop.category.toUpperCase() : "CROP";
    tags.appendChild(catTag);

    const reasonsBox = document.createElement("ul");
    reasonsBox.className = "reasons-list";
    const reasons = rec.reasons[lang] || rec.reasons.en;
    reasons.forEach(r => {
        const li = document.createElement("li");
        li.className = "reason-item";
        li.textContent = r;
        reasonsBox.appendChild(li);
    });

    card.appendChild(rank);
    card.appendChild(emoji);
    card.appendChild(name);
    card.appendChild(suitabilityBadge);
    card.appendChild(tags);
    card.appendChild(reasonsBox);

    return card;
}

if (landForm) {
    landForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const rawCode = landCode.value.trim();

        if (!rawCode) {
            showToast(translate("landRequired"));
            return;
        }

        const validation = HaritLandCode.validateAndParse(rawCode, HaritDistricts);

        if (!validation.valid) {
            showToast(translate(validation.errorKey) || validation.message);
            return;
        }

        const result = HaritRecommendationService.getRecommendations(rawCode, {
            water: selectedWater,
            budget: selectedBudget,
            season: "Rabi"
        });

        if (!result.success) {
            showToast(translate(result.errorKey) || result.message);
            return;
        }

        currentAnalysisResult = result;

        startScreen.style.display = "none";
        loadingScreen.classList.add("active");
        farmer.classList.remove("happy");
        farmer.classList.add("move-right");

        setTimeout(() => {
            loadingScreen.classList.remove("active");
            resultScreen.classList.add("active");
            recommendation.classList.add("active");

            farmer.classList.add("happy");

            renderAnalysisResult(currentAnalysisResult);

            if (validation.district.requiresVerification) {
                showToast(translate("requiresVerificationNote"));
            }
        }, 1800);
    });
}

document.querySelectorAll(".option").forEach(button => {
    button.addEventListener("click", () => {
        const type = button.dataset.type;
        const val = button.dataset.value;

        document.querySelectorAll(`.option[data-type="${type}"]`).forEach(option => {
            option.classList.remove("selected");
        });

        button.classList.add("selected");

        if (type === "water") {
            selectedWater = val;
            showToast(translate("waterUpdated"));
        } else if (type === "budget") {
            selectedBudget = val;
            showToast(translate("budgetUpdated"));
        }

        if (currentAnalysisResult && currentAnalysisResult.landCode) {
            const updated = HaritRecommendationService.getRecommendations(currentAnalysisResult.landCode, {
                water: selectedWater,
                budget: selectedBudget,
                season: "Rabi"
            });
            if (updated.success) {
                currentAnalysisResult = updated;
                renderAnalysisResult(currentAnalysisResult);
            }
        }
    });
});

const newSearchBtn = document.getElementById("newSearch");
if (newSearchBtn) {
    newSearchBtn.addEventListener("click", () => {
        resultScreen.classList.remove("active");
        recommendation.classList.remove("active");
        loadingScreen.classList.remove("active");

        startScreen.style.display = "block";
        landCode.value = "";
        currentAnalysisResult = null;

        const districtHero = document.getElementById("districtHeroName");
        if (districtHero) districtHero.textContent = "—";

        farmer.classList.remove("move-center", "move-right", "happy");
        updateFarmerTheme();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

const cropPlanBtn = document.getElementById("cropPlanButton");
if (cropPlanBtn) {
    cropPlanBtn.addEventListener("click", () => {
        showToast(translate("cropPlanMessage"));
    });
}

const themeBtn = document.getElementById("themeButton");
if (themeBtn) {
    themeBtn.addEventListener("click", () => {
        const isCurrentlyDark = document.body.classList.contains("dark-mode");
        setTheme(isCurrentlyDark ? "bright" : "dark", true);
    });
}

const langBtn = document.getElementById("languageButton");
if (langBtn) {
    langBtn.addEventListener("click", () => {
        if (currentLanguage === "en") {
            applyLanguage("hi");
            showToast("हिंदी भाषा चुनी गई।");
        } else {
            applyLanguage("en");
            showToast("English language selected.");
        }
    });
}

const settingsBtn = document.getElementById("settingsButton");
if (settingsBtn) {
    settingsBtn.addEventListener("click", () => {
        showToast(translate("settingsMessage"));
    });
}

const aboutModal = document.getElementById("aboutModal");
const aboutButton = document.getElementById("aboutButton");
const aboutClose = document.getElementById("aboutClose");
const helpModal = document.getElementById("helpModal");
const helpButton = document.getElementById("helpButton");
const helpClose = document.getElementById("helpClose");

function closeAboutModal() {
    if (aboutModal) {
        aboutModal.classList.remove("open");
        aboutModal.setAttribute("aria-hidden", "true");
    }
}

if (aboutButton) {
    aboutButton.addEventListener("click", () => {
        if (aboutModal) {
            aboutModal.classList.add("open");
            aboutModal.setAttribute("aria-hidden", "false");
            if (aboutClose) aboutClose.focus();
        }
    });
}

if (aboutClose) {
    aboutClose.addEventListener("click", closeAboutModal);
}

if (aboutModal) {
    aboutModal.addEventListener("click", event => {
        if (event.target === aboutModal) {
            closeAboutModal();
        }
    });
}

function closeHelpModal() {
    if (helpModal) {
        helpModal.classList.remove("open");
        helpModal.setAttribute("aria-hidden", "true");
    }
}

if (helpButton) {
    helpButton.addEventListener("click", () => {
        if (helpModal) {
            helpModal.classList.add("open");
            helpModal.setAttribute("aria-hidden", "false");
            if (helpClose) helpClose.focus();
        }
    });
}

if (helpClose) {
    helpClose.addEventListener("click", closeHelpModal);
}

if (helpModal) {
    helpModal.addEventListener("click", event => {
        if (event.target === helpModal) {
            closeHelpModal();
        }
    });
}

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        if (aboutModal && aboutModal.classList.contains("open")) {
            closeAboutModal();
            if (aboutButton) aboutButton.focus();
        }
        if (helpModal && helpModal.classList.contains("open")) {
            closeHelpModal();
            if (helpButton) helpButton.focus();
        }
    }
});

if (landCode) {
    landCode.addEventListener("keydown", event => {
        if (event.key === "Enter") {
            landForm.requestSubmit();
        }
    });

    landCode.addEventListener("input", function () {
        this.value = this.value.toUpperCase();
    });
}

const THEME_STORAGE_KEY = "harit_sampada_theme";

function initStars() {
    const starsContainer = document.getElementById("starsContainer");
    if (!starsContainer || starsContainer.children.length > 0) return;

    const starCount = 42;
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement("div");
        star.className = "star";

        const top = Math.random() * 52 + 2;
        const left = Math.random() * 96 + 2;
        const size = (Math.random() * 2 + 1.2).toFixed(1);
        const duration = (Math.random() * 2.5 + 2.2).toFixed(2);
        const delay = (Math.random() * 3.5).toFixed(2);

        star.style.top = `${top}%`;
        star.style.left = `${left}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.animationDuration = `${duration}s`;
        star.style.animationDelay = `${delay}s`;

        fragment.appendChild(star);
    }

    starsContainer.appendChild(fragment);
}

function updateFarmerTheme() {
    if (!farmerCharacter) return;
    const isDark = document.body.classList.contains("dark-mode");

    if (isDark) {
        farmerCharacter.src = "assets/sleepy farmer.png";
        farmerCharacter.alt = "Sleepy Indian farmer resting under the night sky";
        farmerCharacter.classList.add("sleepy");
    } else {
        farmerCharacter.src = "assets/sad farmer.png";
        farmerCharacter.alt = "Sad Indian farmer waiting for crop recommendations";
        farmerCharacter.classList.remove("sleepy");
    }
}

function setTheme(theme, showNotification = false) {
    const isDark = (theme === "dark");

    if (isDark) {
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
    }

    try {
        localStorage.setItem(THEME_STORAGE_KEY, isDark ? "dark" : "bright");
    } catch (e) { }

    const themeBtn = document.getElementById("themeButton");
    if (themeBtn) {
        themeBtn.textContent = isDark ? "☀️" : "🌙";
        const titleKey = isDark ? "themeToggleToLight" : "themeToggleToDark";
        themeBtn.title = translate(titleKey);
        themeBtn.setAttribute("aria-label", translate(titleKey));
    }

    updateFarmerTheme();

    if (showNotification) {
        const toastKey = isDark ? "themeToastDark" : "themeToastLight";
        showToast(translate(toastKey));
    }
}

initStars();
let savedTheme = "bright";
try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "dark" || stored === "bright") {
        savedTheme = stored;
    }
} catch (e) {
    savedTheme = "bright";
}

setTheme(savedTheme, false);

applyLanguage("en");

