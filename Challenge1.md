# Wysa Assignment Challenge 1

```js

const router = require('express').Router();
const mongoose = require('mongoose');
const dataSchema = new mongoose.Schema({
    nickName: String,
    changeAfterImprovedSleep: { 
        type: [String],
        enum: ['I would go to sleep easily',
               'I would sleep through the night',
               `I'd wake up on time, refreshed`]
    },
    issueSince: {
        type: String,
        enum: ['Less than 2 weeks',
               '2 to 8 weeks',
               'More than 8 weeks']
    },
    bedTime: Date,
    wakeTime: Date,
    sleepHours: Number,
    sleepEfficiency: Number
}, { timestamps: true });
const dataModel = mongoose.model('onboardingData', dataSchema);

router.post('/onboarding',async function(req, res, next) {
    try{
        const {nickName, changeAfterImprovedSleep, issueSince, bedTime, wakeTime, sleepHours} = req.body;
        let errors = [];
        const nickNameInUse = await dataModel.findOne({nickName});
        if(nickNameInUse) {
            errors.push('Nick name has been taken');
        }
        const bedHours =(wakeTime.getTime() - sleepHours.getTime()) / 1000;
        bedHours /= (60 * 60);
        bedHours = Math. abs(Math. round(bedHours));
        const sleepEfficiency =   Math.round(sleepHours/bedHours) * 100;
        await dataModel.create({nickName, changeAfterImprovedSleep, issueSince, bedTime, wakeTime, sleepHours, sleepEfficiency});
        return res.status(201).send({status: true, message: "Onboarding completed", data : {sleepEfficiency}};
    } catch(err) {
        return res.status(500).send({"status": false, "message": err.message});
    }
});

module.exports = router;
