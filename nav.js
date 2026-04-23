document.addEventListener('DOMContentLoaded', () => {

  /* ── Mobile nav ── */
  const toggle = document.querySelector('.nav-toggle');
  const mobile = document.querySelector('.nav-mobile');
  if (toggle && mobile) {
    toggle.addEventListener('click', () => {
      mobile.classList.toggle('open');
      const spans = toggle.querySelectorAll('span');
      const open = mobile.classList.contains('open');
      spans[0].style.transform = open ? 'rotate(45deg) translate(5px,5px)' : '';
      spans[1].style.opacity  = open ? '0' : '';
      spans[2].style.transform = open ? 'rotate(-45deg) translate(4px,-4px)' : '';
    });
    mobile.querySelectorAll('.nav-link').forEach(l =>
      l.addEventListener('click', () => {
        mobile.classList.remove('open');
        toggle.querySelectorAll('span').forEach(s => { s.style.transform=''; s.style.opacity=''; });
      })
    );
  }

  /* ── Scroll reveal ── */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const ro = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); ro.unobserve(e.target); }});
    }, { threshold: 0.06 });
    revealEls.forEach(el => ro.observe(el));
  }

  /* ── Animated stat counters ── */
  document.querySelectorAll('.stat-num[data-target]').forEach(el => {
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      const target = parseFloat(el.dataset.target);
      const suffix = el.dataset.suffix || '';
      const dur = 1200;
      const t0 = performance.now();
      const tick = now => {
        const p = Math.min((now-t0)/dur,1);
        const ease = 1-Math.pow(1-p,3);
        el.textContent = Math.round(target*ease) + suffix;
        if(p<1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      io.unobserve(el);
    }, {threshold:.5});
    io.observe(el);
  });

  /* ── Live date in masthead ── */
  const dateEl = document.getElementById('masthead-date');
  if (dateEl) {
    const d = new Date();
    dateEl.textContent = d.toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'});
  }
});
