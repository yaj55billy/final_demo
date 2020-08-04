export default {
  data() {
    return {
      username: '',
      email: '',
      tel: '',
      addr: '',
      payMethod: '',
      message: '',
    };
  },
  template:`
  <validation-observer v-slot="{ invalid }">
    <form @submit.prevent="clickMe()">
      <!-- 收件人姓名 -->
      <div class="form-group">
        <validation-provider rules="required" v-slot="{ errors, classes }">
          <label for="username">收件人姓名</label>
          <input id="username" type="text" name="收件人姓名" v-model="username" class="form-control" :class="classes">
          <span class="invalid-feedback">{{ errors[0] }}</span>
        </validation-provider>
      </div>

      <!-- Email  -->
      <div class="form-group">
        <validation-provider rules="required|email" v-slot="{ errors, classes }">
          <label for="email">Email</label>
          <input id="email" type="email" name="信箱" v-model="email" class="form-control" :class="classes">
          <span class="invalid-feedback">{{ errors[0] }}</span>
        </validation-provider>
      </div>

      <!-- 電話 -->
      <div class="form-group">
        <validation-provider rules="required|min:8" v-slot="{ errors, classes }">
          <label for="tel">電話</label>
          <input id="tel" type="tel" name="電話" v-model="tel" class="form-control" :class="classes">
          <span class="invalid-feedback">{{ errors[0] }}</span>
        </validation-provider>
      </div>

      <!-- 地址 -->
      <div class="form-group">
        <validation-provider rules="required" v-slot="{ errors, classes }">
          <label for="addr">地址</label>
          <input id="addr" type="text" name="地址" v-model="addr" class="form-control" :class="classes">
          <span class="invalid-feedback">{{ errors[0] }}</span>
        </validation-provider>
      </div>

      <!-- 購買方式 -->
      <div class="form-group">
        <label for="pay-method">購買方式</label>
        <select name="付款方式" id="pay-method" class="form-control" required="required" v-model="payMethod">
          <option value="" disabled="disabled" selected>請選擇付款方式</option>
          <option value="WebATM">WebATM</option>
          <option value="ATM">ATM</option>
          <option value="Barcode">Barcode</option>
          <option value="Credit">Credit</option>
          <option value="ApplePay">ApplePay</option>
          <option value="GooglePay">GooglePay</option>
        </select>
      </div>

      <div class="form-group">
        <label for="message">留言</label>
        <textarea name="message" id="" cols="30" rows="3" class="form-control" v-model="message"></textarea>
      </div>

      <button type="submit" class="btn btn-primary" :disabled="invalid">按鈕</button>
    </form>
  </validation-observer>
  `,
  methods:{
    clickMe() {
      console.log('表單送出');
    },
  },

};