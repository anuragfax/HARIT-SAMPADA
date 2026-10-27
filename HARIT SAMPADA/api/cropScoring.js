const HaritCropScoring = {
    analyzeSuitability(district, cropsList, preferences = {}) {
        const water = preferences.water || "low";
        const budget = preferences.budget || "low";
        const activeSeason = preferences.season || "Rabi";
        const crops = cropsList || (typeof HaritCrops !== "undefined" ? HaritCrops : []);

        const results = crops.map(crop => {
            let score = 32;
            const reasonsEn = [];
            const reasonsHi = [];

            if (district.majorCrops && district.majorCrops.includes(crop.id)) {
                const cropIndex = district.majorCrops.indexOf(crop.id);
                const prominenceBonus = Math.max(10, 18 - (cropIndex * 2));
                score += prominenceBonus;
                reasonsEn.push(`Proven cultivation history and strong market presence in ${district.name.en}.`);
                reasonsHi.push(`${district.name.hi} में सफल उत्पादन और स्थापित बाजार का मजबूत इतिहास।`);
            }

            if (district.agroClimaticZone && crop.suitableZones) {
                const zoneMatch = crop.suitableZones.some(z =>
                    district.agroClimaticZone.en.toLowerCase().includes(z.toLowerCase()) ||
                    z.toLowerCase().includes(district.agroClimaticZone.en.toLowerCase())
                );
                if (zoneMatch) {
                    score += 12;
                    reasonsEn.push(`Naturally suited to the ${district.agroClimaticZone.en}.`);
                    reasonsHi.push(`${district.agroClimaticZone.hi} की जलवायु के लिए पूरी तरह अनुकूल।`);
                }
            }

            if (district.soil && district.soil.en && crop.soilSuitability) {
                const districtSoilLower = district.soil.en.toLowerCase();
                const soilMatch = crop.soilSuitability.some(s =>
                    districtSoilLower.includes(s.toLowerCase()) || s.toLowerCase().includes("alluvial") && districtSoilLower.includes("alluvial")
                );
                if (soilMatch) {
                    score += 10;
                    reasonsEn.push(`Well-suited for the local ${district.soil.en} soil conditions.`);
                    reasonsHi.push(`स्थानीय ${district.soil.hi} मिट्टी की संरचना के लिए अत्यधिक उपयुक्त।`);
                }
            }

            const cropWater = crop.waterRequirement;
            if (water === cropWater) {
                score += 10;
                if (water === "low") {
                    reasonsEn.push("Requires minimal irrigation, ideal for your low water availability.");
                    reasonsHi.push("कम पानी की जरूरत, आपकी सीमित जल उपलब्धता के सर्वथा अनुकूल।");
                } else if (water === "medium") {
                    reasonsEn.push("Matches your moderate water availability with stable moisture needs.");
                    reasonsHi.push("आपकी मध्यम जल उपलब्धता के अनुसार संतुलित सिंचाई आवश्यकता।");
                } else {
                    reasonsEn.push("Fully utilizes high water/irrigation facilities for optimal output.");
                    reasonsHi.push("प्रचुर जल व नहरी सिंचाई सुविधा का अधिकतम लाभ उठाने में सक्षम।");
                }
            } else if (cropWater === "low" && (water === "medium" || water === "high")) {
                score += 8;
                reasonsEn.push("Drought-hardy crop that grows comfortably with available moisture.");
                reasonsHi.push("सूखा-प्रतिरोधी फसल जो उपलब्ध जल में आसानी से पूर्ण पैदावार देती है।");
            } else if (cropWater === "medium" && water === "high") {
                score += 6;
            } else if (cropWater === "medium" && water === "low") {
                score -= 10;
            } else if (cropWater === "high" && water === "medium") {
                score -= 8;
            } else if (cropWater === "high" && water === "low") {
                score -= 24;
            }

            const cropBudget = crop.budgetRequirement;
            if (budget === cropBudget) {
                score += 8;
                if (budget === "low") {
                    reasonsEn.push("Low input investment requirement fits your economical budget.");
                    reasonsHi.push("न्यूनतम बीज व खाद लागत, आपके कम बजट में आसानी से उपयुक्त।");
                } else if (budget === "high") {
                    reasonsEn.push("Capital-intensive cash crop capable of maximizing commercial returns.");
                    reasonsHi.push("सघन पूंजी वाली नकदी फसल जो अधिकतम व्यावसायिक मुनाफा दे सकती है।");
                }
            } else if (cropBudget === "low" && (budget === "medium" || budget === "high")) {
                score += 6;
            } else if (cropBudget === "medium" && budget === "low") {
                score -= 6;
            } else if (cropBudget === "high" && budget === "low") {
                score -= 16;
            }

            if (district.rainfall && crop.rainfallRange) {
                if (district.rainfall >= crop.rainfallRange.min && district.rainfall <= crop.rainfallRange.max) {
                    score += 6;
                }
            }

            if (crop.diversificationValue >= 6) {
                score += Math.min(crop.diversificationValue, 7);
                if (crop.category === "pulse") {
                    reasonsEn.push("High pulse diversification value: fixes soil nitrogen and commands premium market rates.");
                    reasonsHi.push("उच्च दलहन मूल्य: भूमि में नाइट्रोजन बढ़ाकर उर्वरता बढ़ाती है और बेहतर बाजार भाव देती है।");
                } else if (crop.category === "oilseed") {
                    reasonsEn.push("High oilseed diversification value: helps reduce import dependency with strong local demand.");
                    reasonsHi.push("उच्च तिलहन मूल्य: स्थानीय तेल मिलों में मजबूत मांग और अच्छी आय का स्रोत।");
                } else if (crop.category === "millet") {
                    reasonsEn.push("Nutri-cereal millet: climate-resilient with high nutritional value.");
                    reasonsHi.push("पोषक मोटा अनाज: जलवायु अनुकूल एवं उच्च पोषण से भरपूर।");
                }
            }

            const isSeasonMatch = crop.seasons.includes(activeSeason) || crop.seasons.includes("Annual");
            if (isSeasonMatch) {
                score += 6;
            } else {
                score -= 14;
            }

            const finalScore = Math.min(96, Math.max(15, Math.round(score)));

            if (reasonsEn.length < 2) {
                reasonsEn.push(`Compatible with the regional cropping pattern in ${district.name.en}.`);
                reasonsHi.push(`${district.name.hi} के क्षेत्रीय फसल चक्र के अनुसार उपयुक्त।`);
            }

            return {
                crop,
                score: finalScore,
                reasons: {
                    en: reasonsEn,
                    hi: reasonsHi
                }
            };
        });

        results.sort((a, b) => b.score - a.score);

        return results;
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = HaritCropScoring;
}
