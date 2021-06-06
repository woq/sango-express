var express = require('express');
const axios = require("axios");
const fs = require('fs');
const path = require('path');
var router = express.Router();


/* GET users listing. */
router.post('/', function(req, res, next) {
  res.send(checkLinks(req.body.urls));
});

//检查链接是否符合标准,检测是否访问正常,访问正常则添加在json尾部
async function checkLinks(links) {
  links = links.split(/[\s\n]/) //首先利用/r/n /n来分割成为数组
  let success = {}; //初始化存放成功结果的数据

  //开始循环
  for (const value of links) {
    if(checkIsUrl(value)){
      await axios
          .get(value)
          .then(function (r){
            success[getUserId(r.data)] = value
            console.log(success)
          })
          .catch(err => console.log(err))

    }

  }
  /*
  for (let key in links) {

    //检查是否为URL格式,如果不是,中止本次循环 如果是,尝试访问,获得返回HTTP状态码,并从里面获得制定数据
    if(checkIsUrl(links[key])){
      axios
          .get(links[key])
          .then(function (r){
            getUserId(r.data,links[key])
            console.log(success)
            })
          .catch(err => console.log(err))

    }
  }

   */
  //读取本地json文件 并添加数据到json尾部
  let jsonData;

  fs.readFile(path.join(__dirname, 'data.json'),'utf8',function(err,data){
    if(err) throw(err.status)
    let writeLinks = JSON.parse(data)
    for (let key in writeLinks){
      writeLinks.append()
    }
    console.log(JSON.parse(data))
  })
  /*
  fs.writeFile(path.join(__dirname, 'data.json'),JSON.stringify(success,JSON.parse(jsonData)),'utf8',(err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  })

   */
  return JSON.stringify(success)
}

function checkIsUrl(URL) {
  //判断URL地址的正则表达式为:http(s)?://([\w-]+\.)+[\w-]+(/[\w- ./?%&=]*)?
  //下面的代码中应用了转义字符"\"输出一个字符"/"
  let Expression = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
  let objExp = new RegExp(Expression);
  return objExp.test(URL) === true;
}

function getUserId(responseData) {
  return responseData.match(/你的君主编号:(\S*)&nbsp;&nbsp;/)[1]
}
module.exports = router;
