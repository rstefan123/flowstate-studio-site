(function () {
  var nav = document.querySelector('.nav');
  var onScroll = function () { nav.classList.toggle('stuck', window.scrollY > 8); };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  var burger = document.querySelector('.burger');
  var menu = document.querySelector('.menu');
  burger.addEventListener('click', function () {
    var open = menu.classList.toggle('open');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  var items = document.querySelectorAll('.rv');
  if (!('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      var el = e.target;
      el.style.transitionDelay = (el.dataset.d || 0) + 'ms';
      el.classList.add('in');
      io.unobserve(el);
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
  items.forEach(function (el) { io.observe(el); });
})();

// item-media carousels: prev/next cycle through an item's photos
(function () {
  // fetch every slide as soon as its carousel nears the viewport, so the
  // arrows always land on a ready image instead of a still-loading one
  var warm = function (car) {
    car.querySelectorAll('img[loading]').forEach(function (im) { im.removeAttribute('loading'); });
  };
  if ('IntersectionObserver' in window) {
    var wio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        warm(e.target); wio.unobserve(e.target);
      });
    }, { rootMargin: '600px 0px' });
    document.querySelectorAll('.item-media.car').forEach(function (c) { wio.observe(c); });
  } else {
    document.querySelectorAll('.item-media.car').forEach(warm);
  }
  document.querySelectorAll('.item-media.car').forEach(function (car) {
    var imgs = car.querySelectorAll('img');
    var dots = car.querySelectorAll('.car-dots i');
    var i = 0;
    var show = function (n) {
      imgs[i].classList.remove('on'); dots[i].classList.remove('on');
      i = (n + imgs.length) % imgs.length;
      imgs[i].classList.add('on'); dots[i].classList.add('on');
      imgs[i].removeAttribute('loading');   // load it now, it is on screen
    };
    car.querySelector('.car-prev').addEventListener('click', function () { show(i - 1); });
    car.querySelector('.car-next').addEventListener('click', function () { show(i + 1); });
  });
})();
