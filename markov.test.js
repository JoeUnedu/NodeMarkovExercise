/** Command-line tool to generate Markov text. */

const { MarkovMachine } = require('./markov');

describe("test MarkovMachine",
    function () {

        test("test MarkovMachine",
            function () {

                let mm = new MarkovMachine("the cat in the hat");
                expect(mm.wordChains).toEqual(
                    { "the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null] });
                // test random index function
                expect(mm.getRandomIdx(0)).toEqual(0);
                expect(mm.getRandomIdx(5)).toBeLessThan(5);
                expect(mm.getRandomIdx(5)).toBeGreaterThanOrEqual(0);

            }
        );

        test("test makeText with a 2-word max",
            function () {

                let mm = new MarkovMachine("the cat hat");
                expect(mm.wordChains).toEqual(
                    { "the": ["cat"], "cat": ["hat"], "hat": [null] });
                // test random index function
                expect(mm.getRandomIdx(0)).toEqual(0);
                expect(mm.getRandomIdx(5)).toBeLessThan(5);
                expect(mm.getRandomIdx(5)).toBeGreaterThanOrEqual(0);

                // test word cut-off
                wordTest = mm.makeText(2);
                // console.log(`1: ${wordTest}`);
                expect(["the cat", "cat hat", "hat"]).toContain(wordTest);

                wordTest = mm.makeText(2);
                // console.log(`2: ${wordTest}`);
                expect(["the cat", "cat hat", "hat"]).toContain(wordTest);

                wordTest = mm.makeText(2);
                // console.log(`3: ${wordTest}`);
                expect(["the cat", "cat hat", "hat"]).toContain(wordTest);

                wordTest = mm.makeText(2);
                // console.log(`4: ${wordTest}`);
                expect(["the cat", "cat hat", "hat"]).toContain(wordTest);

                wordTest = mm.makeText(2);
                // console.log(`5: ${wordTest}`);
                expect(["the cat", "cat hat", "hat"]).toContain(wordTest);

            }
        );

    }
);
