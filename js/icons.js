const context = require.context('../assets/icons', true, /\.svg$/)
const obj = {}
context.keys().forEach((key) => {
    obj[key] = context(key)
})
