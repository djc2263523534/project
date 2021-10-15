module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                'assets': '@/assets',
                'network': '@/network',
                'common': '@/common',
                'views': '@/views',
                'components': '@/components'
            }
        }
    }
}