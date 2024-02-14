const { query, response, Router } = require('express');
const functions = require('../db/config');
const multer = require('multer');
const db = functions.db;
// const admin = functions.admin;
const storage = functions.storage;
const adminDB = db.collection('AdminDB');
const productDB = db.collection('ProductDB');
const querryDB = db.collection('QuerryDB');

const UserRegisterToAdmin = async(req, res)=> {
try {
    const userData = {
        username:req.query.username,
        email:req.query.email,
        password:req.query.password,
    }
    const AdminID = userData.username;
    await adminDB.doc(AdminID).set(userData);
    res.status(200).json('Admin Registerd Sucessfully.');
} catch (error) {
    console.log(error);
}
}

const UserLoginOfAdmin = async(req, res)=> {
try {
    const loginData = {
        username:req.query.username,
        password:req.query.password
    }
    const username = loginData.username;
    const Admin = await adminDB.doc(username).get();
    if(Admin.exists){
        res.status(200).json('ok');
    }else {
        res.status(400).json('Not Authorised');
    }
} catch (error) {
    console.log(error);
}
}

const addProduct = async(req, res)=>{
try {
    const fileName = Date.now().toString(); // You can generate a unique filename
    const fileUpload = storage.file(fileName);
    const metadata = {
      metadata: {
        contentType: req.file.mimetype,
      },
    };
    await fileUpload.save(req.file.buffer, metadata);

    // Get the download URL
    const downloadURL = await storage.file(fileName).getSignedUrl({
      action: 'read',
      expires: '03-09-2100', // Set an expiration date if needed
    });
    // store ta file in firebase storage
    const fileMetadata = {
        name: req.file.originalname,
        type: req.file.mimetype,
        downloadURL: downloadURL[0],
      };
      const date= new Date();
      const currentDate = date.toString();
      // putting the task data into the taskDB
      const ProductData = {
        Product_Name:req.body.productname,
        Product_Description:req.body.description,
        Image_file:fileMetadata.downloadURL,
        Type:req.body.type,
        Quantity:req.body.quantity,
        Price:req.body.price,
        upload_date:currentDate,
        update_date:null
    };
     const ProductID = ProductData.Product_Name;
     await productDB.doc(ProductID).set(ProductData);
     res.status(200).json('ok');  
} catch (error) {
    console.log(error);
}
}

const searchProductByID = async(req, res)=> {
try {
  const Product_id = req.query.Product_id;
  const ProductData = await productDB.doc(Product_id).get();
  if(ProductData.exists){
    res.status(200).jsonp(ProductData.data());
  }
  else{
    res.status(400).json('Sorry This Product does not exist in Data-Base');
  }
}
catch(error){
    console.log(error)
}
}

const readAllProduct = async(req, res)=>{
try {
    await productDB.get()
    .then((QuerySnapshot) => {
      let ProductDataArr = [];
      QuerySnapshot.forEach((doc) => {
        ProductDataArr.push(doc.data());
      });
      res.status(200).json(ProductDataArr);
    });
} catch (error) {
    console.log(error)
}
}
const queryform = async(req, res)=> {
    try {
        const querryData = {
            username:req.query.username,
            phone_no:req.query.phone_no,
            email:req.query.email,
            message:req.query.message,
        };
        await querryDB.doc(querryData.username).set(querryData);
        res.status(200).json('ok');
    } catch (error) {
        console.log(error)
    }
}
const getQuerries = async(req,res)=>{
    try {
        await querryDB.get()
        .then((QuerySnapshot) => {
          let querryDataArr = [];
          QuerySnapshot.forEach((doc) => {
            querryDataArr.push(doc.data());
          });
          res.status(200).json(querryDataArr);
        });  
    } catch (error) {
        console.log(error);
    }
}

module.exports = {UserRegisterToAdmin, UserLoginOfAdmin, addProduct, searchProductByID, readAllProduct, queryform, getQuerries};