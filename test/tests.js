module("Creating a Normalization Object", {
    setup: function() {
        normalizer = new Normalizer();
    },

    teardown: function() {
        normalizer = null;
    }
});

    test( "Normalization object created successfully", function() {
        ok( typeof normalizer === "object", "New instance of Normalization object was created" );
    });

    test("Setting instance variables", function() {
        ok(typeof normalizer.dataHigh === 'number', "Data max value set");
        ok(typeof normalizer.dataLow === 'number', "Data min value set");
        ok(typeof normalizer.normalizedHigh === 'number', "Normalized max value set");
        ok(typeof normalizer.normalizedLow === 'number', "Normalized min value set");
        ok(typeof normalizer.classEncodingValue === 'number', "Class Encoding Value set");
    });

module();

module("Normalizing data", {
    setup: function() {
        normalizer = new Normalizer();
    },

    teardown: function() {
        normalizer = null;
    }
});

    test("Normalizing with default data", function() {
        ok(normalizer.normalize(7) === 0.4, "Calculating normalized number was correct!");
    });

module();

module("Denormalizing Data", {
    setup: function() {
        normalizer = new Normalizer();
    },

    teardown: function() {
        normalizer = null;
    }
});

    test("Denormalizing with default data", function() {
        ok(normalizer.denormalize(0.4) === 7, "Denormalize method calculated correct value");
    });

module();

module("One-of-N Encoding", {
    setup: function() {
        normalizer = new Normalizer();
    },

    teardown: function() {
        normalizer = null;
    }
});

    test("Passing in an array of class names should return an array of numeric values", function() {
        var sampleClasses = ['Red', 'Green', 'Blue'],
            normalizedClasses = normalizer.oneOfNEncode(sampleClasses);

        ok(typeof normalizedClasses === 'object', "oneOfNEncode returned an object");

        ok(normalizedClasses.hasOwnProperty('Red') === true, "oneOfNEncode created property on object");
        ok(normalizedClasses.hasOwnProperty('Green') === true, "oneOfNEncode created property on object");
        ok(normalizedClasses.hasOwnProperty('Blue') === true, "oneOfNEncode created property on object");

        for(var i = 0; i < sampleClasses.length; i++) {
            ok(normalizer.validateForArray(normalizedClasses[sampleClasses[i]]), "oneOfNEncode properly encoded arrays");
        }
    });

module();

module("Equilateral Encoding", {
    setup: function() {
        normalizer = new Normalizer();
    },

    teardown: function() {
        normalizer = null;
    }
});

    test("Passing in array of class names should return an object with encoded classes", function() {
        var sampleClasses = ["Red", "Green", "Blue"],
            normalizedClasses = normalizer.equilateralEncode(sampleClasses, sampleClasses.length);

        ok(typeof normalizedClasses === 'object', "equilateralEncode created valid object");

        ok(normalizedClasses.hasOwnProperty("Red") === true, "equilateralEncode object had correct property");
        ok(normalizedClasses.hasOwnProperty("Green") === true,  "equilateralEncode object had correct property");
        ok(normalizedClasses.hasOwnProperty("Blue") === true,  "equilateralEncode object had correct property");
    });

module();

module("Euclidean Distance", {
    setup: function() {
        normalizer = new Normalizer();
    },

    teardown: function() {
        normalizer = null;
    }
});

    test("Passing in expected values as an array and an actual values as as an array will return the distance", function() {
        normalizer = new Normalizer(1, 0, 1, 0);

        var expectedValue = [1, 0, 0, 0, 0, 0, 0],
            actualValue = [0, 0, 0, 1, 0, 1, 0],
            euclideanDistance = normalizer.getEuclideanDistance(expectedValue, actualValue);

        ok(euclideanDistance > 0, "euclideanDistance return valid number");
    });

module();

module("Get shortest Euclidean Distance between sets", {
    setup: function() {
        normalizer = new Normalizer();
    },

    teardown: function() {
        normalizer = null;
    }
});

    test("Passing an array of Equilaterally encoded values returns shortest distance", function() {
        ok(normalizer.getShortestDistance([0.389, 2.478, 1.988, 0.001, 0.99, 1.113, 3.141]) === 0.001,
            "getShortestDistance calculated correct value");
    });

module();

module("Validation Functions", {
    setup: function() {
        normalizer = new Normalizer();
    },

    teardown: function() {
        normalizer = null;
    }
});

    test("Validating number input catches number input as valid", function() {
        ok(normalizer.validateForNumeric(7), "validateForNumeric properly recognized valid input");
    });

    test("Validating number input catches non numeric values as invalid", function() {
        ok(!normalizer.validateForNumeric("7"), "validateForNumeric recognized string input as invalid");
        ok(!normalizer.validateForNumeric({number: 7}), "validateForNumeric recognized object input as invalid");
        ok(!normalizer.validateForNumeric([7]), "validateForNumeric recognized array input as invalid");
        ok(!normalizer.validateForNumeric(), "validateForNumeric recognized undefined input as invalid");
        ok(!normalizer.validateForNumeric(null), "validateForNumeric recognized null input as invalid");
    });

    test("Validating array input catches array input as valid", function() {
        ok(normalizer.validateForArray([42], 'number'), "validateForArray properly recognized valid input");
    });

    test("Validating array input catches non array input as invalid", function() {
        ok(!normalizer.validateForArray("42", 'number'), "validateForNumeric recognized string input as invalid");
        ok(!normalizer.validateForArray(42, 'number'), "validateForNumeric recognized number input as invalid");
        ok(!normalizer.validateForArray({number: 42}, 'number'), "validateForNumeric recognized object input as invalid");
        ok(!normalizer.validateForArray(), "validateForNumeric recognized undefined input as invalid");
        ok(!normalizer.validateForArray(null, 'number'), "validateForNumeric recognized null input as invalid");
    });

module();
