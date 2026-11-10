import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import StudentsView from '../views/StudentsView.vue'
import TasksView from '../views/TasksView.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'dashboard', component: DashboardView },
    { path: '/students', name: 'students', component: StudentsView },
    { path: '/tasks', name: 'tasks', component: TasksView }
  ]
})
