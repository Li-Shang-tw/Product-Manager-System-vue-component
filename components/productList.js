const template =`  <tr v-for="(product,key) in products" :key="product.id">
              <td>{{product.category}}</td>
              <td>{{product.title}}</td>
              <td class="text-end">{{product.origin_price}}</td>
              <td class="text-end">{{product.price}}</td>
              <td>
                <span v-if="product.is_enabled" class="text-success">啟用</span>
                <span v-else>未啟用</span>
              </td>
              <td>
                <div class="btn-group">
                  <button
                    type="button"
                    class="btn btn-outline-primary btn-sm"
                    @click="passProductId(product.id,'edit')"
                  >
                    編輯
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm"
                    @click="passProductId(product.id,'delete')"
                  >
                    刪除
                  </button>
                </div>
              </td>
            </tr>`;

            //預設變數
            let delProductModal = null;

export default{
  data(){
    return {
             
    
    }

  },props:[
    'products'
  ],template:template,
  methods:{
    passProductId(id,pattern){    
   this.$emit('emit-product-id',id,pattern);
    },
    
  }
  
  
}