const express = require('express');
const router = express.Router();

const ProdukController = require('../controllers/produk.controller');

// Menampilkan daftar produk
router.get('/', ProdukController.index);

// Menampilkan halaman edit
router.get('/produk/:id/edit', ProdukController.edit);

// Menyimpan perubahan produk
router.post('/produk/:id/update', ProdukController.update);

// Menghapus produk
router.post('/produk/:id/delete', ProdukController.destroy);

// Menambahkan produk baru
router.post('/produk', ProdukController.store);

module.exports = router;