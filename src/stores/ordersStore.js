// import { defineStore } from 'pinia'

// export const useOrdersStore = defineStore('orders', {
//   state: () => ({
//     orders: [],
//   }),

//   getters: {
//     activeOrders(state) {
//       return state.orders.filter((o) => !o.isArchived)
//     },
//     archivedOrders(state) {
//       return state.orders.filter((o) => o.isArchived)
//     },
//   },

//   actions: {
//     load() {
//       const saved = localStorage.getItem('orders')
//       if (saved) this.orders = JSON.parse(saved)
//     },

//     save() {
//       localStorage.setItem('orders', JSON.stringify(this.orders))
//     },

//     addOrder(order) {
//       order.id = Date.now()
//       this.orders.push(order)
//       this.save()
//     },

//     deleteOrder(id) {
//       this.orders = this.orders.filter((o) => o.id !== id)
//       this.save()
//     },

//     updateStatus(orderId, newStatus) {
//       const order = this.orders.find((o) => o.id === orderId)
//       if (!order) return

//       if (newStatus === 'Завершён') {
//         const allReady = order.items.every((item) => item.status === 'Готов')
//         if (!allReady) {
//           alert('Нельзя завершить заказ: не все позиции готовы.')
//           return
//         }
//         order.status = newStatus
//         order.isArchived = true
//       } else {
//         order.status = newStatus
//       }
//       // this.saveToLocalStorage()
//     },

//     updateOrder(id, updatedOrder) {
//       const index = this.orders.findIndex((o) => o.id === id)
//       if (index !== -1) {
//         this.orders[index] = { ...updatedOrder, id }
//         this.save()
//       }
//     },
//     getOrderById(id) {
//       return this.orders.find((o) => o.id === id)
//     },

//     updateItemStatus(orderId, itemIndex, newStatus) {
//       const order = this.orders.find((o) => o.id === orderId)
//       if (order && order.items[itemIndex]) {
//         order.items[itemIndex].status = newStatus
//         this.save()
//       }
//     },
//   },
// })

// stores/ordersStore.js
import { defineStore } from 'pinia'

export const useOrdersStore = defineStore('orders', {
  state: () => ({
    orders: JSON.parse(localStorage.getItem('orders')) || [],
    nextId: Number(localStorage.getItem('ordersNextId')) || 1,
  }),

  getters: {
    activeOrders(state) {
      return state.orders.filter((o) => !o.isArchived)
    },
    archivedOrders(state) {
      return state.orders.filter((o) => o.isArchived)
    },
    getOrderById: (state) => (id) => {
      return state.orders.find((order) => order.id === id)
    },
  },

  actions: {
    load() {
      const saved = localStorage.getItem('orders')
      if (saved) this.orders = JSON.parse(saved)
    },

    save() {
      localStorage.setItem('orders', JSON.stringify(this.orders))
    },

    addOrder(order) {
      order.id = this.nextId++
      this.orders.push(order)
      this.saveToLocalStorage()
    },

    updateOrder(id, updatedOrder) {
      const index = this.orders.findIndex((o) => o.id === id)
      if (index !== -1) {
        this.orders[index] = { id, ...updatedOrder }
        this.saveToLocalStorage()
      }
    },

    deleteOrder(id) {
      this.orders = this.orders.filter((o) => o.id !== id)
      this.saveToLocalStorage()
    },

    updateStatus(id, newStatus) {
      const order = this.orders.find((o) => o.id === id)
      if (!order) return

      if (newStatus === 'Завершен') {
        const allReady = order.items.every((item) => item.status === 'Готов')
        if (!allReady) {
          alert('Нельзя завершить заказ: не все позиции готовы.')
          return
        }
        order.status = newStatus
        order.isArchived = true
      } else {
        order.status = newStatus
      }

      this.saveToLocalStorage()
    },

    updateItemStatus(orderId, itemIndex, newStatus) {
      const order = this.orders.find((o) => o.id === orderId)
      if (order && order.items[itemIndex]) {
        order.items[itemIndex].status = newStatus
        this.save()
      }
    },

    saveToLocalStorage() {
      localStorage.setItem('orders', JSON.stringify(this.orders))
      localStorage.setItem('ordersNextId', String(this.nextId))
    },
  },
})
