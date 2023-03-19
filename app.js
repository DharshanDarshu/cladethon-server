const path = require("path");
const crypto = require("crypto");
const session = require("express-session");

const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const methodOverride = require("method-override");
const cors = require("cors");
require("dotenv").config();

const productRouter = require("./routes/Products");
const categoryRouter = require("./routes/Categories");
const authRoutes = require("./routes/auth");
const refreshTokenRoutes = require("./routes/refreshToken");
const cartRoutes = require("./routes/carts");
const orderRoutes = require("./routes/orders");
const otpRoutes = require("./routes/otp");
const wishlistRoutes = require("./routes/wishlists");

const port = process.env.PORT || 4000;
const app = express();

app.use(
  cors({
    origin: "*",
  }),
);
app.use(express.json());
app.use(methodOverride("_method"));
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
  }),
);

const mongoURI =
  process.env.DB_CONNECTION_STRING ||
  "mongodb://localhost:27017/tested";

mongoose.set("strictQuery", true);
mongoose.connect(mongoURI);
const conn = mongoose.connection;
// INIT gfs
let gfs, gridfsBucket;

conn.once("open", () => {
  // Init Stream
  gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "uploads",
  });

  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});

// Create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename =
          buf.toString("hex") +
          path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    });
  },
});

const upload = multer({ storage });

app.use("/products", productRouter);
app.use("/category", categoryRouter);
app.use("/user", authRoutes);
app.use("/refresh-token", refreshTokenRoutes);
app.use("/carts", cartRoutes);
app.use("/orders", orderRoutes);
app.use("/verifyemail", otpRoutes);
app.use("/wishlist", wishlistRoutes);

// Uploads file to DB
app.post("/upload", upload.single("image"), (req, res) => {
  try {
    res.status(201).json(req.file);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Get Files
// Display all files in JSON
app.get("/files", (req, res) => {
  gfs.files.find().toArray((err, files) => {
    // check if the file
    if (!files || !files.length === 0) {
      return res
        .status(404)
        .json({ error: "no files exist" });
    }

    return res.status(200).json(files);
  });
});

// Get file by filename
app.get("/files/:filename", (req, res) => {
  gfs.files.findOne(
    { filename: req.params.filename },
    (err, file) => {
      if (!file || !file.length === 0) {
        return res
          .status(404)
          .json({ error: "no file exist" });
      }

      return res.json({ file });
    },
  );
});

app.get("/image/:filename", (req, res) => {
  gfs.files.findOne(
    { filename: req.params.filename },
    (err, file) => {
      if (!file || !file.length === 0) {
        return res
          .status(404)
          .json({ error: "no file exist" });
      }

      //   check if video
      if (
        file.contentType === "image/jpeg" ||
        file.contentType === "image/jpg" ||
        file.contentType === "image/png"
      ) {
        // Read Output
        const readStream = gridfsBucket.openDownloadStream(
          file._id,
        );
        readStream.pipe(res);
      } else {
        console.log(err);
        res.status(404).json({
          err: "Not a Video",
        });
      }
    },
  );
});

app.listen(port, function () {
  console.log(`Application live on localhost:${port}`);
});
