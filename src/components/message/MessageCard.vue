<template>
  <div class="col-12 mb-4" v-if="message && message.from">
    <div class="card" :class="isCurrentUser ? 'text-left' : 'text-right'">
      <div class="card-body">
        <div class="thumbnail" :title="message.from.firstName">
          <img
            src="../../assets/avatar.jpg"
            width="48"
            height="48"
            :alt="`${message.from.firstName} ${message.from.lastName}`"
          />
        </div>
        <p class="card-text">{{ message.message }}</p>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import type { Message } from "../../types";

defineProps<{
  message: Message;
  isCurrentUser: boolean;
}>();
</script>

<style scoped>
.card {
  width: 60%;
}

.thumbnail {
  display: inline-block;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 12px;
  margin-bottom: 12px;
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-body {
  display: flex;
  align-items: flex-end;
}

.card-text {
  border-radius: 8px;
  padding: 0px 0px;
  margin: 0;
  word-wrap: break-word;
  max-width: calc(100% - 60px - 12px);
  white-space: pre-line;
  text-align: left;
}

.text-right {
  float: right;
}
.text-left {
  float: left;
}
</style>