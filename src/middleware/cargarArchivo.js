import multer from 'multer';

const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, 'src/public/uploads/')
  },
  filename: (request, file, callback) => {

    const fileName = `${file.originalname.split('.')[0]}-${Date.now() + '-' + Math.round(Math.random() * 1E9)}.${file.originalname.split('.')[1]}`;
    
    callback(null, fileName);
  }
});

let upload = multer({storage: storage});

export default upload;