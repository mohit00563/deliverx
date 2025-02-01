// utils.js

const calculateSmartPricing = (basePrice, urgency, distance) => {
    let surgeMultiplier = 1;
    if (urgency === 'high') surgeMultiplier = 1.5;
    if (distance > 10) surgeMultiplier += 0.2; // Increase cost for longer distances

    return basePrice * surgeMultiplier;
};

module.exports = { calculateSmartPricing };
