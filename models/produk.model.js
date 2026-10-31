const db = require('../config/database');

// Mengambil semua data produk
async function getAll() {
    const [rows] = await db.query(
        'SELECT * FROM produk ORDER BY id DESC'
    );

    return rows;
}

// Mengambil satu produk berdasarkan ID
async function getById(id) {
    const [rows] = await db.query(
        'SELECT * FROM produk WHERE id = ?',
        [id]
    );

    return rows[0];
}

// Menambahkan produk baru
async function create(data) {
    const sql = `
        INSERT INTO produk (nama_produk, kategori, harga, stok)
        VALUES (?, ?, ?, ?)
    `;

    const [result] = await db.query(sql, [
        data.nama_produk,
        data.kategori,
        data.harga,
        data.stok
    ]);

    return result;
}

// Mengubah data produk
async function update(id, data) {
    const sql = `
        UPDATE produk
        SET nama_produk = ?, kategori = ?, harga = ?, stok = ?
        WHERE id = ?
    `;

    const [result] = await db.query(sql, [
        data.nama_produk,
        data.kategori,
        data.harga,
        data.stok,
        id
    ]);

    return result;
}

// Menghapus produk berdasarkan ID
async function remove(id) {
    const [result] = await db.query(
        'DELETE FROM produk WHERE id = ?',
        [id]
    );

    return result;
}

// Mengekspor semua fungsi model
module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};