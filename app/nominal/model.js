const mongoose = require('mongoose');

let nominalSchema = mongoose.Schema({
  coinQuantity: {
    type: Number,
    default: 0,
  },
  coinName: {
    type: String,
    require: [true, 'Nama Koin Harus diisi'],
  },
  price: {
    type: Number,
    deefault: 0,
  },
});

module.exports = mongoose.model('Nominal', nominalSchema);
