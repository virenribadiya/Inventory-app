import { createRouter, createWebHistory } from 'vue-router'
import AdminLayoutView from '@/layouts/AdminLayoutView.vue';
import UserLayoutView from '@/layouts/UserLayoutView.vue';
import NotFound from '@/shared/components/NotFound.vue';
import { services } from '@/services/service';
import { authService } from '@/services/authService';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "Login",
      component: () => import("@/views/authentication/Login.vue"),
      beforeEnter: async (to, from, next) => {
        const isTokenFound = localStorage.getItem('jwt_token');
        if (isTokenFound) {
          try {
            const userData = await services.getLoginUserDetails({});
            if (userData) {
              next(from.fullPath);
            } else {
              authService.doLogout();
            }
          } catch (error) {
            console.error('Error fetching user details:', error);
            authService.doLogout();
          }
        }
        else {
          next();
        }
      }
    },
    {
      path: "/signup",
      name: "Signup",
      component: () => import("@/views/authentication/Signup.vue"),
      beforeEnter: async (to, from, next) => {
        const isTokenFound = localStorage.getItem('jwt_token');
        if (isTokenFound) {
          try {
            const userData = await services.getLoginUserDetails({});
            if (userData) {
              next(from.fullPath);
            } else {
              authService.doLogout();
            }
          } catch (error) {
            console.error('Error fetching user details:', error);
            authService.doLogout();
          }
        }
        else {
          next();
        }
      }
    },
    {
      path: "/profile",
      name: "Profile",
    },
    // Admin routes
    {
      path: "/admin",
      name: "admin-default",
      component: AdminLayoutView,
      meta: { requiresAdminAuth: true },
      children: [
        {
          path: 'dashboard',
          name: "Dashboard",
          component: () => import("@/views/admin/Dashboard.vue"),
        },
        {
          path: "product-list",
          name: "ProductList",
          component: () => import("@/views/admin/ProductList.vue")
        },
        {
          path: "order-list",
          name: "OrderList",
          component: () => import("@/views/admin/OrderList.vue")
        },
        {
          path: "user-list",
          name: "UserList",
          component: () => import("@/views/admin/UserList.vue")
        },
      ]
    },
    // User routes
    {
      path: "/",
      name: "user-default",
      component: UserLayoutView,
      children: [
        {
          path: "",
          name: "LandingPage",
          component: () => import("@/views/user/LandingPage.vue"),
        },
        {
          path: "products",
          name: "Products",
          component: () => import("@/views/user/Products.vue")
        },
        {
          path: "products/:productId", // we can use slug also.
          name: "Product",
          component: () => import("@/components/user/ProductDetails.vue")
        },
        {
          path: "cart",
          name: "Cart",
          component: () => import("@/views/user/Cart.vue")
        },
        {
          path: "orders",
          name: "Orders",
          component: () => import("@/views/user/Orders.vue"),
          meta: { requiresAuth: true }
        },
        {
          path: "favourites",
          name: "Favourites",
          component: () => import("@/views/user/Favourites.vue"),
          meta: { requiresAuth: true }
        },
        {
          path: "checkout",
          name: "Checkout",
          component: () => import("@/views/user/Checkout.vue"),
          meta: { requiresAuth: true }
        },
        {
          path: '/:catchAll(.*)',
          name: 'pageNotFound',
          component: NotFound,
        }
      ]
    },
  ]
});


router.beforeEach(async (to, from, next) => {
  const isTokenFound = localStorage.getItem('jwt_token');
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (isTokenFound) {
      try {
        const userData = await services.getLoginUserDetails({});
        if (userData) {
          next();
        } else {
          next(from.fullPath);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
        authService.doLogout();
      }
    } else {
      console.log("token not found and logout called!");
      authService.doLogout();
    }
  }
  else if (to.matched.some(record => record.meta.requiresAdminAuth)) {
    if (isTokenFound) {
      try {
        const userData = await services.getLoginUserDetails({});
        if (userData.role === "Admin") {
          next();
        } else {
          next(from.fullPath);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
        authService.doLogout();
      }
    } else {
      console.log("token not found and logout called!");
      authService.doLogout();
    }
  }
  else {
    next();
  }
})


export default router
