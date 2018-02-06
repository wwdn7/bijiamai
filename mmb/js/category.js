var mmb = null;
$(function () {
  mmb = new Mmb();
  mmb.getCategoryTitle();
  mmb.getCategory();
  mmb.scrollTop();
  mmb.closeOpenAppBar();
  mmb.toProductList();
})

function Mmb() {

};
Mmb.prototype = {
  reset: function () {
    $('#main .category .category-second').remove();
    $('#main .category .category-first>a').css('backgroundImage', 'url(images/arrow1.gif)');
    $('#main .category .category-first>a').data('status', 0);
  },
  getCategoryTitle: function () {
    $.ajax({
      url: 'http://127.0.0.1:9090/api/getcategorytitle',
      success: function (data) {
        // console.log(data);
        var html = template('categoryTitleTmp', data);
        $('#main .category').html(html);
      },
    })
  },
  getCategory: function () {
    $("#main .category").on('click', '.category-first>a', function () {
      var that = $(this);
      if (that.data('status') == 0) {
        $.ajax({
          url: 'http://127.0.0.1:9090/api/getcategory',
          data: {
            titleid: that.data('titleId')
          },
          success: function (data) {
            // console.log(data);
            //先关掉别的分类 换掉所有的箭头 status全部变为0
            mmb.reset();
            // console.log(data);
            var html = template('categoryTmp', data);
            $('#main .category .category-first').eq(that.data('titleId')).after(html);
            //右边小箭头换方向
            that.css('backgroundImage', 'url(images/arrow2.gif)');
            that.data('status', 1)
          }
        })
      } else {
        $('#main .category .category-second').remove();
        that.css('backgroundImage', 'url(images/arrow1.gif)');
        that.data('status', 0);
      }
    })
  },
  scrollTop: function () {
    $('#footer>div .to-top').on('click', function () {
      mmb.reset();
      $('html').scrollTop(0);
    })
  },
  closeOpenAppBar: function () {
    $('#open-app-bar .closefix').on('click', function () {
      $(this).parent().hide();
    })
  },
  toProductList: function () {
    $('#main').on('click', '.category-second > a', function () {
      // console.log($(this).data('categoryId'));
      var u = 'productlist.html?categoryid=' + $(this).data('categoryId');
      console.log(u);
      window.location = u;
    })
  }
}