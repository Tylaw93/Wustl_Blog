const router = require('express').Router();
const { Post} = require('../../models');
const withAuth = require('../../utils/auth');

// Used for insomnia
router.get('/', async (req, res) => {
  // find all posts
  // be sure to include its associated Category and Tag data
  try {
    const postData = await Post.findAll();
    res.status(200).json(postData);
  } catch (err){
    res.status(500).json(err);
  }
});

router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// --------------------------------------------------------------

router.put("/edit/:id", async (req, res) => {
  try {
    const newPost = await Post.update({
      ...req.body
    },
    {
      where:{
        id:req.params.id,
      }
    });
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// --------------------------------------------------------------

module.exports = router;