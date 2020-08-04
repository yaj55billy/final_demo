// vue-loading
Vue.component('loading', VueLoading);

/* 購物車 Component Start */
import cart from './cart.js';
Vue.component('cart', cart);
/* 購物車 Component END */

/* 驗證相關 Start */
import zh_tw from './zh_tw.js';
Vue.component('ValidationProvider', VeeValidate.ValidationProvider);
Vue.component('ValidationObserver', VeeValidate.ValidationObserver);
VeeValidate.configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
  }
});
VeeValidate.localize('tw', zh_tw);
/* 驗證相關 END */

new Vue({
  el: '#app',
  data: {
    products: [],
    pagination: {},
    tempProduct: {
      imageUrl: [],
    },
    carts: [],
    cartTotal: 0,
    status: {
      loadingItem: '',
    },
    api: {
      uuid: 'e6527241-dd52-4bd8-94eb-eb0e02127c72',
      path: 'https://course-ec-api.hexschool.io/api/'
    },
    token: '',
    isLoading: false // vue-loading
  },
  methods: {
    getProducts(num = 1) {
      this.isLoading = true;
      const url = `${this.api.path}${this.api.uuid}/ec/products?page=${num}`;
      axios.get(url).then((res) => {
        this.products = res.data.data;
        this.isLoading = false;
      }).catch((error) =>{
        this.isLoading = false;
      });
    },
    getProduct(id) {
      this.status.loadingItem = id;
      this.isLoading = true;
      const url = `${this.api.path}${this.api.uuid}/ec/product/${id}`;
      axios.get(url).then((res) => {
        this.status.loadingItem = '';
        this.isLoading = false;
        this.tempProduct = res.data.data;
        this.tempProduct.num = 1;
        $('#productModal').modal('show');
      }).catch((error) =>{
        console.log(error);
      });
    },
    addToCart(id, quantity = 1) {
      this.isLoading = true;
      const url = `${this.api.path}${this.api.uuid}/ec/shopping`;
      const cart = {
        product: id,
        quantity,
      };
      axios.post(url, cart)
        .then((res) =>{
          this.isLoading = false;
          $('#productModal').modal('hide');
          this.getCart();
        }).catch((error) =>{
          this.isLoading = false;
          console.log(error.response.data.errors[0]);
        });
    },
    getCart() { // 取得購物車資訊
      this.isLoading = true;
      const url = `${this.api.path}${this.api.uuid}/ec/shopping`;
      axios.get(url)
        .then((res) =>{
          this.carts = res.data.data;
          this.updateTotal();
          this.isLoading = false;
        });
    },
    updateTotal() { // 計算總價
      this.cartTotal = 0; // 歸零，不然計算會有累加狀況。
      this.carts.forEach((item) =>{
        this.cartTotal += item.product.price * item.quantity;
      });
    },
    deleteCartItem(id) { // 刪除購物車某筆資料
      this.isLoading = true;
      const url = `${this.api.path}${this.api.uuid}/ec/shopping/${id}`;
      axios.delete(url).then((res) => {
        this.getCart(); // 要重新運算
        this.isLoading = false;
      }).catch((error) =>{
        this.isLoading = false;
      });
    },
    deleteCartAll(){
      this.isLoading = true;
      const url = `${this.api.path}${this.api.uuid}/ec/shopping/all/product`;
      axios.delete(url).then((res) => {
        this.getCart(); // 要重新運算
        this.isLoading = false;
      }).catch((error) =>{
        this.isLoading = false;
      });
    },
    editCartItemNum(id,quantity) {
      this.isLoading = true;
      const url = `${this.api.path}${this.api.uuid}/ec/shopping`;
      const cart = {
        product: id,
        quantity,
      };
      axios.patch(url, cart)
        .then((res) =>{
          this.isLoading = false;
          this.getCart();
        }).catch((error) =>{
          this.isLoading = false;
        });
    },
  },
  created() { // 初始取得
    this.getProducts();
    this.getCart();
  }
});
