import { createRouter, createWebHistory } from 'vue-router'
import OrderList from '../components/Orders/OrderList.vue'
import AddOrderPage from '../pages/AddOrderPage.vue'
import CatalogList from '../components/Catalog/CatalogList.vue'
import FurnitureForm from '../components/Catalog/FurnitureForm.vue'
import ManagerList from '../components/Managers/ManagerList.vue'
import ManagerForm from '../components/Managers/ManagerForm.vue'
import WorkshopForm from '@/components/Workshops/WorkshopForm.vue'
import WorkshopList from '@/components/Workshops/WorkshopList.vue'
import OrderHistory from '@/components/Orders/OrderHistory.vue'

const routes = [
  { path: '/', name: 'orders', component: OrderList },
  { path: '/add-order', component: AddOrderPage },
  { path: '/edit-order/:id', component: AddOrderPage, props: true },
  { path: '/catalog', component: CatalogList },
  { path: '/add-furniture', component: FurnitureForm },
  { path: '/edit-furniture/:id', name: 'edit-furniture', component: FurnitureForm },
  { path: '/managers', component: ManagerList },
  { path: '/add-manager', component: ManagerForm },
  { path: '/edit-manager/:id', name: 'edit-manager', component: ManagerForm },
  { path: '/workshops', component: WorkshopList },
  { path: '/add-workshop', name: 'add-workshop', component: WorkshopForm },
  { path: '/edit-workshop/:id', name: 'edit-workshop', component: WorkshopForm },
  { path: '/history', component: OrderHistory },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
