const express = require('express');
const router = express.Router();
const apikeysArr = require('../apikeyData');

let apikeys = apikeysArr;

console.log(apikeysArr);

router.get('/', (req, res) => {
  res.json(apikeys);
});

router.get('/:id', (req, res) => {
  // converting string to number Id is number in apikey data
  const apikeyId = parseInt(req.params.id);
  const apikey = apikeys.find((key) => key.id === apikeyId);

  if (!apikeys) {
    return res.status(404).json({
      message: 'No apikeys found, error fetching data',
    });
  }

  res.json(apikey);
});

router.delete('/:id', (req, res) => {
  const apikeyId = parseInt(req.params.id);
  const apikey = apikeys.find((a) => a.id === apikeyId);

  const user = apikey.user;

  if (!apikey) {
    return res.status(404).json({
      message: 'No apikey with this id, please check the id or try an other.',
    });
  }

  const filteredData = apikeys.filter((apikey) => apikey.id !== apikeyId);

  apikeys = filteredData;

  res.json(
    `The apikey for user ${user} with the id: ${apikeyId} successfully removed`
  );
});


router.post('/', (req, res) => {
    const apikey = req.body;
  
    //check validation
    // Title, Year, Released, Genre, imdbID
    const user = apikey.user;
    const key = apikey.apikey;
    const id = apikey.id;
   
    let randomIdNum = Math.floor(Math.random() * 10000000 + 1);
  
    let newId;
  
    if (!id) {
      newId = `tt${randomIdNum}`;
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
  });

module.exports = router;
