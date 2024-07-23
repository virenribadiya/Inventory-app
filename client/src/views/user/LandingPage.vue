<template>
    <v-container>

        <!-- Hero Section -->
        <v-row align="center" justify="center">
            <v-col cols="12">
                <v-carousel :show-arrows="false" cycle hide-delimiter-background>
                    <v-carousel-item v-for="(slide, index) in slides" :key="index"
                        :src='"https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg"' cover>
                        <v-row class="fill-height">
                            <v-col align-self="end">
                                <v-container>
                                    <h1 class="text-white">{{ slide.title }}</h1>
                                    <p class="text-white">{{ slide.subtitle }}</p>
                                    <v-btn color="accent" large>Shop Now</v-btn>
                                </v-container>
                            </v-col>
                        </v-row>
                    </v-carousel-item>
                </v-carousel>

            </v-col>
        </v-row>
    </v-container>

    <v-container fluid class="bg-black border">
        <v-row>
            <v-col>
                Hello
            </v-col>

            <v-col>
                Hello
            </v-col>

            <v-col>
                Hello
            </v-col>
        </v-row>
    </v-container>

    <v-container>

        <v-row class="mb-6">
            <v-col cols="12">
                <h2 class="headline mb-4">Why Choose Us?</h2>
            </v-col>
            <v-col cols="12" sm="4">
                <v-card class="feature-card" height="200">
                    <v-card-title class="text-center">Fastest Delivery</v-card-title>
                    <v-card-text>We offer express shipping for all orders.</v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" sm="4">
                <v-card class="feature-card" height="200">
                    <v-card-title class="text-center">Secure Payment</v-card-title>
                    <v-card-text>Your payment information is encrypted and secure.</v-card-text>
                </v-card>
            </v-col>
            <!-- Add more sections as needed -->
        </v-row>

        <!-- Category Sections -->
        <v-row class="mb-6">
            <v-col cols="12">
                <h2 class="headline mb-4">Shop by Category</h2>
            </v-col>
            <v-col cols="12" sm="4" v-for="(category, index) in categories" :key="index">
                <v-card class="category-card">
                    <v-img :src="category.image" aspect-ratio="1"></v-img>
                    <v-card-title class="text-center">{{ category.name }}</v-card-title>
                </v-card>
            </v-col>
        </v-row>

        <!-- Featured Products Section -->
        <v-row class="mb-6">
            <v-col cols="12">
                <h2 class="headline mb-4">Featured Products</h2>
            </v-col>
            <v-col v-for="(product, index) in featuredProducts" :key="index" cols="12" sm="6" md="4">
                <v-card class="product-card" height="400">
                    <v-img :src="product.image" aspect-ratio="1"></v-img>
                    <v-card-title>{{ product.name }}</v-card-title>
                    <v-card-subtitle>{{ product.price }}</v-card-subtitle>
                    <v-card-actions>
                        <v-btn color="primary" text>View Details</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn color="accent" text>Add to Cart</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>

    </v-container>
</template>

<script>
export default {
    data() {
        return {
            slides: [
                { title: 'New Arrivals', subtitle: 'Discover the latest trends', color: 'blue darken-3' },
                { title: 'Summer Collection', subtitle: 'Stay cool this summer', color: 'teal darken-3' },
                { title: 'Clearance Sale', subtitle: 'Limited time offers', color: 'red darken-3' }
            ],
            categories: [
                { name: 'Men', image: 'https://via.placeholder.com/300' },
                { name: 'Women', image: 'https://via.placeholder.com/300' },
                { name: 'Kids', image: 'https://via.placeholder.com/300' }
            ],
            featuredProducts: [
                { name: 'Product 1', price: '$19.99', image: 'https://via.placeholder.com/300' },
                { name: 'Product 2', price: '$24.99', image: 'https://via.placeholder.com/300' },
                { name: 'Product 3', price: '$29.99', image: 'https://via.placeholder.com/300' },
                { name: 'Product 4', price: '$14.99', image: 'https://via.placeholder.com/300' },
                { name: 'Product 5', price: '$34.99', image: 'https://via.placeholder.com/300' },
                { name: 'Product 6', price: '$39.99', image: 'https://via.placeholder.com/300' }
            ]
        };
    }
};
</script>

<style scoped>
.category-card,
.product-card,
.feature-card {
    max-width: 300px;
}
</style>