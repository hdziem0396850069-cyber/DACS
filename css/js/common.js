/**
 * Hàm dùng chung toàn hệ thống
 */

const TRANG_THAI_DON = {
  DA_NOP:     { label: 'Đã nộp',     cls: 'da-nop' },
  DA_XEM:     { label: 'Đã xem',     cls: 'da-xem' },
  PHONG_VAN:  { label: 'Phỏng vấn',  cls: 'phong-van' },
  DAT:        { label: 'Đạt',        cls: 'dat' },
  KHONG_DAT:  { label: 'Không đạt',  cls: 'khong-dat' },
  DA_RUT:     { label: 'Đã rút',     cls: 'da-rut' }
};

const HINH_THUC = {
  TAI_CHO:  'Tại chỗ',
  TU_XA:    'Từ xa',
  KET_HOP:  'Kết hợp'
};

function formatDate(str) {
  if (!str) return '';
  const d = new Date(str);
  return d.toLocaleDateString('vi-VN');
}

function daysLeft(hanNop) {
  const today = new Date();
  today.setHours(0,0,0,0);
  const end = new Date(hanNop);
  const diff = Math.ceil((end - today) / 86400000);
  if (diff < 0) return 'Đã hết hạn';
  if (diff === 0) return 'Hết hạn hôm nay';
  return `Còn ${diff} ngày`;
}

function renderJobCard(job) {
  const salary = job.CoLuong
    ? `<span class="salary"><i class="fas fa-money-bill-wave"></i> ${job.MucHoTro}</span>`
    : `<span><i class="fas fa-hand-holding-heart"></i> Không lương</span>`;

  const base = location.pathname.includes('/pages/') ? '' : 'pages/';

  return `
    <article class="job-card" data-id="${job.MaTin}">
      ${job.LuotXem > 1000 ? '<span class="badge-hot">HOT</span>' : ''}
      <div class="job-card-header">
        <img src="${job.LinkLogo}" alt="${job.TenDoanhNghiep}" class="job-logo">
        <div>
          <a href="${base}chi-tiet-tin.html?id=${job.MaTin}" class="job-title">${job.TieuDe}</a>
          <div class="job-company">${job.TenDoanhNghiep}</div>
        </div>
      </div>
      <div class="job-meta">
        ${salary}
        <span><i class="fas fa-map-marker-alt"></i> ${job.TenTinhThanh}</span>
        <span><i class="fas fa-clock"></i> ${job.ThoiGianThang || '?'} tháng</span>
        <span><i class="fas fa-laptop-house"></i> ${HINH_THUC[job.HinhThucLamViec] || job.HinhThucLamViec}</span>
      </div>
      <div class="job-footer">
        <span class="time"><i class="far fa-calendar"></i> ${daysLeft(job.HanNop)}</span>
        <button class="btn-save" title="Lưu tin" onclick="toggleSave(this, ${job.MaTin})">
          <i class="far fa-heart"></i>
        </button>
      </div>
    </article>
  `;
}

function toggleSave(btn, maTin) {
  btn.classList.toggle('saved');
  const icon = btn.querySelector('i');
  if (btn.classList.contains('saved')) {
    icon.classList.replace('far', 'fas');
  } else {
    icon.classList.replace('fas', 'far');
  }
}

function renderStatusBadge(trangThai) {
  const info = TRANG_THAI_DON[trangThai] || { label: trangThai, cls: '' };
  return `<span class="badge-status ${info.cls}">${info.label}</span>`;
}

function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}