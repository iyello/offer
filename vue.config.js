module.exports = {
    devServer:{
        host: '172.31.199.41',
        proxyTable:{
            '/api/':{
                target:'http://39.108.0.22:8088',
                changeOrigin:true
            }
        }
    }
}