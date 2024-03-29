const express = require('express');
const router = express.Router();

const mockData = require('../mockData');

let movies = mockData;

// movies is set in the endpoint in the index file
router.get('/', (req, res) => {
  res.json(movies);
});

// GET // get a movie by id
router.get('/:id', (req, res) => {
  const movieID = req.params.id;

  const movie = movies.find((m) => m.imdbID === movieID);

  if (!movies) {
    return res.status(404).json({
      message: 'No movie with this id was found, please try an other!',
    });
  }

  res.json(movie);
});

// DELETE // delete a movie by id
router.delete('/:id', (req, res) => {
  const movieID = req.params.id;
  const movie = movies.find((m) => m.imdbID === movieID);

  // taking out the title from the movie to show in response
  let title = movie.Title;

  if (!movie) {
    return res.status(404).json({
      message: 'No movie with this id was found, please try an other!',
    });
  }

  const filteredData = movies.filter((movie) => movie.imdbID !== movieID);

  movies = filteredData;

  res.json(`The movie ${title} with the id: ${movieID} successfully removed`);
});

// POST // adding a new movie - Title, Year, Released, Genre must be included in the req.body
router.post('/', (req, res) => {
  const movie = req.body;

  //check validation
  // Title, Year, Released, Genre, imdbID
  const title = movie.Title;
  const year = movie.Year;
  const released = movie.Released;
  const genre = movie.Genre;
  const id = movie.imdbID;

  let randomIdNum = Math.floor(Math.random() * 10000000 + 1);

  let newId;

  // checking if id is included if not creating an id
  if (!id) {
    newId = `tt${randomIdNum}`;
  } else {
    newId = id;
  }

  // check if title exists
  if (title === '') {
    return res.status(400).json({
      code: 'InvalidJsonInput',
      message: 'Title is missing a value, please include a movie name',
    });
  }

  if (!title) {
    return res.status(400).json({
      code: 'InvalidJsonInput',
      message: 'Title is missing, please include a movie title',
    });
  }

  // check that year is included and that it is numbers
  if (!year) {
    return res.status(400).json({
      code: 'InvalidJsonInput',
      message: 'Year is missing, please include a Year',
    });
  }

  // validate year is a number
  if (isNaN(year)) {
    return res.status(400).json({
      code: 'InvalidJsonInput',
      message:
        'The Year has to be numbers, please include a year using number no letters allowed',
    });
  }

  // validate genre is included
  if (!genre) {
    return res.status(400).json({
      code: 'InvalidJsonInput',
      message: 'Genre is missing, please include a Genre',
    });
  }

  // validate released is included
  if (!released) {
    return res.status(400).json({
      code: 'InvalidJsonInput',
      message: 'Released is missing, please include a Released',
    });
  }

  // adding new movie req.body is movie object
  const newMovie = {
    ...movie,
    imdbID: newId,
  };

  movies.push(newMovie);
  res.json(newMovie);
});

// PUT // updating a movie
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const movie = req.body;

  // Title, Year, Released, Genre, imdbID
  const title = movie.Title;
  const year = movie.Year;
  const released = movie.Released;
  const genre = movie.Genre;

  // could have seprated and made these their own validation functions

  // check if title exists
  if (title === '') {
    return res.status(400).json({
      code: 'InvalidJsonInput',
      message: 'Title is missing a value, please include a movie name',
    });
  }

  if (title === null || title === undefined) {
    return res.status(400).json({
      code: 'InvalidJsonInput',
      message: 'Title is missing, please include a movie title',
    });
  }
  // check that year is included and that it is numbers
  if (!year) {
    return res.status(400).json({
      code: 'InvalidJsonInput',
      message: 'Year is missing, please include a year',
    });
  }

  if (isNaN(year)) {
    return res.status(400).json({
      code: 'InvalidJsonInput',
      message:
        'The Year has to be numbers, please include a year using number no letters',
    });
  }

  // check released
  if (!released) {
    return res.status(400).json({
      code: 'InvalidJsonInput',
      message: 'Released is missing, please include a released',
    });
  }

  // check genre
  if (genre === '' || genre === null || genre === undefined) {
    return res.status(400).json({
      code: 'InvalidJsonInput',
      message:
        'Genre is missing a value, please include a movie genre or genres',
    });
  }

  const index = movies.findIndex((movie) => movie.imdbID === id);

  if (index === -1) {
    return res.status(404).json({
      message: 'No movie found with the given id, please check the id',
    });
  }

  const updatedMovie = { ...movies[index], ...movie };
  movies[index] = updatedMovie;

  res.json(updatedMovie);
});

module.exports = router;
