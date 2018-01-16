const expect = require('expect');
var {generateMsg, generateLocationMsg} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var result = generateMsg('naveen', 'mocha testing');
        expect(result).toInclude({
            from: 'naveen',
            text: 'mocha testing'
        })
        expect(result.createdAt).toBeA('number')
    })
})
describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        var geo = generateLocationMsg('naveen', 123, 798);
        expect(geo).toInclude({
            from: 'naveen',
            url: 'https://www.google.com/maps?q=123,798'
        });
        expect(geo.createdAt).toBeA('number');
    })
})