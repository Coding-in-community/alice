function randint(a, b) {
  let delta = b + 1 - a;
  let rng = Math.floor(Math.random() * delta);

  return a + rng;
}

function choice(array) {
  let _rng = randint(0, array.length - 1);

  return array[_rng];
}

function choices(array, k) {
  let _choices = [];

  for (let i = 0; i < k; i++) {
    _choices.push(choice(array));
  }

  return _choices;
}

function sample(array, k) {
  if (array.length >= k && k > 0) {
    let _array = array.slice();
    let _samples = [];

    for (let i = 0; i < k; i++) {
      let _rng = randint(0, _array.length - 1);
      let _aux = _array[_rng];

      _samples.push(_aux);
      _array.splice(_rng, 1);
    }

    return _samples;
  } else {
    throw Error('Sample larger than population or is negative');
  }
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
