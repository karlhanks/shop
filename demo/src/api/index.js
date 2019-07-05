//1.导入axios模块
import axios from 'axios'
import qs from 'qs'

//2.全局配置
axios.defaults.baseURL = 'http://118.31.9.103';

//3.定义接口 并 导出

export const goodsListApi = (apiParams) => {
    // return axios({
    //     method:'get',
    //     // url:`http://118.31.9.103/api/goods/index?minprice=${this.minprice}&maxprice=${this.maxprice}&order=${this.order}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`
    //     // 发现：上面网址太难维护
    //     // 但是：又要这样传值
    //     // 解决：通过声明params: 数据 
    //     // 作用：把对象 按照  键:值&...&键n:值n 追加到 url参数后面
    //     url: 'http://118.31.9.103/api/goods/index',
    //     params: apiParams  // apiParams里面的成员必须是minprice、maxprice、order等 
    // })  

    //发现：上述方法可以操作，
    //但是：还是的res.data.data  
    //思考：如何简化
    return axios({
        method:'get',
        url: '/api/goods/index',
        params: apiParams 
    }).then(res => res.data)
}


export const addCartApi = (apiParams) => {
    return axios({
        method: 'post',
        url: '/api/cart/create',
        // data: 键1=值n&...&键n=值n
        data: qs.stringify(apiParams) //会将对象转化为上述格式
    }).then(res => res.data)
}