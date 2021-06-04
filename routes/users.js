var express = require('express');
const axios = require("axios");
var router = express.Router();


/* GET users listing. */
router.post('/', function(req, res, next) {
  checkLinks(req.body.urls);
  res.send(req.body);
});

//检查链接是否符合标准,检测是否访问正常,访问正常则添加在json尾部
function checkLinks(links) {
  //首先利用/r/n /n来分割成为数组
  links = links.split(/[\s\n]/)
  //检测是否为URL格式


  //添加到json文件尾部
  for (let key in links) {
    console.log(links[key])
    //如果是,尝试访问,获得返回HTTP状态码,并从里面获得制定数据
    axios
        .get(links[key])
        .then(r => console.log(r.status) )
        .catch(err => console.log(err.response.status))
  }
}
module.exports = router;
