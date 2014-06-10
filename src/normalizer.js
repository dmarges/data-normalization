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

        if(classesToNormalize === undefined || classesToNormalize === null) {
            return null;
        }

        if(typeof classesToNormalize !== 'object') {
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

    equilateralEncode: function(classesToNormalize, numberOfSets) {
        var generatedMatrix = this.generateEquilateralMatrix(numberOfSets);

        return this.oneOfNEncode(classesToNormalize);
    },

    generateEquilateralMatrix: function(numberOfSets) {

        var pointValue,
            distanceFormula;
        //We need to construct the matrix, a 2D array
        var matrix = new Array(numberOfSets);
        matrix[0] = new Array(numberOfSets - 1);
        matrix[1] = new Array(numberOfSets - 1);
        matrix[2] = new Array(numberOfSets - 1);

        matrix[0][0] = 0;
        matrix[1][0] = 1;

        for (var setsCounter = 2; setsCounter < numberOfSets; setsCounter++) {
            pointValue = setsCounter;
            distanceFormula = Math.sqrt(pointValue * pointValue - 1.0) / pointValue;
            for (var i = 0; i < setsCounter; i++) {
                for (var j = 0; j < setsCounter - 1; j++) {
                    matrix[i][j] *= distanceFormula;
                }
            }

            pointValue = -1.0 / pointValue;
            for (var i = 0; i < setsCounter; i++) {
                matrix[i][setsCounter - 1] = pointValue;
            }

            for (var i = 0; i < setsCounter - 1; i++) {
                matrix[setsCounter][i] = 0.0;
            }

            matrix[setsCounter][setsCounter - 1] = 1.0;
        }

        for(var row = 0; row < matrix.length; row++) {
            for(var col = 0; col < matrix[row].length; col++) {
                matrix[row][col] = this.normalize(matrix[row][col]);
            }
        }

        return matrix;
    },

    getEuclideanDistance: function(expectedValue, actualValue) {

        if(expectedValue === undefined || expectedValue === null) {
            return null;
        }

        if(actualValue === undefined || actualValue === null) {
            return null;
        }

        //Check if expectedValue a non-array object
        if(typeof expectedValue === 'object' && !expectedValue.hasOwnProperty('length')) {
           return null;
        }

        if(typeof expectedValue === 'string' || typeof expectedValue === 'number') {
            return null;
        }

        //Check if expectedValue a non-array object
        if(typeof actualValue === 'object' && !actualValue.hasOwnProperty('length')) {
            return null;
        }

        if(typeof actualValue === 'string' || typeof actualValue === 'number') {
            return null;
        }

        for(var i = 0; i < expectedValue.length; i++) {

            if(typeof expectedValue[i] !== 'number') {
                return null;
            }
        }

        for(var i = 0; i < actualValue.length; i++) {
            if(typeof actualValue[i] !== 'number') {
                return null;
            }
        }

        var results = 0;

        for(var i = 0; i < expectedValue.length; i++) {
            var difference = expectedValue[i] - actualValue[i];
            results += difference * difference;
        }

        return Math.sqrt(results);
    },

    getShortestDistance: function(distanceValues) {

        if(distanceValues === undefined || distanceValues === null) {
            return null;
        }

        if(typeof distanceValues === 'string' || typeof distanceValues === 'number') {
            return null;
        }

        if(typeof distanceValues === 'object' && !distanceValues.hasOwnProperty('length')) {
            return null;
        }

        var shortestDistance = -1;

        for(var i = 0; i < distanceValues.length; i++) {
            if(shortestDistance < 0) {
                shortestDistance = distanceValues[i];
            }

            if(distanceValues[i] < shortestDistance) {
                shortestDistance = distanceValues[i];
            }
        }

        return shortestDistance;
    }
};