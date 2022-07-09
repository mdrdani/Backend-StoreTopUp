const mongoose = require('mongoose');

let bankSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Nama Pemilik harus di isi'],
  },
  nameBank: {
    type: String,
    require: [true, 'Nama Bank Harus di isi'],
  },
  noRekening: {
    type: String,
    require: [true, 'Nomor Rekening Bank Harus di isi'],
  },
});

module.exports = mongoose.model('Bank', bankSchema);
