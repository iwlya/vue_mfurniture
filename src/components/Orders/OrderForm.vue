<template>
  <div class="p-6 max-w-3xl mx-auto space-y-6 bg-white rounded shadow">
    <h2 class="text-2xl font-bold">Новый заказ</h2>

    <div>
      <label class="block mb-1">Номер заказа</label>
      <input
        v-model="orderNumber"
        class="w-full border p-2 rounded"
        placeholder="Введите номер заказа"
      />
    </div>

    <!-- ДО списка позиций -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label class="block mb-1">Фамилия клиента</label>
        <input v-model="client.surname" class="w-full border p-2 rounded" placeholder="Фамилия" />
      </div>
      <div>
        <label class="block mb-1">Имя клиента</label>
        <input v-model="client.name" class="w-full border p-2 rounded" placeholder="Имя" />
      </div>
      <div>
        <label class="block mb-1">Телефон</label>
        <input v-model="client.phone" class="w-full border p-2 rounded" placeholder="Телефон" />
      </div>
    </div>

    <div v-for="(item, index) in items" :key="index" class="grid grid-cols-4 gap-4 items-end">
      <div>
        <label class="block">Мебель</label>
        <select v-model="item.itemId" class="w-full border p-2 rounded">
          <option disabled value="">Выберите мебель</option>
          <option v-for="product in catalog.items" :key="product.id" :value="product.id">
            {{ product.name }}
          </option>
        </select>
      </div>

      <div>
        <label class="block">Цех</label>
        <select v-model="item.workshopId" class="w-full border p-2 rounded">
          <option disabled value="">Выберите цех</option>
          <option v-for="w in workshops" :key="w.id" :value="w.id">
            {{ w.name }}
          </option>
        </select>
      </div>

      <div>
        <label class="block">Количество</label>
        <input
          type="number"
          min="1"
          v-model.number="item.quantity"
          class="w-full border p-2 rounded"
        />
      </div>

      <button @click="removeItem(index)" class="text-red-600 hover:text-red-800">🗑</button>
    </div>

    <div class="space-x-2">
      <button @click="addItem" class="bg-gray-200 px-3 py-1 rounded">➕ Добавить мебель</button>
      <button @click="submit" class="bg-blue-600 text-white px-4 py-2 rounded">
        Сохранить заказ
      </button>
      <button @click="cancel" class="bg-red-500 text-white px-4 py-2 rounded">Отмена</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCatalogStore } from '../../stores/catalogStore'
import { useWorkshopsStore } from '../../stores/workshopsStore'
import { useOrdersStore } from '../../stores/ordersStore'

const catalog = useCatalogStore()

const workshopsStore = useWorkshopsStore()
const workshops = computed(() => workshopsStore.workshops)

const orders = useOrdersStore()

const router = useRouter()
const route = useRoute()

const orderNumber = ref('')
const items = ref([{ itemId: '', workshopId: '', quantity: 1 }])
const isEditing = ref(false)
const editingId = ref(null)

// onMounted(() => {
//   const id = route.params.id
//   if (id) {
//     const existingOrder = orders.getOrderById(Number(id))
//     if (existingOrder) {
//       orderNumber.value = existingOrder.number
//       items.value = existingOrder.items.map((item) => ({
//         itemId: item.item.id,
//         workshopId: item.workshop.id,
//         quantity: item.quantity,
//       }))
//       isEditing.value = true
//       editingId.value = Number(id)
//     }
//   }
// })

onMounted(() => {
  const id = route.params.id
  if (id) {
    const existingOrder = orders.getOrderById(Number(id))
    if (existingOrder) {
      orderNumber.value = existingOrder.number
      items.value = existingOrder.items.map((item) => ({
        itemId: item.item.id,
        workshopId: item.workshop.id,
        quantity: item.quantity,
      }))
      client.value = {
        surname: existingOrder.client?.surname || '',
        name: existingOrder.client?.name || '',
        phone: existingOrder.client?.phone || '',
      }
      isEditing.value = true
      editingId.value = Number(id)
    }
  }
})

const client = ref({
  surname: '',
  name: '',
  phone: '',
})

const addItem = () => items.value.push({ itemId: '', workshopId: '', quantity: 1 })
const removeItem = (index) => items.value.splice(index, 1)

// const submit = () => {
//   if (!orderNumber.value) return alert('Введите номер заказа')

//   const isValid = items.value.every((i) => i.itemId && i.workshopId && i.quantity > 0)
//   if (!isValid) return alert('Заполните все поля для каждой позиции')

//   const positions = items.value.map((i) => ({
//     item: catalog.items.find((p) => p.id === i.itemId),
//     workshop: workshops.value.find((w) => w.id === i.workshopId),
//     quantity: i.quantity,
//     status: 'Принят',
//   }))

//   const newOrder = {
//     number: orderNumber.value,
//     items: positions,
//     status: 'Принят',
//   }

//   if (isEditing.value) {
//     orders.updateOrder(editingId.value, newOrder)
//   } else {
//     orders.addOrder(newOrder)
//   }

//   router.push('/')
// }
const submit = () => {
  if (!orderNumber.value) return alert('Введите номер заказа')

  if (!client.value.surname || !client.value.name || !client.value.phone) {
    return alert('Заполните данные клиента')
  }

  const isValid = items.value.every((i) => i.itemId && i.workshopId && i.quantity > 0)
  if (!isValid) return alert('Заполните все поля для каждой позиции')

  const positions = items.value.map((i) => ({
    item: catalog.items.find((p) => p.id === i.itemId),
    workshop: workshops.value.find((w) => w.id === i.workshopId),
    quantity: i.quantity,
    status: 'Принят',
  }))

  const order = {
    number: orderNumber.value,
    items: positions,
    status: 'Принят',
    isArchived: false,
    client: {
      surname: client.value.surname,
      name: client.value.name,
      phone: client.value.phone,
    },
  }

  if (isEditing.value) {
    orders.updateOrder(editingId.value, order)
  } else {
    orders.addOrder(order)
  }

  router.push('/')
}

const cancel = () => router.push('/')
</script>
