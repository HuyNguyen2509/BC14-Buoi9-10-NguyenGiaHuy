function NhanVien(taiKhoan, tenNV, email, matKhau, ngayLam, luong, chucVu, gioLam) {
    this.taiKhoan = taiKhoan;
    this.tenNV = tenNV;
    this.email = email;
    this.matKhau = matKhau;
    this.ngayLam = ngayLam;
    this.luong = luong;
    this.chucVu = chucVu;
    this.gioLam = gioLam;
}

NhanVien.prototype.tinhLuong = function () {
    if (this.chucVu === "Sếp") {
        return this.luong * 3;
    }
    if (this.chucVu === "Trưởng Phòng") {
        return this.luong * 2;
    }
    return this.luong;
}

NhanVien.prototype.xepLoaiNV = function () {
    if (this.gioLam < 160) {
        return "Trung Bình"
    }
    if (this.gioLam < 176) {
        return "Khá"
    }
    if (this.gioLam < 192) {
        return "Giỏi"
    }
    return "Xuất Sắc"
}