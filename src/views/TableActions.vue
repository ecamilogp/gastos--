<script setup lang="ts">
import { ref, computed, onBeforeMount } from 'vue';
import { useGastosStore } from '../store/useGastosStore';
import { Gastos } from '../interfaces/gastos';
import Form from './Form.vue';

const modal = ref(false);
const gastoStore = useGastosStore();
const updateGasto = ref<Gastos | undefined>(undefined);
const income = ref<number>(0);

const openModal = (gasto?: Gastos) => {
  modal.value = true;
  updateGasto.value = gasto ?? undefined;
};

const closeModal = () => {
  modal.value = false;
  updateGasto.value = undefined;
};

const saveGasto = (gasto: Gastos) => {
  if (updateGasto.value) {
    gastoStore.updateGasto(gasto);
  } else {
    gastoStore.addGasto(gasto);
  }
  closeModal();
};

const totalGastos = computed(() => {
  return gastoStore.gastos.reduce((total, gasto) => total + gasto.money, 0);
});

const remainingSalary = computed(() => {
  return income.value - totalGastos.value;
});

onBeforeMount(() => {
  gastoStore.recoverGastos();
});
</script>

<template>
  <div class="container mx-auto p-8">
    <h1 class="text-4xl font-extrabold text-center mb-10 text-gray-800">
      Control de Gastos
    </h1>

    <div class="flex justify-center mb-10">
      <button
        class="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        @click="openModal()"
      >
        ¡Agregar Gasto!
      </button>
    </div>

    <div class="flex justify-center mb-6">
      <input
        v-model.number="income"
        type="number"
        class="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Ingrese su salario"
      />
    </div>

    <div
      v-if="gastoStore.gastos.length"
      class="text-right mb-4 text-xl font-semibold"
    >
      Total Gastos: {{ totalGastos.toLocaleString() }} €
      <br />
      Salario Restante: {{ remainingSalary.toLocaleString() }} €
    </div>

    <div v-if="gastoStore.gastos.length" class="overflow-x-auto">
      <table class="min-w-full bg-white rounded-lg shadow-lg">
        <thead class="bg-gradient-to-r from-green-500 to-green-700 text-white">
          <tr>
            <th
              class="px-6 py-4 text-center text-lg font-semibold tracking-wide"
            >
              Gasto
            </th>
            <th
              class="px-6 py-4 text-center text-lg font-semibold tracking-wide"
            >
              Total
            </th>
            <th
              class="px-6 py-4 text-center text-lg font-semibold tracking-wide"
            >
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="gasto in gastoStore.gastos"
            :key="gasto.id"
            class="transition duration-300 ease-in-out hover:bg-gray-100"
          >
            <td class="px-6 py-4 text-center text-gray-700 font-semibold">
              {{ gasto.name }}
            </td>
            <td class="px-6 py-4 text-center text-gray-700 font-semibold">
              {{ gasto.money.toLocaleString() }}
            </td>
            <td class="px-6 py-4 text-center">
              <button
                class="text-blue-500 hover:text-blue-700"
                @click="openModal(gasto)"
              >
                Editar
              </button>
              <button
                class="text-red-500 hover:text-red-700 ml-4"
                @click="gastoStore.deleteGasto(gasto.id)"
              >
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else class="text-center text-gray-500">
      No hay gastos registrados.
    </div>
  </div>

  <Form
    v-if="modal"
    :update-gasto="updateGasto"
    @confirm="saveGasto"
    @cancel="closeModal"
  />
</template>
