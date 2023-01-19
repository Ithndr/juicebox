const express = require('express');
const apiRouter = express.Router();
const postsRouter =  require('./post');
const usersRouter = require('./users');
const tagsRouter = require('./tags');

apiRouter.use('/tags', tagsRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/post', postsRouter);
module.exports = apiRouter;