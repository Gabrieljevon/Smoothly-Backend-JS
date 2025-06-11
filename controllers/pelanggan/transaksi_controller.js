'use strict';

const connection = require('../../connection');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const config = require('../../config/secret');
const ip = require('ip');
const multer = require('multer');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/bukti-pembayaran/');
  },
  filename: function (req, file, cb) {
    // Mendapatkan ekstensi file
    const ext = file.originalname.split('.').pop();
    // Membuat string acak sepanjang 6 karakter
    const randomString = crypto.randomBytes(3).toString('hex');
    // Menggabungkan nama file asli dengan string acak dan ekstensi
    const newFilename = file.originalname.replace(`.${ext}`, `_${randomString}.${ext}`);
    cb(null, newFilename);
  }
});

const upload = multer({ storage: storage }).single('bukti_pembayaran');

exports.payTransaksi = async (req, res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.log(err);
      return res.status(500).json({ status: 500, message: 'Gagal mengupload bukti pembayaran.' });
    } else if (err) {
      console.log(err);
      return res.status(500).json({ status: 500, message: 'Terjadi kesalahan yang tidak terduga.' });
    }

    const { id_pemesanan } = req.params;
    const { metode_pembayaran } = req.body;
    const bukti_pembayaran = req.file ? req.file.filename : null;

    console.log("ID Pemesanan:", id_pemesanan);
    console.log("Metode Pembayaran:", metode_pembayaran);
    console.log("Bukti Pembayaran:", bukti_pembayaran);

    if (!id_pemesanan || isNaN(id_pemesanan)) {
      return res.status(400).json({
        status: 400,
        message: "ID pemesanan tidak valid.",
      });
    }

    const qSetStatusPemesanan = `UPDATE pemesanan SET status_pemesanan=1 WHERE id_pemesanan=?`;
    connection.query(qSetStatusPemesanan, [id_pemesanan], (error, result) => {
      if (error) {
        console.log("Error Update Pemesanan:", error);
        return res.status(500).json({ status: 500, message: "Internal Server Error saat mengupdate pemesanan." });
      }

      const qInsertPembayaran = bukti_pembayaran
        ? `INSERT INTO pembayaran (metode_pembayaran, bukti_pembayaran, id_pemesanan) VALUES (?, ?, ?)`
        : `INSERT INTO pembayaran (metode_pembayaran, id_pemesanan) VALUES (?, ?)`;
      
      const values = bukti_pembayaran
        ? [metode_pembayaran, bukti_pembayaran, id_pemesanan]
        : [metode_pembayaran, id_pemesanan];

      connection.query(qInsertPembayaran, values, (error, result) => {
        if (error) {
          console.log("Error Insert Pembayaran:", error);
          return res.status(500).json({ status: 500, message: "Internal Server Error saat mencatat pembayaran." });
        }

        const message = bukti_pembayaran
          ? "Pembayaran berhasil, tunggu konfirmasi admin."
          : "Pesanan dengan COD berhasil diproses, tunggu konfirmasi admin.";

        return res.status(200).json({ status: 200, message });
      });
    });
  });
};



exports.makeTransaksi = async (req, res) => {
  const { id_layanan, jumlah_sepatu, catatan_pelanggan, latitude, longitude } = req.body;
  const { id_pelanggan } = req.decoded;

  if (!(id_layanan && jumlah_sepatu && catatan_pelanggan && longitude && latitude)) {
    return res.status(400).json({ status: 400, message: `Field tidak boleh kosong` });
  }

  // Ambil data pelanggan
  connection.query(`SELECT nama, email, no_telepon FROM pelanggan WHERE id_pelanggan=?`, id_pelanggan, (error, rows) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ status: 500, message: "Internal Server Error" });
    }

    const { nama, email, no_telepon } = rows[0];

    // Ambil koordinat toko
    connection.query(`SELECT toko_latitude, toko_longitude FROM admin WHERE id_admin=1`, (error, rows) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ status: 500, message: "Internal Server Error" });
      }

      const { toko_latitude, toko_longitude } = rows[0];

      // Hitung jarak antara lokasi pelanggan dan toko
      const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Radius of the Earth in kilometers
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
          Math.sin(dLon / 2) * Math.sin(dLon / 2);
        return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      };

      const distance = calculateDistance(
        parseFloat(toko_latitude),
        parseFloat(toko_longitude),
        parseFloat(latitude),
        parseFloat(longitude)
      );
      const distanceRounding = distance.toFixed(2);
      let shippingCost = distanceRounding * 1000;

      if (jumlah_sepatu > 1) {
        shippingCost = 0; // Gratis ongkir jika lebih dari 1 sepatu
      }

      // Ambil informasi layanan
      connection.query(`SELECT * FROM layanan WHERE id_layanan=?`, id_layanan, (error, rows) => {
        if (error) {
          console.log(error);
          return res.status(500).json({ status: 500, message: "Internal Server Error" });
        }

        const { harga, nama_layanan } = rows[0];
        const sub_total = harga * jumlah_sepatu;
        const final_total = sub_total + shippingCost;

        // Query untuk INSERT ke tabel pemesanan
        const qInsertPemesanan = `
          INSERT INTO pemesanan 
          (id_pelanggan, id_layanan, jumlah_sepatu, total_biaya, catatan_pelanggan, latitude, longitude) 
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const vInsertPemesanan = [
          id_pelanggan, id_layanan, jumlah_sepatu, final_total, catatan_pelanggan, latitude, longitude
        ];
        console.log("Query Values:", vInsertPemesanan);

        connection.query(qInsertPemesanan, vInsertPemesanan, (error, result) => {
          if (error) {
            console.log("Error saat menyimpan pemesanan:", error); // Cetak error untuk debugging
            return res.status(500).json({
              status: 500,
              message: "Internal Server Error saat menyimpan pemesanan",
              error: error.message
            });
          }
          // Dapatkan id_pemesanan dari hasil query INSERT
          const id_pemesanan = result.insertId;
          console.log("ID Pemesanan yang baru dibuat:", id_pemesanan);

          // Format tanggal saat ini
          // Fungsi untuk menambahkan angka nol di depan jika angka kurang dari 10
          const padZero = (num) => (num < 10 ? '0' : '') + num;

          // Ambil waktu UTC saat ini
          const now = new Date();

          // Ambil komponen waktu UTC
          const utcYear = now.getUTCFullYear();
          const utcMonth = now.getUTCMonth(); // Bulan dimulai dari 0
          const utcDate = now.getUTCDate();
          const utcHours = now.getUTCHours();
          const utcMinutes = now.getUTCMinutes();
          const utcSeconds = now.getUTCSeconds();

          // Tambahkan offset UTC+7 untuk WIB
          let wibHours = utcHours + 7;
          let wibDate = utcDate;
          let wibMonth = utcMonth;
          let wibYear = utcYear;

          // Koreksi jika jam melebihi 24
          if (wibHours >= 24) {
            wibHours -= 24; // Kurangi 24 jam
            wibDate += 1;   // Tambahkan 1 hari

            // Koreksi jika hari melebihi jumlah hari dalam bulan
            const daysInMonth = new Date(wibYear, wibMonth + 1, 0).getDate();
            if (wibDate > daysInMonth) {
              wibDate = 1;       // Reset ke tanggal 1
              wibMonth += 1;     // Tambahkan 1 bulan

              // Koreksi jika bulan melebihi Desember
              if (wibMonth >= 12) {
                wibMonth = 0;    // Reset ke Januari
                wibYear += 1;    // Tambahkan 1 tahun
              }
            }
          }

          // Format tanggal dan waktu dalam WIB
          const datetime = `${padZero(wibDate)}-${padZero(wibMonth + 1)}-${wibYear} `
                          + `${padZero(wibHours)}:${padZero(utcMinutes)}:${padZero(utcSeconds)}`;

          console.log(datetime);




          // Kirim respons JSON
          return res.status(200).json({
            status: 200,
            message: "Pesanan berhasil, mohon segera melakukan pembayaran",
            id_pemesanan: id_pemesanan, // ID pemesanan
            pelanggan: {
              nama,
              email,
              no_telepon
            },
            detail: {
              layanan: nama_layanan,
              jumlah_sepatu,
              biaya_layanan_per_sepatu: harga,
              sub_total: sub_total,
              ongkos_kirim: shippingCost,
              total: final_total,
              tanggal_pemesanan: datetime
            }
          });
        });
      });
    });
  });
};
