const Payment = require('./model');
const Bank = require('../bank/model');

module.exports = {
  // Show All
  index: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };
      const payment = await Payment.find();
      res.render('admin/payment/view_payment', {
        payment,
        alert,
      });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/payment');
    }
  },

  //  Show
  viewCreate: async (req, res) => {
    try {
      const banks = await Bank.find();
      res.render('admin/payment/create', {
        banks,
      });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/payment');
    }
  },

  // Create
  actionCreate: async (req, res) => {
    try {
      const { type, banks } = req.body;

      let payment = await Payment({ type, banks });
      await payment.save();

      req.flash('alertMessage', 'Berhasil Tambah Jenis Pembayaran');
      req.flash('alertStatus', 'success');

      res.redirect('/payment');
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/payment');
    }
  },

  //   // Edit
  //   viewEdit: async (req, res) => {
  //     try {
  //       const { id } = req.params;
  //       const nominal = await Nominal.findOne({ _id: id });
  //       res.render('admin/nominal/edit', {
  //         nominal,
  //       });
  //     } catch (error) {
  //       req.flash('alertMessage', `${error.message}`);
  //       req.flash('alertStatus', 'danger');
  //       res.redirect('/nominal');
  //     }
  //   },

  //   // update
  //   actionEdit: async (req, res) => {
  //     try {
  //       const { id } = req.params;
  //       const { coinName, coinQuantity, price } = req.body;
  //       await Nominal.findOneAndUpdate(
  //         {
  //           _id: id,
  //         },
  //         { coinName, coinQuantity, price }
  //       );

  //       req.flash('alertMessage', 'Berhasil Ubah Nominal');
  //       req.flash('alertStatus', 'warning');

  //       res.redirect('/nominal');
  //     } catch (error) {
  //       req.flash('alertMessage', `${error.message}`);
  //       req.flash('alertStatus', 'danger');
  //       res.redirect('/nominal');
  //     }
  //   },

  //   // delete
  //   actionDelete: async (req, res) => {
  //     try {
  //       const { id } = req.params;
  //       await Nominal.findOneAndRemove({
  //         _id: id,
  //       });
  //       req.flash('alertMessage', 'Berhasil Hapus Nominal');
  //       req.flash('alertStatus', 'danger');
  //       res.redirect('/nominal');
  //     } catch (error) {
  //       req.flash('alertMessage', `${error.message}`);
  //       req.flash('alertStatus', 'danger');
  //       res.redirect('/nominal');
  //     }
  //   },
};
