// JavaScript Document
/**
 * 1.按比例缩放图片显示到合适位置
 *
 */


//define(function(){
if (window.console && window.console.log)console.log("----------loading ScalingImages.js ------------");
	/*按比例生成缩略图w:310,height:310*/
	function ImgSize(imageDest, MaxW, MaxH){
		if (window.console && window.console.log)console.log("缩放图片的MaxW:"+MaxW+"  高："+MaxH);
		if ( !imageDest ) {
			if (window.console && window.console.log)console.log("图片对象没有取到---");
			return;
		}
		var image = new Image();
			image.src = imageDest.src;
		var DW,DH;
		if (window.console && window.console.log)console.log("原始的图片的MaxW:"+image.width+"  高："+image.height);
		if(image.width>0 && image.height>0){ //比较纵横比
			if(image.width/image.height >= MaxW/MaxH){//相对显示框：宽>高
				if(image.width > MaxW){ //宽度大于显示框宽度W，应压缩高度
					DW = MaxW;//直接将宽度设置为边框的宽
					DH = (image.height*MaxW)/image.width;//每一份实际的宽相对于边框的宽 X 实际的高=相对于边框的高
				}else{ //宽度少于或等于显示框宽度W，图片完全显示
					DW = image.width;
					DH = image.height;
				}
			}else{//同理
				if(image.height > MaxH){
					DH = MaxH;
					DW = (image.width*MaxH)/image.height;
				}
				else{
					DW = image.width;
					DH = image.height;
				}
			}
			imageDest.width = DW;
			imageDest.height = DH;
		}
		if (window.console && window.console.log)console.log("缩放图片：--------------"+imageDest.width+" ,"+imageDest.height);
	}


  //return ImgSize;


//});






