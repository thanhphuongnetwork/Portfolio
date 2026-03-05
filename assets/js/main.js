/**
 * DATA PORTFOLIO — main.js
 * Navigation, Theme, Animations, Counters, Filtering
 */

// ── State ────────────────────────────────────────────────────
const state = {
  currentPage: 'home',
  currentProject: null,
  theme: localStorage.getItem('theme') || 'dark',
  activeFilter: 'all',
};

// ── DOM Ready ────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  applyTheme(state.theme);
  initNav();
  initThemeToggle();
  initScrollReveal();
  initMobileMenu();

  // Route from URL hash
  const hash = window.location.hash.replace('#', '');
  if (hash.startsWith('project-')) {
    showProject(hash);
  } else if (hash && document.getElementById(`page-${hash}`)) {
    navigateTo(hash);
  } else {
    navigateTo('home');
  }
});

// ── Theme ────────────────────────────────────────────────────
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  state.theme = theme;
  localStorage.setItem('theme', theme);
  const btn = document.getElementById('theme-toggle');
  // Show moon when in dark mode (click to switch to light), show sun when in light mode (click to switch to dark)
  if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
}

function initThemeToggle() {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  btn.addEventListener('click', () => {
    applyTheme(state.theme === 'dark' ? 'light' : 'dark');
  });
}

// ── Navigation ───────────────────────────────────────────────
function initNav() {
  document.querySelectorAll('[data-nav]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const target = el.getAttribute('data-nav');
      navigateTo(target);
      closeMobileMenu();
    });
  });
}

function navigateTo(pageId) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  // Show target page
  const page = document.getElementById(`page-${pageId}`);
  if (!page) return;
  page.classList.add('active');
  state.currentPage = pageId;

  // Update nav active states
  document.querySelectorAll('.nav-link').forEach(l => {
    l.classList.toggle('active', l.getAttribute('data-nav') === pageId);
  });

  // Update URL
  window.location.hash = pageId;

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Re-init scroll animations for new page
  setTimeout(() => initScrollReveal(), 80);
  setTimeout(() => initScrollReveal(), 300);

  // Init counters on home/about
  if (pageId === 'home') initCounters();
  if (pageId === 'projects') initProjectFilters();
  if (pageId === 'cv-builder') initCVBuilder();
}

// ── CV Builder Logic ─────────────────────────────────────────
function initCVBuilder() {
  const btn = document.getElementById('btn-transform-cv');
  const textarea = document.getElementById('cv-content');
  if (!btn || !textarea) return;

  btn.onclick = async () => {
    const cvText = textarea.value.trim();
    if (!cvText) {
      showToast("⚠️ Vui lòng dán nội dung CV của bạn vào trước.");
      return;
    }

    btn.textContent = 'Đang gửi tới Backend...';
    btn.disabled = true;

    try {
      const response = await fetch('/api/generate-portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cvText })
      });

      const data = await response.json();

      if (response.ok) {
        showToast(`✅ ${data.message}`);
        btn.textContent = 'Gửi thêm CV khác ✨';
        btn.style.background = 'linear-gradient(135deg, var(--primary), var(--secondary))';
        textarea.value = ''; // Clear for next use
      } else {
        showToast(`❌ Lỗi: ${data.error}`);
        btn.textContent = 'Thử lại ✨';
      }
    } catch (error) {
      showToast("❌ Không thể kết nối tới Backend. Hãy chắc chắn server đang chạy.");
      btn.textContent = 'Thử lại ✨';
    } finally {
      btn.disabled = false;
    }
  };
}

// ── Project Navigation ───────────────────────────────────────
function showProject(projectId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

  // 1. Check if it's a hardcoded page
  let page = document.getElementById(projectId);

  // 2. If not found, try dynamic rendering from PROJECTS
  if (!page && typeof PROJECTS !== 'undefined') {
    const project = PROJECTS.find(p => p.id === projectId || p.pageId === projectId);
    if (project) {
      renderProjectDetail(project);
      page = document.getElementById('page-project-detail');
    }
  }

  if (!page) {
    navigateTo('projects');
    return;
  }

  page.classList.add('active');
  state.currentProject = projectId;
  window.location.hash = projectId;
  window.scrollTo({ top: 0, behavior: 'smooth' });

  setTimeout(() => {
    initScrollReveal();
    initTOC();
  }, 100);
}

function renderProjectDetail(project) {
  const container = document.getElementById('page-project-detail');
  if (!container) return;

  // Header & Breadcrumb
  document.getElementById('detail-breadcrumb').textContent = project.title;
  document.getElementById('detail-title').textContent = project.title;
  document.getElementById('detail-desc').textContent = project.desc;

  // Tags
  const tagsContainer = document.getElementById('detail-tags');
  tagsContainer.innerHTML = `
    ${project.featured ? '<span class="featured-banner">⭐ Dự án Nổi bật</span>' : ''}
    <span class="badge badge-accent">${project.categoryLabel}</span>
  `;

  // Meta info
  const metaContainer = document.getElementById('detail-meta');
  metaContainer.innerHTML = `
    <div><div class="meta-label">Ngành</div><div class="meta-val">${project.industry || 'Bán lẻ & Phân phối'}</div></div>
    <div><div class="meta-label">Thời gian</div><div class="meta-val">${project.duration}</div></div>
    <div><div class="meta-label">Vai trò</div><div class="meta-val">${project.role || 'Chuyên viên Phân tích'}</div></div>
  `;

  // Main Content
  document.getElementById('detail-content-long').innerHTML = `<p>${project.desc_long || project.desc}</p>`;

  // Multimedia: Images
  const imgContainer = document.getElementById('detail-images');
  if (project.images && project.images.length > 0) {
    imgContainer.parentElement.style.display = 'block';
    imgContainer.innerHTML = project.images.map(src => `
      <img src="${src}" alt="${project.title}" class="project-screenshot" onerror="this.style.display='none'">
    `).join('');
  } else {
    imgContainer.innerHTML = '<p style="opacity:0.5; font-style:italic;">Hình ảnh mô phỏng đang được cập nhật...</p>';
  }

  // Multimedia: PowerBI
  const pbiSection = document.getElementById('detail-pbi');
  const pbiIframe = document.getElementById('pbi-iframe');
  if (project.powerbiLink) {
    pbiSection.style.display = 'block';
    pbiIframe.src = project.powerbiLink;
  } else {
    pbiSection.style.display = 'none';
    pbiIframe.src = '';
  }

  // Resources (Docs, Data)
  const resourceContainer = document.getElementById('detail-resources');
  let resourceHtml = '';

  if (project.docs && project.docs.length > 0) {
    project.docs.forEach(doc => {
      resourceHtml += `<a href="${doc.path}" class="resource-btn" target="_blank"><span class="resource-icon">📄</span> <div><div style="font-size:.9rem">${doc.name}</div><div style="font-size:.7rem; opacity:.6">Tài liệu dự án</div></div></a>`;
    });
  }

  if (project.sampleData) {
    resourceHtml += `<a href="${project.sampleData}" class="resource-btn" download><span class="resource-icon">📊</span> <div><div style="font-size:.9rem">Dữ liệu Mẫu</div><div style="font-size:.7rem; opacity:.6">Tải xuống file .csv/.xlsx</div></div></a>`;
  }

  if (!resourceHtml) {
    resourceHtml = '<p style="opacity:0.5; font-size:.9rem">Chưa có tài liệu đính kèm.</p>';
  }
  resourceContainer.innerHTML = resourceHtml;

  // Tools
  const toolsContainer = document.getElementById('detail-tools');
  toolsContainer.innerHTML = project.tools.map(t => `<span class="tag">${t}</span>`).join('');
}

function goBack() {
  if (state.currentProject) {
    state.currentProject = null;
    navigateTo('projects');
  } else {
    navigateTo('home');
  }
}

// ── Mobile Menu ──────────────────────────────────────────────
function initMobileMenu() {
  const hamburger = document.getElementById('nav-hamburger');
  const overlay = document.getElementById('mobile-overlay');
  if (!hamburger) return;
  hamburger.addEventListener('click', () => {
    const links = document.getElementById('nav-links');
    links.classList.toggle('open');
    overlay?.classList.toggle('show');
  });
  overlay?.addEventListener('click', closeMobileMenu);
}

function closeMobileMenu() {
  document.getElementById('nav-links')?.classList.remove('open');
  document.getElementById('mobile-overlay')?.classList.remove('show');
}

// ── Scroll Reveal ────────────────────────────────────────────
function initScrollReveal() {
  const activePage = document.querySelector('.page.active');
  if (!activePage) return;

  // Force-reveal all .reveal elements in the active page
  // using staggered timeout — works regardless of page display state
  activePage.querySelectorAll('.reveal:not(.visible)').forEach((el, i) => {
    const delay = i * 60;
    setTimeout(() => {
      el.classList.add('visible');
    }, delay);
  });

  // Also set up observer for any future elements not yet in viewport
  // (e.g., project cards below the fold)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '50px 0px 0px 0px' });

  // Observe elements on the page that re-render (dynamically added project cards)
  setTimeout(() => {
    document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
      observer.observe(el);
    });
  }, 200);
}


// ── Animated Counters ────────────────────────────────────────
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  counters.forEach(el => {
    const target = parseFloat(el.getAttribute('data-count'));
    const prefix = el.getAttribute('data-prefix') || '';
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1800;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current += increment;
      if (step >= steps) {
        current = target;
        clearInterval(timer);
      }
      const display = Number.isInteger(target) ? Math.round(current) : current.toFixed(1);
      el.textContent = `${prefix}${display}${suffix}`;
    }, duration / steps);
  });
}

// ── Project Filtering ────────────────────────────────────────
function initProjectFilters() {
  document.querySelectorAll('.filter-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
      state.activeFilter = filter;
      document.querySelectorAll('.filter-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterProjects(filter);
    });
  });
}

function filterProjects(filter) {
  document.querySelectorAll('.project-item').forEach(item => {
    const cat = item.getAttribute('data-category');
    const show = filter === 'all' || cat === filter;
    item.style.transition = 'all 0.3s ease';
    if (show) {
      item.style.display = 'flex';
      item.style.opacity = '0';
      item.style.transform = 'translateY(16px)';
      setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      }, 30);
    } else {
      item.style.opacity = '0';
      item.style.transform = 'translateY(-8px)';
      setTimeout(() => { item.style.display = 'none'; }, 300);
    }
  });
}

// ── Table of Contents (Project Pages) ────────────────────────
function initTOC() {
  const links = document.querySelectorAll('.toc-link');
  if (!links.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const id = entry.target.id;
        const active = document.querySelector(`.toc-link[href="#${id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px' });

  links.forEach(link => {
    const id = link.getAttribute('href')?.replace('#', '');
    const el = id ? document.getElementById(id) : null;
    if (el) observer.observe(el);
  });
}

// ── Contact Form ─────────────────────────────────────────────
async function submitContactForm(e) {
  e.preventDefault();
  const btn = document.getElementById('contact-submit');
  const form = e.target;

  const formData = {
    firstName: form.querySelector('#first-name').value,
    lastName: form.querySelector('#last-name').value,
    email: form.querySelector('#email').value,
    company: form.querySelector('#company').value,
    inquiryType: form.querySelector('#inquiry-type').value,
    message: form.querySelector('#message').value
  };

  if (btn) {
    btn.textContent = 'Đang gửi...';
    btn.disabled = true;
  }

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      if (btn) {
        btn.textContent = 'Tin nhắn đã gửi ✓';
        btn.style.background = 'linear-gradient(135deg, #10b981, #34d399)';
      }
      showToast("✅ Đã gửi tin nhắn! Tôi sẽ liên hệ lại trong vòng 24 giờ.");
      form.reset();
    } else {
      showToast("❌ Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại.");
    }
  } catch (error) {
    showToast("❌ Không thể kết nối tới Backend.");
  } finally {
    setTimeout(() => {
      if (btn) {
        btn.textContent = 'Gửi Tin nhắn';
        btn.style.background = '';
        btn.disabled = false;
      }
    }, 4000);
  }
}

// ── Toast Notification ────────────────────────────────────────
function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.querySelector('.toast-msg').textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 5000);
}

// ── CV Download ───────────────────────────────────────────────
function downloadCV() {
  showToast('📄 Đang bắt đầu tải CV... (hãy thay bằng file CV thực tế của bạn)');
}

// ── Request Demo ──────────────────────────────────────────────
function requestDemo() {
  navigateTo('contact');
  setTimeout(() => {
    const select = document.getElementById('inquiry-type');
    if (select) select.value = 'live-demo';
  }, 300);
}

// ── TitleBar Nav Active on scroll ────────────────────────────
window.addEventListener('scroll', () => {
  const nav = document.getElementById('main-nav');
  if (nav) nav.style.boxShadow = window.scrollY > 20 ? '0 2px 20px rgba(0,0,0,0.15)' : '';
});

// ── Bar chart animation on view ───────────────────────────────
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.bar').forEach((bar, i) => {
        const h = bar.style.height;
        bar.style.height = '0';
        setTimeout(() => { bar.style.height = h; bar.style.transition = 'height 0.8s ease'; }, i * 80);
      });
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

function observeBarCharts() {
  document.querySelectorAll('.bar-chart').forEach(bc => barObserver.observe(bc));
}
setTimeout(observeBarCharts, 500);
