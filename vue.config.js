module.exports = {
    devServer: {

        proxy: {
            '/api': {    // search为转发路径
                target: 'http://localhost:8001',  // 目标地址
                ws: true, // 是否代理websockets
                changeOrigin: true ,  // 设置同源  默认false，是否需要改变原始主机头为目标URL,
                pathRewrite: {
                    '^/api': ''   // 把 '/api/user' 替换为 '/user'
                }
            }

        }

    }
};

