'use strict';

const connection = require('../../connection');

exports.showRiwayat = async (req, res) => {
    const { status_pesanan } = req.query
    let queryStatusPesanan = ``
    let queryParams = [];

    if (status_pesanan !== undefined && status_pesanan !== null && status_pesanan !== '') {
        queryStatusPesanan = 'WHERE ps.status_pemesanan = ?';
        queryParams.push(status_pesanan);
    }
    const qShowRiwayat = `SELECT ps.id_pemesanan, ps.jumlah_sepatu, ps.catatan_pelanggan, ps.longitude,
                            ps.latitude, ps.status_pemesanan, ps.created_at AS tanggal_pemesanan, ps.total_biaya,
                            l.nama_layanan, l.deskripsi, l.harga, t.tanggal_masuk, t.tanggal_keluar,
                            pb.bukti_pembayaran, pb.metode_pembayaran, pb.created_at AS tanggal_pembayaran,
                            pl.nama, pl.alamat, pl.email, pl.no_telepon, pl.foto_profil
                          FROM pemesanan AS ps 
                          LEFT JOIN layanan AS l ON ps.id_layanan = l.id_layanan
                          LEFT JOIN transaksi AS t ON ps.id_pemesanan = t.id_pemesanan
                          LEFT JOIN pembayaran AS pb ON ps.id_pemesanan = pb.id_pemesanan
                          LEFT JOIN pelanggan AS pl ON ps.id_pelanggan = pl.id_pelanggan
                          ${queryStatusPesanan}
                          ORDER BY ps.id_pemesanan DESC
                          `;

    connection.query(qShowRiwayat, queryParams, (error, rows) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ status: 500, message: "Internal Server Error" });
        } else {
            let riwayatList = [];
            rows.forEach(row => {
                let status_text
                if (row.status_pemesanan == 0) {
                    status_text = `Menunggu Pembayaran`
                } else if (row.status_pemesanan == 1) {
                    status_text = `Telah Dibayar`
                } else if (row.status_pemesanan == 2) {
                    status_text = `Dibatalkan`
                } else if (row.status_pemesanan == 3) {
                    status_text = `Dalam Proses`
                } else if (row.status_pemesanan == 4) {
                    status_text = `Selesai`
                }
                let url_google_map = `http://maps.google.com/maps/search/?api=1&query=${row.latitude}%2C${row.longitude}`
                riwayatList.push({
                    id_pemesanan: row.id_pemesanan,
                    jumlah_sepatu: row.jumlah_sepatu,
                    catatan_pelanggan: row.catatan_pelanggan,
                    total_biaya: row.total_biaya,
                    lokasi: {
                        longitude: row.longitude,
                        latitude: row.latitude,
                        url_google_map
                    },
                    kode_status_pemesanan: row.status_pemesanan,
                    status_pemesanan: status_text,
                    tanggal_pemesanan: row.tanggal_pemesanan,
                    layanan: {
                        nama_layanan: row.nama_layanan,
                        deskripsi: row.deskripsi,
                        harga: row.harga
                    },
                    transaksi: {
                        tanggal_masuk: row.tanggal_masuk,
                        tanggal_keluar: row.tanggal_keluar
                    },
                    pembayaran: {
                        bukti_pembayaran:row.bukti_pembayaran? process.env.BASE_URL + `/images/bukti-pembayaran/` + row.bukti_pembayaran:process.env.BASE_URL + `/images/default/cod.png`,
                        metode_pembayaran: row.metode_pembayaran,
                        tanggal_pembayaran: row.tanggal_pembayaran
                    },
                    pelanggan: {
                        nama: row.nama,
                        alamat: row.alamat,
                        email: row.email,
                        no_telepon: row.no_telepon,
                        foto_profil: row.foto_profil? process.env.BASE_URL +`/images/profile/`+ row.foto_profil :  process.env.BASE_URL +`/images/default/user.jpg`,
                    }
                });
            });
            return res.status(200).json({ status: 200, data: riwayatList });
        }
    });
}


exports.showRiwayatId = async (req, res) => {
    const { id_pemesanan } = req.params
    const qValidate = `SELECT id_pemesanan FROM pemesanan WHERE id_pemesanan=?`
    connection.query(qValidate, id_pemesanan, (error, rows) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ status: 500, message: "Internal Server Error" });
        } else {
            if (rows.length === 0) {
                return res.status(404).json({ status: 404, message: `Tidak ada data` })
            } else {
                const qShowRiwayatId = `SELECT ps.id_pemesanan, ps.jumlah_sepatu, ps.catatan_pelanggan, ps.longitude,
                                        ps.latitude, ps.status_pemesanan, ps.created_at AS tanggal_pemesanan, ps.total_biaya,
                                        l.nama_layanan, l.deskripsi, l.harga, t.tanggal_masuk, t.tanggal_keluar,
                                        pb.bukti_pembayaran, pb.metode_pembayaran, pb.created_at AS tanggal_pembayaran,
                                        pl.nama, pl.alamat, pl.email, pl.no_telepon, pl.foto_profil
                                      FROM pemesanan AS ps 
                                      LEFT JOIN layanan AS l ON ps.id_layanan = l.id_layanan
                                      LEFT JOIN transaksi AS t ON ps.id_pemesanan = t.id_pemesanan
                                      LEFT JOIN pembayaran AS pb ON ps.id_pemesanan = pb.id_pemesanan
                                      LEFT JOIN pelanggan AS pl ON ps.id_pelanggan = pl.id_pelanggan
                                      WHERE ps.id_pemesanan=?`;

                connection.query(qShowRiwayatId, id_pemesanan, (error, rows) => {
                    if (error) {
                        console.log(error);
                        return res.status(500).json({ status: 500, message: "Internal Server Error" });
                    } else {
                        let riwayatList = [];
                        rows.forEach(row => {
                            let status_text
                            if (row.status_pemesanan == 0) {
                                status_text = `Menunggu Pembayaran`
                            } else if (row.status_pemesanan == 1) {
                                status_text = `Telah Dibayar`
                            } else if (row.status_pemesanan == 2) {
                                status_text = `Dibatalkan`
                            } else if (row.status_pemesanan == 3) {
                                status_text = `Dalam Proses`
                            } else if (row.status_pemesanan == 4) {
                                status_text = `Selesai`
                            }
                            let url_google_map = `http://maps.google.com/maps/search/?api=1&query=${row.latitude}%2C${row.longitude}`
                            riwayatList.push({
                                id_pemesanan: row.id_pemesanan,
                                jumlah_sepatu: row.jumlah_sepatu,
                                catatan_pelanggan: row.catatan_pelanggan,
                                total_biaya: row.total_biaya,
                                lokasi: {
                                    longitude: row.longitude,
                                    latitude: row.latitude,
                                    url_google_map
                                },
                                kode_status_pemesanan: row.status_pemesanan,
                                status_pemesanan: status_text,
                                tanggal_pemesanan: row.tanggal_pemesanan,
                                layanan: {
                                    nama_layanan: row.nama_layanan,
                                    deskripsi: row.deskripsi,
                                    harga: row.harga
                                },
                                transaksi: {
                                    tanggal_masuk: row.tanggal_masuk,
                                    tanggal_keluar: row.tanggal_keluar
                                },
                                pembayaran: {
                                    bukti_pembayaran:row.bukti_pembayaran? process.env.BASE_URL + `/images/bukti-pembayaran/` + row.bukti_pembayaran:process.env.BASE_URL + `/images/default/cod.png`,
                                    metode_pembayaran: row.metode_pembayaran,
                                    tanggal_pembayaran: row.tanggal_pembayaran
                                },
                                pelanggan: {
                                    nama: row.nama,
                                    alamat: row.alamat,
                                    email: row.email,
                                    no_telepon: row.no_telepon,
                                    foto_profil: row.foto_profil? process.env.BASE_URL +`/images/profile/`+ row.foto_profil :  process.env.BASE_URL +`/images/default/user.jpg`,
                                }
                            });
                        });
                        return res.status(200).json({ status: 200, data: riwayatList });
                    }
                });
            }
        }
    })
}
