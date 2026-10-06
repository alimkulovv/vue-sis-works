<template>
  <div class="task">
    <!-- Обычный режим -->
    <div v-if="!isEditing">
      <h3 :class="{ done: task.completed }">{{ task.title }}</h3>
      <p>{{ task.description }}</p>
    </div>

    <!-- Режим редактирования -->
    <div v-else>
      <input v-model="editTitle" placeholder="Название">
      <input v-model="editDescription" placeholder="Описание">
    </div>

    <p>Дата создания: {{ task.createdAt }}</p>
    <p>Статус: {{ task.completed ? 'Выполнена' : 'Активна' }}</p>

    <label>Приоритет:</label>
    <select :value="task.priority" @change="changePriority($event.target.value)">
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </select>

    <div>
      <BaseButton @click="$emit('complete', task.id)">
        {{ task.completed ? 'Вернуть' : 'Выполнить' }}
      </BaseButton>

      <BaseButton v-if="!isEditing" @click="startEdit">Изменить</BaseButton>
      <BaseButton v-else @click="saveEdit">Сохранить</BaseButton>

      <BaseButton @click="$emit('delete', task.id)">Удалить</BaseButton>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaskItem',
  props: ['task'],
  data() {
    return {
      isEditing: false,
      editTitle: '',
      editDescription: ''
    }
  },
  methods: {
    changePriority(newPriority) {
      this.$emit('change-priority', this.task.id, newPriority)
    },
    startEdit() {
      this.editTitle = this.task.title
      this.editDescription = this.task.description
      this.isEditing = true
    },
    saveEdit() {
      if (this.editTitle === '') return
      this.$emit('edit', this.task.id, this.editTitle, this.editDescription)
      this.isEditing = false
    }
  }
}
</script>

<style>
.task {
  border: 1px solid #ccc;
  margin: 10px auto;
  padding: 10px;
  width: 400px;
}
.done {
  text-decoration: line-through;
  color: gray;
}
</style>