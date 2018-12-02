let app = {
  tagName: 'div',
  props: {
    id: 'app'
  },
  children: [
    {
      tagName: 'h3',
      props: {
        className: 'title'
      },
      children: [
        'Simple Vue'
      ]
    }, {
      tagName: 'ul',
      props: {
        className: 'list'
      },
      children: [
        {
          tagName: 'li'
        },
        {
          tagName: 'li'
        },
        {
          tagName: 'li'
        }
      ]
    }
  ]
}
let vm = new Vue({
  el: '#app',
  data: {
    price: 5,
    count: 2
  },
  computed: {
    total () {
      return this.price * this.count
    }
  },
  render: h => h(app)
})
console.log('price:', vm.price)
console.log('count:', vm.count)
console.log('total:', vm.total)