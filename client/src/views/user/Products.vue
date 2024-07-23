<template>
  <v-container fluid style="background-color: #f0f2f6;" class="pa-0">
    <v-row class="ma-0">

      <v-col cols="12" md="3">
        <v-card class="pa-4 rounded-0" style="height: 90vh;">
          <div class="d-flex align-center">
            <v-card-title>Filters <v-icon size="">mdi-filter</v-icon></v-card-title>
            <v-spacer></v-spacer>
            <v-card-title>
              <v-btn variant="outlined" color="red" size="small" class="text-none mx-2">clear</v-btn>
              <v-btn variant="outlined" color="success" size="small" class="text-none">apply</v-btn>
            </v-card-title>
          </div>
          <v-divider color="black" :thickness="2" class="my-2"></v-divider>

          <div>
            <v-card-title class="text-subtitle-2 font-weight-medium text-uppercase">Price</v-card-title>
            <v-card-title>
              <v-range-slider color="primary" thumb-label="always" v-model="priceValue" step="50" :min="0" :max="1000"
                class="mt-8 pl-2">
              </v-range-slider>
            </v-card-title>
          </div>
          <v-divider color="black" :thickness="2" class="my-2"></v-divider>

          <div>
            <v-card-title class="text-subtitle-2 font-weight-medium text-uppercase">Brand</v-card-title>
            <v-card-title class="py-0">
              <v-select ref="brandSelectTRV" v-model="selectedBrands" :items="displayBrands" item-title="value"
                item-value="_id" label="favourite brands" multiple variant="underlined" clearable>
                <template v-slot:prepend-item>
                  <div class="fixed-prepend">
                    <div class="mx-5">
                      <v-text-field class="text-color-balck" v-model="searchBrands" placeholder="Search"
                        @input="filterItems" variant="underlined"></v-text-field>
                    </div>
                    <div class="d-flex flex-wrap flex-row ga-3 mx-5">
                      <v-btn variant="tonal" size="small" class="text-none" @click="selectAll">All</v-btn>
                      <v-btn variant="tonal" size="small" class="text-none" @click="selectNone">None</v-btn>
                      <v-btn variant="tonal" size="small" class="text-none" @click="searchapi">Search</v-btn>
                    </div>
                    <v-divider class="mt-5"></v-divider>
                  </div>
                </template>
              </v-select>
            </v-card-title>
          </div>
          <v-divider color="black" :thickness="2" class="my-2"></v-divider>

          <div>
            <v-card-title class="text-subtitle-2 font-weight-medium text-uppercase">Gender</v-card-title>
            <v-card-title class="d-flex py-0 text-black">
              <v-checkbox-group>
                <v-checkbox color="primary" label="Male" value="male" hide-details></v-checkbox>
                <v-checkbox color="primary" label="Female" value="female" hide-details></v-checkbox>
                <v-checkbox color="primary" label="kids" value="kids" hide-details></v-checkbox>
              </v-checkbox-group>
            </v-card-title>
          </div>
          <v-divider color="black" :thickness="2" class="my-2"></v-divider>

        </v-card>
      </v-col>

      <v-col cols="12" md="9" class="d-flex flex-column">
        <v-row>
          <v-col cols="12" md="8">
            <v-card-title>Search results for "{{ searchQuery }}"</v-card-title>
          </v-col>
          <v-col cols="12" md="4">
            <v-select v-model="select" item-title="name" item-value="value" variant="underlined" label="Sort By"
              :items="sortOptions"></v-select>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6" md="4" v-for="product in products" :key="product.id">
            <v-card class="pa-4 mb-4 rounded-0">
              <v-img :src="product.image" height="200px" class="mb-4"></v-img>
              <v-card-title>{{ product.name }}</v-card-title>
              <v-card-subtitle>{{ product.price }}</v-card-subtitle>
              <v-card-text>
                {{ product.description }}
              </v-card-text>
              <v-rating :value="product.rating" readonly></v-rating>
            </v-card>
          </v-col>
        </v-row>

        <!-- Third row with pagination area -->
        <v-row>
          <v-col cols="12">
            <v-card class="pa-4 mb-4 rounded-0">
              <div>Pagination</div>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>


<script setup>
import { onMounted, reactive, ref } from 'vue';

const searchQuery = ref("");
const select = ref(null);
const priceValue = ref([0, 300]);
const sortOptions = reactive([{ _id: 1, name: 'Relevent', value: null }, { _id: 2, name: 'Price: Low to High', value: "price" }, { _id: 3, name: 'Price: High to Low', value: "-price" }]);
const products = reactive(
  [
    {
      id: 1,
      name: 'Product 1',
      price: '$100',
      description: 'This is a description of product 1.',
      image: 'https://via.placeholder.com/200',
      rating: 4
    },
    {
      id: 2,
      name: 'Product 2',
      price: '$200',
      description: 'This is a description of product 2.',
      image: 'https://via.placeholder.com/200',
      rating: 3.5
    },
    {
      id: 3,
      name: 'Product 3',
      price: '$300',
      description: 'This is a description of product 3.',
      image: 'https://via.placeholder.com/200',
      rating: 5
    },
    {
      id: 4,
      name: 'Product 4',
      price: '$400',
      description: 'This is a description of product 4.',
      image: 'https://via.placeholder.com/200',
      rating: 4.5
    },
    {
      id: 5,
      name: 'Product 5',
      price: '$500',
      description: 'This is a description of product 5.',
      image: 'https://via.placeholder.com/200',
      rating: 4
    },
    {
      id: 6,
      name: 'Product 6',
      price: '$600',
      description: 'This is a description of product 6.',
      image: 'https://via.placeholder.com/200',
      rating: 3
    },
  ]
);
const brands = ref([
  { _id: "sfhskjgf", value: "Apple" },
  { _id: "sfhskjgf2", value: "Banana" },
  { _id: "sfhskjgf3", value: "Pineapple" },
  { _id: "sfhskjgf4", value: "watermelon" },
  { _id: "sfhskjgf", value: "Apple" },
  { _id: "sfhskjgf2", value: "Banana" },
  { _id: "sfhskjgf3", value: "Pineapple" },
  { _id: "sfhskjgf4", value: "watermelon" }
]);
const selectedBrands = ref([]);
const displayBrands = ref([]);
const searchBrands = ref("");
const brandSelectTRV = ref(null);
const selectedGenders = ref([]);

const filterItems = () => {
  displayBrands.value = brands.value.filter(item =>
    item.value.toLowerCase().includes(searchBrands.value.toLowerCase())
  )
}

const selectAll = () => {
  selectedBrands.value = brands.value.map(brand => brand._id);
}

const selectNone = () => {
  selectedBrands.value = [];
}

const searchapi = () => {
  brandSelectTRV.value.menu = false
  brandSelectTRV.value.isFocused = false;
}

onMounted(() => {
  displayBrands.value = brands.value;
})

</script>

<style>
.v-field__input {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  display: inline-block;
}

.fixed-prepend {
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: white;
  padding-bottom: 10px;
}

.v-list {
  padding: 0 !important;
  width: inherit;
}
</style>
