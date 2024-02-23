<template>
  <form @submit.prevent="handleSubmit">
    <div class="compose-section">
      <textarea
        v-model="modelValue.message"
        placeholder="Type your reply... (Shift+Enter for new line)"
        :rows="textareaRows"
        @input="handleTextareaInput"
        @keydown.enter.prevent="handleEnterKey"
      ></textarea>
      <img
        src="../../assets/send.jpg"
        width="28"
        height="28"
        :alt="`${modelValue.from.firstName} ${modelValue.from.lastName}`"
        @click="handleSubmit"
      />
    </div>
  </form>
</template>
  
  <script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";
import { Message } from "../../types";

// defineProps<{
//   message: Message;
// }>();
const { modelValue } = defineProps(["modelValue"]);

const textareaRows = ref(1);
const emit = defineEmits();

const reply = ref("");

const handleEnterKey = (event) => {
  if (!event.shiftKey) {
    event.preventDefault();
    handleSubmit();
  } else {
    modelValue.message += "\n";
    handleTextareaInput();
  }
};

const handleSubmit = () => {
  emit("submit", reply.value);
};

const handleTextareaInput = () => {
  textareaRows.value = Math.min(modelValue.message.split("\n").length, 3);
};
</script>
  
  <style scoped>
.compose-section {
  margin-top: 0px;
  display: flex;
  align-items: center;
}

textarea {
  width: calc(100% - 40px);
  min-height: 28px;
  max-height: calc(3 * 28px);
  line-height: 28px;
  resize: vertical;
  margin-bottom: 10px;
  overflow-y: auto;
  font-size: 18px;
}

button {
  cursor: pointer;
}

img {
  margin-left: 12px;
  cursor: pointer;
}
</style>
  