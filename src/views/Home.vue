<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6"
  >
    <h1 class="text-4xl font-bold text-gray-800 mb-8">
      Bienvenido a <span class="text-green-600">Control de Finanzas</span>
    </h1>

    <img
      src="../assets/homero.png"
      alt="homero"
      class="w-48 h-48 rounded-full shadow-lg mb-6 hover:scale-105 transition-transform duration-300 ease-in-out"
    />

    <router-link
      to="/table-actions"
      class="bg-gradient-to-r from-green-500 to-green-700 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300"
    >
      Iniciar
    </router-link>
  </div>
</template>
