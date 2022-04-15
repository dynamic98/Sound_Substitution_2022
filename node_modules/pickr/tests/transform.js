var chai = require('chai');
var expect = chai.expect;
var pickr = require('../index');

chai.Assertion.includeStack = true;

function size(value) {
    return value.length;
}

describe('transform', function() {
    it('should apply function to object attribute', function() {
        var result = pickr.transform({
            "name": "Spence Sears",
        }, 'name', size);

        expect(result).to.be.an('object');
        expect(result).to.be.deep.equal({
            "name": 12,
        });
    });

    it('should apply function to deep object attribute', function() {
        var result = pickr.transform({
            'staff': {
                "name": "Spence Sears",
            }
        }, 'staff.name', size);

        expect(result).to.be.an('object');
        expect(result).to.be.deep.equal({
            'staff': {
                "name": 12,
            }
        });
    });

    it('should apply function when context is an object with arrays as value', function() {
        var result = pickr.transform({
            'staff': [{
                "name": "Spence Sears",
            }, {
                "name": "England Brennan",
            }, ]
        }, 'staff.name', size);

        expect(result).to.be.an('object');
        expect(result).to.be.deep.equal({
            'staff': [{
                "name": 12,
            }, {
                "name": 15,
            }, ]
        });
    });

    it('should apply function when context is an array of objects with path', function() {
        var contextAsArray = [{
            "name": "Flores Morrison",
        }, {
            "name": "Noreen Burns",
        }, {
            "name": "Esperanza Rodgers",
        }];

        var result = pickr.transform(contextAsArray, 'name', size);

        expect(result).to.be.an('array');
        expect(result).to.be.deep.equal([{
            "name": 15,
        }, {
            "name": 12,
        }, {
            "name": 17,
        }]);
    });

    it('should apply function when context is an array of objects or arrays', function() {
        var nestedArrays = [{
            'staff': [{
                "name": "Flores Morrison",
            }, {
                "name": "Noreen Burns",
            }, {
                "name": "Esperanza Rodgers",
            }]
        }, {
            staff: [{
                "name": "Fisher Dotson",
            }, {
                "name": "Guerra Snyder",
            }, {
                "name": "Moreno Baird",
            }]
        }];

        var result = pickr.transform(nestedArrays, 'staff.name', size);

        expect(result).to.be.an('array');
        expect(result).to.be.deep.equal([{
            'staff': [{
                "name": 15,
            }, {
                "name": 12,
            }, {
                "name": 17,
            }]
        }, {
            staff: [{
                "name": 13,
            }, {
                "name": 13,
            }, {
                "name": 12,
            }]
        }]);
    });
});
