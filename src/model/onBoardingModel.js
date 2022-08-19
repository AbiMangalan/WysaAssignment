const mongoose = require('mongoose');

const userOnboardingSchema = new mongoose.Schema({
    nickName: String,
    changeAfterImprovedSleep: { 
        type: [String],
        enum: []
    },

}, { timestamps: true });

module.exports = mongoose.model('onboardingData', userOnboardingSchema);