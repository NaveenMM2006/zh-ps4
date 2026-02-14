import multer from "multer";
import  path  from "Path";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function fileFilter(req, file, cb) {
  const filetypes = /jpg|jpeg|png|mp3|pdf/;
  const extname = filetypes.test(
    path.extname(file.originalname).toLowerCase()
  );

  if (extname) {
    return cb(null, true);
  } else {
    cb("File type not supported");
  }
}

const upload = multer({
  storage,
  fileFilter,
});

export default upload;
