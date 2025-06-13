<template>
  <div class="flex">
    <Sidebar />
    <main class="flex-1 p-6 bg-gray-100">
      <h1 class="text-2xl font-bold mb-4">{{ isEdit ? 'Редактировать цех' : 'Добавить цех' }}</h1>
      <form @submit.prevent="onSubmit" class="space-y-4 bg-white p-6 rounded shadow">
        <div>
          <label class="block font-medium mb-1">Название цеха</label>
          <input v-model="form.name" required class="border p-2 rounded w-full" />
        </div>

        <div>
          <label class="block font-medium mb-1">Начальник (необязательно)</label>
          <select v-model="form.managerId" class="border p-2 rounded w-full">
            <option :value="null">Без начальника</option>
            <option v-for="manager in managerStore.managers" :key="manager.id" :value="manager.id">
              {{ manager.lastName }} {{ manager.firstName }}
            </option>
          </select>
        </div>

        <div class="flex space-x-2">
          <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded">
            {{ isEdit ? 'Сохранить' : 'Добавить' }}
          </button>
          <button
            @click.prevent="router.push('/workshops')"
            class="px-4 py-2 bg-gray-400 text-white rounded"
          >
            Отмена
          </button>
        </div>
      </form>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Sidebar from '@/components/Layout/TheSidebar.vue'
import { useWorkshopsStore } from '../../stores/workshopsStore'
import { useManagersStore } from '../../stores/managersStore'

const workshopStore = useWorkshopsStore()
const managerStore = useManagersStore()
const route = useRoute()
const router = useRouter()
const isEdit = route.name === 'edit-workshop'

const form = ref({
  name: '',
  managerId: null,
})

onMounted(() => {
  if (isEdit) {
    const id = parseInt(route.params.id)
    const workshop = workshopStore.workshops.find((w) => w.id === id)
    if (workshop) {
      form.value = { ...workshop }
    }
  }
})

const onSubmit = () => {
  if (isEdit) {
    workshopStore.updateWorkshop(parseInt(route.params.id), form.value)
  } else {
    workshopStore.addWorkshop(form.value)
  }
  router.push('/workshops')
}
</script>
