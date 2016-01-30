/**
 * Created by Administrator on 2015/10/13 0013.
 */
/**
 * 实现原理：
 *  浏览器支持background-position，通过设置偏移量，显示一张图片的局部区域。
 *  这样就可以尝试把css所有用到的图片进行合并，然后设置background-position进行展示。 这就是csssprites的原理
 * 实现步骤
     1.分析css，拿到每一个规则集中的图片以及backgroud-repeat、background-position、图片是否需要sprite。并且根据样式进行记录
        现在开源社区应该有很多css词法分析器，但此工具中只需要知道几个简单信息，完全能用正则搞定，所以实现了一个简单的css词法分析器，拿到需要的数据保存到一个Map中。
        如： .nav {
                    background: url('img/nav.png?__sprite') no-repeat left top;
             }
         分析得到
         property	    value	        说明
         image_url	img/nav.png	   使用的图片url
         isSprites	true	       是否需要csssprites处理
         position	[left, top]    background-position的x，y值
         repeat	      false	      表示不进行repeat，为了区分做合并
     2.拿到所有的图片，根据no-repeat，repeat-x，repeat-y进行分类合并图片
            css解析到了一个图片规则的列表，根据class区分。
            根据repeat对得到的规则列表分类，分成三类no-repeat，repeat-x，repeat-y；它们最后会分别通过不同的算法进行合并后产出z,x,y三张图。
            repeat-x的图片竖着进行合并。
                需要注意一点，图片的宽度不是相同宽度的的，所以竖着排后发现某一个图片的宽度小于最大宽度，需要在x轴方向重复平铺自己直到铺面整个最大宽度。
            repeat-y的图片横着进行合并。
                和repeat-x的合并算法一样，如果发现高度小于最大高度，也进行在y轴方向平铺自己。
            no-repeat的图片都靠右竖着合并。
                为了支持background-position: right (?:\d+px|top)的情况，no-repeat的图片全部靠右合并。

         支持写法	                               示例	                                使用场景
         background-position: \d+px \d+px;	background-position: -9px -1px;	    需要合并的图是一个合并了很多小图的图片
         background-position: left \d+px;	background-position: left -11px;	需要合并的图片向左浮动
         background-position: right \d+px;	background-position: right -1px;	需要合并的图片向右浮动
         background-position: left top;	    background-position: left top;	    需要合并的图片向左浮动
         background-position: right top;	background-position: right top; 	需要合并的图片向右浮动
     3.修改css
 *
 *
 *
 *
 */


