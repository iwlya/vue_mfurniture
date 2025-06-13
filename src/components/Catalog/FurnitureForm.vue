<template>
  <div class="flex">
    <Sidebar />
    <main class="flex-1 p-6 bg-gray-100">
      <h1 class="text-2xl font-bold mb-4">
        {{ isEdit ? 'Редактировать мебель' : 'Добавить мебель' }}
      </h1>
      <form @submit.prevent="onSubmit" class="space-y-4 bg-white p-6 rounded shadow">
        <div>
          <label class="block font-medium mb-1">Название</label>
          <input v-model="form.name" required class="border p-2 rounded w-full" />
        </div>
        <div>
          <label class="block font-medium mb-1">Категория</label>
          <input v-model="form.category" required class="border p-2 rounded w-full" />
        </div>
        <div>
          <label class="block font-medium mb-1">Описание</label>
          <textarea
            v-model="form.description"
            rows="3"
            class="border p-2 rounded w-full"
          ></textarea>
        </div>
        <div class="flex space-x-2">
          <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded">
            {{ isEdit ? 'Сохранить' : 'Добавить' }}
          </button>
          <button
            @click.prevent="router.push('/catalog')"
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
import { useRouter, useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import { useCatalogStore } from '../../stores/catalogStore'
import Sidebar from '@/components/Layout/TheSidebar.vue'

const router = useRouter()
const route = useRoute()
const catalog = useCatalogStore()
const isEdit = route.name === 'edit-furniture'

const form = ref({
  name: '',
  category: '',
  description: '',
})

onMounted(() => {
  if (isEdit) {
    const id = parseInt(route.params.id)
    const item = catalog.items.find((i) => i.id === id)
    if (item) form.value = { ...item }
  }
})

const onSubmit = () => {
  if (isEdit) {
    catalog.updateItem(parseInt(route.params.id), form.value)
  } else {
    catalog.addItem(form.value)
  }
  router.push('/catalog')
}
</script>
