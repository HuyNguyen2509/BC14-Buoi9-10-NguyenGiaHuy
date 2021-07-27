function Validator() {
    this.errors = {}
}

Validator.prototype.isRequired = function (name, value) {
    if (!value) {
        this.errors[name] = "Vui lòng nhập giá trị";
        return false;

    }
    return true
}

Validator.prototype.emailCheck = function (name, value) {
    if (!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(value)) {
        this.errors[name] = "Email không hợp lệ";
        return false;

    }
    return true
}

Validator.prototype.taiKhoanCheck = function (name, value) {
    if (!/[0-9]{4,6}$/.test(value)) {
        this.errors[name] = "Tài Khoản không hợp lệ";
        return false;

    }
    return true
}

Validator.prototype.tenNVCheck = function (name, value) {
    if (!/[A-Za-z]$/.test(value)) {
        this.errors[name] = "Tên Nhân Viên không hợp lệ";
        return false;

    }
    return true
}

Validator.prototype.matKhauCheck = function (name, value) {
    if (!/^(?=.*[a-zA-Z0-9])(?=.*[!@#$%^&*]).{6,10}$/.test(value)) {
        this.errors[name] = "Mật Khẩu phải có ký tự đặc biệt từ 6-10 ký tự";
        return false;

    }
    return true
}

Validator.prototype.ngayCheck = function (name, value) {
    if (!value) {
        this.errors[name] = "Vui lòng chọn ngày tháng";
        return false;

    }
    return true
}

Validator.prototype.luongCheck = function (name, value) {
    if (1000000 < value && value < 20000000) {
        return true;

    } else {
        this.errors[name] = "Giá trị từ 1.000.000 - 20.000.000";
        return false;
    }

}

Validator.prototype.chucVuCheck = function (name, value) {
    if (!value) {
        this.errors[name] = "Vui lòng chọn Chức Vụ";
        return false;

    }
    return true
}

Validator.prototype.gioLamCheck = function (name, value) {
    if (80 < value && value < 200) {
        return true;
    } else {
        this.errors[name] = "Giá trị giờ làm 80h - 200h";
        return false;
    }

}



