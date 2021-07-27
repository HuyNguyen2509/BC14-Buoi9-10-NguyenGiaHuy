
document.getElementById('btnThemNV').addEventListener('click', themNhanVien)
document.getElementById('btnThem').addEventListener('click', resetForm)
document.getElementById('btnCapNhat').addEventListener('click', capNhatNhanVien)
document.getElementById('btnTimNV').addEventListener('click', timNhanVien)
document.getElementById('btnDong').addEventListener('click', dongForm)
document.getElementById('tableDanhSach').addEventListener('click', delegationTable)

var qlnv = new QLNV();
qlnv.khoiTao();
hienthi(qlnv.dsnv)

function hienthi(dsnv) {
    var showNV = document.getElementById('tableDanhSach');
    var html = '';

    for (var i = 0; i < dsnv.length; i++) {
        var nv = dsnv[i];
        html += `
            <tr>
                <th>${nv.taiKhoan}</th>
                <th>${nv.tenNV}</th>
                <th>${nv.email}</th>
                <th>${nv.ngayLam}</th>
                <th>${nv.chucVu}</th>
                <th>${nv.tinhLuong()}</th>
                <th>${nv.xepLoaiNV()}</th>
                <th class="btn btn-primary" data-action="chonNV" data-taikhoan="${nv.taiKhoan}" data-toggle="modal" data-target="#myModal">Edit</th>
                <th class="btn btn-danger" data-action="xoaNV" data-taikhoan="${nv.taiKhoan}">Delete</th>
            </tr>
        `
    }

    showNV.innerHTML = html;
}
/* Thêm Nv */
function themNhanVien() {
    var taiKhoan = document.getElementById('tknv').value;
    var tenNV = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var matKhau = document.getElementById('password').value;
    var ngayLam = document.getElementById('datepicker').value;
    var luong = +document.getElementById('luongCB').value;
    var chucVu = document.getElementById('chucvu').value;
    var gioLam = +document.getElementById('gioLam').value;

    var nhanVien = new NhanVien(taiKhoan, tenNV, email, matKhau, ngayLam, luong, chucVu, gioLam);

    var isValid = xacThucDuLieu(nhanVien);
    if (!isValid) {
        return;
    }

    qlnv.themNV(nhanVien);

    hienthi(qlnv.dsnv);
    resetForm();
}
/* Cập nhật form nhập */
function upLoadForm(nv) {
    document.getElementById('tknv').value = nv.taiKhoan || "";
    document.getElementById('name').value = nv.tenNV || "";
    document.getElementById('email').value = nv.email || "";
    document.getElementById('password').value = nv.matKhau || "";
    document.getElementById('datepicker').value = nv.ngayLam || "";
    document.getElementById('luongCB').value = nv.luong || "";
    document.getElementById('chucvu').value = nv.chucVu || "";
    document.getElementById('gioLam').value = nv.gioLam || "";
}
/* reset form nhập */
function resetForm() {
    upLoadForm({});
}

/* Cập nhật(chỉnh sữa) thông tin nhân viên */
function capNhatNhanVien() {
    var taiKhoan = document.getElementById('tknv').value;
    var tenNV = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var matKhau = document.getElementById('password').value;
    var ngayLam = document.getElementById('datepicker').value;
    var luong = +document.getElementById('luongCB').value;
    var chucVu = document.getElementById('chucvu').value;
    var gioLam = +document.getElementById('gioLam').value;

    var nhanVien = new NhanVien(taiKhoan, tenNV, email, matKhau, ngayLam, luong, chucVu, gioLam);

    var isValid = xacThucDuLieu(nhanVien)
    if (!isValid) {
        return;
    }

    qlnv.capNhatNV(nhanVien);

    hienthi(qlnv.dsnv);
    resetForm();
    // document.getElementById('btnDong');
    document.getElementById('tknv').disabled = true;
}

/* Xóa - Chọn nhân viên */
function delegationTable(event) {
    var taiKhoan = event.target.getAttribute("data-taikhoan");
    var action = event.target.getAttribute("data-action");

    if (action === "xoaNV") {
        xoaNhanVien(taiKhoan);
    }
    if (action === "chonNV") {
        chonNhanVien(taiKhoan);
    }
}
function xoaNhanVien(taiKhoan) {
    qlnv.xoaNV(taiKhoan);
    hienthi(qlnv.dsnv);
}
function chonNhanVien(taiKhoan) {
    var nhanVien = qlnv.chonNV(taiKhoan)
    upLoadForm(nhanVien);
}

/* Tìm Nhân Viên */
function timNhanVien() {
    var search = document.getElementById('searchName').value;
    var newDSNV = qlnv.timNV(search);

    hienthi(newDSNV);
}

/* Nút đóng form */
function dongForm() {
    document.getElementById('tbTKNV').innerHTML = "";
    document.getElementById('tbTen').innerHTML = "";
    document.getElementById('tbEmail').innerHTML = "";
    document.getElementById('tbMatKhau').innerHTML = "";
    document.getElementById('tbNgay').innerHTML = "";
    document.getElementById('tbLuongCB').innerHTML = "";
    document.getElementById('tbChucVu').innerHTML = "";
    document.getElementById('tbGiolam').innerHTML = "";

    resetForm();
}

/* Xác thực dữ liệu Validator */
function xacThucDuLieu(nhanVien) {
    var validator = new Validator();
    var isValid = validator.isRequired('tbTKNV', nhanVien.taiKhoan) && validator.taiKhoanCheck('tbTKNV', nhanVien.taiKhoan);
    isValid &= validator.isRequired('tbTen', nhanVien.tenNV) && validator.tenNVCheck('tbTen', nhanVien.tenNV);
    isValid &= validator.isRequired('tbEmail', nhanVien.email) && validator.emailCheck('tbEmail', nhanVien.email);
    isValid &= validator.isRequired('tbMatKhau', nhanVien.matKhau) && validator.matKhauCheck('tbMatKhau', nhanVien.matKhau);
    isValid &= validator.ngayCheck('tbNgay', nhanVien.ngayLam);
    isValid &= validator.isRequired('tbLuongCB', nhanVien.luong) && validator.luongCheck('tbLuongCB', nhanVien.luong);
    isValid &= validator.chucVuCheck('tbChucVu', nhanVien.chucVu);
    isValid &= validator.isRequired('tbGiolam', nhanVien.gioLam) && validator.gioLamCheck('tbGioLam', nhanVien.gioLam);

    if (!isValid) {
        for (var key in validator.errors) {
            if (validator.errors[key]) {
                document.getElementById(key).innerHTML = validator.errors[key];

            }
        }
        return false;
    }
    return true;
}