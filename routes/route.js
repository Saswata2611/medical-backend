const express = require("express"); // reuired the express package here
const router = express.Router(); // parsed the Router package from express
const {UserRegisterToAdmin, UserLoginOfAdmin, addProduct, searchProductByID, readAllProduct, queryform, getQuerries } = require('../controll/adminDB');
router.route('/register').post(UserRegisterToAdmin);
router.route('/login').get(UserLoginOfAdmin);
router.route('/upload').post(addProduct);
router.route('/searchbyid').get(searchProductByID);
router.route('/searchall').get(readAllProduct);
router.route('/querry').post(queryform);
router.route('/getallquerry').get(getQuerries);
module.exports = router;