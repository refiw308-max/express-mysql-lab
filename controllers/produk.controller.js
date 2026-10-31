const Produk = require('../models/produk.model');

// Menampilkan semua produk
async function index(req, res) {
    try {
        const produk = await Produk.getAll();
        res.render('pages/produk', { produk });
    } catch (err) {
        console.error('[READ ERROR]', err.message);
        res.status(500).send(
            'Gagal mengambil data produk dari database.'
        );
    }
}

// Menambahkan produk baru
async function store(req, res) {
    const { nama_produk, kategori, harga, stok } = req.body;

    if (
        !nama_produk?.trim() ||
        !kategori?.trim() ||
        harga === '' ||
        harga == null ||
        stok === '' ||
        stok == null ||
        !Number.isFinite(Number(harga)) ||
        Number(harga) < 0 ||
        !Number.isInteger(Number(stok)) ||
        Number(stok) < 0
    ) {
        return res.status(400).send('Data produk tidak valid.');
    }

    try {
        await Produk.create({
            nama_produk: nama_produk.trim(),
            kategori: kategori.trim(),
            harga: Number(harga),
            stok: Number(stok)
        });

        res.redirect('/');
    } catch (err) {
        console.error('[CREATE ERROR]', err.message);
        res.status(500).send(
            'Gagal menyimpan produk ke database.'
        );
    }
}

// Menampilkan formulir edit produk
async function edit(req, res) {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
        return res.status(400).send('ID produk tidak valid.');
    }

    try {
        const produk = await Produk.getById(id);

        if (!produk) {
            return res.status(404).send('Produk tidak ditemukan.');
        }

        res.render('pages/edit-produk', { produk });
    } catch (err) {
        console.error('[EDIT ERROR]', err.message);
        res.status(500).send('Gagal membuka data produk.');
    }
}

// Menyimpan perubahan produk
async function update(req, res) {
    const id = Number(req.params.id);
    const { nama_produk, kategori, harga, stok } = req.body;

    if (!Number.isInteger(id) || id < 1) {
        return res.status(400).send('ID produk tidak valid.');
    }

    if (
        !nama_produk?.trim() ||
        !kategori?.trim() ||
        harga === '' ||
        harga == null ||
        stok === '' ||
        stok == null ||
        !Number.isFinite(Number(harga)) ||
        Number(harga) < 0 ||
        !Number.isInteger(Number(stok)) ||
        Number(stok) < 0
    ) {
        return res.status(400).send('Data produk tidak valid.');
    }

    try {
        const produk = await Produk.getById(id);

        if (!produk) {
            return res.status(404).send('Produk tidak ditemukan.');
        }

        await Produk.update(id, {
            nama_produk: nama_produk.trim(),
            kategori: kategori.trim(),
            harga: Number(harga),
            stok: Number(stok)
        });

        res.redirect('/');
    } catch (err) {
        console.error('[UPDATE ERROR]', err.message);
        res.status(500).send('Gagal memperbarui produk.');
    }
}

// Menghapus produk
async function destroy(req, res) {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
        return res.status(400).send('ID produk tidak valid.');
    }

    try {
        const produk = await Produk.getById(id);

        if (!produk) {
            return res.status(404).send('Produk tidak ditemukan.');
        }

        await Produk.remove(id);

        res.redirect('/');
    } catch (err) {
        console.error('[DELETE ERROR]', err.message);
        res.status(500).send('Gagal menghapus produk.');
    }
}

// Mengekspor semua fungsi controller
module.exports = {
    index,
    store,
    edit,
    update,
    destroy
};