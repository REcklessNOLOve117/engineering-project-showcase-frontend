(() => {
  'use strict';
  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('.main-nav');
  const closeMenu = () => {
    if (!menuButton || !navigation) return;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', '打开导航菜单');
    navigation.dataset.open = 'false';
  };
  if (menuButton && navigation) {
    menuButton.addEventListener('click', () => {
      const open = menuButton.getAttribute('aria-expanded') !== 'true';
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? '关闭导航菜单' : '打开导航菜单');
      navigation.dataset.open = String(open);
    });
    navigation.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
        closeMenu(); menuButton.focus();
      }
    });
    window.matchMedia('(min-width: 601px)').addEventListener('change', closeMenu);
  }
  document.querySelectorAll('[data-demo]').forEach(link => {
    const destination = window.PROJECT_DEMOS?.[link.dataset.demo];
    if (destination) link.href = destination;
  });
  document.querySelectorAll('[data-route-tabs]').forEach(widget => {
    const tabs = [...widget.querySelectorAll('.route-tab')];
    const panels = [...widget.querySelectorAll('.route-panel')];
    const select = (tab, focus = false) => {
      tabs.forEach(item => {
        const active = item === tab;
        item.setAttribute('aria-selected', String(active)); item.tabIndex = active ? 0 : -1;
      });
      panels.forEach(panel => { panel.hidden = panel.id !== tab.getAttribute('aria-controls'); });
      if (focus) tab.focus();
    };
    widget.querySelector('.route-tabs').hidden = false;
    widget.querySelector('.route-panels').classList.remove('no-js');
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => select(tab));
      tab.addEventListener('keydown', event => {
        let next;
        if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
        if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = tabs.length - 1;
        if (next !== undefined) { event.preventDefault(); select(tabs[next], true); }
      });
    });
    if (tabs.length) select(tabs[0]);
  });
  const zoomButtons = document.querySelectorAll('.image-zoom');
  if (zoomButtons.length && typeof HTMLDialogElement !== 'undefined') {
    const dialog = document.createElement('dialog');
    dialog.className = 'image-dialog';
    dialog.setAttribute('aria-labelledby', 'image-dialog-title');
    dialog.innerHTML = '<div class="dialog-header"><p class="dialog-title" id="image-dialog-title"></p><button class="dialog-close" type="button" aria-label="关闭图片预览" autofocus>×</button></div><div class="dialog-body"><img alt=""></div>';
    document.body.append(dialog);
    const image = dialog.querySelector('img');
    const title = dialog.querySelector('.dialog-title');
    let opener;
    zoomButtons.forEach(button => button.addEventListener('click', () => {
      const source = button.querySelector('img');
      opener = button;
      image.src = source.currentSrc || source.src;
      image.alt = source.alt;
      title.textContent = button.dataset.caption || source.alt;
      document.body.classList.add('modal-open');
      dialog.showModal();
    }));
    dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    });
    dialog.addEventListener('close', () => {
      document.body.classList.remove('modal-open');
      opener?.focus({preventScroll:true});
    });
  }
  document.querySelectorAll('.mobile-toc a').forEach(link => link.addEventListener('click', () => {
    link.closest('details').open = false;
    const heading = document.getElementById(link.hash.slice(1))?.querySelector('h2');
    if (heading) {
      heading.tabIndex = -1;
      requestAnimationFrame(() => heading.focus({preventScroll:true}));
    }
  }));
  if ('IntersectionObserver' in window) {
    const sections = [...document.querySelectorAll('.article-section[id]')];
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a,b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (!visible.length) return;
      document.querySelectorAll('.toc-links a').forEach(link => {
        if (link.getAttribute('href') === '#' + visible[0].target.id) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }, {rootMargin:'-105px 0px -55% 0px',threshold:0});
    sections.forEach(section => observer.observe(section));
  }
})();
