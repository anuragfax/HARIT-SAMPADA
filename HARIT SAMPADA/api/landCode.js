const HaritLandCode = {
    cleanInput(rawInput) {
        if (!rawInput) return "";
        return rawInput.trim().toUpperCase().replace(/\s*-\s*/g, "-");
    },

    validateAndParse(rawInput, districtsList) {
        if (!rawInput || !rawInput.trim()) {
            return {
                valid: false,
                errorKey: "landRequired",
                message: "Please enter your land code."
            };
        }

        const cleaned = this.cleanInput(rawInput);

        const regex = /^([A-Z]{2})-([0-9]{3})$/;
        const match = cleaned.match(regex);

        if (!match) {
            return {
                valid: false,
                errorKey: "invalidLandCodeFormat",
                message: "Please enter a valid UP district Land Code, for example UP-140.",
                rawInput: cleaned
            };
        }

        const stateCode = match[1];
        const districtCode = match[2];

        if (stateCode !== "UP") {
            return {
                valid: false,
                errorKey: "stateNotSupported",
                message: "Currently Harit Sampada supports Uttar Pradesh (UP-XXX codes).",
                stateCode
            };
        }

        const list = districtsList || (typeof HaritDistricts !== "undefined" ? HaritDistricts : []);
        const matchingDistricts = list.filter(d => d.code === districtCode);

        if (matchingDistricts.length === 0) {
            return {
                valid: false,
                errorKey: "districtNotFound",
                message: `District code ${districtCode} not found in Uttar Pradesh Census dataset.`,
                districtCode
            };
        }

        const district = matchingDistricts[0];

        return {
            valid: true,
            normalizedCode: `UP-${districtCode}`,
            stateCode,
            districtCode,
            district,
            allMatches: matchingDistricts
        };
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = HaritLandCode;
}
