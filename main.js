//api
const url ='https://vue3-course-api.hexschool.io/';
const path ="shang";
 
 //預設變數
 let productModal = null;
let delProductModal = null;
          
//---引入module------//
import pagination from 'https://li-shang-tw.github.io/Product-Manager-System-vue-component/components/pagation.js';
import productList from 'https://li-shang-tw.github.io/Product-Manager-System-vue-component/components/productList.js';
import productModalComponent from 'https://li-shang-tw.github.io/Product-Manager-System-vue-component/components/productModal.js';
import deleteModalComponent from 'https://li-shang-tw.github.io/Product-Manager-System-vue-component/components/deleteModal.js'
const app =Vue.createApp({
      data(){
      return{
           products:[],           
         temporaryProuct:{ }, 
         totalPageNum:0,
         currentPage:1,
        deleteProductId :''       

         
      }
    },
    components:{
       pagination, 
        productList,
        productModalComponent,
        deleteModalComponent   
    },
    methods:{   
        getProducts(page){      
       axios.get(`${url}api/${path}/admin/products?page=${page}`).then(res=>{
         //把資料放進products中         
         this.products = res.data.products; 
         //取得總頁數
         this.totalPageNum =res.data.pagination.total_pages;           
       })
     }, 
     getPageNum(pageNum) {
       if(pageNum==="pre"){
         //如果不是在第一頁
         if(this.currentPage !==1){
            this.currentPage -=1; 
         }
               
       }else if(pageNum==="next"){
         //如果不是在最後一頁
         if(this.currentPage !== this.totalPageNum ){
         this.currentPage+=1;
         }        
       }else{
         this.currentPage = pageNum;
       }     
     } ,  
     getProductId(id,pattern){  
       
         this.showProductModal(pattern,id);       
     },   
     showProductModal(pattern,direction){       
        if(pattern=="create"){
          //新增模式          
          productModal.show();
          //預設清空temporaryProuct的資料
          this.temporaryProuct={}
        }
        else if(pattern=="edit"){
        //修改模式   
       
        //從proudcts中取得對應proudct資料，放進temporaryProuct中        
         this.temporaryProuct  = this.products.find(product=>{
           return product.id ==direction
         });  
         //觸發modal
          productModal.show();     
        }
        else if(pattern=="delete"){
         //刪除模式

         //儲存要delete的商品的id
         this.deleteProductId =direction;       
           //觸發modal
          delProductModal.show();   
        }          
     },
     getModifyProduct(product){
       //利用product是否有id來判定是編輯還是新增
       if(product.id){
         //編輯
         this.putProduct(product.id,product);
       }else{
           //新增
       this. postNewProduct(product);
       }
      },      
     deleteProduct(){
       
       const id = this.deleteProductId;

       axios.delete(`${url}api/${path}/admin/product/${id}`).then(res=>{
          //刪除失敗
         if(!res.data.success){
            alert(res.data.message);  
             delProductModal.hide();
         }else{
           //刪除成功
            alert(res.data.message);       
         //清除deleteProductId的值
         this.deleteProductId="";
          //關閉modal
       delProductModal.hide();
         //重新取得product值
         this.getProducts();
         } })
     },
     postNewProduct(newProduct){
     axios.post(`${url}api/${path}/admin/product`, { data: newProduct }).then(res=>{
        //錯誤通知
      if(!res.data.success){      
      //關閉modal
      productModal.hide();
      alert(`${res.data.message}`);
        }else{
         //建立成功
      alert("產品建立成功!!");
       
         //關閉modal
       productModal.hide();
       //重新取得商品資料
     this.getProducts(this.currentPage); }     
     })
     } ,
     putProduct(id,editedProduct){
       axios.put(`${url}api/${path}/admin/product/${id}`, { data: editedProduct }).then(res=>{
         alert(res.data.message);
       
         //關閉modal
       productModal.hide();
         this.getProducts(this.currentPage);
       })
     }
    },
    mounted(){ 
      //-----登入狀態驗證---------//     
      //取出token
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1"); 
      //-------未登入，轉址回登入頁----
      if(token ==""){
      alert('您尚未登入請重新登入。');
      window.location = 'login.html';
      }     
      //將token預設放進axios的header      
        axios.defaults.headers.common.Authorization = token;
     //預設取得第一頁
      this.getProducts(1);
     
       //addProductModal實體化
 productModal = new bootstrap.Modal(document.querySelector('#productModal'));
  //deleteProductModal實體化  
delProductModal = new bootstrap.Modal(document.querySelector('#delProductModal'));

    },
   watch:{
     currentPage(n){
       //當目前頁面變化，重新取得商品資訊
       this.getProducts(n);
     }
   }
  })

  app.mount('#app');

