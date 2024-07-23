import { defineStore } from 'pinia';

export const useCartStore = defineStore("CartStore", {

  // inside this object we define things like states

  state: () => ({
    items: JSON.parse(localStorage.getItem("cart")) || [],
  }),

  // getters are functions which basically returns new value based on the state.
  getters: {
    totalItems() {
      return this.items.reduce((total, item) => total + item.quantity, 0);
    },
    totalPrice() {
      return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
    },
  },
  
  actions: {
    addItem(item) {
      const existingItem = this.items.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.items.push({ ...item, quantity: 1 });
      }
      this.saveToLocalStorage();
    },
    removeItem(itemId) {
      const index = this.items.findIndex((item) => item.id === itemId);
      if (index !== -1) {
        this.items.splice(index, 1);
        this.saveToLocalStorage();
      }
    },
    clearCart() {
      this.items = [];
      this.saveToLocalStorage();
    },
    increaseQuantity(itemId) {
      const item = this.items.find((item) => item.id === itemId);
      if (item) {
        item.quantity++;
        this.saveToLocalStorage();
      }
    },
    decreaseQuantity(itemId) {
      const item = this.items.find((item) => item.id === itemId);
      if (item && item.quantity > 1) {
        item.quantity--;
        this.saveToLocalStorage();
      }
    },
    saveToLocalStorage() {
      localStorage.setItem('cart', JSON.stringify(this.items));
    },
  },
});



// approach - 2 save cart to database:

// src/store/cart.js

/*
import { defineStore } from 'pinia';

export const useCartStore = defineStore({
  id: 'cart',
  state: () => ({
    items: [],
    saveTimeout: null, // Timeout ID for debounce
  }),
  getters: {
    totalItems() {
      return this.items.reduce((total, item) => total + item.quantity, 0);
    },
    totalPrice() {
      return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
    },
  },
  actions: {
    async addItem(item) {
      const existingItem = this.items.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.items.push({ ...item, quantity: 1 });
      }
      // Trigger save after a delay
      this.debounceSaveCartToDatabase();
    },
    async removeItem(itemId) {
      const index = this.items.findIndex((item) => item.id === itemId);
      if (index !== -1) {
        this.items.splice(index, 1);
        // Trigger save after a delay
        this.debounceSaveCartToDatabase();
      }
    },
    async increaseQuantity(itemId) {
      const item = this.items.find((item) => item.id === itemId);
      if (item) {
        item.quantity++;
        // Trigger save after a delay
        this.debounceSaveCartToDatabase();
      }
    },
    async decreaseQuantity(itemId) {
      const item = this.items.find((item) => item.id === itemId);
      if (item && item.quantity > 1) {
        item.quantity--;
        // Trigger save after a delay
        this.debounceSaveCartToDatabase();
      }
    },
    debounceSaveCartToDatabase() {
      // Clear previous timeout
      clearTimeout(this.saveTimeout);
      // Schedule save after a delay (e.g., 500 milliseconds)
      this.saveTimeout = setTimeout(this.saveCartToDatabase, 500); // Adjust delay as needed
    },
    async saveCartToDatabase() {
      // Make API request to save or update cart data in the database
      try {
        // Example API request to save cart data
        await fetch('http://example.com/save-cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.items),
        });
      } catch (error) {
        console.error('Error saving cart data:', error);
      }
    },
  },
});
*/
