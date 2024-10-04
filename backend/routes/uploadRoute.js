import express from "express";
import multer from "multer";
import path from "path";
import fs from 'fs'
import sharp from "sharp";


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
// const uploadSingleImage = upload.single('profile')
export const uploadArrayImages = upload.array('images', 5)

// export const imageResize = async (req, res) => {
//     if (!req.files) return
//     await Promise.all(req.files.map(async (file) => {
//         const newfile = await sharp(file.path)
//             // .resize(300, 300) // Adjust width as needed
//             .toFormat('jpeg')
//             .jpeg({ quality: 30 }) // Adjust quality (0-100)
//             .toFile(file.destination + file.fieldname + "-" + Date.now() + '.jpeg');
//         console.log();
//         fs.unlink(file.path, (err) => {
//             console.log('temp file deleted');
//         })
//     }))
//     console.log(req.files);
// }


router.route('/').post((req, res) => {
    uploadArrayImages(req, res, (err) => {
        if (err) {
            res.status(400).send({ message: err.message })
        }
        else if (req.files) {
            console.log(req.files);
            let tempPaths = [];
            req.files.forEach(file => {
                tempPaths.push(file.path)
            });

            // could opreation
            // after opration done
            // tempPaths.forEach(fpath => {
            // fs.unlink(tempPaths, (err) => {
            //     console.log('temp file deleted');
            // })
            // })
            res.status(200).send({ message: "File uploaded successfully", images: tempPaths })
        }
        else {
            res.status(400).send({ message: "No image provided" })
        }
    })

    // uploadSingleImage(req, res, (err) => {
    //     // console.log(req.file);
    //     if (err) {
    //         res.status(400).send({ message: err.message })
    //     }
    //     else if (req.file) {
    //         const temppath = req.file.path
    //         res.status(200).send({ message: "File uploaded successfully", image: temppath })

    //         // could opreation
    //         // after opration done
    //         // fs.unlink(temppath,(err)=>{
    //         //     console.log('temp file deleted');
    //         // })
    //     }
    //     else {
    //         res.status(400).send({ message: "No image provided" })
    //     }
    // })
})

export default router