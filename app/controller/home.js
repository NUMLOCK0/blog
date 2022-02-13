'use strict';

const Controller = require('egg').Controller;
const axios = require("axios")

const url = 'https://attendance-api.yidejia.com/api/'
const ybsurl = 'https://ybsapi.yidejia.com/api/'

class HomeController extends Controller {
  get user (){
    return '小明'
  }
  async index() {
    const { ctx } = this;
    ctx.body = {
      aa: this.user
    };
  }

  async kq(){
    const {ctx} = this
    await ctx.render('kq/index.nj');
  }

  async up(){
    const {ctx} = this
    const query = this.ctx.query;
    try {
   const resInfo = await axios.get(`${url}attendance/employee/info?token=${query.token}`)

    const res = await axios.post(`${url}attendance/clockIn?token=${query.token}`, {
      "type": query.type,
      "model_type": 1,
      latitude: "22.984197945404237",
      longitude: "113.38059325033511",
      address: "广州市番禺区广州番禺节能科技园总部中心-23号楼",
      location_name: "广州市番禺区广州番禺节能科技园总部中心-23号楼",
       "signature": resInfo.data.data.key.signature,
      "timestamp": resInfo.data.data.key.timestamp,
      "is_fieldwork": 0,
      "desc": "",
      "attendance_method": 1
    })
    
    ctx.body = {
      ...res.data
    };
    } catch (error) {
      ctx.body = {
        ...error
      };
    }
  }

  async login(){
    const {ctx} = this
    try {
      const res = await axios({url: `${ybsurl}authorizations`, baseURL: ybsurl, headers: {
        "Content-Type": 'application/x-www-form-urlencoded'
      },
      method: 'post',
      // data: JSON.stringify() 
    params: JSON.stringify({
      account: '谢彩霞',
      password: 'test888888'
  })
  })
      ctx.body = {
        ...res
      };
    } catch (error) {
      ctx.body = {
        ...error
      };
    }
    
  }
  async down(){
    const {ctx} = this
    ctx.body = {
      aa: '下班打卡'
    };
  }
}

module.exports = HomeController;
