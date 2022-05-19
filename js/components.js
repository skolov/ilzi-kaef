// делает include для всех js файлов в папке components
const context = require.context('../components', true, /\.js$/)
const obj = {}
context.keys().forEach((key) => {
    obj[key] = context(key)
})
