const Category = require('./model');

module.exports = {
  // Show All
  index: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };
      const category = await Category.find();
      res.render('admin/category/view_category', {
        category,
        alert,
      });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/category');
    }
  },

  //  Show
  viewCreate: async (req, res) => {
    try {
      res.render('admin/category/create');
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/category');
    }
  },

  // Create
  actionCreate: async (req, res) => {
    try {
      const { name } = req.body;

      let category = await Category({ name });
      await category.save();

      req.flash('alertMessage', 'Berhasil Tambah Kategori');
      req.flash('alertStatus', 'success');

      res.redirect('/category');
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/category');
    }
  },

  // Edit
  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const category = await Category.findOne({ _id: id });
      res.render('admin/category/edit', {
        category,
      });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/category');
    }
  },

  // update
  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      await Category.findOneAndUpdate(
        {
          _id: id,
        },
        { name }
      );

      req.flash('alertMessage', 'Berhasil Ubah Kategori');
      req.flash('alertStatus', 'warning');

      res.redirect('/category');
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/category');
    }
  },

  // delete
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;
      await Category.findOneAndRemove({
        _id: id,
      });
      req.flash('alertMessage', 'Berhasil Hapus Kategori');
      req.flash('alertStatus', 'danger');
      res.redirect('/category');
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/category');
    }
  },
};
