
const zones = {

    "UP-KNP-ALV-01": {

        region: "Ghaziabad",
        soil: "Alluvial",
        area: "2.5 Acres",
        season: "Rabi",

        crops: [

            {
                name: "Sarson",
                emoji: "🌼",
                score: 91,
                tags: [
                    "Kam Paani",
                    "Kam Lagat"
                ],
                reason:
                    "Alluvial soil, Rabi season aur low water availability ke saath achha match."
            },

            {
                name: "Chana",
                emoji: "🌱",
                score: 87,
                tags: [
                    "Kam Paani",
                    "Low Cost"
                ],
                reason:
                    "Low water requirement aur relatively low cultivation cost."
            },

            {
                name: "Gehu",
                emoji: "🌾",
                score: 82,
                tags: [
                    "Stable",
                    "Popular"
                ],
                reason:
                    "Region aur season ke liye suitable, lekin comparatively zyada water requirement."
            }

        ]

    }

};

const introScreen =
    document.getElementById("introScreen");

const brand =
    document.getElementById("brand");

const farmer =
    document.getElementById("farmer");

const farmerCharacter =
    document.getElementById("farmerCharacter");

const startScreen =
    document.getElementById("startScreen");

const loadingScreen =
    document.getElementById("loadingScreen");

const resultScreen =
    document.getElementById("resultScreen");

const recommendation =
    document.getElementById("recommendation");

const landForm =
    document.getElementById("landForm");

const landCode =
    document.getElementById("landCode");

const cropGrid =
    document.getElementById("cropGrid");

const toast =
    document.getElementById("toast");

window.addEventListener(
    "load",
    () => {

        setTimeout(
            () => {

                introScreen.classList.add("hide");

                brand.classList.add("visible");

            },
            2100
        );

    }
);

function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(
        () => {
            toast.classList.remove("show");
        },
        2800
    );

}

landForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();

        const code =
            landCode.value
                .trim()
                .toUpperCase();

        if (!code) {

            showToast(
                "Please apna land code enter karein."
            );

            return;
        }

        if (!zones[code]) {

            showToast(
                "Land code nahi mila. Demo ke liye UP-KNP-ALV-01 try karein."
            );

            return;
        }

        startScreen.style.display =
            "none";

        loadingScreen.classList.add(
            "active"
        );

        farmer.classList.add(
            "move-right"
        );

        setTimeout(
            () => {

                loadingScreen.classList.remove(
                    "active"
                );

                resultScreen.classList.add(
                    "active"
                );

                loadZone(
                    zones[code]
                );

            },
            2200
        );

    }
);

function loadZone(zone) {

    document.getElementById(
        "regionValue"
    ).textContent =
        zone.region;

    document.getElementById(
        "soilValue"
    ).textContent =
        zone.soil;

    document.getElementById(
        "areaValue"
    ).textContent =
        zone.area;

    document.getElementById(
        "seasonValue"
    ).textContent =
        zone.season;

    setTimeout(
        () => {

            recommendation.classList.add(
                "active"
            );

            farmerCharacter.alt =
                "Indian farmer with crop recommendations";

            farmer.classList.add(
                "happy"
            );

            renderCrops(
                zone.crops
            );

        },
        500
    );

}

function renderCrops(crops) {

    cropGrid.innerHTML = "";

    crops.forEach(
        (crop, index) => {

            const card =
                document.createElement(
                    "div"
                );

            card.className =
                "crop-card";

            card.innerHTML = `

                        <div class="rank">
                            ${index + 1}
                        </div>

                        <div class="crop-emoji">
                            ${crop.emoji}
                        </div>

                        <div class="crop-name">
                            ${crop.name}
                        </div>

                        <div class="crop-score">
                            ${crop.score}% Suitable
                        </div>

                        <div class="crop-tags">

                            ${crop.tags.map(
                tag => `
                                    <span class="crop-tag">
                                        ${tag}
                                    </span>
                                `
            ).join("")}

                        </div>

                        <p class="reason">
                            ${crop.reason}
                        </p>

                    `;

            cropGrid.appendChild(
                card
            );

        }
    );

}

document.querySelectorAll(
    ".option"
).forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                const type =
                    button.dataset.type;

                document
                    .querySelectorAll(
                        `.option[data-type="${type}"]`
                    )
                    .forEach(
                        option => {
                            option.classList.remove(
                                "selected"
                            );
                        }
                    );

                button.classList.add(
                    "selected"
                );

                showToast(
                    `${type === "water" ? "Paani" : "Budget"} update ho gaya.`
                );

            }
        );

    }
);

document.getElementById(
    "newSearch"
).addEventListener(
    "click",
    () => {

        resultScreen.classList.remove(
            "active"
        );

        recommendation.classList.remove(
            "active"
        );

        loadingScreen.classList.remove(
            "active"
        );

        startScreen.style.display =
            "block";

        landCode.value = "";

        farmer.classList.remove(
            "move-center",
            "move-right",
            "happy"
        );

        farmerCharacter.src =
            "assets/sad farmer.png";

        farmerCharacter.alt =
             "Sad Indian farmer waiting for crop recommendations";

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);

document.getElementById(
    "cropPlanButton"
).addEventListener(
    "click",
    () => {

        showToast(
            "Crop Plan is our future integration."
        );

    }
);

document.getElementById(
    "languageButton"
).addEventListener(
    "click",
    function () {

        if (
            this.textContent.trim() === "EN"
        ) {

            this.textContent = "\u0939\u093f";

            showToast(
                "Hindi mode selected."
            );

        } else {

            this.textContent = "EN";

            showToast(
                "English mode selected."
            );

        }

    }
);

document.getElementById(
    "helpButton"
).addEventListener(
    "click",
    () => {

        showToast(
            "Land code enter karein aur Fasal Batayein par click karein."
        );

    }
);

document.getElementById(
    "settingsButton"
).addEventListener(
    "click",
    () => {

        showToast(
            "Settings module â€” language, accessibility aur display options."
        );

    }
);

landCode.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Enter"
        ) {

            landForm.requestSubmit();

        }

    }
);

landCode.addEventListener(
    "input",
    function () {

        this.value =
            this.value
                .toUpperCase();

    }
);


