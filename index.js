const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const bcrypt = require('bcrypt');
const port = dotenv.parsed.PORT || 3000;
const cloudinary = require('./utils/cloudinary');
const upload = require('./middleware/multer');
const jwt = require('jsonwebtoken');
const session = require('cookie-session');
const cors = require('cors');
const mongoose = require('mongoose');

// Define Schema
const UsersSchema = require('./models/userSchema');
const AdminSchema = require('./models/adminSchema');
const KategoriPungliSchema = require('./models/kategoriPungliSchema');
const PelaporanPungliSchema = require('./models/pelaporanPungliSchema');
const KomentarPungliSchema = require('./models/komentarPungliSchema');

// Connect MongoDB
// require('./utils/connection_db');
mongoose.connect(`mongodb+srv://adrimediawebdevindonesia:ynrt!e_WyC3F_vv@bantaipunglimongo.ag0xudb.mongodb.net/db_pungli?retryWrites=true&w=majority`).then(() => {
      console.log('MongoDB connected');
}).catch((err) => {
      console.log('MongoDB connection error: ' + err);
});

// Define middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
      secret: 'secret-key',
      resave: false,
      saveUninitialized: false
}));

app.use(cors());

// Auth Middleware
const authenticateToken = (req, res, next) => {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];
    
      if (token == null) return res.sendStatus(401);
    
      jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if (err) return res.sendStatus(403);
            req.user = user;
            next();
      });
}

// ==============================================================
// ==============================================================

// define routes

app.post('/register', upload.single('foto_profile'), async (req, res) => {

      try {
       
            const { username, password, email, nama_lengkap, tanggal_lahir, jenis_kelamin, alamat, no_telp, status_online, foto_profile } = req.body;

      const hashPassword = await bcrypt.hash( password, 8);

      if (req.file) {

            cloudinary.uploader.upload(req.file.path, async (err, result) => {

                  const usersDataRegister = await UsersSchema.Users({
                        username,
                        password: hashPassword,
                        email,
                        nama_lengkap,
                        tanggal_lahir,
                        jenis_kelamin,
                        alamat,
                        no_telp,
                        status_online,
                        foto_profile: result.url,
                        created_at: new Date(),
                        updated_at: new Date()
                  });

                  usersDataRegister.save();

                  if(err) {
                        console.log(err);
                        return res.status(500).json({
                              success: false,
                              message: "Error"
                        })
                  }

                  const accessToken = jwt.sign({ username }, process.env.SECRET_KEY, { expiresIn: '1d' });
                  req.session.user = req.body;

                  res.status(200).json({
                        success: true,
                        message: "Success",
                        data_profile: result,
                        data: usersDataRegister,
                        accessToken: accessToken
                  });

            });

      } else {

            const usersDataRegister = await UsersSchema.Users({
                  username,
                  password: hashPassword,
                  email,
                  nama_lengkap,
                  tanggal_lahir,
                  jenis_kelamin,
                  alamat,
                  no_telp,
                  status_online,
                  foto_profile: null,
                  created_at: new Date(),
                  updated_at: new Date()
            });

            usersDataRegister.save();

            const accessToken = jwt.sign({ username }, process.env.SECRET_KEY, { expiresIn: '1d' });
            req.session.user = req.body;

            res.status(200).json({
                  success: true,
                  message: "Success",
                  data: usersDataRegister,
                  accessToken: accessToken
            });

      }
            
      } catch (error) {

            res.status(500).json({
                  success: false,
                  message: error.message
            });
            
      }

});

app.post('/login', async (req, res) => {
      const { usernameOrEmail, password } = req.body;
      const user = await UsersSchema.Users.findOne({
            $or: [
                  { username: usernameOrEmail },
                  { email: usernameOrEmail }
            ]
      });
      
      if(user){

            const isMatch = await bcrypt.compare(password, user.password);

            if(isMatch){
                  const accessToken = jwt.sign({ username: user.username }, process.env.SECRET_KEY, { expiresIn: '1d' });
                  req.session.user = req.body;

                  res.status(200).json({
                        success: true,
                        message: "Login Success",
                        data: user,
                        accessToken: accessToken
                  });

            } else {
                  res.status(401).json({
                        success: false,
                        message: "Password Is Wrong"
                  });
            }

      } else {
            res.status(401).json({
                  success: false,
                  message: "Username Or Email Is Wrong. User Not Found"
            });
      }
});

app.post('/logout', (req, res) => {
      req.session.destroy();
      res.status(200).json({
            success: true,
            message: "Logout Success"
      });
});

app.use('/users', authenticateToken, require('./routes/usersRoutes'));
app.use('/admin', authenticateToken, require('./routes/adminRoutes'));
app.use('/kategoriPungli', authenticateToken, require('./routes/kategoriPungliRoutes'));
app.use('/pelaporanPungli', authenticateToken, require('./routes/pelaporanPungliRoutes'));
app.use('/komentarPungli', authenticateToken, require('./routes/komentarPungliRoutes'));

// ==============================================================
// ==============================================================

app.listen(port, () => {
      console.log(`Server is running on url ${dotenv.parsed.BASE_URL}`);
});