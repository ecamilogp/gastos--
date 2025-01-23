<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { Gastos } from "../interfaces/gastos";

const props = defineProps<{
  updateGasto?: Gastos;
}>();

const emit = defineEmits(["confirm", "cancel"]);

const gastos = ref<Gastos>({
  name: "",
  money: 0,
  id: 0,
  ...props.updateGasto,
});

const dialog = ref(true);

const closeModal = () => {
  dialog.value = false;
  emit("cancel");
};

const saveGasto = () => {
  emit("confirm", { ...gastos.value });
  dialog.value = false;
};

watchEffect(() => {
  if (props.updateGasto) {
    gastos.value = { ...props.updateGasto };
  }
});
</script>

<template>
  <div
    v-if="dialog"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out"
  >
    <div
      class="bg-white rounded-lg shadow-lg w-full max-w-lg transform transition-transform duration-300 ease-in-out p-6 relative"
    >
      <button
        @click="closeModal"
        class="absolute top-4 right-4 text-gray-500 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-full"
      >
        ✕
      </button>

      <h2 class="text-2xl font-semibold text-center mb-6">
        {{ props.updateGasto ? "Editar Gasto" : "Agregar Gasto" }}
      </h2>

      <form class="space-y-6">
        <div>
          <label for="name" class="block text-gray-700 font-medium mb-1">
            Nombre del gasto
          </label>
          <input
            id="name"
            v-model="gastos.name"
            type="text"
            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Escribe el nombre del gasto"
            required
          />
        </div>

        <div>
          <label for="money" class="block text-gray-700 font-medium mb-1">
            Monto del gasto
          </label>
          <input
            id="money"
            v-model.number="gastos.money"
            type="number"
            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Escribe el monto del gasto"
            required
          />
        </div>
      </form>

      <div class="mt-6 flex justify-end space-x-3">
        <button
          @click="closeModal"
          class="py-2 px-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Cancelar
        </button>
        <button
          @click="saveGasto"
          class="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {{ props.updateGasto ? "Guardar Cambios" : "Agregar" }}
        </button>
      </div>
    </div>
  </div>
</template>
