(function () {

   //show current and hide others tabs
   let tabs = document.querySelectorAll('.tabs');
   tabs.forEach(elem => {
      let activeTab = elem.querySelector('.tabs-nav .active').getAttribute('href').slice(1);
      [...elem.querySelector('.tabs-content').children].forEach(section => {
         if (section.id == activeTab) section.style.display = 'block';
         else section.style.display = 'none';
      });
   });

   document.addEventListener('click', e => {
      if (!e.target.parentElement) return;
      if (e.target.tagName != 'A' && !e.target.parentElement.classList.contains('tabs-nav')) return;

      //change active button
      let links = e.target.parentElement.querySelectorAll('a');
      links.forEach(val => val.classList.remove('active'));
      e.target.classList.add('active');

      //show current section
      let activeTab = e.target.getAttribute('href').slice(1);
      [...e.target.closest('.tabs').querySelector('.tabs-content').children].forEach(val => {
         if (val.id == activeTab) val.style.display = 'block';
         else val.style.display = 'none';
      })
   });

})();
