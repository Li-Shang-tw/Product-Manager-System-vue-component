const template =  ` <div
        id="productModal"
        ref="productModal"
        class="modal fade"
        tabindex="-1"
        aria-labelledby="productModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-xl">
          <div class="modal-content border-0">
            <div class="modal-header bg-dark text-white">
              <h5 id="productModalLabel" class="modal-title">
                <span>新增產品 </span>
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-sm-4">
                  <div class="mb-1">
                    <div class="form-group">
                      <label for="imageUrl">輸入圖片網址</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="請輸入圖片連結"
                        v-model=" temporaryProuct.imageUrl"
                      />
                    </div>
                    <img
                      class="img-fluid"
                      :src="temporaryProuct.imageUrl"
                      alt=""
                    />
                  </div>
                  <div>
                    <button
                      type="button"
                      class="btn btn-outline-primary btn-sm d-block w-100"
                    >
                      新增圖片
                    </button>
                  </div>
                  <div>
                    <button class="btn btn-outline-danger btn-sm d-block w-100">
                      刪除圖片
                    </button>
                  </div>
                </div>
                <div class="col-sm-8">
                  <div class="form-group">
                    <label for="title">標題</label>
                    <input
                      id="title"
                      type="text"
                      class="form-control"
                      placeholder="請輸入標題"
                      v-model="temporaryProuct.title"
                    />
                  </div>

                  <div class="row">
                    <div class="form-group col-md-6">
                      <label for="category">分類</label>
                      <input
                        id="category"
                        type="text"
                        class="form-control"
                        placeholder="請輸入分類"
                        v-model="temporaryProuct.category"
                      />
                    </div>
                    <div class="form-group col-md-6">
                      <label for="price">單位</label>
                      <input
                        id="unit"
                        type="text"
                        class="form-control"
                        placeholder="請輸入單位"
                        v-model="temporaryProuct.unit"
                      />
                    </div>
                  </div>

                  <div class="row">
                    <div class="form-group col-md-6">
                      <label for="origin_price">原價</label>
                      <input
                        id="origin_price"
                        type="number"
                        min="0"
                        class="form-control"
                        placeholder="請輸入原價"
                        v-model="temporaryProuct.origin_price"
                      />
                    </div>
                    <div class="form-group col-md-6">
                      <label for="price">售價</label>
                      <input
                        id="price"
                        type="number"
                        min="0"
                        class="form-control"
                        placeholder="請輸入售價"
                        v-model="temporaryProuct.price"
                      />
                    </div>
                  </div>
                  <hr />

                  <div class="form-group">
                    <label for="description">產品描述</label>
                    <textarea
                      id="description"
                      type="text"
                      class="form-control"
                      placeholder="請輸入產品描述"
                      v-model="temporaryProuct.description"
                    >
                    </textarea>
                  </div>
                  <div class="form-group">
                    <label for="content">說明內容</label>
                    <textarea
                      id="content"
                      type="text"
                      class="form-control"
                      placeholder="請輸入說明內容"
                      v-model="temporaryProuct.content"
                    >
                    </textarea>
                  </div>
                  <div class="form-group">
                    <div class="form-check">
                      <input
                        id="is_enabled"
                        class="form-check-input"
                        type="checkbox"
                        :true-value="1"
                        :false-value="0"
                        v-model="temporaryProuct.is_enabled"
                      />
                      <label class="form-check-label" for="is_enabled"
                        >是否啟用</label
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-outline-secondary"
                data-bs-dismiss="modal"
              >
                取消
              </button>
              <button
                type="button"
                class="btn btn-primary"
                @click="getModifyProduct"
              >
                確認
              </button>
            </div>
          </div>
        </div>
      </div>

`

export default{
  data(){
    return {
     temporaryProuct:this.modifyProduct,
     fileInput:{}

    }

  },
  props:['modifyProduct'],
  template:template,
  methods:{
    getModifyProduct(){
      let product ={
        ...this.temporaryProuct,
        //數字轉型
        origin_price:parseInt(this.temporaryProuct.origin_price),
       price:parseInt(this.temporaryProuct.price)
      };
      //傳送product到app來post
      this.$emit('emit-modify-product',product)
    },
    
  },watch:{
    //監聽傳入product的變化
    modifyProduct(n){    
      this.temporaryProuct =n;
    }
  }
}