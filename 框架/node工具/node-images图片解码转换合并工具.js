/**
 * Created by Administrator on 2015/10/13 0013.
 */
/**
 Features 功能特性

 Lightweight:no need to install any image processing library.
 轻量级：无需安装任何图像处理库。
 Cross-platform: Released a compiled .node file on windows, just download and start.
 跨平台：Windows下发布了编译好的.node文件,下载就能用。
 Easy-to-use: Provide jQuery-like chaining API.Simple and reliable!
 方便用：jQuery风格的API，简单可依赖。

 Installation 安装

    npm install images
 If the installation fails, try to install the following libraries.
     giflib 4.x.x
     libpng 1.5.x
     jpeg-turbo 1.x.x
 */

//API:

//1.node-images 提供了类似jQuery的链式调用API,您可以这样开始:
/* Load and decode image from file */
/* 从指定文件加载并解码图像 */
images(file)

/* Create a new transparent image */
/* 创建一个指定宽高的透明图像 */
images(width, height)

/* Load and decode image from a buffer */
/* 从Buffer数据中解码图像 */
images(buffer[, start[, end]])

/* Copy from another image */
/* 从另一个图像中复制区域来创建图像 */
images(image[, x, y, width, height])

/* eg:images(200, 100).fill(0xff, 0x00, 0x00, 0.5) Fill image with color* /
/* 以指定颜色填充图像 */
.fill(red, green, blue[, alpha])

/*Draw image on the current image position( x , y )
在当前图像( x , y )上绘制 image 图像*/
.draw(image, x, y)

/*eg:images("input.png").encode("jpg", {operation:50}) Encode image to buffer, config is image setting.
    以指定格式编码当前图像到Buffer，config为图片设置，目前支持设置JPG图像质量
Return buffer
返回填充好的Buffer
Note:The operation will cut off the chain
注意:该操作将会切断调用链*/
    .encode(type[, config])


/*
See:.save(file[, type[, config]]) 参考:.save(file[, type[, config]])
eg:images("input.png").encode("output.jpg", {operation:50}) Encoding and save the current image to a file, if the type is not specified, type well be automatically determined according to the file, config is image setting. eg: { operation:50 }
编码并保存当前图像到 file ,如果type未指定,则根据 file 自动判断文件类型，config为图片设置，目前支持设置JPG图像质量
*/
.save(file[, type[, config]])


/*Get size of the image or set the size of the image,if the height is not specified, then scaling based on the current width and height
获取或者设置图像宽高，如果height未指定，则根据当前宽高等比缩放*/
    .size([width[, height]])


/*Get width for the image or set width of the image
获取或设置图像宽度*/
    .width([width])


/*Get height for the image or set height of the image
获取或设置图像高度*/
    .height([height])

/*Set the limit size of each image
设置库处理图片的大小限制,设置后对所有新的操作生效(如果超限则抛出异常)。*/
images.setLimit(width, height)