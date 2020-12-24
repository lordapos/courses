document.querySelectorAll('.price').forEach(function (node) {
    node.textContent = new Intl.NumberFormat('en-US', {
        currency: 'USD',
        style: 'currency'
    }).format(node.textContent)
})

const $card = document.querySelector('#card')
if ($card) {
    $card.addEventListener('click', function (event) {
        if (event.target.classList.contains('js-remove')) {
            const id = event.target.dataset.id

            fetch('/card/remove/' + id, {
                method: 'delete'
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