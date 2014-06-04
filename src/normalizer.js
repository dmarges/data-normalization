function Normalizer(dataHigh, dataLow, normalizedHigh, normalizedLow) {
    this.dataHigh = dataHigh || 10;
    this.dataLow = dataLow || 0;
    this.normalizedHigh = normalizedHigh || 1;
    this.normalizedLow = normalizedLow || -1;
}

Normalizer.prototype = {
    normalize: function(numberToNormalize) {

        if(numberToNormalize === undefined || numberToNormalize === null) {
            return null;
        }

        if(typeof numberToNormalize === 'object') {
            return null;
        }

        if(typeof numberToNormalize === 'string') {
            numberToNormalize = parseFloat(numberToNormalize);
        }

        var numberToNormalizeAfterSubtraction = numberToNormalize - this.dataLow,
            dataRangeDifference = this.dataHigh - this.dataLow,
            normalizedRangeDifference = this.normalizedHigh - this.normalizedLow,
            calculatedNormalizedNumber = ((numberToNormalizeAfterSubtraction * normalizedRangeDifference) / dataRangeDifference) + this.normalizedLow;

        return parseFloat(calculatedNormalizedNumber.toFixed(3));
    },

    denormalize: function(numberToDenormalize) {

        if(numberToDenormalize === undefined || numberToDenormalize === null) {
            return null;
        }

        if(typeof numberToDenormalize === 'string') {
            numberToDenormalize = parseFloat(numberToDenormalize);
        }

        if(typeof numberToDenormalize === 'object') {
            return null;
        }

        var dataRangeDifference = this.dataLow - this.dataHigh,
            productOfNormalizedHighAndDataLow = this.normalizedHigh * this.dataLow,
            productOfDataHighAndNormalizedLow = this.dataHigh * this.normalizedLow,
            normalizedRangeDifference = this.normalizedLow - this.normalizedHigh,
            calculatedDenormalizedNumber = ((dataRangeDifference * numberToDenormalize) - productOfNormalizedHighAndDataLow + productOfDataHighAndNormalizedLow) / normalizedRangeDifference;

        return Math.round(calculatedDenormalizedNumber);
    }

};