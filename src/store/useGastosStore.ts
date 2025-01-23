import { defineStore } from "pinia";
import { Gastos } from "../interfaces/gastos";

export const useGastosStore = defineStore("gastos", {
  state: () => ({
    gastos: [] as Gastos[],
  }),

  actions: {
    saveGastos() {
      const save = JSON.stringify(this.gastos);
      localStorage.setItem("gasto", save);
    },

    recoverGastos() {
      const recover = localStorage.getItem("gasto");
      this.gastos = recover ? (JSON.parse(recover) as Gastos[]) : [];
    },

    addGasto(data: Gastos) {
      if (data) {
        data.id = Math.floor(Math.random() * 300);
        this.gastos.push(data);
        this.saveGastos();
      } else {
        console.log("el gasto recibido es undefained");
      }
    },

    updateGasto(data: Gastos) {
      const index = this.gastos.findIndex((g) => g.id === data.id);
      if (index !== -1) {
        this.gastos.splice(index, 1, data);
        this.saveGastos();
      }
    },

    deleteGasto(id: number) {
      this.gastos = this.gastos.filter((g) => g.id !== id);
      this.saveGastos();
    },

    readGasto(id: number) {
      return this.gastos.find((g) => g.id === id);
    },
  },
});
