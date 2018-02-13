var mmb = null;
$(function () {
  mmb = new Mmb();
  mmb.getMenu();
  mmb.getProductList();
})

function Mmb() {

}
Mmb.prototype = {
  getMenu: function () {
    $.ajax({
      url: 'http://127.0.0.1:9090/api/getindexmenu',
      success: function (data) {
        // console.log(data);
        var html = template('menuTmp', data);
        // console.log(html);
        $('#main .menu').html(html);         
      }
    })
  },
  getProductList: function () {
    $.ajax({
      url: 'http://127.0.0.1:9090/api/getmoneyctrl',
      success: function (data) {
        // console.log(data);
        var html = template('productlistTmp', data);
        console.log(html);
        $('#main .discount-list ul').html(html);
      }
    })
  }
}