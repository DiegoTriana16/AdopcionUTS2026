import express from "express";
import multer from "multer";
import cors from "cors";
import path from "path";
import fs from "fs";

//  ngrok http 3000
// http://localhost:3000/uploads/987654321.jpeg

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const uploadDir = path.join(process.cwd(), "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    const id = req.body.id;

    if (!id) {
      return cb(new Error("El id es obligatorio"), "");
    }

    const extension = path.extname(file.originalname);

    cb(null, `${id}${extension}`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

app.post("/images", upload.single("image"), (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({
      message: "El id es obligatorio",
    });
  }

  if (!req.file) {
    return res.status(400).json({
      message: "La imagen es obligatoria",
    });
  }

  const extension = path.extname(req.file.originalname);
  const newFilename = `${id}${extension}`;
  const url = `${req.protocol}://${req.get("host")}/uploads/${newFilename}`;

  return res.status(201).json({
    message: "Imagen guardada correctamente",
    id,
    filename: req.file.filename,
    path: `/uploads/${req.file.filename}`,
    url,
  });
});

app.use("/uploads", express.static(uploadDir));

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
