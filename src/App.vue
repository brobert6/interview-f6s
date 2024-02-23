<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <main class="pt-5 mdb-docs-layout">
    <router-view v-slot="{ Component }">
      <suspense>
        <div>
          <component :is="Component" :key="$route.path"></component>
        </div>
      </suspense>
    </router-view>
  </main>
</template>

<style scoped>
</style>
