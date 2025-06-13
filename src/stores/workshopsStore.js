import { defineStore } from 'pinia'

export const useWorkshopsStore = defineStore('workshops', {
  state: () => ({
    workshops: JSON.parse(localStorage.getItem('workshops') || '[]'),
  }),

  actions: {
    addWorkshop(workshop) {
      const newWorkshop = {
        id: Date.now(),
        name: workshop.name,
        managerId: workshop.managerId || null,
      }
      this.workshops.push(newWorkshop)
      this.saveToLocalStorage()
    },

    updateWorkshop(id, updatedWorkshop) {
      const index = this.workshops.findIndex((w) => w.id === id)
      if (index !== -1) {
        this.workshops[index] = {
          ...this.workshops[index],
          name: updatedWorkshop.name,
          managerId: updatedWorkshop.managerId || null,
        }
        this.saveToLocalStorage()
      }
    },

    deleteWorkshop(id) {
      this.workshops = this.workshops.filter((w) => w.id !== id)
      this.saveToLocalStorage()
    },

    saveToLocalStorage() {
      localStorage.setItem('workshops', JSON.stringify(this.workshops))
    },
  },
})
