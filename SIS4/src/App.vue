<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const selected = computed(() => [route.path])
</script>

<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider breakpoint="lg" collapsed-width="0">
      <div style="color: #fff; font-size: 18px; text-align: center; padding: 16px">
        Student Dashboard
      </div>
      <a-menu
        theme="dark"
        mode="inline"
        :selected-keys="selected"
        @click="({ key }) => router.push(key)"
      >
        <a-menu-item key="/">Dashboard</a-menu-item>
        <a-menu-item key="/students">Students</a-menu-item>
        <a-menu-item key="/tasks">Tasks</a-menu-item>
      </a-menu>
    </a-layout-sider>

    <a-layout>
      <a-layout-content style="margin: 24px">
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
