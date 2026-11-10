<script setup>
import { computed } from 'vue'
import { getStudents, getTasks, getPosts } from '../api'
import { useFetch } from '../composables/useFetch'
import AsyncState from '../components/AsyncState.vue'

const { data, loading, error, reload } = useFetch(async () => {
  const [students, tasks, posts] = await Promise.all([getStudents(), getTasks(), getPosts()])
  return { students, tasks, posts }
})

const done = computed(() => data.value?.tasks.filter((t) => t.completed).length ?? 0)
const percent = computed(() =>
  data.value ? Math.round((done.value / data.value.tasks.length) * 100) : 0
)
</script>

<template>
  <a-typography-title :level="3">Dashboard</a-typography-title>
  <AsyncState :loading="loading" :error="error" @retry="reload">
    <a-row v-if="data" :gutter="[16, 16]">
      <a-col :xs="24" :md="8">
        <a-card><a-statistic title="Студенты" :value="data.students.length" /></a-card>
      </a-col>
      <a-col :xs="24" :md="8">
        <a-card><a-statistic title="Задачи" :value="data.tasks.length" /></a-card>
      </a-col>
      <a-col :xs="24" :md="8">
        <a-card><a-statistic title="Курсы" :value="data.posts.length" /></a-card>
      </a-col>
      <a-col :span="24">
        <a-card title="Выполненные задачи">
          <a-progress :percent="percent" />
          {{ done }} из {{ data.tasks.length }} задач выполнено
        </a-card>
      </a-col>
    </a-row>
  </AsyncState>
</template>
