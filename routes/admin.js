"use strict";


module.exports = function (app) {
  const AdminController = require("../controllers/admin");
  const AdminVerification = require("../middleware/verifikasi-admin");

  // ACCOUNT CONTROLLER
  app.route(`/api/admin/login`)
    .post(AdminController.account_controller.login);

  app.route(`/api/admin/profile`)
    .get(AdminVerification, AdminController.account_controller.profile);

  app.route(`/api/admin/profile`)
    .put(AdminVerification, AdminController.account_controller.editProfile);

  app.route(`/api/admin/profile/password`)
    .put(AdminVerification, AdminController.account_controller.editPassword);

  app.route(`/api/admin/location`)
    .put(AdminVerification, AdminController.account_controller.editLocation);


  // LAYANAN CONTROLLER
  app.route(`/api/admin/layanan`)
    .get(AdminVerification, AdminController.layanan_controller.showLayanan);

  app.route(`/api/admin/layanan/:id_layanan`)
    .get(AdminVerification, AdminController.layanan_controller.showLayananId);

  app.route(`/api/admin/layanan`)
    .post(AdminVerification, AdminController.layanan_controller.addLayanan);

  app.route(`/api/admin/layanan/:id_layanan`)
    .put(AdminVerification, AdminController.layanan_controller.editLayanan);

  app.route(`/api/admin/layanan/:id_layanan`)
    .delete(AdminVerification, AdminController.layanan_controller.deleteLayanan);


  // RIWAYAT CONTROLLER
  app.route(`/api/admin/riwayat`)
    .get(AdminVerification, AdminController.riwayat_controller.showRiwayat);

  app.route(`/api/admin/riwayat/:id_pemesanan`)
    .get(AdminVerification, AdminController.riwayat_controller.showRiwayatId);


  // TRANSAKSI CONTROLLER
  app.route(`/api/admin/transaksi/reject/:id_pemesanan`)
    .put(AdminVerification, AdminController.transaksi_controller.rejectTransaksi);

  app.route(`/api/admin/transaksi/process/:id_pemesanan`)
    .put(AdminVerification, AdminController.transaksi_controller.processTransaksi);

  app.route(`/api/admin/transaksi/finish/:id_pemesanan`)
    .put(AdminVerification, AdminController.transaksi_controller.finishTransaksi);

  // PELANGGAN CONTROLLER
  app.route(`/api/admin/pelanggan`)
    .get(AdminVerification, AdminController.pelanggan_controller.showPelanggan);

  app.route(`/api/admin/pelanggan/:id_pelanggan`)
    .get(AdminVerification, AdminController.pelanggan_controller.showPelangganId);

};

