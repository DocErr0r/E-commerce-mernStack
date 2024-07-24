import express from "express";
import multer from "multer";
import path from "path";
import fs from 'fs'


const router = express.Router()
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/temp/');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname)); // generate unique filename
    }
})

const upload = multer({ storage: storage })
const uploadSingleImage = upload.single('image')

router.route('/').post((req, res) => {

    uploadSingleImage(req, res, (err) => {
        // console.log(req.file);
        if (err) {
            res.status(400).send({ message: err.message })
        }
        else if (req.file) {
            const temppath = req.file.path
            res.status(200).send({ message: "File uploaded successfully", image: temppath })

            // could opreation
            // after opration done
            // fs.unlink(temppath,(err)=>{
            //     console.log('temp file deleted');
            // })
        }
        else {
            res.status(400).send({ message: "No image provided" })
        }
    })
})

export default router