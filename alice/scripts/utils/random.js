function randint(a, b) {
  const delta = b + 1 - a;
  const rng = Math.floor(Math.random() * delta);

  return a + rng;
}

function choice(array) {
  const rng = randint(0, array.length - 1);

  return array[rng];
}

function choices(array, k) {
  const choicesArray = [];

  for (let i = 0; i < k; i++) {
    choicesArray.push(choice(array));
  }

  return choicesArray;
}

function sample(array, k) {
  if (array.length >= k && k > 0) {
    const newArray = array.slice();
    const samples = [];

    for (let i = 0; i < k; i++) {
      const rng = randint(0, newArray.length - 1);
      const aux = newArray[rng];

      samples.push(aux);
      newArray.splice(rng, 1);
    }

    return samples;
  }
  throw new Error('Sample larger than population or is negative');
}

function shuffle(array) {
  return sample(array, array.length);
}

module.exports = {
  randint,
  choice,
  choices,
  sample,
  shuffle,
};
