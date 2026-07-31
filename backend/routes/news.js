const express = require('express');
const router = express.Router();
const {
  getNews,
  getFeaturedNews,
  getNewsItem,
  createNews,
  updateNews,
  deleteNews,
} = require('../controllers/newsController');
const { validateNews } = require('../middleware/validation');

router.route('/')
  .get(getNews)
  .post(validateNews, createNews);

router.route('/featured').get(getFeaturedNews);

router.route('/:slug')
  .get(getNewsItem);

router.route('/:id')
  .put(validateNews, updateNews)
  .delete(deleteNews);

module.exports = router;
