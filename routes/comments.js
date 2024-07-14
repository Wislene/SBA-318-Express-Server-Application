const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/users.json');

// Helper function to read users data
const readUsers = () => {
  const usersData = fs.readFileSync(usersFilePath);
  return JSON.parse(usersData);
};

// Helper function to write users data
const writeUsers = (users) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

// GET all comments for a user
router.get('/:userId/comments', (req, res) => {
  const users = readUsers();
  const user = users.find(u => u.id === parseInt(req.params.userId));
  if (!user) return res.status(404).send('User not found');
  res.json(user.comments);
});

// POST a new comment for a user
router.post('/:userId/comments', (req, res) => {
  const users = readUsers();
  const user = users.find(u => u.id === parseInt(req.params.userId));
  if (!user) return res.status(404).send('User not found');

  const newComment = {
    id: user.comments.length + 1,
    text: req.body.text
  };
  user.comments.push(newComment);
  writeUsers(users);
  res.status(201).json(newComment);
});

// PUT (update) a comment for a user
router.put('/:userId/comments/:commentId', (req, res) => {
  const users = readUsers();
  const user = users.find(u => u.id === parseInt(req.params.userId));
  if (!user) return res.status(404).send('User not found');

  const commentIndex = user.comments.findIndex(c => c.id === parseInt(req.params.commentId));
  if (commentIndex === -1) return res.status(404).send('Comment not found');

  user.comments[commentIndex] = {
    id: parseInt(req.params.commentId),
    text: req.body.text
  };
  writeUsers(users);
  res.json(user.comments[commentIndex]);
});

// DELETE a comment for a user
router.delete('/:userId/comments/:commentId', (req, res) => {
  const users = readUsers();
  const user = users.find(u => u.id === parseInt(req.params.userId));
  if (!user) return res.status(404).send('User not found');

  user.comments = user.comments.filter(c => c.id !== parseInt(req.params.commentId));
  writeUsers(users);
  res.send('Comment deleted');
});

module.exports = router;
