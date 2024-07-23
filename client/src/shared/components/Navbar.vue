<script setup>
import { authService } from "@/services/authService";
import { services } from "@/services/service";
import { onMounted, ref } from "vue";

const props = defineProps({
    layoutRole: {
        type: String,
        required: true
    },
});

const drawer = ref(true);
const rail = ref(false);
const userData = ref({});
const isLogin = ref(false);

const menuItems = ref([
    { title: 'Profile', icon: 'mdi-account', pathName: 'Profile' },
    { title: 'Favourites', icon: 'mdi-heart', pathName: 'Favourites' },
    { title: 'Orders', icon: 'mdi-truck-fast', pathName: 'Orders' },
    { title: 'Logout', icon: 'mdi-logout', pathName: 'Profile' }
]);

// method to fetch user details
const getLoginUserDetails = async () => {
    try {
        // start the loader if there
        userData.value = await services.getLoginUserDetails({});
        if (userData.value) {
            isLogin.value = true;
        }
    } catch (error) {
        console.log(error);
    } finally {
        // stop the loader --> this will execute everytime.
    }
}

onMounted(() => {
    if (localStorage.getItem("jwt_token")) {
        getLoginUserDetails();
    }
})

</script>

<template>

    <v-app-bar :elevation="2">
        <template v-slot:prepend>
            <v-app-bar-nav-icon v-if="layoutRole === 'Admin'" @click.stop="rail = !rail"></v-app-bar-nav-icon>

            <!-- <RouterLink class="text-decoration-none"> -->
            <v-app-bar-title class="ml-4 text-h5">FashionFusion</v-app-bar-title>
            <!-- </RouterLink> -->
        </template>

        <v-row v-if="layoutRole === 'User'" class="d-flex align-center justify-center" no-gutters>
            <v-col cols="12" sm="6">
                <div class="mx-2 mt-5">
                    <v-text-field label="" variant="outlined" placeholder="Search for Products, Brands and More"
                        prepend-inner-icon="mdi-magnify" clearable density="compact">
                    </v-text-field>
                </div>
            </v-col>
        </v-row>

        <template v-slot:append>
            <v-btn class="text-none" v-if="isLogin && userData.role === 'Admin'"
                @click="$router.push({ name: 'LandingPage' })" stacked>
                <v-icon icon="mdi-account-convert" class="mr-2"></v-icon>
                User Mode
            </v-btn>

            <v-btn class="text-none" v-if="isLogin && userData.role === 'Admin'"
                @click="$router.push({ name: 'Dashboard' })" stacked>
                <v-icon icon="mdi-account-convert" class="mr-2"></v-icon>
                Admin Mode
            </v-btn>

            <v-btn v-if="layoutRole === 'User'" class="text-lowercase" :ripple="false">
                <v-badge :content="1" color="error" floating>
                    <v-icon icon="mdi-cart-outline"></v-icon>
                </v-badge>
                Cart
            </v-btn>

            <v-btn class="text-lowercase" v-if="!isLogin" @click="$router.push({ name: 'Login' })">
                <v-icon icon="mdi-account-circle" class="mx-1"></v-icon>
                Login
            </v-btn>

            <div v-if="isLogin" class="mr-6" style="width: 90px; display: flex; justify-content: center;">
                <v-avatar color="blue" size="42" class="" id="menu-activator">
                    <span>{{ userData.name[0] }}</span>
                </v-avatar>
                <v-menu activator="#menu-activator" transition="slide-y-transition">
                    <v-list>
                        <v-list-item>
                            <RouterLink :to="{ name: 'Profile' }" class="text-decoration-none">
                                <v-icon class="mr-3" style="font-size: 16px;" icon="mdi-account"></v-icon>Profile
                            </RouterLink>
                        </v-list-item>
                        <v-list-item v-if="userData.role === 'User'">
                            <RouterLink :to="{ name: 'Favourites' }" class="text-decoration-none">
                                <v-icon class="mr-3" style="font-size: 16px;" icon="mdi-heart"></v-icon>Favourites
                            </RouterLink>
                        </v-list-item>
                        <v-list-item v-if="userData.role === 'User'">
                            <RouterLink :to="{ name: 'Orders' }" class="text-decoration-none">
                                <v-icon class="mr-3" style="font-size: 16px;" icon="mdi-truck-fast"></v-icon>Orders
                            </RouterLink>
                        </v-list-item>
                        <v-list-item>
                            <RouterLink :to="{}" @click="authService.doLogout" class="text-decoration-none">
                                <v-icon class="mr-3" style="font-size: 16px;" icon="mdi-logout"></v-icon>Logout
                            </RouterLink>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </div>
        </template>
    </v-app-bar>

    <v-navigation-drawer v-if="layoutRole === 'Admin'" v-model="drawer" :rail="rail" permanent @click="rail = false">
        <v-list density="default" active-class="active-item">
            <v-tooltip text="Dashboard" v-if="rail" activator="#Dashboard" />
            <v-list-item id="Dashboard" :to="{ name: 'Dashboard' }">
                <template v-slot:prepend>
                    <v-icon>mdi-view-dashboard</v-icon>
                </template>
                Dashboard
            </v-list-item>

            <v-tooltip text="Orders" v-if="rail" activator="#Orders" />
            <v-list-item id="Orders" :to="{ name: 'OrderList' }">
                <template v-slot:prepend>
                    <v-icon>mdi-truck-fast</v-icon>
                </template>
                Orders
            </v-list-item>

            <v-tooltip text="Products" v-if="rail" activator="#Products" />
            <v-list-item id="Products" :to="{ name: 'ProductList' }">
                <template v-slot:prepend>
                    <v-icon>mdi-cube-outline</v-icon>
                </template>
                Products
            </v-list-item>

            <v-tooltip text="Users" v-if="rail" activator="#Users" />
            <v-list-item id="Users" :to="{ name: 'UserList' }">
                <template v-slot:prepend>
                    <v-icon>mdi-account-group-outline</v-icon>
                </template>
                Users
            </v-list-item>
        </v-list>
    </v-navigation-drawer>

</template>

<style scoped>
.active-item {
    background-color: green;
    /* Red */
    color: white;
    /* Text color */
}
</style>