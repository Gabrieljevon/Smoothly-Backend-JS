'use strict';

const connection = require('../../connection');

exports.rejectTransaksi = async (req, res) => {
    const { id_pemesanan } = req.params

    connection.query(`SELECT id_pemesanan FROM pemesanan WHERE id_pemesanan=? `, id_pemesanan,
        (error, rows) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ status: 500, message: "Internal Server Error" });
            } else {
                if (rows.length === 0) {
                    return res.status(404).json({ status: 404, message: `Tidak ada data` })
                } else {
                    connection.query(`UPDATE pemesanan SET status_pemesanan=2 WHERE id_pemesanan=? `, id_pemesanan,
                        (error, rows) => {
                            if (error) {
                                console.log(error);
                                return res.status(500).json({ status: 500, message: "Internal Server Error" });
                            } else {
                                return res.status(200).json({ status: 200, message: `Berhasil membatalkan pesanan` })
                            }
                        }
                    )
                }
            }
        }
    )
}

exports.processTransaksi = async (req, res) => {
    const { id_pemesanan } = req.params

    connection.query(`SELECT id_pemesanan FROM pemesanan WHERE id_pemesanan=? `, id_pemesanan,
        (error, rows) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ status: 500, message: "Internal Server Error" });
            } else {
                if (rows.length === 0) {
                    return res.status(404).json({ status: 404, message: `Tidak ada data` })
                } else {
                    connection.query(`UPDATE pemesanan SET status_pemesanan=3 WHERE id_pemesanan=? `, id_pemesanan,
                        (error, rows) => {
                            if (error) {
                                console.log(error);
                                return res.status(500).json({ status: 500, message: "Internal Server Error" });
                            } else {
                                const qInsertTransaksi = `INSERT INTO transaksi(id_pemesanan,tanggal_masuk) VALUES(?,?)`
                                const currentdate = new Date();
                                const vInsertTransaksi = [id_pemesanan, currentdate]
                                connection.query(qInsertTransaksi, vInsertTransaksi,
                                    (error, rows) => {
                                        if (error) {
                                            console.log(error);
                                            return res.status(500).json({ status: 500, message: "Internal Server Error" });
                                        } else {
                                            return res.status(200).json({ status: 200, message: `Berhasil memproses pesanan` })
                                        }
                                    }
                                )
                            }
                        }
                    )
                }
            }
        }
    )
}


exports.finishTransaksi = async (req, res) => {
    const { id_pemesanan } = req.params

    connection.query(`SELECT id_pemesanan FROM pemesanan WHERE id_pemesanan=? `, id_pemesanan,
        (error, rows) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ status: 500, message: "Internal Server Error" });
            } else {
                if (rows.length === 0) {
                    return res.status(404).json({ status: 404, message: `Tidak ada data` })
                } else {
                    connection.query(`UPDATE pemesanan SET status_pemesanan=4 WHERE id_pemesanan=? `, id_pemesanan,
                        (error, rows) => {
                            if (error) {
                                console.log(error);
                                return res.status(500).json({ status: 500, message: "Internal Server Error" });
                            } else {
                                const qInsertTransaksi = `UPDATE transaksi SET tanggal_keluar=? WHERE id_pemesanan=?`
                                const currentdate = new Date();
                                const vInsertTransaksi = [currentdate, id_pemesanan]
                                connection.query(qInsertTransaksi, vInsertTransaksi,
                                    (error, rows) => {
                                        if (error) {
                                            console.log(error);
                                            return res.status(500).json({ status: 500, message: "Internal Server Error" });
                                        } else {
                                            return res.status(200).json({ status: 200, message: `Pesanan telah selesai` })
                                        }
                                    }
                                )
                            }
                        }
                    )
                }
            }
        }
    )
}