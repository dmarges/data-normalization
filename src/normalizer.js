function Normalizer(dataHigh, dataLow, normalizedHigh, normalizedLow, classEncodingValue) {
    this.dataHigh = dataHigh || 10;
    this.dataLow = dataLow || 0;
    this.normalizedHigh = normalizedHigh || 1;
    this.normalizedLow = normalizedLow || -1;
    this.classEncodingValue = classEncodingValue || 0;
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
    },

    oneOfNEncode: function(classesToNormalize) {

        if(classesToNormalize === undefined) {
            return null;
        }

        if(typeof classesToNormalize !== 'object') {
            return null;
        }

        if(classesToNormalize === null) {
            return null;
        }

        for(var i = 0; i < classesToNormalize.length; i++) {

            if(typeof classesToNormalize[i] !== 'string') {
                return null;
            }
        }

        var encodedClasses = {};

        for(var i = 0; i < classesToNormalize.length; i++) {
            encodedClasses[classesToNormalize[i]] = new Array(classesToNormalize.length);


            for(var j = 0; j < encodedClasses[classesToNormalize[i]].length; j++) {
                encodedClasses[classesToNormalize[i]][j] = 0;
            }

            encodedClasses[classesToNormalize[i]][i] = 1;
        }
        return encodedClasses;
    },

    equilateralEncode: function(classesToNormalize) {
        var encodedClasses = {};

        for(var i = 0; i < classesToNormalize.length; i++) {
            encodedClasses[classesToNormalize[i]] = new Array(classesToNormalize.length);


            for(var j = 0; j < encodedClasses[classesToNormalize[i]].length; j++) {
                encodedClasses[classesToNormalize[i]][j] = 0;
            }

            encodedClasses[classesToNormalize[i]][i] = 1;
        }
        return encodedClasses;
    },

    getEuclideanDistance: function(expectedValue, actualValue) {
        var results = 0;

        for(var i = 0; i < expectedValue.length; i++) {
            var difference = expectedValue[i] - actualValue[i];
            results += difference * difference;
        }

        var squaredResults = Math.sqrt(results);

        return this.normalize(squaredResults);
    }
};