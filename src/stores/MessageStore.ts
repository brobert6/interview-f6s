import type { Message, User } from "../types";
import { defineStore } from "pinia";
import { ref } from "vue";
import messageMock from "../services/MockApi";
import { waitForXSecond } from "../utils";

export const useMessageStore = defineStore("MessageStore", () => {
  const messages = ref<Message[]>([]);
  const me = ref<User>();
  const otherUser = ref<User>();

  async function fetchMessages() {
    console.warn("replace this after API is ready");
    messages.value = messageMock.getMessages();
  }

  async function fetchMe() {
    console.warn("replace this after API is ready");
    me.value = messageMock.getMe();
  }

  async function fetchOther() {
    console.warn("replace this after API is ready");
    otherUser.value = messageMock.getOtherUser();
  }

  async function addMessage(
    message: Message,
    isOptimistic = false
  ): Promise<any> {
    //randomly reject
    const randomNum = Math.floor(Math.random() * 10);
    if (randomNum === 0) {
      return Promise.reject();
    }

    if (!isOptimistic) {
      insertMessage(message);
    }

    const nextId = messageMock.getNextId();
    message.id = nextId;
    const newMessage = { ...message, id: nextId };
    messages.value.push(newMessage);
    console.warn("addMessage when API is ready");

    await waitForXSecond(0.5);
    await addAutoReply();

    return Promise.resolve();
  }

  async function addAutoReply() {
    if (!otherUser.value) {
      await fetchOther();
    }
    const nextId = messageMock.getNextId();
    const autoReply: Message = {
      id: nextId,
      from: otherUser.value!,
      message: "I'm out of the office",
      date: new Date().toISOString().slice(0, 19).replace("T", " "),
    };
    messages.value.push(autoReply);
    console.warn("addAutoReply when API is ready");
  }

  function insertMessage(message: Message) {
    const nextId = messageMock.getNextId();
    message.id = nextId;
    const newMessage = { ...message, id: nextId };
    messages.value = [...messages.value, newMessage];
  }

  function removeMessage(index: number) {
    messages.value.splice(index, 1);
    console.warn("removeMessage when API is ready");
  }

  function removeLastMessage() {
    messages.value.splice(messages.value.length - 1, 1);
  }

  // Add other actions as needed
  return {
    messages,
    me,
    fetchMessages,
    fetchMe,
    addMessage,
    insertMessage,
    removeMessage,
    removeLastMessage,
  };
});
