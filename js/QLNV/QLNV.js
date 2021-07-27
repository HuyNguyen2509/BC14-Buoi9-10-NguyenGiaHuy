function QLNV() {
    this.dsnv = JSON.parse(localStorage.getItem('dsnv')) || []
}

QLNV.prototype.khoiTao = function () {
    if (this.dsnv.length === 0) {
        return;
    }

    this.dsnv = this.dsnv.map(function (nv) {
        return new NhanVien(nv.taiKhoan, nv.tenNV, nv.email, nv.matKhau, nv.ngayLam, nv.luong, nv.chucVu, nv.gioLam);
    })
}

QLNV.prototype.savaLocalStorage = function () {
    localStorage.setItem('dsnv', JSON.stringify(this.dsnv));
}

QLNV.prototype.themNV = function (nhanVien) {
    this.dsnv.push(nhanVien);
    this.savaLocalStorage();
}

QLNV.prototype.capNhatNV = function (nhanVien) {
    this.dsnv = this.dsnv.map(function (nv) {
        if (nv.taiKhoan === nhanVien.taiKhoan) {
            return nhanVien;
        }
        return nv;
    })
    this.savaLocalStorage();
}

QLNV.prototype.xoaNV = function (taiKhoan) {
    this.dsnv = this.dsnv.filter(function (nv) {
        return nv.taiKhoan !== taiKhoan;
    })
    this.savaLocalStorage();
}

QLNV.prototype.chonNV = function (taiKhoan) {
    return this.dsnv.find(function (nv) {
        return nv.taiKhoan === taiKhoan;
    })
}

QLNV.prototype.timNV = function (search) {
    return this.dsnv.filter(function (nv) {
        var searchValue = search.trim().toLowerCase();
        var loaiValue = nv.xepLoaiNV().trim().toLowerCase();
        return loaiValue.indexOf(searchValue) !== -1;
    })
}