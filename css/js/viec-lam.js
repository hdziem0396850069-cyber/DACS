document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('filter-linhvuc').innerHTML = LINH_VUC.map(lv =>
    `<label><input type="checkbox" value="${lv.MaLinhVuc}" class="filter-lv"> ${lv.TenLinhVuc}</label>`
  ).join('');

  document.getElementById('filter-tinh').innerHTML = TINH_THANH.map(t =>
    `<label><input type="checkbox" value="${t.MaTinhThanh}" class="filter-tinh"> ${t.TenTinhThanh}</label>`
  ).join('');

  const lvParam = getQueryParam('linhvuc');
  if (lvParam) {
    const cb = document.querySelector(`.filter-lv[value="${lvParam}"]`);
    if (cb) cb.checked = true;
  }

  applyFilter();
});

function applyFilter() {
  let jobs = [...TIN_TUYEN_DUNG];

  const lvChecked = [...document.querySelectorAll('.filter-lv:checked')].map(c => +c.value);
  if (lvChecked.length) jobs = jobs.filter(j => lvChecked.includes(j.MaLinhVuc));

  const tinhChecked = [...document.querySelectorAll('.filter-tinh:checked')].map(c => +c.value);
  if (tinhChecked.length) jobs = jobs.filter(j => tinhChecked.includes(j.MaTinhThanh));

  const htChecked = [...document.querySelectorAll('.filter-hinhthuc:checked')].map(c => c.value);
  if (htChecked.length) jobs = jobs.filter(j => htChecked.includes(j.HinhThucLamViec));

  if (document.getElementById('filter-luong').checked) {
    jobs = jobs.filter(j => j.CoLuong);
  }

  const sort = document.getElementById('sort-select').value;
  if (sort === 'moi') jobs.sort((a, b) => new Date(b.NgayTao) - new Date(a.NgayTao));
  else if (sort === 'luotxem') jobs.sort((a, b) => b.LuotXem - a.LuotXem);
  else if (sort === 'han') jobs.sort((a, b) => new Date(a.HanNop) - new Date(b.HanNop));

  document.getElementById('result-count').textContent = `Tìm thấy ${jobs.length} tin tuyển dụng`;
  document.getElementById('job-list').innerHTML = jobs.length
    ? jobs.map(renderJobCard).join('')
    : '<div class="empty-state"><i class="fas fa-search"></i><h3>Không tìm thấy tin phù hợp</h3><p>Thử bỏ bớt bộ lọc</p></div>';
}