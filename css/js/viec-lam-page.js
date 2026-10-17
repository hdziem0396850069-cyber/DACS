/**
 * HUTECH IT Intern - Trang Việc làm thực tập
 * Chức năng: Tìm kiếm, lọc, sắp xếp, phân trang, chuyển đổi xem
 */

(function () {
  'use strict';

  // ===== CONFIG =====
  const JOBS_PER_PAGE = 6;
  let currentPage = 1;
  let currentView = 'grid'; // 'grid' | 'list'
  let filteredJobs = [];

  // ===== DOM REFS =====
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => [...document.querySelectorAll(sel)];

  // ===== INIT =====
  document.addEventListener('DOMContentLoaded', () => {
    initDropdowns();
    initFilters();
    initSearch();
    initFilterGroups();
    initViewToggle();
    initQuickTags();
    initSuggestions();
    initMobileFilter();
    initSortSelect();
    initURLParams();
    applyAllFilters();
    updateFilterCounts();
  });

  // ===== POPULATE DROPDOWNS =====
  function initDropdowns() {
    // Category dropdown in search bar
    const catSelect = $('#searchCategory');
    if (catSelect) {
      LINH_VUC.forEach(lv => {
        const opt = document.createElement('option');
        opt.value = lv.MaLinhVuc;
        opt.textContent = lv.TenLinhVuc;
        catSelect.appendChild(opt);
      });
    }

    // Location dropdown in search bar
    const locSelect = $('#searchLocation');
    if (locSelect) {
      TINH_THANH.forEach(t => {
        const opt = document.createElement('option');
        opt.value = t.MaTinhThanh;
        opt.textContent = t.TenTinhThanh;
        locSelect.appendChild(opt);
      });
    }

    // Sidebar: Lĩnh vực checkboxes
    const lvContainer = $('#filter-linhvuc');
    if (lvContainer) {
      lvContainer.innerHTML = LINH_VUC.map(lv => `
        <label class="vl-checkbox">
          <input type="checkbox" value="${lv.MaLinhVuc}" class="filter-lv">
          <span class="vl-checkbox-mark"></span>
          <span class="vl-checkbox-label">${lv.TenLinhVuc}</span>
          <span class="vl-checkbox-count" data-lv="${lv.MaLinhVuc}"></span>
        </label>
      `).join('');
    }

    // Sidebar: Tỉnh thành checkboxes
    const tinhContainer = $('#filter-tinh');
    if (tinhContainer) {
      tinhContainer.innerHTML = TINH_THANH.map(t => `
        <label class="vl-checkbox">
          <input type="checkbox" value="${t.MaTinhThanh}" class="filter-tinh">
          <span class="vl-checkbox-mark"></span>
          <span class="vl-checkbox-label">${t.TenTinhThanh}</span>
          <span class="vl-checkbox-count" data-tinh="${t.MaTinhThanh}"></span>
        </label>
      `).join('');
    }
  }

  // ===== FILTER COUNTS =====
  function updateFilterCounts() {
    // Count per lĩnh vực
    LINH_VUC.forEach(lv => {
      const count = TIN_TUYEN_DUNG.filter(j => j.MaLinhVuc === lv.MaLinhVuc).length;
      const el = document.querySelector(`[data-lv="${lv.MaLinhVuc}"]`);
      if (el) el.textContent = `(${count})`;
    });

    // Count per tỉnh thành
    TINH_THANH.forEach(t => {
      const count = TIN_TUYEN_DUNG.filter(j => j.MaTinhThanh === t.MaTinhThanh).length;
      const el = document.querySelector(`[data-tinh="${t.MaTinhThanh}"]`);
      if (el) el.textContent = `(${count})`;
    });

    // Count per hình thức
    const countTaiCho = TIN_TUYEN_DUNG.filter(j => j.HinhThucLamViec === 'TAI_CHO').length;
    const countTuXa = TIN_TUYEN_DUNG.filter(j => j.HinhThucLamViec === 'TU_XA').length;
    const countKetHop = TIN_TUYEN_DUNG.filter(j => j.HinhThucLamViec === 'KET_HOP').length;
    if ($('#count-tacho')) $('#count-tacho').textContent = `(${countTaiCho})`;
    if ($('#count-tuxa')) $('#count-tuxa').textContent = `(${countTuXa})`;
    if ($('#count-kethop')) $('#count-kethop').textContent = `(${countKetHop})`;
  }

  // ===== COLLAPSIBLE FILTER GROUPS =====
  function initFilterGroups() {
    $$('.vl-filter-group-header').forEach(header => {
      header.addEventListener('click', () => {
        const group = header.closest('.vl-filter-group');
        const body = group.querySelector('.vl-filter-group-body');
        const icon = header.querySelector('.vl-toggle-icon');
        const isOpen = group.dataset.open === 'true';

        if (isOpen) {
          body.style.maxHeight = body.scrollHeight + 'px';
          requestAnimationFrame(() => {
            body.style.maxHeight = '0';
            body.style.opacity = '0';
          });
          setTimeout(() => { body.style.display = 'none'; }, 300);
          icon.className = 'fas fa-chevron-down vl-toggle-icon';
          group.dataset.open = 'false';
        } else {
          body.style.display = 'block';
          body.style.maxHeight = '0';
          body.style.opacity = '0';
          requestAnimationFrame(() => {
            body.style.maxHeight = body.scrollHeight + 'px';
            body.style.opacity = '1';
          });
          setTimeout(() => { body.style.maxHeight = 'none'; }, 300);
          icon.className = 'fas fa-chevron-up vl-toggle-icon';
          group.dataset.open = 'true';
        }
      });
    });

    // Init open state
    $$('.vl-filter-group').forEach(group => {
      const body = group.querySelector('.vl-filter-group-body');
      if (group.dataset.open === 'true' && body) {
        body.style.display = 'block';
        body.style.maxHeight = 'none';
        body.style.opacity = '1';
      }
    });
  }

  // ===== FILTER SEARCH WITHIN GROUP =====
  function initFilters() {
    $$('.vl-filter-search-input').forEach(input => {
      input.addEventListener('input', () => {
        const target = input.dataset.target;
        const keyword = input.value.toLowerCase().trim();
        const container = $(`#filter-${target}`);
        if (!container) return;
        container.querySelectorAll('.vl-checkbox').forEach(label => {
          const text = label.querySelector('.vl-checkbox-label').textContent.toLowerCase();
          label.style.display = text.includes(keyword) ? '' : 'none';
        });
      });
    });

    // Auto-apply on checkbox change
    $$('.filter-lv, .filter-tinh, .filter-hinhthuc, .filter-thoigian').forEach(cb => {
      cb.addEventListener('change', () => {
        currentPage = 1;
        applyAllFilters();
      });
    });

    $('#filter-luong')?.addEventListener('change', () => { currentPage = 1; applyAllFilters(); });
    $('#filter-khong-luong')?.addEventListener('change', () => { currentPage = 1; applyAllFilters(); });

    // Reset button
    $('#btnResetFilters')?.addEventListener('click', resetAllFilters);
    $('#btnApplyFilter')?.addEventListener('click', () => { currentPage = 1; applyAllFilters(); });
  }

  // ===== SEARCH BAR =====
  function initSearch() {
    const searchBtn = $('#btnSearch');
    const keywordInput = $('#searchKeyword');

    searchBtn?.addEventListener('click', () => {
      currentPage = 1;
      applyAllFilters();
    });

    keywordInput?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        currentPage = 1;
        applyAllFilters();
      }
    });

    // Search category/location dropdowns
    $('#searchCategory')?.addEventListener('change', () => { currentPage = 1; applyAllFilters(); });
    $('#searchLocation')?.addEventListener('change', () => { currentPage = 1; applyAllFilters(); });
  }

  // ===== QUICK TAGS =====
  function initQuickTags() {
    $$('.vl-tag').forEach(tag => {
      tag.addEventListener('click', () => {
        const isActive = tag.classList.contains('active');
        const filterType = tag.dataset.filter;

        if (filterType === 'all') {
          // Reset everything
          resetAllFilters();
          return;
        }

        // Toggle this tag
        tag.classList.toggle('active');

        // Deactivate "all" tag
        const allTag = document.querySelector('.vl-tag[data-filter="all"]');
        if (allTag) allTag.classList.remove('active');

        // Check if any tag is active
        const anyActive = $$('.vl-tag:not([data-filter="all"])').some(t => t.classList.contains('active'));
        if (!anyActive && allTag) allTag.classList.add('active');

        // Show/hide clear button
        const clearBtn = $('#btnClearAll');
        if (clearBtn) clearBtn.classList.toggle('hidden', !anyActive);

        currentPage = 1;
        applyAllFilters();
      });
    });

    $('#btnClearAll')?.addEventListener('click', resetAllFilters);
  }

  // ===== SUGGESTION TAGS =====
  function initSuggestions() {
    $$('.vl-suggestion-tag').forEach(tag => {
      tag.addEventListener('click', () => {
        const keyword = tag.dataset.keyword;
        const input = $('#searchKeyword');
        if (input) {
          input.value = keyword;
          input.focus();
          currentPage = 1;
          applyAllFilters();
        }
      });
    });
  }

  // ===== VIEW TOGGLE =====
  function initViewToggle() {
    $$('.vl-view-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        $$('.vl-view-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentView = btn.dataset.view;
        const grid = $('#jobList');
        if (grid) {
          grid.classList.toggle('vl-job-list-view', currentView === 'list');
        }
      });
    });
  }

  // ===== SORT SELECT =====
  function initSortSelect() {
    $('#sortSelect')?.addEventListener('change', () => {
      currentPage = 1;
      applyAllFilters();
    });
  }

  // ===== MOBILE FILTER =====
  function initMobileFilter() {
    $('#mobileFilterFab')?.addEventListener('click', () => {
      $('#mobileFilterOverlay')?.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    });

    $('#closeMobileFilter')?.addEventListener('click', closeMobileFilter);
    $('#mobileFilterOverlay')?.addEventListener('click', (e) => {
      if (e.target === e.currentTarget) closeMobileFilter();
    });
    $('#mobileResetBtn')?.addEventListener('click', () => { resetAllFilters(); closeMobileFilter(); });
    $('#mobileApplyBtn')?.addEventListener('click', () => { applyAllFilters(); closeMobileFilter(); });
  }

  function closeMobileFilter() {
    $('#mobileFilterOverlay')?.classList.add('hidden');
    document.body.style.overflow = '';
  }

  // ===== URL PARAMS =====
  function initURLParams() {
    const params = new URLSearchParams(window.location.search);

    const lv = params.get('linhvuc');
    if (lv) {
      const cb = document.querySelector(`.filter-lv[value="${lv}"]`);
      if (cb) cb.checked = true;
    }

    const tinh = params.get('tinh');
    if (tinh) {
      const cb = document.querySelector(`.filter-tinh[value="${tinh}"]`);
      if (cb) cb.checked = true;
      // Also set search location dropdown
      const locSelect = $('#searchLocation');
      if (locSelect) locSelect.value = tinh;
    }

    const keyword = params.get('q');
    if (keyword) {
      const input = $('#searchKeyword');
      if (input) input.value = decodeURIComponent(keyword);
    }
  }

  // ===== MAIN FILTER LOGIC =====
  function applyAllFilters() {
    let jobs = [...TIN_TUYEN_DUNG];

    // 1. Keyword search
    const keyword = ($('#searchKeyword')?.value || '').toLowerCase().trim();
    if (keyword) {
      jobs = jobs.filter(j =>
        j.TieuDe.toLowerCase().includes(keyword) ||
        j.TenDoanhNghiep.toLowerCase().includes(keyword) ||
        j.TenLinhVuc.toLowerCase().includes(keyword) ||
        (j.KyNang && j.KyNang.some(k => k.toLowerCase().includes(keyword)))
      );
    }

    // 2. Category dropdown
    const catVal = $('#searchCategory')?.value;
    if (catVal) {
      jobs = jobs.filter(j => j.MaLinhVuc === +catVal);
    }

    // 3. Location dropdown
    const locVal = $('#searchLocation')?.value;
    if (locVal) {
      jobs = jobs.filter(j => j.MaTinhThanh === +locVal);
    }

    // 4. Sidebar: Lĩnh vực
    const lvChecked = $$('.filter-lv:checked').map(c => +c.value);
    if (lvChecked.length) {
      jobs = jobs.filter(j => lvChecked.includes(j.MaLinhVuc));
    }

    // 5. Sidebar: Tỉnh thành
    const tinhChecked = $$('.filter-tinh:checked').map(c => +c.value);
    if (tinhChecked.length) {
      jobs = jobs.filter(j => tinhChecked.includes(j.MaTinhThanh));
    }

    // 6. Sidebar: Hình thức
    const htChecked = $$('.filter-hinhthuc:checked').map(c => c.value);
    if (htChecked.length) {
      jobs = jobs.filter(j => htChecked.includes(j.HinhThucLamViec));
    }

    // 7. Sidebar: Hỗ trợ lương
    const filterLuong = $('#filter-luong')?.checked;
    const filterKhongLuong = $('#filter-khong-luong')?.checked;
    if (filterLuong && !filterKhongLuong) {
      jobs = jobs.filter(j => j.CoLuong);
    } else if (filterKhongLuong && !filterLuong) {
      jobs = jobs.filter(j => !j.CoLuong);
    }

    // 8. Sidebar: Thời gian
    const tgChecked = $$('.filter-thoigian:checked').map(c => +c.value);
    if (tgChecked.length) {
      jobs = jobs.filter(j => tgChecked.includes(j.ThoiGianThang));
    }

    // 9. Quick tags
    const activeTags = $$('.vl-tag.active:not([data-filter="all"])');
    activeTags.forEach(tag => {
      const filterType = tag.dataset.filter;
      const filterValue = tag.dataset.value;
      switch (filterType) {
        case 'location':
          jobs = jobs.filter(j => j.MaTinhThanh === +filterValue);
          break;
        case 'remote':
          jobs = jobs.filter(j => j.HinhThucLamViec === filterValue);
          break;
        case 'salary':
          jobs = jobs.filter(j => j.CoLuong);
          break;
        case 'hot':
          jobs = jobs.filter(j => j.LuotXem > 800);
          break;
      }
    });

    // 10. Sort
    const sortVal = $('#sortSelect')?.value || 'moi';
    switch (sortVal) {
      case 'moi':
        jobs.sort((a, b) => new Date(b.NgayTao) - new Date(a.NgayTao));
        break;
      case 'luotxem':
        jobs.sort((a, b) => b.LuotXem - a.LuotXem);
        break;
      case 'han':
        jobs.sort((a, b) => new Date(a.HanNop) - new Date(b.HanNop));
        break;
      case 'luong':
        jobs.sort((a, b) => {
          const extractMax = (s) => {
            if (!s) return 0;
            const nums = s.match(/\d+/g);
            return nums ? Math.max(...nums.map(Number)) : 0;
          };
          return extractMax(b.MucHoTro) - extractMax(a.MucHoTro);
        });
        break;
    }

    filteredJobs = jobs;
    renderResults();
    renderActiveFilters();
  }

  // ===== RENDER RESULTS =====
  function renderResults() {
    const totalJobs = filteredJobs.length;
    const totalPages = Math.ceil(totalJobs / JOBS_PER_PAGE);

    if (currentPage > totalPages) currentPage = totalPages || 1;

    const start = (currentPage - 1) * JOBS_PER_PAGE;
    const pageJobs = filteredJobs.slice(start, start + JOBS_PER_PAGE);

    // Update count
    const countEl = $('#resultCount');
    if (countEl) {
      countEl.innerHTML = `Tìm thấy <strong>${totalJobs}</strong> tin thực tập`;
    }

    // Render job cards
    const container = $('#jobList');
    if (!container) return;

    if (totalJobs === 0) {
      container.innerHTML = `
        <div class="vl-empty">
          <div class="vl-empty-icon">
            <i class="fas fa-search"></i>
          </div>
          <h3>Không tìm thấy kết quả</h3>
          <p>Thử thay đổi từ khóa hoặc bỏ bớt bộ lọc để xem thêm cơ hội</p>
          <button class="btn btn-outline" onclick="document.getElementById('btnResetFilters').click()">
            <i class="fas fa-undo"></i> Xóa bộ lọc
          </button>
        </div>
      `;
    } else {
      container.innerHTML = pageJobs.map((job, i) => renderEnhancedJobCard(job, i)).join('');

      // Animate cards
      container.querySelectorAll('.vl-job-card').forEach((card, i) => {
        card.style.animationDelay = `${i * 0.06}s`;
      });
    }

    // Render pagination
    renderPagination(totalPages);
  }

  // ===== ENHANCED JOB CARD =====
  function renderEnhancedJobCard(job, index) {
    const salary = job.CoLuong
      ? `<span class="vl-meta-tag vl-meta-salary"><i class="fas fa-money-bill-wave"></i> ${job.MucHoTro}</span>`
      : `<span class="vl-meta-tag"><i class="fas fa-hand-holding-heart"></i> Không lương</span>`;

    const isHot = job.LuotXem > 1000;
    const isNew = (() => {
      const created = new Date(job.NgayTao);
      const now = new Date();
      return (now - created) / 86400000 < 7;
    })();

    const badges = [];
    if (isHot) badges.push('<span class="vl-badge vl-badge-hot"><i class="fas fa-fire"></i> HOT</span>');
    if (isNew) badges.push('<span class="vl-badge vl-badge-new"><i class="fas fa-bolt"></i> MỚI</span>');

    const skills = (job.KyNang || []).slice(0, 4).map(k =>
      `<span class="vl-skill-tag">${k}</span>`
    ).join('');

    const remaining = daysLeft(job.HanNop);
    const isUrgent = remaining.includes('Còn') && parseInt(remaining.match(/\d+/)?.[0] || 99) <= 7;

    return `
      <article class="vl-job-card" data-id="${job.MaTin}" style="animation-delay: ${index * 0.06}s">
        <div class="vl-card-badges">${badges.join('')}</div>
        <div class="vl-card-top">
          <div class="vl-card-logo-wrap">
            <img src="${job.LinkLogo}" alt="${job.TenDoanhNghiep}" class="vl-card-logo">
          </div>
          <div class="vl-card-info">
            <a href="chi-tiet-tin.html?id=${job.MaTin}" class="vl-card-title">${job.TieuDe}</a>
            <div class="vl-card-company">
              <i class="fas fa-building"></i> ${job.TenDoanhNghiep}
            </div>
          </div>
        </div>
        <div class="vl-card-meta">
          ${salary}
          <span class="vl-meta-tag"><i class="fas fa-map-marker-alt"></i> ${job.TenTinhThanh}</span>
          <span class="vl-meta-tag"><i class="fas fa-clock"></i> ${job.ThoiGianThang} tháng</span>
          <span class="vl-meta-tag"><i class="fas fa-laptop-house"></i> ${HINH_THUC[job.HinhThucLamViec] || job.HinhThucLamViec}</span>
        </div>
        <div class="vl-card-skills">${skills}</div>
        <div class="vl-card-footer">
          <div class="vl-card-footer-left">
            <span class="vl-card-deadline ${isUrgent ? 'vl-urgent' : ''}">
              <i class="far fa-calendar-alt"></i> ${remaining}
            </span>
            <span class="vl-card-views"><i class="fas fa-eye"></i> ${job.LuotXem.toLocaleString()}</span>
          </div>
          <div class="vl-card-footer-right">
            <button class="vl-btn-save" title="Lưu tin" onclick="event.stopPropagation(); toggleSaveVL(this, ${job.MaTin})">
              <i class="far fa-heart"></i>
            </button>
            <a href="chi-tiet-tin.html?id=${job.MaTin}" class="vl-btn-apply-sm">
              <i class="fas fa-paper-plane"></i> Ứng tuyển
            </a>
          </div>
        </div>
      </article>
    `;
  }

  // ===== SAVE TOGGLE =====
  window.toggleSaveVL = function (btn, maTin) {
    btn.classList.toggle('saved');
    const icon = btn.querySelector('i');
    if (btn.classList.contains('saved')) {
      icon.classList.replace('far', 'fas');
      showToast('Đã lưu tin thành công!', 'success');
    } else {
      icon.classList.replace('fas', 'far');
      showToast('Đã bỏ lưu tin', 'info');
    }
  };

  // ===== TOAST NOTIFICATION =====
  function showToast(message, type = 'info') {
    const existing = document.querySelector('.vl-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `vl-toast vl-toast-${type}`;
    toast.innerHTML = `
      <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
      <span>${message}</span>
    `;
    document.body.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }

  // ===== PAGINATION =====
  function renderPagination(totalPages) {
    const container = $('#pagination');
    if (!container || totalPages <= 1) {
      if (container) container.innerHTML = '';
      return;
    }

    let html = '';

    // Previous
    html += `<button class="vl-page-btn ${currentPage === 1 ? 'disabled' : ''}" 
              data-page="${currentPage - 1}" ${currentPage === 1 ? 'disabled' : ''}>
              <i class="fas fa-chevron-left"></i>
             </button>`;

    // Page numbers
    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);
    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    if (startPage > 1) {
      html += `<button class="vl-page-btn" data-page="1">1</button>`;
      if (startPage > 2) html += `<span class="vl-page-dots">...</span>`;
    }

    for (let i = startPage; i <= endPage; i++) {
      html += `<button class="vl-page-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) html += `<span class="vl-page-dots">...</span>`;
      html += `<button class="vl-page-btn" data-page="${totalPages}">${totalPages}</button>`;
    }

    // Next
    html += `<button class="vl-page-btn ${currentPage === totalPages ? 'disabled' : ''}" 
              data-page="${currentPage + 1}" ${currentPage === totalPages ? 'disabled' : ''}>
              <i class="fas fa-chevron-right"></i>
             </button>`;

    container.innerHTML = html;

    // Bind pagination clicks
    container.querySelectorAll('.vl-page-btn:not(.disabled)').forEach(btn => {
      btn.addEventListener('click', () => {
        currentPage = +btn.dataset.page;
        renderResults();
        // Scroll to top of results
        document.querySelector('.vl-results-header')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  // ===== ACTIVE FILTERS DISPLAY =====
  function renderActiveFilters() {
    const container = $('#activeFilters');
    if (!container) return;

    const chips = [];

    const keyword = ($('#searchKeyword')?.value || '').trim();
    if (keyword) {
      chips.push({ label: `"${keyword}"`, type: 'keyword' });
    }

    $$('.filter-lv:checked').forEach(cb => {
      const lv = LINH_VUC.find(l => l.MaLinhVuc === +cb.value);
      if (lv) chips.push({ label: lv.TenLinhVuc, type: 'linhvuc', value: cb.value });
    });

    $$('.filter-tinh:checked').forEach(cb => {
      const t = TINH_THANH.find(p => p.MaTinhThanh === +cb.value);
      if (t) chips.push({ label: t.TenTinhThanh, type: 'tinh', value: cb.value });
    });

    $$('.filter-hinhthuc:checked').forEach(cb => {
      chips.push({ label: HINH_THUC[cb.value], type: 'hinhthuc', value: cb.value });
    });

    if ($('#filter-luong')?.checked) chips.push({ label: 'Có lương', type: 'luong' });

    container.innerHTML = chips.map(c =>
      `<span class="vl-active-chip">${c.label}
        <button class="vl-chip-remove" data-type="${c.type}" data-value="${c.value || ''}" title="Xóa">
          <i class="fas fa-times"></i>
        </button>
      </span>`
    ).join('');

    // Bind remove
    container.querySelectorAll('.vl-chip-remove').forEach(btn => {
      btn.addEventListener('click', () => {
        const type = btn.dataset.type;
        const value = btn.dataset.value;
        switch (type) {
          case 'keyword':
            $('#searchKeyword').value = '';
            break;
          case 'linhvuc':
            const lvCb = document.querySelector(`.filter-lv[value="${value}"]`);
            if (lvCb) lvCb.checked = false;
            break;
          case 'tinh':
            const tCb = document.querySelector(`.filter-tinh[value="${value}"]`);
            if (tCb) tCb.checked = false;
            break;
          case 'hinhthuc':
            const htCb = document.querySelector(`.filter-hinhthuc[value="${value}"]`);
            if (htCb) htCb.checked = false;
            break;
          case 'luong':
            $('#filter-luong').checked = false;
            break;
        }
        currentPage = 1;
        applyAllFilters();
      });
    });
  }

  // ===== RESET ALL FILTERS =====
  function resetAllFilters() {
    // Clear keyword
    const kw = $('#searchKeyword');
    if (kw) kw.value = '';

    // Clear dropdowns
    const catSel = $('#searchCategory');
    if (catSel) catSel.value = '';
    const locSel = $('#searchLocation');
    if (locSel) locSel.value = '';

    // Clear all checkboxes
    $$('.filter-lv, .filter-tinh, .filter-hinhthuc, .filter-thoigian').forEach(cb => cb.checked = false);
    const fLuong = $('#filter-luong');
    if (fLuong) fLuong.checked = false;
    const fKhongLuong = $('#filter-khong-luong');
    if (fKhongLuong) fKhongLuong.checked = false;

    // Reset sort
    const sortSel = $('#sortSelect');
    if (sortSel) sortSel.value = 'moi';

    // Reset quick tags
    $$('.vl-tag').forEach(t => t.classList.remove('active'));
    const allTag = document.querySelector('.vl-tag[data-filter="all"]');
    if (allTag) allTag.classList.add('active');
    const clearBtn = $('#btnClearAll');
    if (clearBtn) clearBtn.classList.add('hidden');

    currentPage = 1;
    applyAllFilters();
  }

})();
