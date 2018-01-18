var {isRealStr} = require('./validation');
var expect = require('expect');

describe('isRealStr', () => {
    it('should reject non-string values', () => {
        var res = isRealStr(1111)
        expect(res).toBe(false)
    })
    it('should reject string with only spacess', () => {
        var res = isRealStr('    ')
        expect(res).toBe(false)
    })
    it('should allow string with non-space characters', () => {
        var res = isRealStr('naveen')
        expect(res).toBe(true)
    })
})