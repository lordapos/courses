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
                    console.log(card)
                })
        }
    })
}