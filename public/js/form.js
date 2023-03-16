// ======== OPENING AND CLOSTING FORM ==========
$(document).ready(function () {
  const openModalButtons = document.querySelectorAll('[data-modal-target]');
  const closeModalButtons = document.querySelectorAll('[data-close-button]');
  const overlay = document.getElementById('overlay');
  const messagesContainer = document.getElementById('chat');
  console.log('openModalButtons', openModalButtons);
  $(document).ready(function () {
    const openBtn = document.querySelectorAll('[data-modal-target]');
    console.log('openModalButtons', openModalButtons);
    openBtn.forEach((button) => {
      button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget);
        console.log('modal', modal);
        openModal(modal);
      });
    });
    document.body.addEventListener('click', (e) => {
      console.log('e.currentTarget', e.currentTarget);
      console.log('e.target', e.target);
      if (e.currentTarget.id === 'search') return;
      document.getElementById('search-container').classList.remove('active');
    });
    document.getElementById('start-chat').addEventListener('click', () => {
      document.getElementById('start-chat').style.display = 'none';
      document.getElementById('overlay').classList.remove('active');
    });
    const closeBtns = document.querySelectorAll('[data-close-button]');
    closeBtns.forEach((button) => {
      button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        console.log('modal', modal);
        console.log('calling closing modal2');
        $('.paypal-buttons').remove();
        document.getElementById('start-chat').style.display = 'block';
        closeModal(modal);
      });
    });
    // const images = document.getElementsByClassName('demo-content');
    // console.log('images', images);
    // Array.from(images).forEach((img) => {
    //   img.addEventListener('click', (e) => {
    //     const { src } = e.target.dataset;
    //     const tmp = src;
    //     console.log('img', img);
    //     const mainImage = document.getElementById('main-image');
    //     console.log('mainImage.src', mainImage.src);
    //     img.style.backgroundImage = `url(${mainImage.src})`;
    //     img.dataset.src = mainImage.src;
    //     console.log('img.style.backgroundImage', img.style.backgroundImage);
    //     mainImage.src = tmp;
    //   });
    // });

    const search = document.getElementById('search');
    console.log('search', search);
    search.addEventListener('keyup', async (e) => {
      const value = e.target.value;
      console.log('e.target.keyCode', e.target.keyCode);

      if (e.target.keyCode === 13) return;
      try {
        let url = `${window.location.origin}${window.location.pathname}`;

        let reg = new RegExp(/(privacy|terms|about|returns)/);
        if (reg.exec(url) !== null) url = `${window.location.origin}/searchAll`;

        console.log('url', url);
        if (
          window.location.pathname === '/' ||
          window.location.pathname === '/products' ||
          window.location.pathname.includes('details')
        )
          url = `${window.location.origin}/searchAll`;

        console.log('url', url);

        const res = await axios.post(url, {
          search: value,
        });
        console.log('res', res.data);

        let autocompleteContainer = document.getElementById('autocom-box');
        autocompleteContainer.innerHTML = '';

        res.data.products.slice(0, 10).forEach((el) => {
          let li = document.createElement('li');
          li.textContent = el.product_name;
          li.style.cursor = 'pointer';
          li.dataset.id = el.product_id;
          li.addEventListener('click', async (e) => {
            console.log('url', url);
            const id = e.target.dataset.id;
            window.location.href = `${window.location.origin}/details/${el.category}/${id}`;
          });
          autocompleteContainer.appendChild(li);
        });

        document.getElementById('search-container').classList.add('active'); //show autocomplete box
      } catch (err) {
        console.log('err', err);
        toastr.error(err.message || 'Something Went Wrong');
      } finally {
      }
    });
  });
  function openModal(modal) {
    if (modal == null) return;
    console.log('modal', modal);
    modal.classList.add('active');
    overlay?.classList.add('active');
  }
  function closeModal(modal) {
    $('.paypal-buttons').remove();
    if (modal == null) return;
    modal.classList.remove('active');
    overlay.classList.remove('active');
  }
  // ============== SAVING TO LOCAL STORAGE ==============
  $(document).ready(function () {
    const form = document.getElementById('myModal');
    console.log('form', form);
    form?.addEventListener('submit', (e) => {
      console.log('submitted');
      e.preventDefault();
      const price = form.product_price.value * 1;
      localStorage.setItem('price', price);
      const product = form.product.value.trim();
      localStorage.setItem('product', product);
      const product_sku = form.product_sku.value.trim();
      localStorage.setItem('product_sku', product_sku);
      const product_id = form.product_id.value.trim();
      localStorage.setItem('product_id', product_id);
      const name = form.name.value.trim();
      localStorage.setItem('name', name);
      const company = form.company.value.trim();
      localStorage.setItem('company', company);
      const email = form.email.value.trim();
      localStorage.setItem('email', email);
      const phone = form.phone.value.trim();
      localStorage.setItem('phone', phone);
      const quantity = form.quantity.value.trim();
      localStorage.setItem('quantity', quantity);
      const date = form.date.value.trim();
      localStorage.setItem('date', date);
      const message = form.message.value.trim();
      localStorage.setItem('message', message);
      const formData = new FormData();
      formData.append('name', name);
      formData.append('company', company);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('quantity', quantity);
      formData.append('date', date);
      formData.append('product', product);
      formData.append('product_sku', product_sku);
      formData.append('product_id', product_id);
      formData.append('message', form.message.value.trim());
      for (let i = 0; i < files.files.length; i++) {
        formData.append('files', files.files[i]);
      }
      let formContainerrr = document.getElementById('form-container');
      document.getElementById('product-name').style.display = 'none';
      console.log('formContainerrr', formContainerrr);
      formContainerrr.style.display = 'none';
      fetch('http://treehuggerbranding.com/sendemail', {
        method: 'POST',
        body: formData,
      })
        .then((res) => {
          console.log(res);
          setTimeout(() => {
            history.go(-1);
          }, 2000);
          document.getElementById('response').style.display = 'block';
          form.style.height = 'fit-content';
          form.style.paddingBlock = '5rem';
          document.getElementById('my-close').style.display = 'none';
        })
        .catch((err) => ('Error occured', err));
      return;
    });
    const form2 = document.getElementById('our-modal');
    console.log('form2', form2);
    form2?.addEventListener('submit', (e) => {
      console.log('submitted');
      e.preventDefault();
      console.log(
        'form2.product_price.value *1',
        form2.product_price.value * 1
      );
      const price = form2.product_price.value * 1;
      localStorage.setItem('price', price);
      const product = form2.product.value.trim();
      localStorage.setItem('product', product);
      const product_sku = form2.product_sku.value.trim();
      localStorage.setItem('product_sku', product_sku);
      const product_id = form2.product_id.value.trim();
      localStorage.setItem('product_id', product_id);
      const name = form2.name.value.trim();
      localStorage.setItem('name', name);
      const company = form2.company.value.trim();
      localStorage.setItem('company', company);
      const email = form2.email.value.trim();
      localStorage.setItem('email', email);
      const phone = form2.phone.value.trim();
      localStorage.setItem('phone', phone);
      const address_line_1 = form2.address_line_1.value.trim();
      localStorage.setItem('address_line_1', address_line_1);
      const address_line_2 = form2.address_line_2.value.trim();
      localStorage.setItem('address_line_2', address_line_2);
      const city = form2.city.value.trim();
      localStorage.setItem('city', city);
      const postcode = form2.postcode.value.trim();
      localStorage.setItem('postcode', postcode);
      const formData = new FormData();
      formData.append('name', name);
      formData.append('company', company);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('product', product);
      formData.append('product_sku', product_sku);
      formData.append('product_id', product_id);
      formData.append('city', city);
      formData.append('postcode', postcode);
      formData.append('address_line_2', address_line_2);
      formData.append('address_line_1', address_line_1);
      let formContainer = document.getElementById('form-container2');
      console.log('formContainer', formContainer);
      formContainer.style.display = 'none';
      console.log('formContainer.style', formContainer.style);
      let paypalBtn = document.getElementById('paypal-button-container2');
      console.log('paypalBtn', paypalBtn);
      paypalBtn.style.display = 'block';
      paypal
        .Buttons({
          createOrder: function (data, actions) {
            console.log('data', data);
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: price,
                  },
                },
              ],
            });
          },
          onApprove: function (data, actions) {
            document.getElementById('product-name2').style.display = 'none';
            console.log('data2', data);
            // This function captures the funds from the transaction.
            document.getElementById('response2').style.display = 'block';
            paypalBtn.style.display = 'none';
            form2.style.height = 'fit-content';
            form2.style.paddingBlock = '6rem';
            form2.style.width = '300px';
            document.getElementById('our-close').style.display = 'none';
            actions.order.capture().then(function (details) {
              // This function shows a transaction success message to your buyer.
              fetch('http://treehuggerbranding.com/sendemail', {
                method: 'POST',
                body: formData,
              })
                .then((res) => {})
                .catch((err) => ('Error occured', err))
                .finally(() => {
                  setTimeout(() => {
                    history.go(-1);
                  }, 2000);
                });
            });
          },
          style: {
            layout: 'vertical',
            color: 'blue',
            shape: 'rect',
            label: 'paypal',
          },
        })
        .render('#paypal-button-container2');
      form.reset();
    });
    overlay?.addEventListener('click', () => {
      const modals = document.getElementsByClassName('modal');
      document.getElementById('form-container2').style.display = 'block';
      document.getElementById('paypal-button-container2').style.display =
        'none';
      Array.from(modals)?.forEach((modal) => {
        console.log('calling closing modal1');
        closeModal(modal);
      });
    });
  });
  const adminForm = document.getElementById('admin');
  const password = document.getElementById('password');
  const username = document.getElementById('username');
  adminForm.addEventListener('submit', async (e) => {
    console.log('submitted');
    e.preventDefault();
    try {
      const res = await axios.post('/chat', {
        password: password.value,
        username: username.value,
      });
      console.log('res', res);
      closeModal(adminForm);
      const contacts = document.getElementById('contacts');
      const { chats, username: resUsername, messages } = res.data;
      document.getElementById('usernameValue').textContent = resUsername;
      document.getElementById('userIdValue').textContent = res.data.userId;
      res.data.chats.forEach((chat) => {
        const main = document.createElement('div');
        main.classList.add('contact');
        main.dataset.chatId = chat.id;
        main.addEventListener('click', async () => {
          try {
            console.log('clicked');
            const res = await axios.get(`/chats/${chat.id}`);
            console.log('res', res);
            const { chat: resChat, messages: resMessages } = res.data;
            const contactBar = document.getElementById('contact-bar');
            const pic = document.createElement('img');
            pic.src = `https://ui-avatars.com/api/?rounded=true&name=${chat.username}`;
            pic.classList.add('pic');
            const name = document.createElement('div');
            name.textContent = res.data.isAdmin ? 'Admin' : chat.username;
            name.classList.add('name');
            const close = document.createElement('i');
            close.classList.add('fas');
            close.classList.add('close-icon');
            close.classList.add('fa-close');
            close.addEventListener('click', () => {
              chatContainer.classList.remove('showing');
              chatContainer.classList.add('notShowing');
              console.log('here');
              document.getElementById('start-chat').style.display = 'block';
            });
            contactBar.innerHTML = '';
            contactBar.appendChild(pic);
            contactBar.appendChild(name);
            contactBar.appendChild(close);
            messagesContainer.innerHTML = '';
            res.data.messages.forEach((msg) => {
              handleMessage(
                msg,
                document.getElementById('userIdValue').textContent.trim()
              );
            });
          } catch (error) {
            console.log(error);
            toastr.error(error.message || 'Something Went Wrong!');
          }
        });
        const pic = document.createElement('img');
        pic.src = `https://ui-avatars.com/api/?rounded=true&name=${
          res.data.isAdmin ? 'A' : chat.username
        }`;
        pic.classList.add('pic');
        const name = document.createElement('div');
        name.textContent = res.data.isAdmin ? 'Admin' : chat.username;
        name.classList.add('name');
        main.appendChild(pic);
        main.appendChild(name);
        contacts.appendChild(main);
      });
      const chatContainer = document.getElementById('chat-messages');
      const contactBar = document.getElementById('contact-bar');
      const pic = document.createElement('img');
      pic.src = `https://ui-avatars.com/api/?rounded=true&name=${
        res.data.isAdmin ? 'A' : chats[0]?.username
      }`;
      pic.classList.add('pic');
      const name = document.createElement('div');
      name.textContent = res.data.isAdmin ? 'Admin' : chats[0]?.username;
      name.classList.add('name');
      const close = document.createElement('i');
      close.classList.add('fas');
      close.classList.add('close-icon');
      close.classList.add('fa-close');
      close.addEventListener('click', () => {
        chatContainer.classList.remove('showing');
        chatContainer.classList.add('notShowing');
        console.log('here');
        document.getElementById('start-chat').style.display = 'block';
      });
      contactBar.appendChild(pic);
      contactBar.appendChild(name);
      contactBar.appendChild(close);
      messagesContainer.innerHTML = '';
      messages.forEach((msg) => {
        handleMessage(msg, res.data.userId);
      });
      if (res.data.isAdmin) {
        document.getElementById('contacts').classList.add('not-showing');
      }
      chatContainer.classList.remove('notShowing');
      chatContainer.classList.add('showing');
      var chat = document.getElementById('chat');
      chat.scrollTop = chat.scrollHeight - chat.clientHeight;
    } catch (err) {
      console.log('err', err);
      toastr.error(
        err.response?.data?.message || err.message || 'Something Went Wrong!'
      );
    } finally {
    }
  });
  const handleMessage = (msg, userId) => {
    console.log('userId', userId);
    console.log('msg.userId', msg.userId);
    const message = document.createElement('div');
    message.classList.add('message');
    message.classList.add(+msg.userId === +userId ? 'parker' : 'start');
    message.textContent = msg.message;
    messagesContainer.appendChild(message);
  };
});
