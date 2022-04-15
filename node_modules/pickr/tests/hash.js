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
        "name": "Fisher Dotson",
        "gender": "male",
        "company": "Comstar"
    }, {
        "id": 1,
        "name": "Guerra Snyder",
        "gender": "male",
        "company": "Cytrak"
    }, {
        "id": 2,
        "name": "Moreno Baird",
        "gender": "male",
        "company": "Sportan"
    }]
}];

describe('hash', function() {
    it('should return an hash of results', function() {
        var result = pickr.hash(sampleData, 'staff.company', 'staff.name');
        expect(result).to.be.an('object');
        expect(result).to.be.deep.equal({
            'Earthwax': 'Spence Sears',
            'Geekol': 'England Brennan',
            'Powernet': 'Waller Kidd',
            'Gronk': 'Myra Sharp',
        });
    });

    it('should parse string inputs into JSON', function() {
        var result = pickr.hash(JSON.stringify(sampleData), 'staff.company', 'staff.name');
        expect(result).to.be.an('object');
        expect(result).to.be.deep.equal({
            'Earthwax': 'Spence Sears',
            'Geekol': 'England Brennan',
            'Powernet': 'Waller Kidd',
            'Gronk': 'Myra Sharp',
        });
    });

    it('should return an empty object when no keys are found', function() {
        var result = pickr.hash(sampleData, 'staff.inexistentAttribute', 'staff.name');
        expect(result).to.be.an('object');
        expect(result).to.be.empty;
    });

    it('should return an hash of results from instance', function() {
        var result = pickr(sampleData).hash('staff.company', 'staff.name');
        expect(result).to.be.an('object');
        expect(result).to.be.deep.equal({
            'Earthwax': 'Spence Sears',
            'Geekol': 'England Brennan',
            'Powernet': 'Waller Kidd',
            'Gronk': 'Myra Sharp',
        });
    });
});
