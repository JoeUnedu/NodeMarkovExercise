/** Textual markov chain generator */

class MarkovMachine {
  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter((c) => c !== "");
    // this.makeChains();
    this.wordChains = this.makeChains();
  }

  makeChains() {
    const outChain = {};
    if (this.words.length > 1) {
      let prev = this.words[0];
      outChain[prev] = [];
      for (let word of this.words.slice(1)) {
        outChain[prev].push(word);
        prev = word;
        if (outChain[prev] === undefined) {
          outChain[prev] = [];
        }
      }

      outChain[prev].push(null);
    } else {
      if (this.words.length === 1) {
        outChain[this.words[0]] = [null];
      }
    }

    return outChain;
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    // Get all the keys in the wordChains object
    const wordChainKeys = Object.keys(this.wordChains);

    let idx = this.getRandomIdx(wordChainKeys.length);
    let wordCurr = wordChainKeys[idx];
    // removing - capitalizing the first word is an incorrect thought because
    //  the word with the capitalized first letter may not have been a word in
    //  the input set, and if by chance it was, the word(s) that immediately
    //  followed may be different from the non-capitalized version.
    // Capitalize the first letter of wordCurr and add the word to the markovTextArray
    // const markovTextArray = [wordCurr[0].toUpperCase() + wordCurr.slice(1)];
    const markovTextArray = [wordCurr];
    for (let ctr = 1; ctr < numWords; ctr++) {
      // 1. Get a random starter word from wordChainKeys. This is the current word.
      // 2. Select a random next word from current words chain list. The random word
      //     is the new current word.
      // 3. Is the current word null? End the loop when current word is null.
      //    Otherwise, append to markovTextArray
      // 4. Restart at step 2.

      idx = this.getRandomIdx(this.wordChains[wordCurr].length);
      wordCurr = this.wordChains[wordCurr][idx];
      if (wordCurr) {
        markovTextArray.push(wordCurr);
      } else {
        ctr = numWords;
      }
    }

    return markovTextArray.join(" ");
  }

  getRandomIdx(maxIdx) {
    // Math.random() * maxIdx -- generates a random number and
    //  multiplies it by maxIdx (the length of an array) so we
    //  get numbers with decimals from 0 up to (but NOT including)
    //  maxIdx.
    // Math.floor(randdom stuff) - drops the decimal parts and
    //  leaves us with an integer from 0 - (maxIdx - 1).
    return Math.floor(Math.random() * maxIdx);
  }
}

// export MarkovMachine class
module.exports = {
  MarkovMachine: MarkovMachine,
};
