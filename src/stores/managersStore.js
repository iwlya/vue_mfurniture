import { defineStore } from 'pinia'

export const useManagersStore = defineStore('managers', {
  state: () => ({
    managers: JSON.parse(localStorage.getItem('managers') || '[]'),
    nextId: parseInt(localStorage.getItem('manager_next_id') || '1'),
  }),

  actions: {
    addManager(manager) {
      manager.id = this.nextId++
      this.managers.push(manager)
      this.save()
    },
    updateManager(id, updated) {
      const index = this.managers.findIndex((m) => m.id === id)
      if (index !== -1) {
        this.managers[index] = { ...this.managers[index], ...updated }
        this.save()
      }
    },
    deleteManager(id) {
      this.managers = this.managers.filter((m) => m.id !== id)
      this.save()
    },
    save() {
      localStorage.setItem('managers', JSON.stringify(this.managers))
      localStorage.setItem('manager_next_id', this.nextId.toString())
    },
  },
})
