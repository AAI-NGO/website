// ============================================================
// File Library — reads data/files-manifest.json
//
// HOW THIS WORKS (GitHub-as-CMS):
//   1. You add a file to the /workshop-materials or /media-gallery
//      folder in this repo (drag-and-drop on github.com, or git push).
//   2. You add one entry for it in data/files-manifest.json
//      (name, path, date, size, type).
//   3. Commit. GitHub Pages redeploys automatically (~1 min).
//   4. The button below always shows the most recent file by date,
//      and the dropdown lists everything — no server, no login,
//      no extra moving parts. Your GitHub write access IS the
//      admin permission.
// ============================================================

const ICONS = {
  pdf: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="file-ic"><path d="M7 2h7l5 5v13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M14 2v5h5" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M8.5 17v-4.2h1.1c.8 0 1.4.6 1.4 1.4v1.4c0 .8-.6 1.4-1.4 1.4H8.5Zm4.3 0v-4.2h2.2M15.5 14.8h-1.4M8.5 12.8H7" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>`,
  image: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="file-ic"><rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="1.6"/><circle cx="8.5" cy="8.5" r="1.6" stroke="currentColor" stroke-width="1.4"/><path d="M21 16.5 16.5 12 7 21" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>`,
  video: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="file-ic"><rect x="2.5" y="5.5" width="14" height="13" rx="2" stroke="currentColor" stroke-width="1.6"/><path d="M16.5 10.2 21 7.5v9l-4.5-2.7" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>`,
  doc: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="file-ic"><path d="M7 2h7l5 5v13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M14 2v5h5M8 12h8M8 16h8M8 8h3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>`,
  generic: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="file-ic"><path d="M7 2h7l5 5v13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M14 2v5h5" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>`
};

function iconFor(type) {
  if (type === 'pdf') return ICONS.pdf;
  if (['jpg','jpeg','png','gif','webp','image'].includes(type)) return ICONS.image;
  if (['mp4','mov','webm','video'].includes(type)) return ICONS.video;
  if (['doc','docx'].includes(type)) return ICONS.doc;
  return ICONS.generic;
}

function fmtDate(iso) {
  const d = new Date(iso + 'T00:00:00');
  if (isNaN(d)) return iso;
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

async function loadManifest() {
  try {
    if (typeof fetch !== 'function') {
      throw new Error('fetch API not available in this browser');
    }
    const res = await fetch('data/files-manifest.json', { cache: 'no-store' });
    if (!res.ok) throw new Error('manifest not found');
    return await res.json();
  } catch (e) {
    console.warn('Could not load file manifest:', e);
    return { 'workshop-materials': [], 'media-gallery': [] };
  }
}

function allFilesFlat(manifest) {
  const out = [];
  Object.keys(manifest).forEach(folder => {
    (manifest[folder] || []).forEach(f => out.push({ ...f, folder }));
  });
  return out.sort((a, b) => new Date(b.date) - new Date(a.date));
}

function buildLatestButton(manifest) {
  const btn = document.getElementById('latestFileBtn');
  const dropdown = document.getElementById('fileDropdown');
  if (!btn || !dropdown) return;

  const flat = allFilesFlat(manifest);

  if (flat.length === 0) {
    btn.querySelector('.lb-label').textContent = 'No files yet';
    btn.querySelector('.lb-name').textContent = 'Check back soon';
    btn.querySelector('.file-ic-slot').innerHTML = ICONS.generic;
    dropdown.innerHTML = `<div class="fd-empty">Nothing uploaded yet — admin can add files to the repo to populate this list.</div>`;
    return;
  }

  const latest = flat[0];
  btn.querySelector('.lb-label').textContent = `Latest upload · ${latest.folder.replace('-', ' ')}`;
  btn.querySelector('.lb-name').textContent = latest.name;
  btn.querySelector('.file-ic-slot').innerHTML = iconFor(latest.type);
  btn.href = latest.path;
  btn.setAttribute('download', '');

  dropdown.innerHTML = flat.map(f => `
    <a href="${f.path}" download>
      ${iconFor(f.type)}
      <span>${f.name}</span>
      <span class="fd-date">${fmtDate(f.date)}</span>
    </a>
  `).join('');
}

function buildLibraryTable(manifest) {
  const tableEl = document.getElementById('fileTable');
  const tabs = document.querySelectorAll('.lib-tab');
  if (!tableEl) return;

  function render(folder) {
    const files = (manifest[folder] || []).slice().sort((a, b) => new Date(b.date) - new Date(a.date));
    if (files.length === 0) {
      tableEl.innerHTML = `
        <div class="lib-empty-state">
          <svg class="ic" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="1.4"><path d="M7 2h7l5 5v13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z"/><path d="M14 2v5h5"/></svg>
          <p>No files in this folder yet. New workshop kits and event media will appear here as soon as they're added.</p>
        </div>`;
      return;
    }
    tableEl.innerHTML = files.map(f => `
      <div class="file-row">
        ${iconFor(f.type)}
        <div>
          <div class="f-name">${f.name}</div>
          <div class="f-meta">${(f.type || '').toUpperCase()} · ${f.size || ''}</div>
        </div>
        <div class="f-date">${fmtDate(f.date)}</div>
        <a class="f-dl" href="${f.path}" download>Download ↓</a>
      </div>
    `).join('');
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      render(tab.dataset.folder);
    });
  });

  const activeTab = document.querySelector('.lib-tab.active');
  const initial = (activeTab && activeTab.dataset.folder) || 'workshop-materials';
  render(initial);
}

function wireDropdownToggle() {
  const btnGroup = document.querySelector('.latest-btn-group');
  const chevTrigger = document.getElementById('dropdownTrigger');
  const dropdown = document.getElementById('fileDropdown');
  if (!chevTrigger || !dropdown) return;

  chevTrigger.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropdown.classList.toggle('open');
    chevTrigger.classList.toggle('open');
  });

  document.addEventListener('click', (e) => {
    if (btnGroup && !btnGroup.contains(e.target)) {
      dropdown.classList.remove('open');
      chevTrigger.classList.remove('open');
    }
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  if (!document.getElementById('latestFileBtn') && !document.getElementById('fileTable')) return;
  const manifest = await loadManifest();
  buildLatestButton(manifest);
  buildLibraryTable(manifest);
  wireDropdownToggle();
});
