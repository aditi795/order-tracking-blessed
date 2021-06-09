var itemModel = require('../models/item');

var itemsController={
    itemHome(req,res){
      
      /*mock item for now*/
      items = [{order_id:1,product_id:2,quantity:4}]
      res.render('items', items)
      }
}

module.exports = itemsController;
