module("Creating a Normalization Object");

test( "Normalization object created successfully", function() {
    var normalizer = new Normalizer();
    ok( typeof normalizer === "object", "Passed!" );
});

test("Setting instance variables", function() {
    var normalizer = new Normalizer(10, 0, 1, -1, -1);
    ok(normalizer.dataHigh === 10, "Passed!");
    ok(normalizer.dataLow === 0, "Passed!");
    ok(normalizer.normalizedHigh === 1, "Passed!");
    ok(normalizer.normalizedLow === -1, "Passed!");
    ok(normalizer.classEncodingValue === -1, "Passed!");
});

test("Setting instance variables with no input parameters", function() {
    var normalizer = new Normalizer();
    ok(normalizer.dataHigh === 10, "Passed!");
    ok(normalizer.dataLow === 0, "Passed!");
    ok(normalizer.normalizedHigh === 1, "Passed!");
    ok(normalizer.normalizedLow === -1, "Passed!");
    ok(normalizer.classEncodingValue === 0, "Passed!");
});

module("Normalizing data");

test("Normalizing with default data", function() {
    var normalizer = new Normalizer(),
        sampleNormalizedNumber = normalizer.normalize(7);

    ok(sampleNormalizedNumber === 0.40, "Passed!");
});

test("Normalizing with input parameters passed into Normalizer object", function() {
    var normalizer = new Normalizer(10, 1, 1, 0),
        sampleNormalizedNumber = normalizer.normalize(7);

    console.log(sampleNormalizedNumber);
    ok(sampleNormalizedNumber === 0.333, "Passed!");
});

test("Trying to normalize with no input number", function() {
    var normalizer = new Normalizer(),
        sampleNormalizedNumber = normalizer.normalize();

    ok(sampleNormalizedNumber === null, "Passed!");
});

test("Normalizing number passed in as string", function() {
    var normalizer = new Normalizer(),
        sampleNormalizedNumber = normalizer.normalize("7");

    ok(sampleNormalizedNumber === 0.40, "Passed!");
});

test("Trying to normalize with object passed in", function() {
    var normalizer = new Normalizer(),
        sampleNormalizedNumber = normalizer.normalize({"number": 7});

    ok(sampleNormalizedNumber === null, "Passed!");
});

test("Trying to normalize with null passed in", function() {
    var normalizer = new Normalizer(),
        sampleNormalizedNumber = normalizer.normalize(null);

    ok(sampleNormalizedNumber === null, "Passed!");
});

module("Denormalizing Data");

test("Denormalizing with default data", function() {
    var normalizer = new Normalizer(),
        sampleNumberToDenormalize = 0.4,
        denormalizedNumber = normalizer.denormalize(sampleNumberToDenormalize);

    ok(denormalizedNumber === 7, "Passed!");
});

test("Denormalizing number with input parameters passed into Normalizer object", function() {
    var normalizer = new Normalizer(10, 1, 1, 0),
        sampleNumberToDenormalize = 0.333,
        denormalizedNumber = normalizer.denormalize(sampleNumberToDenormalize);

    ok(denormalizedNumber === 7, "Passed!");
});

test("Tyring to denormalize with no input number", function() {
   var normalizer = new Normalizer(),
       denormalizedNumber = normalizer.denormalize();

    ok(denormalizedNumber === null, "Passed!");
});

test("Denormalizing number passed in as string", function() {
    var normalizer = new Normalizer(),
        sampleDenormalizedNumber = normalizer.denormalize("0.40");

    ok(sampleDenormalizedNumber === 7, "Passed!");
});

test("Trying to denormalize number with object passed in", function() {
    var normalizer = new Normalizer(),
        sampleDenormalizedNumber = normalizer.denormalize({number: 7});

    ok(sampleDenormalizedNumber === null, "Passed!");
});

test("Trying to denormalize number with null passed in", function() {
    var normalizer = new Normalizer(),
        sampleDenormalizedNumber = normalizer.denormalize({number: 7});

    ok(sampleDenormalizedNumber === null, "Passed!");
});

module("One-of-N Encoding");

test("Passing in an array of class names should return an array of numeric values", function() {
    var normalizer = new Normalizer(),
        sampleClasses = ['Red', 'Green', 'Blue'],
        normalizedClasses = normalizer.oneOfNEncode(sampleClasses);

    ok(typeof normalizedClasses === 'object', "Passed!");

    ok(normalizedClasses.hasOwnProperty('Red') === true, "Passed!");
    ok(normalizedClasses.hasOwnProperty('Green') === true, "Passed!");
    ok(normalizedClasses.hasOwnProperty('Blue') === true, "Passed!");

    ok(normalizedClasses[sampleClasses[0]][0] === 1, "Passed!");
    ok(normalizedClasses[sampleClasses[0]][1] === 0, "Passed!");
    ok(normalizedClasses[sampleClasses[0]][2] === 0, "Passed!");

    ok(normalizedClasses[sampleClasses[1]][0] === 0, "Passed!");
    ok(normalizedClasses[sampleClasses[1]][1] === 1, "Passed!");
    ok(normalizedClasses[sampleClasses[1]][2] === 0, "Passed!");

    ok(normalizedClasses[sampleClasses[2]][0] === 0, "Passed!");
    ok(normalizedClasses[sampleClasses[2]][1] === 0, "Passed!");
    ok(normalizedClasses[sampleClasses[2]][2] === 1, "Passed!");
});

test("Passing in nothing should return null", function() {
    var normalizer = new Normalizer(),
        normalizedClasses = normalizer.oneOfNEncode();

    ok(normalizedClasses === null, "Passed!");
});

test("Passing in anything else other than an array (object type in JS) should return null", function() {
    var normalizer = new Normalizer(),
        normalizedClasses = normalizer.oneOfNEncode('hello');

    ok(normalizedClasses === null, "Passed!");

    normalizedClasses = normalizer.oneOfNEncode(10);

    ok(normalizedClasses === null, "Passed!");

    normalizedClasses = normalizer.oneOfNEncode(null);

    ok(normalizedClasses === null, "Passed!");
});

test("Passing in array of numbers should return null", function() {
    var normalizer = new Normalizer(),
        sampleClasses = [0, 0, 0];
        normalizedClasses = normalizer.oneOfNEncode(sampleClasses);

    ok(normalizedClasses === null, "Passed!");
});