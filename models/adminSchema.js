const mongoose = require('mongoose');

// Connect MongoDB
// Connect MongoDB
mongoose.connect(`mongodb+srv://adrimediawebdevindonesia:ynrt!e_WyC3F_vv@bantaipunglimongo.ag0xudb.mongodb.net/db_pungli?retryWrites=true&w=majority`).then(() => {
      console.log('MongoDB connected');
}).catch((err) => {
      console.log('MongoDB connection error: ' + err);
});

const adminSchema = new mongoose.Schema({
      username: {
            type: String,
            max: [30, 'Username must be less than 30 characters'],
            required: [true, 'Username is required'],
            unique: true,
      },
      password: {
            type: String,
            required: [true, 'Password is required'],
            max: [30, 'Password must be less than 30 characters'],
      },
      email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
      },
      nama_lengkap: {
            type: String,
            required: [true, 'Nama Lengkap is required'],
            max: [45, 'Nama Lurator must be less than 45 characters'],
      },
      tanggal_lahir: {
            type: Date,
            required: [true, 'Tangal Lahir is required'],
      },
      jenis_kelamin: {
            type: String,
            required: [true, 'Jenis Kelamin is required'],
            enum: ['L', 'P'],
      },
      alamat: {
            type: String,
            required: [true, 'Alamat Lengkap is required'],
      },
      no_telp: {
            type: Number,
            required: [true, 'No. Telp is required'],
      },
      foto_profile: {
            type: String,
      },
      status_online: {
            type: String,
            enum: ['online', 'offline'],
      },
      created_at: {
            type: Date,
            default: Date.now
      },
      updated_at: {
            type: Date,
            default: Date.now
      },
});

const Admin = mongoose.model('Admin', adminSchema);
module.exports = {
      Admin
};