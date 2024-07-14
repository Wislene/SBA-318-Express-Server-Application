const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/users.json');

// Function to read users data
const readUsers = () => {
  const usersData = fs.readFileSync(usersFilePath);
  return JSON.parse(usersData);
};

// Function to write users data
const writeUsers = (users) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

// GET all users
router.get('/', (req, res) => {
  const users = readUsers();
  res.json(users);
});

// GET user by ID
router.get('/:id', (req, res) => {
  const users = readUsers();
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('User not found');
  res.json(user);
});

// POST (create) a new user
router.post('/', (req, res) => {
  const users = readUsers();
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    comments: []
  };
  users.push(newUser);
  writeUsers(users);
  res.status(201).json(newUser);
});

// PUT (update) a user
router.put('/:id', (req, res) => {
  const users = readUsers();
  const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
  if (userIndex === -1) return res.status(404).send('User not found');

  users[userIndex] = {
    id: parseInt(req.params.id),
    name: req.body.name,
    comments: users[userIndex].comments
  };
  writeUsers(users);
  res.json(users[userIndex]);
});

// DELETE a user
router.delete('/:id', (req, res) => {
  let users = readUsers();
  users = users.filter(u => u.id !== parseInt(req.params.id));
  writeUsers(users);
  res.send('User deleted');
});

module.exports = router;
