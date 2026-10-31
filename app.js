require('dotenv').config();

const express = require('express');
const db = require('./config/database');
const produkRoutes = require('./routes/produk.routes');

const app = express();
console.log('[DEBUG] APP.JS PROYEK PRODUK SEDANG DIJALANKAN');

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs');

// Route produk
app.use('/', produkRoutes);

// Tes koneksi database, lalu jalankan server
db.query('SELECT 1 + 1 AS result')
    .then(([rows]) => {
        console.log('[DATABASE] Berhasil terhubung ke MySQL.');
        console.log('Hasil tes:', rows[0].result);

        app.listen(PORT, () => {
            console.log(`[SERVER] Berjalan di http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('[DATABASE ERROR]', err.message);
    });
