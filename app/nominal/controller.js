const Nominal = require('./model');

module.exports = {
  // Show All
  index: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };
      const nominal = await Nominal.find();
      res.render('admin/nominal/view_nominal', {
        nominal,
        alert,
      });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/nominal');
    }
  },

  //  Show
  viewCreate: async (req, res) => {
    try {
      res.render('admin/nominal/create');
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/nominal');
    }
  },

  // Create
  actionCreate: async (req, res) => {
    try {
      const { coinName, coinQuantity, price } = req.body;

      let nominal = await Nominal({ coinName, coinQuantity, price });
      await nominal.save();

      req.flash('alertMessage', 'Berhasil Tambah Nominal');
      req.flash('alertStatus', 'success');

      res.redirect('/nominal');
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/nominal');
    }
  },

  // Edit
  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const nominal = await Nominal.findOne({ _id: id });
      res.render('admin/nominal/edit', {
        nominal,
      });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/nominal');
    }
  },

  // update
  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { coinName, coinQuantity, price } = req.body;
      await Nominal.findOneAndUpdate(
        {
          _id: id,
        },
        { coinName, coinQuantity, price }
      );

      req.flash('alertMessage', 'Berhasil Ubah Nominal');
      req.flash('alertStatus', 'warning');

      res.redirect('/nominal');
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/nominal');
    }
  },

  // delete
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;
      await Nominal.findOneAndRemove({
        _id: id,
      });
      req.flash('alertMessage', 'Berhasil Hapus Nominal');
      req.flash('alertStatus', 'danger');
      res.redirect('/nominal');
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/nominal');
    }
  },
};
