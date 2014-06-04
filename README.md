# Javascript Data Normalization Library

This is a library for normalizing and denormalizing ranges of numbers. This is useful for things like Neural Networks
since the numbers used for input data must be scaled properly.

# Usage
```javascript

//To normalize a number
var dataTopRange = 10,
    dataBottomRange = 1,
    normalizeTopRange = 1,
    normalizeBottomRange = 0;
    
var normalizer = new Normalizer(dataTopRange, dataBottomRange, normalizeTopRange, normalizeBottomRange);
var normalizedNumber = normalizer.normalize(7); //0.333

//To denormalize a number
var denormalizedNumber = normalizer.denormalize(normalizedNumber); //7
```