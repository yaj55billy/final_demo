export default {
  data() {
    return {

    }
  },
  props: ['tempProduct', 'api', 'status'],
  template: `
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 id="exampleModalLabel" class="modal-title">
            {{ tempProduct.title }}
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <img :src="tempProduct.image" class="img-fluid" alt>
          <blockquote class="blockquote mt-3">
            <p class="mb-0" v-html="tempProduct.content"></p>
            <footer class="blockquote-footer text-right">
              {{ tempProduct.description }}
            </footer>
          </blockquote>
          <div class="d-flex justify-content-between align-items-baseline">
            <div v-if="!tempProduct.price" class="h4">
              {{ tempProduct.origin_price }} 元
            </div>
            <del v-if="tempProduct.price" class="h6">原價 {{ tempProduct.origin_price }} 元</del>
            <div v-if="tempProduct.price" class="h4">
              現在只要 {{ tempProduct.price }} 元
            </div>
          </div>
          <select v-model="tempProduct.num" name class="form-control mt-3">
            <option value="0" disabled selected>
              請選擇數量
            </option>
            <option v-for="num in 10" :key="num" :value="num">
              選購 {{ num }} {{ tempProduct.unit }}
            </option>
          </select>
        </div>
        <div class="modal-footer">
          <div v-if="tempProduct.num" class="text-muted text-nowrap mr-3">
            小計
            <strong>{{ tempProduct.num * tempProduct.price }}</strong> 元
          </div>
          <button type="button" class="btn btn-primary" @click="addToCart(tempProduct.id, tempProduct.num)">
            <i v-if="tempProduct.id === status.loadingItem" class="fas fa-spinner fa-spin"></i>
            加到購物車
          </button>
        </div>
      </div>
    </div>
  `,
  methods: {
    addToCart(id, quantity = 1) {
      this.isLoading = true;
      const url = `${this.api.path}${this.api.uuid}/ec/shopping`;
      const cart = {
        product: id,
        quantity,
      };
      axios.post(url, cart)
        .then((res) =>{
          $('#productModal').modal('hide');
          this.isLoading = false;
          this.getCart(); // 要重新運算
        }).catch((error) =>{
          this.isLoading = false;
          console.log(error.response.data.errors[0]);
        });
    },
  }
}