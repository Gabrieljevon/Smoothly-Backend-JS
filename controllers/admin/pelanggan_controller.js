'use strict';

const connection = require('../../connection');

exports.showPelanggan = async (req, res) => {
    const qShowRiwayat = `SELECT 
    pl.id_pelanggan, 
    pl.nama, 
    pl.alamat, 
    pl.no_telepon, 
    pl.foto_profil,
    pl.email,    
    pl.created_at AS waktu_registrasi, 
    COUNT(CASE WHEN ps.status_pemesanan = 4 THEN ps.id_pemesanan ELSE NULL END) AS total_pemesanan, 
    SUM(CASE WHEN ps.status_pemesanan = 4 THEN ps.jumlah_sepatu ELSE 0 END) AS total_sepatu,
    SUM(CASE WHEN ps.status_pemesanan = 4 THEN ps.total_biaya ELSE 0 END) AS total_biaya
FROM 
    pelanggan AS pl
LEFT JOIN 
    pemesanan AS ps 
ON 
    pl.id_pelanggan = ps.id_pelanggan
GROUP BY 
    pl.id_pelanggan, 
    pl.nama, 
    pl.alamat, 
    pl.no_telepon, 
    pl.foto_profil, 
    pl.email,
    pl.created_at;
                          `;
    connection.query(qShowRiwayat, (error, rows) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ status: 500, message: "Internal Server Error" });
        } else {
            let pelangganList = [];
            rows.forEach(row => {
                pelangganList.push({
                    id_pelanggan: row.id_pelanggan,
                    nama: row.nama,
                    alamat: row.alamat,
                    no_telepon: row.no_telepon,
                    email: row.email,
                    foto_profil: row.foto_profil ? process.env.BASE_URL + `/images/profile/` + row.foto_profil : process.env.BASE_URL + `/images/default/user.jpg`,
                    waktu_registrasi: row.waktu_registrasi,
                    pemesanan: {
                        total_pemesanan: row.total_pemesanan,
                        total_sepatu: row.total_sepatu,
                        total_biaya: row.total_biaya
                    }
                });
            });
            return res.status(200).json({ status: 200, data: pelangganList });
        }
    });
}

exports.showPelangganId = async (req, res) => {
    const { id_pelanggan } = req.params
    const qShowRiwayat = `SELECT 
    pl.id_pelanggan, 
    pl.nama, 
    pl.alamat, 
    pl.no_telepon, 
    pl.foto_profil,
    pl.email,
    pl.created_at AS waktu_registrasi, 
    COUNT(CASE WHEN ps.status_pemesanan = 4 THEN ps.id_pemesanan ELSE NULL END) AS total_pemesanan, 
    SUM(CASE WHEN ps.status_pemesanan = 4 THEN ps.jumlah_sepatu ELSE 0 END) AS total_sepatu,
    SUM(CASE WHEN ps.status_pemesanan = 4 THEN ps.total_biaya ELSE 0 END) AS total_biaya
FROM 
    pelanggan AS pl
LEFT JOIN 
    pemesanan AS ps 
ON 
    pl.id_pelanggan = ps.id_pelanggan
    WHERE pl.id_pelanggan=?
GROUP BY 
    pl.id_pelanggan, 
    pl.nama, 
    pl.alamat, 
    pl.no_telepon, 
    pl.foto_profil, 
    pl.email,
    pl.created_at;
                          `;
    connection.query(qShowRiwayat, id_pelanggan, (error, rows) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ status: 500, message: "Internal Server Error" });
        } else {
            let pelangganList = [];
            rows.forEach(row => {
                pelangganList.push({
                    id_pelanggan: row.id_pelanggan,
                    nama: row.nama,
                    alamat: row.alamat,
                    no_telepon: row.no_telepon,
                    email: row.email,
                    foto_profil: row.foto_profil ? process.env.BASE_URL + `/images/profile/` + row.foto_profil : process.env.BASE_URL + `/images/default/user.jpg`,
                    waktu_registrasi: row.waktu_registrasi,
                    pemesanan: {
                        total_pemesanan: row.total_pemesanan,
                        total_sepatu: row.total_sepatu,
                        total_biaya: row.total_biaya
                    }
                });
            });
            return res.status(200).json({ status: 200, data: pelangganList });
        }
    });
}

