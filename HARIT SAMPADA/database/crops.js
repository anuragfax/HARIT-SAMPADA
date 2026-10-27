const HaritCrops = [
    {
        id: "mustard",
        name: { en: "Mustard (Sarson)", hi: "सरसों" },
        emoji: "🟡",
        category: "oilseed",
        seasons: ["Rabi"],
        waterRequirement: "low",
        budgetRequirement: "low",
        soilSuitability: ["Sandy Loam", "Light Alluvial", "Loam", "Black Soil"],
        suitableZones: [
            "South-Western Semi-Arid Zone",
            "Western Plain Zone",
            "Mid-Western Plain Zone",
            "Central Plain Zone",
            "Bundelkhand Zone",
            "Eastern Plain Zone",
            "Tarai Zone"
        ],
        rainfallRange: { min: 350, max: 900 },
        diversificationValue: 7,
        description: {
            en: "Lucrative oilseed with low water and input demand, highly suited for semi-arid and sandy loam belts.",
            hi: "कम पानी व कम लागत वाली लाभदायक तिलहन फसल, जो अर्ध-शुष्क व दोमट क्षेत्रों के लिए अत्यंत उपयुक्त है।"
        }
    },
    {
        id: "wheat",
        name: { en: "Wheat (Gehun)", hi: "गेहूं" },
        emoji: "🌾",
        category: "cereal",
        seasons: ["Rabi"],
        waterRequirement: "medium",
        budgetRequirement: "medium",
        soilSuitability: ["Loam", "Sandy Loam", "Alluvial", "Clay Loam", "Silt Loam"],
        suitableZones: [
            "Western Plain Zone",
            "Mid-Western Plain Zone",
            "Central Plain Zone",
            "Eastern Plain Zone",
            "North-Eastern Plain Zone",
            "Tarai Zone",
            "South-Western Semi-Arid Zone"
        ],
        rainfallRange: { min: 400, max: 1050 },
        diversificationValue: 3,
        description: {
            en: "Mainstay winter cereal across UP plains with robust yield stability and guaranteed market access.",
            hi: "उत्तर प्रदेश की मुख्य रबी अनाज फसल, जिसमें स्थिर उपज और सुगम बाजार बिक्री की गारंटी रहती है।"
        }
    },
    {
        id: "chickpea",
        name: { en: "Chickpea (Chana)", hi: "चना" },
        emoji: "🟤",
        category: "pulse",
        seasons: ["Rabi"],
        waterRequirement: "low",
        budgetRequirement: "low",
        soilSuitability: ["Mixed Black & Red (Mar/Kabar)", "Black Soil", "Sandy Loam", "Loam", "Red Soil"],
        suitableZones: [
            "Bundelkhand Zone",
            "South-Western Semi-Arid Zone",
            "Central Plain Zone",
            "Vindhyan Zone"
        ],
        rainfallRange: { min: 400, max: 850 },
        diversificationValue: 8,
        description: {
            en: "Hardy pulse crop that fixes atmospheric nitrogen, demanding minimal water and low input expenditure.",
            hi: "मिट्टी में नाइट्रोजन स्थिर करने वाली मजबूत दलहन फसल, जिसे न्यूनतम सिंचाई व कम खर्च की आवश्यकता होती है।"
        }
    },
    {
        id: "lentil",
        name: { en: "Lentil (Masoor)", hi: "मसूर" },
        emoji: "🟠",
        category: "pulse",
        seasons: ["Rabi"],
        waterRequirement: "low",
        budgetRequirement: "low",
        soilSuitability: ["Clay Loam", "Silt Loam", "Alluvial Loam", "Calcareous Alluvial", "Alluvial"],
        suitableZones: [
            "Eastern Plain Zone",
            "Tarai Zone",
            "North-Eastern Plain Zone",
            "Bundelkhand Zone",
            "Central Plain Zone"
        ],
        rainfallRange: { min: 500, max: 1150 },
        diversificationValue: 8,
        description: {
            en: "High-value protein pulse thriving on residual soil moisture in alluvial and clay-loam tracts.",
            hi: "जलोढ़ और मटियार दोमट क्षेत्रों में कम पानी पर बढ़िया पैदावार देने वाली उच्च-मूल्य दलहनी फसल।"
        }
    },
    {
        id: "pea",
        name: { en: "Field Pea (Matar)", hi: "मटर" },
        emoji: "🟢",
        category: "pulse",
        seasons: ["Rabi"],
        waterRequirement: "medium",
        budgetRequirement: "medium",
        soilSuitability: ["Alluvial Loam", "Silt Loam", "Sandy Loam"],
        suitableZones: [
            "Eastern Plain Zone",
            "North-Eastern Plain Zone",
            "Central Plain Zone",
            "Western Plain Zone"
        ],
        rainfallRange: { min: 600, max: 1100 },
        diversificationValue: 6,
        description: {
            en: "Short-duration pulse and cash vegetable delivering quick turnover and enriching soil fertility.",
            hi: "कम अवधि की दलहनी एवं सब्जी फसल, जो किसानों को त्वरित आमदनी देती है और मिट्टी को उपजाऊ बनाती है।"
        }
    },
    {
        id: "potato",
        name: { en: "Potato (Aaloo)", hi: "आलू" },
        emoji: "🥔",
        category: "vegetable",
        seasons: ["Rabi"],
        waterRequirement: "medium",
        budgetRequirement: "high",
        soilSuitability: ["Sandy Loam", "Alluvial Loam", "Light Alluvial", "Ganga Alluvial Loam"],
        suitableZones: [
            "South-Western Semi-Arid Zone",
            "Central Plain Zone",
            "Western Plain Zone",
            "Mid-Western Plain Zone"
        ],
        rainfallRange: { min: 450, max: 850 },
        diversificationValue: 5,
        description: {
            en: "Major commercial cash crop of Western and Central UP with outstanding economic returns per acre.",
            hi: "पश्चिमी व मध्य उत्तर प्रदेश की मुख्य नकदी फसल, जो प्रति एकड़ सर्वाधिक आय प्रदान करने में सक्षम है।"
        }
    },
    {
        id: "barley",
        name: { en: "Barley (Jau)", hi: "जौ" },
        emoji: "🌾",
        category: "cereal",
        seasons: ["Rabi"],
        waterRequirement: "low",
        budgetRequirement: "low",
        soilSuitability: ["Sandy Loam", "Saline/Alkaline", "Light Alluvial", "Red Soil"],
        suitableZones: [
            "South-Western Semi-Arid Zone",
            "Bundelkhand Zone",
            "Central Plain Zone",
            "Vindhyan Zone"
        ],
        rainfallRange: { min: 350, max: 750 },
        diversificationValue: 5,
        description: {
            en: "Resilient coarse grain exceptionally tolerant of drought, low nutrients, and slightly saline soils.",
            hi: "सूखा और हल्की लवणीय मिट्टी को सहन करने वाला मोटा अनाज, जो न्यूनतम लागत में तैयार होता है।"
        }
    },
    {
        id: "pearl_millet",
        name: { en: "Pearl Millet (Bajra)", hi: "बाजरा" },
        emoji: "🌾",
        category: "millet",
        seasons: ["Kharif"],
        waterRequirement: "low",
        budgetRequirement: "low",
        soilSuitability: ["Sandy Loam", "Light Alluvial", "Red & Mixed Black Soil"],
        suitableZones: [
            "South-Western Semi-Arid Zone",
            "Bundelkhand Zone",
            "Western Plain Zone",
            "Central Plain Zone"
        ],
        rainfallRange: { min: 350, max: 750 },
        diversificationValue: 6,
        description: {
            en: "Nutritious climate-smart millet flourishing in semi-arid heat with very low water requirement.",
            hi: "कम पानी व तेज धूप में शानदार पैदावार देने वाला पोषक मोटा अनाज, अर्ध-शुष्क क्षेत्रों हेतु वरदान।"
        }
    },
    {
        id: "sugarcane",
        name: { en: "Sugarcane (Ganna)", hi: "गन्ना" },
        emoji: "🎋",
        category: "commercial",
        seasons: ["Annual", "Rabi", "Kharif"],
        waterRequirement: "high",
        budgetRequirement: "high",
        soilSuitability: ["Alluvial Loam", "Clay Loam", "Deep Alluvial Loam", "Tarai Clay Loam"],
        suitableZones: [
            "Western Plain Zone",
            "Mid-Western Plain Zone",
            "Tarai Zone",
            "North-Eastern Plain Zone"
        ],
        rainfallRange: { min: 800, max: 1300 },
        diversificationValue: 2,
        description: {
            en: "Premier industrial cash crop of UP backed by an extensive sugar mill procurement ecosystem.",
            hi: "उत्तर प्रदेश की प्रमुख व्यावसायिक औद्योगिक फसल, जिसे विशाल चीनी मिल तंत्र का सीधा समर्थन प्राप्त है।"
        }
    },
    {
        id: "rice",
        name: { en: "Paddy (Dhaan)", hi: "धान (चावल)" },
        emoji: "🌾",
        category: "cereal",
        seasons: ["Kharif"],
        waterRequirement: "high",
        budgetRequirement: "medium",
        soilSuitability: ["Clay Loam", "Alluvial Silt Loam", "Calcareous Alluvial", "Tarai Clay Loam"],
        suitableZones: [
            "Tarai Zone",
            "Eastern Plain Zone",
            "North-Eastern Plain Zone",
            "Vindhyan Zone"
        ],
        rainfallRange: { min: 900, max: 1450 },
        diversificationValue: 2,
        description: {
            en: "Essential monsoon staple crop performing best in high rainfall, heavy soils, and canal-fed zones.",
            hi: "भारी वर्षा, गहरी दोमट मिट्टी और नहरी सिंचाई वाले पूर्वी व तराई क्षेत्रों की प्रमुख मानसूनी फसल।"
        }
    },
    {
        id: "maize",
        name: { en: "Maize (Makka)", hi: "मक्का" },
        emoji: "🌽",
        category: "cereal",
        seasons: ["Kharif", "Zaid"],
        waterRequirement: "medium",
        budgetRequirement: "medium",
        soilSuitability: ["Well-drained Loam", "Sandy Loam", "Alluvial Loam"],
        suitableZones: [
            "Western Plain Zone",
            "Central Plain Zone",
            "North-Eastern Plain Zone",
            "Tarai Zone"
        ],
        rainfallRange: { min: 600, max: 1100 },
        diversificationValue: 5,
        description: {
            en: "Fast-growing cereal with strong industrial feed demand and versatile multi-season adaptability.",
            hi: "तेजी से बढ़ने वाला बहुउपयोगी अनाज, जिसकी पोल्ट्री और औद्योगिक क्षेत्र में लगातार भारी मांग रहती है।"
        }
    },
    {
        id: "pigeon_pea",
        name: { en: "Pigeon Pea (Arhar)", hi: "अरहर" },
        emoji: "🟤",
        category: "pulse",
        seasons: ["Kharif"],
        waterRequirement: "medium",
        budgetRequirement: "medium",
        soilSuitability: ["Alluvial Loam", "Sandy Loam", "Black & Red Mixed Soil", "Red Gravelly / Loam"],
        suitableZones: [
            "Central Plain Zone",
            "Bundelkhand Zone",
            "Eastern Plain Zone",
            "Vindhyan Zone"
        ],
        rainfallRange: { min: 600, max: 1000 },
        diversificationValue: 8,
        description: {
            en: "Deep-rooted drought-resistant pulse crop delivering high market rates and deep subsoil aeration.",
            hi: "गहरी जड़ों वाली सूखा-प्रतिरोधी दलहनी फसल, जो बेहतरीन बाजार भाव और भूमि सुधार दोनों देती है।"
        }
    },
    {
        id: "sesame",
        name: { en: "Sesame (Til)", hi: "तिल" },
        emoji: "⚪",
        category: "oilseed",
        seasons: ["Kharif"],
        waterRequirement: "low",
        budgetRequirement: "low",
        soilSuitability: ["Sandy Loam", "Red Soil", "Black & Red Mixed Soil", "Black Soil"],
        suitableZones: [
            "Bundelkhand Zone",
            "Vindhyan Zone",
            "South-Western Semi-Arid Zone"
        ],
        rainfallRange: { min: 400, max: 800 },
        diversificationValue: 8,
        description: {
            en: "Low-input rainfed oilseed excelling in plateau and gravelly terrains where water is scarce.",
            hi: "बुंदेलखंड और विंध्य के पठारी क्षेत्रों के लिए कम लागत वाली अति-उत्तम वर्षा-आधारित तिलहन फसल।"
        }
    },
    {
        id: "sorghum",
        name: { en: "Sorghum (Jowar)", hi: "ज्वार" },
        emoji: "🌾",
        category: "millet",
        seasons: ["Kharif"],
        waterRequirement: "low",
        budgetRequirement: "low",
        soilSuitability: ["Mixed Black & Red Soil", "Sandy Loam", "Black Soil"],
        suitableZones: [
            "Bundelkhand Zone",
            "South-Western Semi-Arid Zone",
            "Vindhyan Zone"
        ],
        rainfallRange: { min: 400, max: 750 },
        diversificationValue: 6,
        description: {
            en: "Dual-purpose drought-hardy millet providing nutritious grain and vital green livestock fodder.",
            hi: "सूखा सहन करने वाला दोहरा उपयोगी मोटा अनाज, जो पौष्टिक अन्न और दुधारू पशुओं को हरा चारा देता है।"
        }
    },
    {
        id: "green_gram",
        name: { en: "Green Gram (Moong)", hi: "मूंग" },
        emoji: "🟢",
        category: "pulse",
        seasons: ["Zaid", "Kharif"],
        waterRequirement: "low",
        budgetRequirement: "low",
        soilSuitability: ["Sandy Loam", "Alluvial Loam", "Ganga Alluvial Loam"],
        suitableZones: [
            "Central Plain Zone",
            "Western Plain Zone",
            "Eastern Plain Zone"
        ],
        rainfallRange: { min: 400, max: 850 },
        diversificationValue: 8,
        description: {
            en: "Rapid 60-day catch crop fitting perfectly between Rabi and Kharif, restoring vital soil nitrogen.",
            hi: "रबी और खरीफ के बीच मात्र 60 दिनों में तैयार होने वाली दलहनी फसल, जो भूमि की उर्वरा शक्ति बढ़ाती है।"
        }
    },
    {
        id: "tomato",
        name: { en: "Tomato (Tamatar)", hi: "टमाटर" },
        emoji: "🍅",
        category: "vegetable",
        seasons: ["Rabi", "Zaid"],
        waterRequirement: "medium",
        budgetRequirement: "medium",
        soilSuitability: ["Alluvial Silt Loam", "Sandy Loam", "Alluvial Loam"],
        suitableZones: [
            "Eastern Plain Zone",
            "Central Plain Zone",
            "Western Plain Zone"
        ],
        rainfallRange: { min: 500, max: 1000 },
        diversificationValue: 5,
        description: {
            en: "Lucrative peri-urban vegetable crop generating steady periodic income for progressive farmers.",
            hi: "नगरीय और सिंचित मंडियों के निकट नियमित नकदी आमदनी देने वाली लोकप्रिय सब्जी फसल।"
        }
    }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = HaritCrops;
}
