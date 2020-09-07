module.exports = {
    devServer: {
        host:"localhost",
        port:8081,
        https:false,
        open:true,
          proxy: {
            "/api": {
              target:"https://www.maomin.club/", // 目标代理接口地址
            //   secure: true,
              changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
              // ws: true, // 是否启用websockets
              pathRewrite: {
                "^/api": "" 
              }
            }
          }
    }    
}