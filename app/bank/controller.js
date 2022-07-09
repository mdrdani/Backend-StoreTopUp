const Bank = require('./model');

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };
      const bank = await Bank.find();
      res.render('admin/bank/view_bank', {
        bank,
        alert,
      });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/bank');
    }
  },

  viewCreate: async (req, res) => {
    try {
      res.render('admin/bank/create');
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/bank');
    }
  },

  actionCreate: async (req, res) => {
    try {
      const { name, nameBank, noRekening } = req.body;
      let bank = await Bank({ name, nameBank, noRekening });
      await bank.save();

      req.flash('alertMessage', 'Berhasil Create bank');
      req.flash('alertStatus', 'success');
      res.redirect('/bank');
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/bank');
    }
  },
};
