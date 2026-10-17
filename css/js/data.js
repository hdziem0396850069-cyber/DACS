/**
 * Dữ liệu mẫu dựa trên CSDL CSDL_ThucTap
 */

const LINH_VUC = [
  { MaLinhVuc: 1, TenLinhVuc: 'Lập trình Web (Frontend/Backend/Fullstack)' },
  { MaLinhVuc: 2, TenLinhVuc: 'Lập trình Mobile' },
  { MaLinhVuc: 3, TenLinhVuc: 'Trí tuệ nhân tạo / Machine Learning' },
  { MaLinhVuc: 4, TenLinhVuc: 'Dữ liệu (Data Analyst/Engineer)' },
  { MaLinhVuc: 5, TenLinhVuc: 'Kiểm thử phần mềm (Tester/QA)' },
  { MaLinhVuc: 6, TenLinhVuc: 'DevOps / Cloud' },
  { MaLinhVuc: 7, TenLinhVuc: 'An toàn thông tin' },
  { MaLinhVuc: 8, TenLinhVuc: 'Mạng / Hạ tầng / IT Support' },
  { MaLinhVuc: 9, TenLinhVuc: 'Game / Đồ họa' },
  { MaLinhVuc: 10, TenLinhVuc: 'Business Analyst / Quản lý dự án' }
];

const TINH_THANH = [
  { MaTinhThanh: 1, TenTinhThanh: 'TP. Hồ Chí Minh' },
  { MaTinhThanh: 2, TenTinhThanh: 'Hà Nội' },
  { MaTinhThanh: 3, TenTinhThanh: 'Đà Nẵng' },
  { MaTinhThanh: 4, TenTinhThanh: 'Cần Thơ' },
  { MaTinhThanh: 5, TenTinhThanh: 'Bình Dương' }
];

const KY_NANG = [
  'Java', 'C#', 'Python', 'JavaScript', 'SQL', 'ReactJS',
  'Node.js', 'Spring Boot', 'ASP.NET', 'Git', 'Tiếng Anh giao tiếp',
  'PHP / Laravel', 'Flutter', 'Kotlin / Android', 'Swift / iOS',
  'Docker', 'Linux', 'Manual Testing', 'Selenium',
  'Machine Learning', 'Power BI', 'Figma', 'Cấu trúc dữ liệu & giải thuật'
];

const NGANH = [
  'Công nghệ thông tin', 'Kỹ thuật phần mềm', 'Hệ thống thông tin',
  'An toàn thông tin', 'Trí tuệ nhân tạo', 'Khoa học dữ liệu',
  'Mạng máy tính và truyền thông dữ liệu'
];

const DOANH_NGHIEP = [
  { MaDoanhNghiep: 1, TenDoanhNghiep: 'FPT Software', LinkLogo: 'https://ui-avatars.com/api/?name=FPT&background=00b14f&color=fff', MaTinhThanh: 1, QuyMo: '1000+', TrangThaiDuyet: 'DA_DUYET' },
  { MaDoanhNghiep: 2, TenDoanhNghiep: 'VNG Corporation', LinkLogo: 'https://ui-avatars.com/api/?name=VNG&background=1e3a5f&color=fff', MaTinhThanh: 1, QuyMo: '500-1000', TrangThaiDuyet: 'DA_DUYET' },
  { MaDoanhNghiep: 3, TenDoanhNghiep: 'Tiki Corporation', LinkLogo: 'https://ui-avatars.com/api/?name=Tiki&background=1a94ff&color=fff', MaTinhThanh: 1, QuyMo: '500-1000', TrangThaiDuyet: 'DA_DUYET' },
  { MaDoanhNghiep: 4, TenDoanhNghiep: 'Shopee Vietnam', LinkLogo: 'https://ui-avatars.com/api/?name=SP&background=ee4d2d&color=fff', MaTinhThanh: 1, QuyMo: '1000+', TrangThaiDuyet: 'DA_DUYET' },
  { MaDoanhNghiep: 5, TenDoanhNghiep: 'MISA JSC', LinkLogo: 'https://ui-avatars.com/api/?name=MISA&background=f59e0b&color=fff', MaTinhThanh: 2, QuyMo: '200-500', TrangThaiDuyet: 'DA_DUYET' },
  { MaDoanhNghiep: 6, TenDoanhNghiep: 'CMC Global', LinkLogo: 'https://ui-avatars.com/api/?name=CMC&background=6366f1&color=fff', MaTinhThanh: 2, QuyMo: '500-1000', TrangThaiDuyet: 'DA_DUYET' }
];

const TIN_TUYEN_DUNG = [
  {
    MaTin: 1, TieuDe: 'Thực tập sinh Frontend ReactJS',
    MaDoanhNghiep: 1, TenDoanhNghiep: 'FPT Software',
    LinkLogo: 'https://ui-avatars.com/api/?name=FPT&background=00b14f&color=fff',
    MaLinhVuc: 1, TenLinhVuc: 'Lập trình Web',
    MaTinhThanh: 1, TenTinhThanh: 'TP. Hồ Chí Minh',
    HinhThucLamViec: 'TAI_CHO', ThoiGianThang: 3, CoLuong: true, MucHoTro: '3-5 triệu',
    SoLuong: 5, HanNop: '2026-11-30', TrangThai: 'DANG_TUYEN', LuotXem: 1280, NgayTao: '2026-10-01',
    KyNang: ['ReactJS', 'JavaScript', 'Git']
  },
  {
    MaTin: 2, TieuDe: 'Intern Backend Java / Spring Boot',
    MaDoanhNghiep: 2, TenDoanhNghiep: 'VNG Corporation',
    LinkLogo: 'https://ui-avatars.com/api/?name=VNG&background=1e3a5f&color=fff',
    MaLinhVuc: 1, TenLinhVuc: 'Lập trình Web',
    MaTinhThanh: 1, TenTinhThanh: 'TP. Hồ Chí Minh',
    HinhThucLamViec: 'KET_HOP', ThoiGianThang: 4, CoLuong: true, MucHoTro: '4-6 triệu',
    SoLuong: 3, HanNop: '2026-11-15', TrangThai: 'DANG_TUYEN', LuotXem: 980, NgayTao: '2026-09-28',
    KyNang: ['Java', 'Spring Boot', 'SQL']
  },
  {
    MaTin: 3, TieuDe: 'Thực tập sinh Mobile Flutter',
    MaDoanhNghiep: 3, TenDoanhNghiep: 'Tiki Corporation',
    LinkLogo: 'https://ui-avatars.com/api/?name=Tiki&background=1a94ff&color=fff',
    MaLinhVuc: 2, TenLinhVuc: 'Lập trình Mobile',
    MaTinhThanh: 1, TenTinhThanh: 'TP. Hồ Chí Minh',
    HinhThucLamViec: 'TAI_CHO', ThoiGianThang: 3, CoLuong: true, MucHoTro: '3-4 triệu',
    SoLuong: 2, HanNop: '2026-12-01', TrangThai: 'DANG_TUYEN', LuotXem: 650, NgayTao: '2026-10-05',
    KyNang: ['Flutter', 'Dart', 'Git']
  },
  {
    MaTin: 4, TieuDe: 'Data Intern - Phân tích dữ liệu',
    MaDoanhNghiep: 4, TenDoanhNghiep: 'Shopee Vietnam',
    LinkLogo: 'https://ui-avatars.com/api/?name=SP&background=ee4d2d&color=fff',
    MaLinhVuc: 4, TenLinhVuc: 'Dữ liệu',
    MaTinhThanh: 1, TenTinhThanh: 'TP. Hồ Chí Minh',
    HinhThucLamViec: 'TU_XA', ThoiGianThang: 6, CoLuong: true, MucHoTro: '5-7 triệu',
    SoLuong: 4, HanNop: '2026-11-20', TrangThai: 'DANG_TUYEN', LuotXem: 1520, NgayTao: '2026-09-20',
    KyNang: ['Python', 'SQL', 'Power BI']
  },
  {
    MaTin: 5, TieuDe: 'Thực tập QA / Tester',
    MaDoanhNghiep: 5, TenDoanhNghiep: 'MISA JSC',
    LinkLogo: 'https://ui-avatars.com/api/?name=MISA&background=f59e0b&color=fff',
    MaLinhVuc: 5, TenLinhVuc: 'Kiểm thử phần mềm',
    MaTinhThanh: 2, TenTinhThanh: 'Hà Nội',
    HinhThucLamViec: 'TAI_CHO', ThoiGianThang: 3, CoLuong: false, MucHoTro: null,
    SoLuong: 6, HanNop: '2026-11-10', TrangThai: 'DANG_TUYEN', LuotXem: 420, NgayTao: '2026-10-08',
    KyNang: ['Manual Testing', 'Selenium']
  },
  {
    MaTin: 6, TieuDe: 'Intern AI / Machine Learning',
    MaDoanhNghiep: 6, TenDoanhNghiep: 'CMC Global',
    LinkLogo: 'https://ui-avatars.com/api/?name=CMC&background=6366f1&color=fff',
    MaLinhVuc: 3, TenLinhVuc: 'Trí tuệ nhân tạo',
    MaTinhThanh: 2, TenTinhThanh: 'Hà Nội',
    HinhThucLamViec: 'KET_HOP', ThoiGianThang: 4, CoLuong: true, MucHoTro: '4-6 triệu',
    SoLuong: 2, HanNop: '2026-12-15', TrangThai: 'DANG_TUYEN', LuotXem: 890, NgayTao: '2026-10-02',
    KyNang: ['Python', 'Machine Learning']
  },
  {
    MaTin: 7, TieuDe: 'Thực tập sinh DevOps / Cloud',
    MaDoanhNghiep: 1, TenDoanhNghiep: 'FPT Software',
    LinkLogo: 'https://ui-avatars.com/api/?name=FPT&background=00b14f&color=fff',
    MaLinhVuc: 6, TenLinhVuc: 'DevOps / Cloud',
    MaTinhThanh: 1, TenTinhThanh: 'TP. Hồ Chí Minh',
    HinhThucLamViec: 'TAI_CHO', ThoiGianThang: 3, CoLuong: true, MucHoTro: '3-5 triệu',
    SoLuong: 3, HanNop: '2026-11-25', TrangThai: 'DANG_TUYEN', LuotXem: 710, NgayTao: '2026-10-06',
    KyNang: ['Docker', 'Linux', 'Git']
  },
  {
    MaTin: 8, TieuDe: 'Intern An toàn thông tin',
    MaDoanhNghiep: 2, TenDoanhNghiep: 'VNG Corporation',
    LinkLogo: 'https://ui-avatars.com/api/?name=VNG&background=1e3a5f&color=fff',
    MaLinhVuc: 7, TenLinhVuc: 'An toàn thông tin',
    MaTinhThanh: 1, TenTinhThanh: 'TP. Hồ Chí Minh',
    HinhThucLamViec: 'TAI_CHO', ThoiGianThang: 4, CoLuong: true, MucHoTro: '4-5 triệu',
    SoLuong: 2, HanNop: '2026-12-05', TrangThai: 'DANG_TUYEN', LuotXem: 560, NgayTao: '2026-09-30',
    KyNang: ['Linux', 'Python']
  }
];

const DON_UNG_TUYEN = [
  { MaDon: 1, MaTin: 1, TieuDe: 'Thực tập sinh Frontend ReactJS', TenDoanhNghiep: 'FPT Software', TrangThai: 'PHONG_VAN', NgayNop: '2026-10-05', Diem: null },
  { MaDon: 2, MaTin: 2, TieuDe: 'Intern Backend Java / Spring Boot', TenDoanhNghiep: 'VNG Corporation', TrangThai: 'DA_XEM', NgayNop: '2026-10-03', Diem: null },
  { MaDon: 3, MaTin: 4, TieuDe: 'Data Intern - Phân tích dữ liệu', TenDoanhNghiep: 'Shopee Vietnam', TrangThai: 'DA_NOP', NgayNop: '2026-10-10', Diem: null },
  { MaDon: 4, MaTin: 5, TieuDe: 'Thực tập QA / Tester', TenDoanhNghiep: 'MISA JSC', TrangThai: 'KHONG_DAT', NgayNop: '2026-09-25', Diem: 45 }
];

const THONG_BAO = [
  { MaThongBao: 1, Loai: 'DOI_TRANG_THAI', TieuDe: 'Đơn ứng tuyển được cập nhật', NoiDung: 'Trạng thái mới: PHONG_VAN - FPT Software', DaDoc: false, NgayTao: '2026-10-12 09:30' },
  { MaThongBao: 2, Loai: 'PHONG_VAN', TieuDe: 'Lịch phỏng vấn mới', NoiDung: 'Bạn có lịch phỏng vấn lúc 14:00 ngày 15/10/2026', DaDoc: false, NgayTao: '2026-10-12 10:00' },
  { MaThongBao: 3, Loai: 'TIN_SAP_HET_HAN', TieuDe: 'Tin sắp hết hạn', NoiDung: 'Tin "Intern Backend Java" sẽ hết hạn nộp trong 3 ngày', DaDoc: true, NgayTao: '2026-10-11 08:00' }
];

const THONG_KE = {
  TongSinhVien: 1250,
  TongDoanhNghiep: 48,
  TinDangTuyen: 86,
  TongDonUngTuyen: 3200,
  DonDat: 412,
  SinhVienDaCoNoiThucTap: 380
};