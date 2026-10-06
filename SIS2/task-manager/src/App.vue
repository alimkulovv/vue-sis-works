<template>
  <div id="app">
    <h1>Task Manager</h1>

    <!-- Добавление задачи -->
    <div>
      <input v-model="newTitle" placeholder="Название">
      <input v-model="newDescription" placeholder="Описание">
      <select v-model="newPriority">
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <BaseButton @click="addTask">Добавить</BaseButton>
    </div>

    <!-- Статистика -->
    <div class="stats">
      <p>Всего: {{ stats.total }}</p>
      <p>Активных: {{ stats.active }}</p>
      <p>Выполненных: {{ stats.completed }}</p>
    </div>

    <!-- Поиск и фильтры -->
    <div class="filters">
      <input v-model="searchText" placeholder="Поиск по названию">

      <select v-model="filterPriority">
        <option value="all">Все приоритеты</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <select v-model="filterStatus">
        <option value="all">Все статусы</option>
        <option value="active">Активные</option>
        <option value="completed">Выполненные</option>
      </select>
    </div>

    <!-- Список задач -->
    <p v-if="filteredTasks.length === 0">Задач нет</p>

    <TaskItem
      v-for="task in filteredTasks"
      :key="task.id"
      :task="task"
      @complete="toggleComplete"
      @delete="deleteTask"
      @change-priority="updatePriority"
    />
  </div>
</template>

<script>
import TaskItem from './components/TaskItem.vue'

export default {
  name: 'App',
  components: { TaskItem },
  data() {
    return {
      tasks: [],
      newTitle: '',
      newDescription: '',
      newPriority: 'medium',
      searchText: '',
      filterPriority: 'all',
      filterStatus: 'all'
    }
  },
  computed: {
    filteredTasks() {
      return this.tasks.filter(task => {
        const matchSearch = task.title
          .toLowerCase()
          .includes(this.searchText.toLowerCase())

        const matchPriority =
          this.filterPriority === 'all' || task.priority === this.filterPriority

        const matchStatus =
          this.filterStatus === 'all' ||
          (this.filterStatus === 'completed' && task.completed) ||
          (this.filterStatus === 'active' && !task.completed)

        return matchSearch && matchPriority && matchStatus
      })
    },
    stats() {
      const total = this.tasks.length
      const completed = this.tasks.filter(t => t.completed).length
      return {
        total: total,
        completed: completed,
        active: total - completed
      }
    }
  },
  watch: {
    tasks: {
      handler(newTasks) {
        localStorage.setItem('tasks', JSON.stringify(newTasks))
      },
      deep: true
    }
  },
  created() {
    const saved = localStorage.getItem('tasks')
    if (saved) {
      this.tasks = JSON.parse(saved)
    }
  },
  mounted() {
    console.log('Приложение загружено, задач:', this.tasks.length)
  },
  methods: {
    addTask() {
      if (this.newTitle === '') return
      this.tasks.push({
        id: Date.now(),
        title: this.newTitle,
        description: this.newDescription,
        priority: this.newPriority,
        completed: false,
        createdAt: new Date().toLocaleDateString()
      })
      this.newTitle = ''
      this.newDescription = ''
    },
    toggleComplete(id) {
      const task = this.tasks.find(t => t.id === id)
      task.completed = !task.completed
    },
    deleteTask(id) {
      this.tasks = this.tasks.filter(t => t.id !== id)
    },
    updatePriority(id, newPriority) {
      const task = this.tasks.find(t => t.id === id)
      task.priority = newPriority
    },
        editTask(id, newTitle, newDescription) {
      const task = this.tasks.find(t => t.id === id)
      task.title = newTitle
      task.description = newDescription
    }
  }
}
</script>

    <TaskItem
      v-for="task in filteredTasks"
      :key="task.id"
      :task="task"
      @complete="toggleComplete"
      @delete="deleteTask"
      @change-priority="updatePriority"
      @edit="editTask"
    />