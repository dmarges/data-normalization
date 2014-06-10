function Normalizer(dataHigh, dataLow, normalizedHigh, normalizedLow, classEncodingValue) {
    this.dataHigh = dataHigh || 10;
    this.dataLow = dataLow || 0;
    this.normalizedHigh = normalizedHigh || 1;
    this.normalizedLow = normalizedLow || -1;
    this.classEncodingValue = classEncodingValue || 0;
}

Normalizer.prototype = {
    normalize: function(numberToNormalize) {

        if(!this.validateForNumeric(numberToNormalize)) {
            return null;
        }

        var numberToNormalizeAfterSubtraction = numberToNormalize - this.dataLow,
            dataRangeDifference = this.dataHigh - this.dataLow,
            normalizedRangeDifference = this.normalizedHigh - this.normalizedLow,
            calculatedNormalizedNumber = ((numberToNormalizeAfterSubtraction * normalizedRangeDifference) / dataRangeDifference) + this.normalizedLow;

        return parseFloat(calculatedNormalizedNumber.toFixed(3));
    },

    denormalize: function(numberToDenormalize) {

        if(!this.validateForNumeric(numberToDenormalize)) {
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

        if(!this.validateForArray(classesToNormalize, 'string')) {
            return null;
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

        if(!this.validateForArray(expectedValue, 'number') || !this.validateForArray(actualValue, 'number')) {
            return -1;
        }

        var results = 0;

        for(var i = 0; i < expectedValue.length; i++) {
            var difference = expectedValue[i] - actualValue[i];
            results += difference * difference;
        }

        return Math.sqrt(results);
    },

    getShortestDistance: function(distanceValues) {

        if(!this.validateForArray(distanceValues)) {
            return -1;
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
    },

    validateForNumeric: function(value) {
        if(typeof value !== 'number') {
            return false;
        }

        return true;
    },

    validateForArray: function(value, type) {
        var valueIsArray = value instanceof Array;

        type = type || 'number';

        if(!valueIsArray) {
            return false;
        } else {
            for(var i = 0; i < value.length; i++) {

                if(typeof value[i] !== type) {
                    return false;
                }
            }
        }

        return true;
    }
};