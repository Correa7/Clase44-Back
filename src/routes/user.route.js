const express = require('express');
const passport = require('passport');
const { goToLogin,isAdmin } = require("../middlewares/auth.middleware");
const{ getUser,
  getUserById,
  rolUserById,
  postUser,
  delUserById,
  putUserById,
  userDocuments} = require ('../controller/users.controller');
  const {usersUploader} = require('../utils/multer')

const router = new express.Router();
router.use(express.json());
router.use(express.urlencoded({extended:true}));
     
router.get('/',goToLogin, isAdmin, getUser);
router.get('/:uid',goToLogin, isAdmin, getUserById);
router.post('/', passport.authenticate('register-passport',{failureRedirect:'/session/failed-register'}),postUser);
router.delete('/:uid',goToLogin, isAdmin, delUserById);
router.put('/:uid',goToLogin, isAdmin, putUserById); 
router.put('/premium/:uid',rolUserById );

router.post('/:uid/documents',usersUploader(), userDocuments) 
 
module.exports = router;


