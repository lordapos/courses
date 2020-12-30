document.querySelectorAll('.price').forEach(function (node) {
    node.textContent = new Intl.NumberFormat('en-US', {
        currency: 'USD',
        style: 'currency'
    }).format(node.textContent)
})

const toDate = date => {
    return new Intl.DateTimeFormat('en-US', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }).format(new Date(date))
}

document.querySelectorAll('.date').forEach(function (node) {
    node.textContent = toDate(node.textContent)
})

const $card = document.querySelector('#card')
if ($card) {
    $card.addEventListener('click', function (event) {
        if (event.target.classList.contains('js-remove')) {
            const id = event.target.dataset.id
            const csrf = event.target.dataset.csrf

            fetch('/card/remove/' + id, {
                method: 'delete',
                headers: {
                    'X-XSRF-TOKEN': csrf
                }
            }).then(res => res.json())
                .then(card => {
                    if (card.courses.length) {
                        const html = card.courses.map(c => {
                            return `
              <tr>
                <td>${c.title}</td>
                <td>${c.count}</td>
                <td>
                  <button class="delete js-remove" data-id="${c._id}">Delete</button>
                </td>
              </tr>
              `
                        }).join('')
                        $card.querySelector('tbody').innerHTML = html
                        $card.querySelector('.price').textContent = toCurrency(card.price)
                    } else {
                        $card.innerHTML = '<div class="basket__inner">\n' +
                            '            <h1>Basket</h1>\n' +
                            '            <div class="basket__content">\n' +
                            '                \n' +
                            '                    <p class="basket__empty">Empty</p>\n' +
                            '                \n' +
                            '            </div>\n' +
                            '        </div>'
                    }
                })
        }
    })
}

const $login = document.querySelector('.auth__tabs #login');
const $reg = document.querySelector('.auth__tabs #registration');

if ($login) {
    $login.addEventListener('click', function (event) {
        $reg.classList.remove("auth__tabs__item--active");
        $login.classList.add("auth__tabs__item--active");
        document.querySelector('#login-tab').classList.add("auth__tabs__content__item--active");
        document.querySelector('#registration-tab').classList.remove("auth__tabs__content__item--active");
    })
}

if ($reg) {
    $reg.addEventListener('click', function (event) {
        $reg.classList.add("auth__tabs__item--active");
        $login.classList.remove("auth__tabs__item--active");
        document.querySelector('#registration-tab').classList.add("auth__tabs__content__item--active");
        document.querySelector('#login-tab').classList.remove("auth__tabs__content__item--active");
    })
}