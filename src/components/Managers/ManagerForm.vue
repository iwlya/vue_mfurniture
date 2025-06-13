<template>
  <div class="flex">
    <Sidebar />
    <main class="flex-1 p-6 bg-gray-100">
      <h1 class="text-2xl font-bold mb-4">
        {{ isEdit ? 'Редактировать начальника' : 'Добавить начальника' }}
      </h1>
      <form @submit.prevent="onSubmit" class="space-y-4 bg-white p-6 rounded shadow">
        <div>
          <label class="block font-medium mb-1">Фамилия</label>
          <input v-model="form.lastName" required class="border p-2 rounded w-full" />
        </div>
        <div>
          <label class="block font-medium mb-1">Имя</label>
          <input v-model="form.firstName" required class="border p-2 rounded w-full" />
        </div>
        <div>
          <label class="block font-medium mb-1">Отчество (необязательно)</label>
          <input v-model="form.middleName" class="border p-2 rounded w-full" />
        </div>
        <div class="flex space-x-2">
          <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded">
            {{ isEdit ? 'Сохранить' : 'Добавить' }}
          </button>
          <button
            @click.prevent="router.push('/managers')"
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
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import Sidebar from '@/components/Layout/TheSidebar.vue'
import { useManagersStore } from '../../stores/managersStore'

const router = useRouter()
const route = useRoute()
const store = useManagersStore()
const isEdit = route.name === 'edit-manager'

const form = ref({
  lastName: '',
  firstName: '',
  middleName: '',
})

onMounted(() => {
  if (isEdit) {
    const id = parseInt(route.params.id)
    const manager = store.managers.find((m) => m.id === id)
    if (manager) form.value = { ...manager }
  }
})

const onSubmit = () => {
  if (isEdit) {
    store.updateManager(parseInt(route.params.id), form.value)
  } else {
    store.addManager(form.value)
  }
  router.push('/managers')
}
</script>
