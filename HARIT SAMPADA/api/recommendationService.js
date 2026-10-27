const HaritRecommendationService = {
    getRecommendations(rawLandCode, options = {}) {
        const landCodeResult = (typeof HaritLandCode !== "undefined" ? HaritLandCode : require("./landCode"))
            .validateAndParse(rawLandCode, typeof HaritDistricts !== "undefined" ? HaritDistricts : require("../database/districts"));

        if (!landCodeResult.valid) {
            return {
                success: false,
                errorKey: landCodeResult.errorKey,
                message: landCodeResult.message,
                rawInput: rawLandCode
            };
        }

        const district = landCodeResult.district;
        const preferences = {
            water: options.water || "low",
            budget: options.budget || "low",
            season: options.season || "Rabi"
        };

        const scoringEngine = typeof HaritCropScoring !== "undefined" ? HaritCropScoring : require("./cropScoring");
        const cropsList = typeof HaritCrops !== "undefined" ? HaritCrops : require("../database/crops");
        const scoredCrops = scoringEngine.analyzeSuitability(district, cropsList, preferences);

        let missingCount = 0;
        if (!district.cultivableLand || district.cultivableLand.value === null) missingCount++;
        if (!district.soil) missingCount++;
        if (!district.rainfall) missingCount++;
        if (district.requiresVerification) missingCount++;

        let confidence = "high";
        if (missingCount >= 2) {
            confidence = "limited";
        } else if (missingCount >= 1) {
            confidence = "medium";
        }

        const primaryRecommendations = scoredCrops.slice(0, 3);
        const alternativeRecommendations = scoredCrops.slice(3, 5);

        const transparencyData = {
            districtName: district.name,
            code: district.code,
            landCode: `UP-${district.code}`,
            stateCode: "UP",
            cultivableLand: district.cultivableLand && district.cultivableLand.value !== null
                ? {
                    formatted: district.cultivableLand.value.toLocaleString("en-IN") + " ha",
                    value: district.cultivableLand.value,
                    unit: "hectare"
                }
                : null,
            soil: district.soil,
            rainfall: district.rainfall ? `${district.rainfall} mm` : null,
            agroClimaticZone: district.agroClimaticZone,
            majorCrops: district.majorCrops,
            selectedWater: preferences.water,
            selectedBudget: preferences.budget,
            activeSeason: preferences.season,
            requiresVerification: Boolean(district.requiresVerification)
        };

        return {
            success: true,
            landCode: `UP-${district.code}`,
            district,
            confidence,
            primaryRecommendations,
            alternativeRecommendations,
            transparencyData,
            preferences
        };
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = HaritRecommendationService;
}
