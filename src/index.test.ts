import { expect } from 'chai';

import { cc } from './index';

function test(c, iv, ev) {
    expect(c(iv)).to.deep.equal(ev);
}

describe('import { cc } from ...', () => {
    it('#compose', () => test(cc
            .compose(),
        [1, 2, 3],
        [1, 2, 3]
    ));
    it('#map #compose', () => test(cc
            .map(v => v * 2)
            .compose(),
        [1, 2, 3],
        [2, 4, 6]
    ));
    it('#filter #compose', () => test(cc
            .filter(v => v % 2 === 0)
            .compose(),
        [1, 2, 3],
        [1, 3]
    ));
    it('#each #compose', () => {
        let r = [];
        test(cc
                .each(v => r.push(v))
                .compose(),
            [1, 2, 3],
            r
        );
    });
    it('#reduce #compose', () => {test(cc
                .reduce((res, v) => res + v, 0)
                .compose(),
            [1, 2, 3],
            6
        );
    });
});
