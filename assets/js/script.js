document.addEventListener('DOMContentLoaded', function () {
  var navToggle = document.getElementById('navToggle');
  var mobileMenu = document.getElementById('mobileMenu');
  var mmClose = document.getElementById('mmClose');
  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', function () {
      var open = mobileMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
  if (mmClose) mmClose.addEventListener('click', function () { mobileMenu.classList.remove('open'); });
  if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(function (el) {
      el.addEventListener('click', function () { mobileMenu.classList.remove('open'); });
    });
  }
  function fieldIsValid(f){
    if(f.type === 'radio'){
      var group = document.getElementsByName(f.name);
      return Array.prototype.some.call(group, function(r){ return r.checked; });
    }
    if(f.type === 'checkbox'){ return f.checked; }
    return !!(f.value && f.value.trim());
  }
  var wizard = document.getElementById('careWizard');
  if (wizard) {
    var steps = Array.prototype.slice.call(wizard.querySelectorAll('.form-step'));
    var dots = Array.prototype.slice.call(document.querySelectorAll('.step-dot'));
    var current = 0;
    function showStep(i) {
      steps.forEach(function (s, idx) { s.classList.toggle('active', idx === i); });
      dots.forEach(function (d, idx) { d.classList.toggle('done', idx <= i); });
      current = i;
    }
    wizard.querySelectorAll('[data-next]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var errorEl = steps[current].querySelector('.field-error');
        var req = steps[current].querySelectorAll('[required]');
        var valid = true;
        req.forEach(function (f) { if (!fieldIsValid(f)) valid = false; });
        if (!valid) { if (errorEl) errorEl.style.display = 'block'; return; }
        if (errorEl) errorEl.style.display = 'none';
        if (current < steps.length - 1) showStep(current + 1);
      });
    });
    wizard.querySelectorAll('[data-prev]').forEach(function (btn) {
      btn.addEventListener('click', function () { if (current > 0) showStep(current - 1); });
    });
    wizard.addEventListener('submit', function (e) {
      e.preventDefault();
      var req = steps[current].querySelectorAll('[required]');
      var valid = true;
      req.forEach(function (f) { if (!fieldIsValid(f)) valid = false; });
      if (!valid) { var errorEl = steps[current].querySelector('.field-error'); if (errorEl) errorEl.style.display = 'block'; return; }
      wizard.style.display = 'none';
      var prog = document.querySelector('.step-progress');
      if (prog) prog.style.display = 'none';
      var confirm = document.getElementById('wizardConfirm');
      if (confirm) confirm.classList.add('show');
    });
  }
  document.querySelectorAll('form[data-simple-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var req = form.querySelectorAll('[required]');
      var valid = true;
      req.forEach(function (f) { if (!fieldIsValid(f)) valid = false; });
      var errorEl = form.querySelector('.field-error');
      if (!valid) { if (errorEl) errorEl.style.display = 'block'; return; }
      if (errorEl) errorEl.style.display = 'none';
      form.style.display = 'none';
      var confirm = form.parentElement.querySelector('.form-confirm');
      if (confirm) confirm.classList.add('show');
    });
  });
});
