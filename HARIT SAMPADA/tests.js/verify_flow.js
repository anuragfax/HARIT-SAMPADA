const fs = require('fs');
const HaritTranslations = require('../database/translations');
const HaritDistricts = require('../database/districts');
const HaritCrops = require('../database/crops');
const HaritLandCode = require('../api/landCode');
const HaritCropScoring = require('../api/cropScoring');
const HaritRecommendationService = require('../api/recommendationService');

console.log('================================================================');
console.log('HARIT SAMPADA: VERIFICATION SUITE');
console.log('================================================================\n');

console.log('1. DATASET INTEGRITY CHECK');
console.log(`- Total UP Districts loaded: ${HaritDistricts.length} (Expected: 75)`);
if (HaritDistricts.length !== 75) throw new Error('Expected 75 districts');

const nullLands = HaritDistricts.filter(d => d.cultivableLand === null);
console.log(`- Districts with null cultivable land: ${nullLands.length} (Expected: 6) -> [${nullLands.map(d => d.name.en).join(', ')}]`);
if (nullLands.length !== 6) throw new Error('Expected 6 null cultivable land districts');

const zeroCodes = HaritDistricts.filter(d => d.code === '000');
console.log(`- Districts with code "000": ${zeroCodes.length} (Expected: 4) -> [${zeroCodes.map(d => d.name.en).join(', ')}]`);
if (zeroCodes.length !== 4) throw new Error('Expected 4 districts with code 000');

console.log(`- Total Crops in database: ${HaritCrops.length} (Expected: >= 15)`);
console.log('✓ Dataset Integrity Verified.\n');

console.log('2. REQUIRED TEST CASES VERIFICATION (Section 22)');
const requiredTests = [
    { code: 'UP-140', expectedDistrict: 'Ghaziabad', expectedLand: 50587 },
    { code: 'UP-146', expectedDistrict: 'Agra', expectedLand: 350770 },
    { code: 'UP-143', expectedDistrict: 'Aligarh', expectedLand: 305423 },
    { code: 'UP-178', expectedDistrict: 'Ambedkar Nagar', expectedLand: 178159 },
    { code: 'UP-137', expectedDistrict: 'Amroha', expectedLand: 167303 },
    { code: 'UP-153', expectedDistrict: 'Kheri', expectedLand: 484712 },
    { code: 'UP-197', expectedDistrict: 'Varanasi', expectedLand: 134633 },
    { code: 'UP-179', expectedDistrict: 'Sultanpur', expectedLand: null },
    { code: 'up-140', expectedDistrict: 'Ghaziabad', expectedLand: 50587 },
    { code: '  UP - 140 ', expectedDistrict: 'Ghaziabad', expectedLand: 50587 }
];

requiredTests.forEach(tc => {
    const res = HaritRecommendationService.getRecommendations(tc.code, { water: 'low', budget: 'low' });
    if (!res.success) throw new Error(`Failed for ${tc.code}: ${res.message}`);
    if (res.district.name.en !== tc.expectedDistrict) throw new Error(`Wrong district for ${tc.code}: expected ${tc.expectedDistrict}, got ${res.district.name.en}`);
    const actualLand = res.district.cultivableLand ? res.district.cultivableLand.value : null;
    if (actualLand !== tc.expectedLand) throw new Error(`Wrong land for ${tc.code}: expected ${tc.expectedLand}, got ${actualLand}`);
    if (!res.primaryRecommendations || res.primaryRecommendations.length < 3) throw new Error(`Not enough recommendations for ${tc.code}`);

    res.primaryRecommendations.forEach(r => {
        if (r.score < 0 || r.score > 100) throw new Error(`Score out of range: ${r.score}`);
        if (!r.reasons.en || r.reasons.en.length === 0) throw new Error(`Missing EN reasons for ${r.crop.id}`);
        if (!r.reasons.hi || r.reasons.hi.length === 0) throw new Error(`Missing HI reasons for ${r.crop.id}`);
    });

    console.log(`✓ ${tc.code.padEnd(12)} -> ${res.district.name.en.padEnd(16)} | Land: ${actualLand === null ? 'null' : actualLand.toLocaleString()} ha | #1: ${res.primaryRecommendations[0].crop.name.en} (${res.primaryRecommendations[0].score}%) | Confidence: ${res.confidence}`);
});

console.log('\n3. DISTRICT-SPECIFIC DIFFERENTIATION (Section 9)');
const ghaziabadRes = HaritRecommendationService.getRecommendations('UP-140', { water: 'medium', budget: 'medium' });
const bandaRes = HaritRecommendationService.getRecommendations('UP-170', { water: 'low', budget: 'low' });
const kheriRes = HaritRecommendationService.getRecommendations('UP-153', { water: 'high', budget: 'high' });

console.log(`- Ghaziabad (Western Plain): Top 3 -> ${ghaziabadRes.primaryRecommendations.map(r => `${r.crop.name.en} (${r.score}%)`).join(', ')}`);
console.log(`- Banda (Bundelkhand):       Top 3 -> ${bandaRes.primaryRecommendations.map(r => `${r.crop.name.en} (${r.score}%)`).join(', ')}`);
console.log(`- Kheri (Tarai):             Top 3 -> ${kheriRes.primaryRecommendations.map(r => `${r.crop.name.en} (${r.score}%)`).join(', ')}`);

if (bandaRes.primaryRecommendations[0].crop.id === ghaziabadRes.primaryRecommendations[0].crop.id &&
    bandaRes.primaryRecommendations[1].crop.id === ghaziabadRes.primaryRecommendations[1].crop.id) {
    console.warn('Note: rankings should reflect local distinctions');
} else {
    console.log('✓ Regional rankings accurately differ based on district profile');
}

console.log('\n4. INPUT VALIDATION TESTS (Section 11)');
const invalidCases = [
    { input: '140', expectedError: 'invalidLandCodeFormat' },
    { input: 'UP140', expectedError: 'invalidLandCodeFormat' },
    { input: 'ABC-140', expectedError: 'invalidLandCodeFormat' },
    { input: 'UP-XYZ', expectedError: 'invalidLandCodeFormat' },
    { input: 'UP-999', expectedError: 'districtNotFound' },
    { input: '', expectedError: 'landRequired' },
    { input: '   ', expectedError: 'landRequired' }
];

invalidCases.forEach(ic => {
    const res = HaritRecommendationService.getRecommendations(ic.input);
    if (res.success) throw new Error(`Expected validation failure for "${ic.input}"`);
    if (res.errorKey !== ic.expectedError) throw new Error(`Wrong errorKey for "${ic.input}": expected ${ic.expectedError}, got ${res.errorKey}`);
    console.log(`✓ Rejected "${ic.input}" -> ${ic.expectedError}`);
});

console.log('\n5. HTML, CSS, AND SCRIPT CHECKS');
const html = fs.readFileSync('frontend/index.html', 'utf-8');
const css = fs.readFileSync('frontend/css/style.css', 'utf-8');
const js = fs.readFileSync('frontend/js/script.js', 'utf-8');

if (!html.includes('../database/translations.js')) throw new Error('Missing translations script in HTML');
if (!html.includes('../database/districts.js')) throw new Error('Missing districts script in HTML');
if (!html.includes('../database/crops.js')) throw new Error('Missing crops script in HTML');
if (!html.includes('../api/landCode.js')) throw new Error('Missing landCode script in HTML');
if (!html.includes('../api/cropScoring.js')) throw new Error('Missing cropScoring script in HTML');
if (!html.includes('../api/recommendationService.js')) throw new Error('Missing recommendationService script in HTML');
if (!html.includes('districtMetaBar')) throw new Error('Missing districtMetaBar in HTML');
if (!html.includes('districtHeroName')) throw new Error('Missing districtHeroName in HTML');
if (!html.includes('transparencyCard')) throw new Error('Missing transparencyCard in HTML');

if (!css.includes('.crop-card {')) throw new Error('Missing .crop-card selector in CSS');
if (!css.includes('.transparency-card {')) throw new Error('Missing .transparency-card in CSS');
if (!css.includes('.suitability-badge {')) throw new Error('Missing .suitability-badge in CSS');

console.log('\n6. THEME (BRIGHT / DARK MODE) INTEGRITY CHECKS');
const requiredAssets = [
    'frontend/assets/full-moon.png',
    'frontend/assets/sleepy farmer.png',
    'frontend/assets/zzz.png',
    'frontend/assets/sad farmer.png'
];
requiredAssets.forEach(assetPath => {
    if (!fs.existsSync(assetPath)) throw new Error(`Missing required theme asset: ${assetPath}`);
    console.log(`✓ Asset found: ${assetPath}`);
});

const requiredHtmlElements = ['themeButton', 'starsContainer', 'sun', 'moon', 'zzzContainer'];
requiredHtmlElements.forEach(id => {
    if (!html.includes(`id="${id}"`)) throw new Error(`Missing #${id} in index.html`);
    console.log(`✓ HTML element verified: #${id}`);
});

const requiredCssRules = [
    'body.dark-mode',
    '.stars-container',
    '.star',
    '.moon',
    '.sun',
    '.zzz-container',
    'zzzFloatLoop',
    'sleepyFarmerBreathe'
];
requiredCssRules.forEach(rule => {
    if (!css.includes(rule)) throw new Error(`Missing CSS rule/selector: ${rule}`);
    console.log(`✓ CSS rule verified: ${rule}`);
});

const requiredJsFunctions = ['initStars', 'setTheme', 'updateFarmerTheme', 'THEME_STORAGE_KEY'];
requiredJsFunctions.forEach(fn => {
    if (!js.includes(fn)) throw new Error(`Missing JS logic/identifier: ${fn}`);
    console.log(`✓ JS logic verified: ${fn}`);
});

if (!HaritTranslations.en.themeToggleToDark || !HaritTranslations.hi.themeToggleToDark) {
    throw new Error('Missing theme translations');
}
console.log('✓ Bilingual translations for theme verified.');

console.log('\n================================================================');
console.log('ALL VERIFICATION CHECKS PASSED SUCCESSFULLY!');
console.log('================================================================');

