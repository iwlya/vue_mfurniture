import { defineStore } from 'pinia'

export const useCatalogStore = defineStore('catalog', {
  state: () => ({
    items: JSON.parse(localStorage.getItem('catalog') || '[]'),
    nextId: parseInt(localStorage.getItem('catalog_next_id') || '1'),
  }),

  actions: {
    addItem(item) {
      item.id = this.nextId++
      this.items.push(item)
      this.save()
    },
    updateItem(id, updated) {
      const index = this.items.findIndex((i) => i.id === id)
      if (index !== -1) {
        this.items[index] = { ...this.items[index], ...updated }
        this.save()
      }
    },
    deleteItem(id) {
      this.items = this.items.filter((i) => i.id !== id)
      this.save()
    },
    save() {
      localStorage.setItem('catalog', JSON.stringify(this.items))
      localStorage.setItem('catalog_next_id', this.nextId.toString())
    },
  },
})
