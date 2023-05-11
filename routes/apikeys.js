const express = require('express');
const router = express.Router();
const {
  createApiKey,
  randomLetters,
  randomNumber,
  getStringFromDate,
} = require('../utils');

const key1 = createApiKey(
  getStringFromDate(),
  randomLetters(4),
  randomNumber()
);
console.log(typeof key1, key1);

let apikeysArr = [123, 456, 789, 120, 102, 303, 404, 205];

apikeysArr2 = ['149PhxE9047', '149CdJF8587', '149paVY1557', '249zLbe3631'];

// checking if api key is valid
const checkApikeyValidation = (req, res, next) => {
  const apikey = req.query.apiKey;
  console.log(apikey);

  // Check if the given key is a valid key in our array of keys
  const keyIsValid = apikeysArr2.find((k) => k === apikey);
  console.log(keyIsValid);

  // checking the key
  if (!keyIsValid) {
    return res
      .status(401)
      .send({ message: 'unouthorized, no valid api key', code: 401 });
  }
  next();
};

// check all keys, was not a part of the assignment, added it anyways
router.get('/', (req, res) => {
  res.json(apikeysArr2);
});

// adding a key http://localhost:5500/apikeys?apiKey=149PhxE9047
router.post('/', (req, res) => {
  const apikey = createApiKey(
    getStringFromDate(),
    randomLetters(4),
    randomNumber()
  );

  apikeysArr2.push(apikey);
  res.json({
    message: `Successfully added a new api key: ${apikey}`,
    code: 201,
  });
});

router.delete('/:apikey', (req, res) => {
  const apikey = apikeysArr2.find((a) => a === req.params.apikey);

  if (!apikey) {
    return res.status(404).send({
      message:
        'You need to provide an api key, to be able to delete a key, add query ?deleteKey=<the key you want to delete>',
    });
  }

  const filteredData = apikeysArr2.filter((key) => key !== apikey);

  apikeysArr2 = filteredData;

  res.status(200).json(`Api key: ${apikey} successfully deleted`);
});

module.exports = {
  apikeys: router,
  keyCheck: checkApikeyValidation,
};
