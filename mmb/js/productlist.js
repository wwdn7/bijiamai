var mmb = null;
var categoryId;
var totalPage;
$(function () {
  mmb = new Mmb();
  mmb.getCategoryInfo();
  mmb.getProductList(1);
  mmb.scrollTop();
  mmb.changePage();
})

function Mmb() {

};

Mmb.prototype = {
  getCategoryInfo: function () {
    categoryId = window.location.search.substr(1).match(/\d+/)[0];
    $.ajax({
      url: 'http://127.0.0.1:9090/api/getcategorybyid',
      data: {
        'categoryid': categoryId
      },
      success: function (data) {
        // console.log(data);
        var html = template('titleTmp', data);
        $('#list-title .currentCategory').html(html);
      }
    })
  },
  getProductList: function (page) {
    $.ajax({
      url: 'http://127.0.0.1:9090/api/getproductlist',
      data: {
        'categoryid': categoryId,
        'pageid': page
      },
      success: function (data) {
        //将价格前面的￥符号干掉
        for (var i = 0; i < data.result.length; i++) {
          var str = data.result[i].productPrice;
          data.result[i].productPrice = str.replace('￥', '');
        }
        //把评论数单独提取出来
        for (var i = 0; i < data.result.length; i++) {
          var str = data.result[i].productCom;
          data.result[i].productComNum = str.match(/\d+/)[0];
        }
        var html = data.result.length ? template('productTmp', data) : '暂时没有数据';
        // console.log(html);
        $('#list-body').html(html);
        // console.log(data);
        totalPage = Math.ceil((data.totalCount) / (data.pagesize));
      }
    })
  },
  scrollTop: function () {
    $('#footer>div .to-top').on('click', function () {
      $('html').scrollTop(0);
    })
  },
  changePage: function () {
    var page = 1;
    $('.mui-pager #next').on('click', function () {
      page++;
      page = page <= totalPage ? page : totalPage;
      mmb.getProductList(page)
    })
    $('.mui-pager #pre').on('click', function () {
      page--;
      page = page >= 1 ? page : 1;
      mmb.getProductList(page)
    })
  }
}