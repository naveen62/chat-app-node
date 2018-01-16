const expect = require('expect');
var {generateMsg} = require('./message');

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