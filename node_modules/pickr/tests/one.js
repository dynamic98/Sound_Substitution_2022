var chai = require('chai');
var expect = chai.expect;
var pickr = require('../index');

chai.Assertion.includeStack = true;

var sampleData = {
    'staff': [{
        "id": 0,
        "name": "Spence Sears",
        "gender": "male",
        "company": "Earthwax"
    }, {
        "id": 1,
        "name": "England Brennan",
        "gender": "male",
        "company": "Geekol"
    }, {
        "id": 2,
        "name": "Waller Kidd",
        "gender": "male",
        "company": "Powernet"
    }, {
        "id": 3,
        "name": "Myra Sharp",
        "gender": "female",
        "company": "Gronk"
    }, {
        "id": 4,
        "name": "Holloway Barry",
        "gender": "male",
    }]
};

var nestedArrays = [{
    'staff': [{
        "id": 0,
        "name": "Flores Morrison",
        "gender": "male",
        "company": "Zaggle"
    }, {
        "id": 1,
        "name": "Noreen Burns",
        "gender": "female",
        "company": "Senmei"
    }, {
        "id": 2,
        "name": "Esperanza Rodgers",
        "gender": "female",
        "company": "Oceanica"
    }]
}, {
    staff: [{
        "id": 0,
        "fullName": "Fisher Dotson",
        "gender": "male",
        "company": "Comstar"
    }, {
        "id": 1,
        "fullName": "Guerra Snyder",
        "gender": "male",
        "company": "Cytrak"
    }, {
        "id": 2,
        "fullName": "Moreno Baird",
        "gender": "male",
        "company": "Sportan"
    }]
}];

describe('one', function() {
    it('should return the first entry', function() {
        var result = pickr.one(sampleData, 'staff.name');
        expect(result).to.be.deep.equal('Spence Sears');
    });

    it('should parse string inputs into JSON', function() {
        var result = pickr.one(JSON.stringify(sampleData), 'staff.name');
        expect(result).to.be.deep.equal('Spence Sears');
    });

    it('should return undefined when the attribute is not found', function() {
        var result = pickr.one(sampleData, 'staff.inexistentAttribute');
        expect(result).to.be.undefined;
    });

    it('should return an the default value when required', function() {
        var result = pickr.one(sampleData, 'staff.inexistentAttribute', 'SOME_DEFAULT');
        expect(result).to.be.equal('SOME_DEFAULT');
    });

    it('should fetch first element with the attribute', function() {
        var result = pickr.one(nestedArrays, 'staff.fullName');
        expect(result).to.be.deep.equal("Fisher Dotson");
    });

    it('should return the first entry from instance', function() {
        var result = pickr(sampleData).one('staff.name');
        expect(result).to.be.deep.equal('Spence Sears');
    });
});
