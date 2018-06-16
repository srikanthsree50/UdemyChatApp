var expect = require('expect');

const {isRealString} = require('./validation');

describe('isRealString',() => {

    it('should reject non string values',() => {
var res = isRealString(98);
expect(res).toBe(false)
    });

    it('should reject string with spaces',() => {
        var res = isRealString('    ');
        expect(res).toBe(false)
            });

            it('should allow  string values only',() => {
                var res = isRealString(' srikanth ');
                expect(res).toBe(true)
                    });
});