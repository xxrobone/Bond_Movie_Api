const express = require('express');
const router = express.Router();
const apikeysArr = require('../apikeyData');
const {
  createApiKey,
  randomLetters,
  randomNumber,
  getStringFromDate,
} = require('../utils');

let apikeys = apikeysArr;

/* console.log(apikeysArr); */

const key1 = createApiKey(
  getStringFromDate(),
  randomLetters(4),
  randomNumber()
);
console.log(typeof key1, key1);

let apikeysArray = [123, 456, 789, 120, 102, 303, 404, 205];

router.get('/', (req, res) => {
  res.json(apikeysArray);
});

router.get('/:apikey', (req, res) => {
  // converting string to number Id is a number in apikey data
  const apikeyToGet = parseInt(req.params.apikey);
  const apikey = apikeysArray.find((key) => key === apikeyToGet);

  if (!apikeysArray) {
    return res.status(404).json({
      message: 'No apikeys found, error fetching data',
    });
  }

  res.json(`Requested apikey: ${apikey} `);
});

router.delete('/:apikey', (req, res) => {
  const apikeyToDelete = parseInt(req.params.apikey);
  const apikey = apikeysArray.find((a) => a === apikeyToDelete);

  /* const user = apikey.user; */

  if (!apikey) {
    return res.status(404).json({
      message: 'No apikey found, unable to delete key.',
    });
  }

  const filteredData = apikeysArray.filter((a) => a !== apikeyToDelete);

  apikeysArray = filteredData;

  res.json(`The apikey ${apikey} successfully removed`);
});

// or just from params

router.post('/:apikey', (req, res) => {
  const apikey = parseInt(req.params.apikey);

  if (apikey === '') {
    return res.status(400).json({
      code: 'InvalidJsonInput',
      message: 'apikey is missing a value, please include a apikey',
    });
  }

  if (apikey === null || apikey === undefined) {
    return res.status(400).json({
      code: 'InvalidJsonInput',
      message: 'Apikey is missing, please include an apikey',
    });
  }

  apikeysArray.push(apikey);
  res.json(apikey);
});

// put // update key using params ??? 
/* router.put('/:apikey', (req, res) => {
  const apikeyToUpdate = req.params.apikey;
  const apikey = parseInt(req.body);

  const index = apikeysArray.findIndex((a) => a === apikeyToUpdate);

  if (index === -1) {
    return res.status(404).json({
      message: 'No movie found with the given id, please check the id',
    });
  }

  const updatedApikey = { ...apikeysArray[index], apikey };
  apikeysArray[index] = updatedApikey;

  res.json(`The api key ${apikeyToUpdate} was successfully updated to ${updatedApikey}`);
}); */

/* router.post('/', (req, res) => {
  const apikey = req.body;

  
  const user = apikey.user;
  const key = apikey.apikey;
  const id = apikey.id;

  let nextId = apikeysArr.length;

  let newId;

  if (!id) {
    newId = nextId++;
  } else {
    newId = id;
  }

  const newApikey = {
    ...apikey,
    id: newId,
  };

  if (user === '') {
    return res.status(400).json({
      code: 'InvalidJsonInput',
      message: 'user is missing a value, please include a username',
    });
  }

  if (user === null || user === undefined) {
    return res.status(400).json({
      code: 'InvalidJsonInput',
      message: 'User is missing, please include a user',
    });
  }

  if (key === '') {
    return res.status(400).json({
      code: 'InvalidJsonInput',
      message: 'apikey is missing a value, please include a apikey',
    });
  }

  if (key === null || key === undefined) {
    return res.status(400).json({
      code: 'InvalidJsonInput',
      message: 'Apikey is missing, please include an apikey',
    });
  }

  apikeys.push(newApikey);
  res.json(newApikey);
}); */

module.exports = router;
