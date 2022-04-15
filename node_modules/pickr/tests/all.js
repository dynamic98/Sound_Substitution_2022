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

describe('all', function() {
    it('should return an array of results', function() {
        var result = pickr.all(sampleData, 'staff.name');
        expect(result).to.be.an('array');
        expect(result).to.be.deep.equal([
            'Spence Sears',
            'England Brennan',
            'Waller Kidd',
            'Myra Sharp',
            'Holloway Barry',
        ]);
    });

    it('should parse string inputs into JSON', function() {
        var result = pickr.all(JSON.stringify(sampleData), 'staff.name');
        expect(result).to.be.an('array');
        expect(result).to.be.deep.equal([
            'Spence Sears',
            'England Brennan',
            'Waller Kidd',
            'Myra Sharp',
            'Holloway Barry',
        ]);
    });

    it('should remove results that does not contain the attribute', function() {
        var result = pickr.all(sampleData, 'staff.company');
        expect(result).to.be.an('array');
        expect(result).to.be.deep.equal([
            'Earthwax',
            'Geekol',
            'Powernet',
            'Gronk',
        ]);
    });

    it('should return an empty array when the attribute is not found', function() {
        var result = pickr.all(sampleData, 'staff.inexistentAttribute');
        expect(result).to.be.an('array');
        expect(result).to.be.empty;
    });

    it('should return an the default value when required', function() {
        var result = pickr.all(sampleData, 'staff.inexistentAttribute', 'SOME_DEFAULT');
        expect(result).to.be.equal('SOME_DEFAULT');
    });

    it('should concatenate arrays in a plain resultset', function() {
        var result = pickr.all(nestedArrays, 'staff.name');
        expect(result).to.be.an('array');
        expect(result).to.be.deep.equal([
            "Flores Morrison",
            "Noreen Burns",
            "Esperanza Rodgers",
            "Fisher Dotson",
            "Guerra Snyder",
            "Moreno Baird"
        ]);
    });

    it('should return an array of results from instance', function() {
        var result = pickr(sampleData).all('staff.name');
        expect(result).to.be.an('array');
        expect(result).to.be.deep.equal([
            'Spence Sears',
            'England Brennan',
            'Waller Kidd',
            'Myra Sharp',
            'Holloway Barry',
        ]);
    });
});
