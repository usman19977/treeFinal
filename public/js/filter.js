let accordions = document.querySelectorAll('.accordion');
let colors = document.getElementsByClassName('spotColor');
let pages = document.getElementsByClassName('page');

let searchForm = document.getElementById('search-form');
let prevBtn = document.getElementById('prev_btn');
let nextBtn = document.getElementById('next_btn');

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

console.log('prevBtn', prevBtn);
prevBtn?.addEventListener('click', (e) => {
  const length = Array.from(pages).length;
  let newPage = params.page ? (+params.page - 1 < 1 ? 1 : +params.page - 1) : 1;
  console.log('newPage', newPage);

  let qs = Qs.parse(window.location.search.split('?')[1]);

  if (+qs.page === +newPage) return;

  if (qs.page) qs.page = +newPage;
  else qs.page = newPage;

  let query = `?${Qs.stringify(qs)}`;
  console.log('query', query);
  window.location.href = `${window.location.origin}${window.location.pathname}${query}`;
});

nextBtn?.addEventListener('click', (e) => {
  const length = Array.from(pages).length;
  console.log('length', length);
  console.log('params.page', params.page);

  let newPage = params.page
    ? +params.page + 1 > length
      ? length
      : +params.page + 1
    : 2 > length
    ? 1
    : 2;
  console.log('newPage', newPage);

  if (newPage === 1) return;

  let qs = Qs.parse(window.location.search.split('?')[1]);

  if (+qs.page === +newPage) return;
  if (qs.page) qs.page = newPage;
  else qs.page = newPage;

  let query = `?${Qs.stringify(qs)}`;
  console.log('query', query);
  window.location.href = `${window.location.origin}${window.location.pathname}${query}`;
});

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log('submitted');
  let searchInput = document.getElementById('search');
  if (!searchInput.value) {
    let query =
      window.location.search && !window.location.search.includes('search')
        ? `${window.location.search}`
        : ``;
    window.location.href = `${window.location.origin}${window.location.pathname}${query}`;
  } else {
    let query =
      window.location.search && !window.location.search.includes('search')
        ? `${window.location.search}&search=${searchInput.value}`
        : `?search=${searchInput.value}`;
    window.location.href = `${window.location.origin}/products${query}`;
  }
});

let active = params.page ? params.page - 1 : 0;
pages[active]?.classList.add('active');

accordions.forEach((accordion) => {
  Array.from(accordion.children).forEach((wrapper) => {
    if (wrapper.classList.contains('show')) {
      wrapper.querySelector('div').style.maxHeight =
        wrapper.querySelector('div').scrollHeight + 30 + 'px';
    }
    wrapper.querySelector('span').addEventListener('click', (e) => {
      let span = e.target;
      let wrapper = span.parentElement;
      let div = span.nextElementSibling;
      wrapper.classList.toggle('show');
      if (wrapper.classList.contains('show')) {
        div.style.maxHeight = div.scrollHeight + 30 + 'px';
      } else {
        div.style.maxHeight = null;
      }
      Array.from(accordion.children).forEach((w) => {
        if (w != wrapper) {
          w.classList.remove('show');
          w.querySelector('div').style.maxHeight = null;
        }
      });
    });
  });
});

Array.from(colors).forEach((color) => {
  color.addEventListener('click', (e) => {
    e.stopPropagation();
    e.preventDefault();
    let { name } = e.currentTarget.dataset;
    console.log('name', name);

    let qs = Qs.parse(window.location.search.split('?')[1]);

    if (qs.color) qs.color = name;
    else qs.color = name;
    if (qs.page) qs.page = 1;
    let query = `?${Qs.stringify(qs)}`;
    console.log('query', query);
    window.location.href = `${window.location.origin}${window.location.pathname}${query}`;
  });
});

Array.from(pages).forEach((page) => {
  page.addEventListener('click', (e) => {
    e.stopPropagation();
    e.preventDefault();
    let { name } = e.currentTarget.dataset;
    console.log('name', name);
    let qs = Qs.parse(window.location.search.split('?')[1]);
    qs.page = name;
    let query = `?${Qs.stringify(qs)}`;
    console.log('query', query);
    window.location.href = `${window.location.origin}${window.location.pathname}${query}`;
  });
});
