const districts = require('../database/districts');
const crops = require('../database/crops');
const landCodeUtil = require('../api/landCode');
const scoring = require('../api/cropScoring');
const recService = require('../api/recommendationService');

console.log('=== TESTING HARIT SAMPADA DATA & RECOMMENDATION PIPELINE ===');

const testCodes = [
    'UP-140',
    'UP-146',
    'UP-143',
    'UP-178',
    'UP-137',
    'UP-153',
    'UP-197',
    'UP-179',
    'up-140',
    '  UP - 140 '
];

testCodes.forEach(code => {
    const res = recService.getRecommendations(code, { water: 'low', budget: 'low' });
    if (!res.success) {
        console.error('FAILED for:', code, res.message);
        return;
    }
    console.log('\n--------------------------------------------------');
    console.log('Input:', code, '=> District:', res.district.name.en, `(${res.district.name.hi})`);
    console.log('Census Code:', res.district.code, '| Zone:', res.district.agroClimaticZone.en);
    console.log('Cultivable Land:', res.transparencyData.cultivableLand ? res.transparencyData.cultivableLand.formatted : 'null (Not Reported)');
    console.log('Data Confidence:', res.confidence);
    console.log('Top Recommendations:');
    res.primaryRecommendations.forEach((r, idx) => {
        console.log(`  #${idx + 1}: ${r.crop.name.en} | Score: ${r.score}% | Water: ${r.crop.waterRequirement} | Budget: ${r.crop.budgetRequirement}`);
        console.log(`      EN Reason: ${r.reasons.en[0]}`);
        console.log(`      HI Reason: ${r.reasons.hi[0]}`);
    });
    console.log('Alternatives (Rank 4 & 5):');
    res.alternativeRecommendations.forEach((r, idx) => {
        console.log(`  #${idx + 4}: ${r.crop.name.en} | Score: ${r.score}%`);
    });
});

console.log('\n=== TESTING USER PREFERENCES SENSITIVITY (UP-140) ===');
const lowWaterRes = recService.getRecommendations('UP-140', { water: 'low', budget: 'low' });
const highWaterRes = recService.getRecommendations('UP-140', { water: 'high', budget: 'high' });
console.log('UP-140 (Low Water, Low Budget) Top 3:', lowWaterRes.primaryRecommendations.map(r => `${r.crop.name.en} (${r.score}%)`).join(', '));
console.log('UP-140 (High Water, High Budget) Top 3:', highWaterRes.primaryRecommendations.map(r => `${r.crop.name.en} (${r.score}%)`).join(', '));

console.log('\n=== TESTING INVALID & EDGE CASE INPUTS ===');
const invalidCases = ['140', 'UP140', 'ABC-140', 'UP-XYZ', 'UP-999', '', '   '];
invalidCases.forEach(code => {
    const res = recService.getRecommendations(code);
    console.log(`Input: "${code}" => Valid: ${res.success} | Error: ${res.errorKey}`);
});

console.log('\n=== ALL TESTS COMPLETED ===');