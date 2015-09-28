/**
 * Created by Administrator on 2015/6/16 0016.
 */
/*收藏商品*/
function AddToFavorite(){
        document.all ? window.external.addFavorite(document.URL,document.title) :           // ie收藏主页
            window.sidebar ? window.sidebar.addPanel(document.title, document.URL, ""): false;   //火狐??
    console.log("收藏商品 ---------");
}
