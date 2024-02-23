<template>
  <div class="container" v-if="messages" ref="messageContainer">
    <!-- Message Cards -->
    <div class="row conversation-container" ref="convContainer">
      <message-card
        v-for="message in messages"
        :message="message"
        :isCurrentUser="message.from === messageStore.me"
        :key="message.id"
      >
      </message-card>
    </div>
    <div class="row">
      <compose-section v-if="message" v-model="message" @submit="sendReply" />
    </div>
    <div class="row" v-if="error">
      <p class="error">{{ error }}</p>
    </div>
  </div>
</template>
  
<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import type { Message } from "../../types";
import { useMessageStore } from "../../stores/MessageStore";
import MessageCard from "../message/MessageCard.vue";
import ComposeSection from "../message/ComposeSection.vue";
import { mapPromiseStatusWithCallbacks } from "../../utils";

const messageStore = useMessageStore();
const messageContainer = ref(null);
const convContainer = ref(null);
const message = ref<Message>();
const error = ref<string>();
const isLoading = ref<boolean>(false);

onMounted((): void => {
  loadConversation();
});

const loadConversation = async () => {
  await messageStore.fetchMe();
  message.value = {
    message: "",
    from: messageStore.me!,
    date: "",
    id: 0,
  };
  await messageStore.fetchMessages();
  scrollToBottom();
};

const sendReply = async () => {
  mapPromiseStatusWithCallbacks(
    messageStore.addMessage(message.value!),
    isLoading,
    () => {
      error.value = undefined;
      message.value!.message = "";
      scrollToBottom();
    },
    () => {
      error.value = "Error sending message";
      message.value!.message = "";
      scrollToBottom();
    }
  );
  //await messageStore.addMessage(message.value!);
};

const scrollToBottom = () => {
  setTimeout(() => {
    if (convContainer.value) {
      // @ts-ignore
      convContainer.value.scrollTop = convContainer.value.scrollHeight;
    }
  }, 0);
};

const messages = computed(() => {
  return messageStore.messages;
  //   .sort(
  //     (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  //   ) as Message[];
});
</script>
  
  <style scoped>
</style>