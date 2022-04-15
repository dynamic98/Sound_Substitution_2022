var chai = require('chai');
var expect = chai.expect;
var pickr = require('../index');

chai.Assertion.includeStack = true;

describe('exists', function() {
    it('should return false if path does not exist', function() {
        var result = pickr.exists({
            name: 'Spence Sears',
        }, 'nopath');

        expect(result).to.be.false;
    });

    it('should return true if simple path exists', function() {
        var result = pickr.exists({
            name: 'Spence Sears',
        }, 'name');

        expect(result).to.be.true;
    });

    it('should return true if path exists deeply into object', function() {
        var result = pickr.exists({
            staff: {
                name: 'Spence Sears',
            }
        }, 'staff.name');

        expect(result).to.be.true;
    });

    it('should return true if path is on object with arrays as values', function() {
        var result = pickr.exists({
            staff: [{
                name: 'Spence Sears',
            }, {
                name: 'England Brennan',
            }, ]
        }, 'staff.name');

        expect(result).to.be.true;
    });

    it('should return true when context is an array of objects with path', function() {
        var contextAsArray = [{
            name: 'Flores Morrison',
        }, {
            name: 'Noreen Burns',
        }, {
            name: 'Esperanza Rodgers',
        }];

        var result = pickr.exists(contextAsArray, 'name');

        expect(result).to.be.true;
    });

    it('should return true when context is an array of objects or arrays', function() {
        var nestedArrays = [{
            staff: [{
                name: 'Flores Morrison',
            }, {
                name: 'Noreen Burns',
            }, {
                name: 'Esperanza Rodgers',
            }]
        }, {
            staff: [{
                name: 'Fisher Dotson',
            }, {
                name: 'Guerra Snyder',
            }, {
                name: 'Moreno Baird',
            }]
        }];

        var result = pickr.exists(nestedArrays, 'staff.name');

        expect(result).to.be.true;
    });
});
