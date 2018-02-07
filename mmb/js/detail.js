var mmb = null;
var strObj = {};
$(function () {
  mmb = new Mmb();
  mmb.scrollTop();
  mmb.getSearchVal();
  mmb.setListTitle();
  mmb.getProductDetail();
})

var Mmb = function () {

}

Mmb.prototype = {
  scrollTop: function () {
    $('#footer>div .to-top').on('click', function () {
      $('html').scrollTop(0);
    })
  },
  getSearchVal: function () {
    //从地址栏取到需要的值
    var arr = window.location.search.substr(1).split('&');
    strObj.productId = arr[0].match(/\d+/)[0];
    strObj.categoryId = arr[1].match(/\d+/)[0];
    strObj.comNum = arr[2].match(/\d+/)[0];
    strObj.brandName = decodeURIComponent(arr[3].split('=')[1]);
  },
  setListTitle: function () {
    $.ajax({
      url: 'http://127.0.0.1:9090/api/getcategorybyid',
      data: {'categoryid': strObj.categoryId},
      success: function (data) {
        console.log(data);
        strObj.category = data.result[0].category;
        console.log(strObj);
        var html = template('listTitlTmp', strObj)
        $('#detail-title .left-title').html(html);
      }
    })
  },
  getProductDetail: function () {
    $.ajax({
      url: 'http://127.0.0.1:9090/api/getproduct',
      data: {'productid':strObj.productId},
      success: function (data) {
        // console.log(data);
        var html = template('productTmp', data);
        var bjShop = template('bjShopTmp', data);
        $('#detail-body .productInfo').html(html);
        $('.bj-shop').html(bjShop);
      }
    })

  }
}