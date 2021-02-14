module.exports = {
    development: {
        port: process.env.PORT || 5000,
        SECRET: 'verySecretSecret',
        DB_URI: 'mongodb://localhost:27017/cubicle',
        COOKIE_NAME: 'USER_AUTH'
    },
    production: {
        port: process.env.PORT || 5000,
        SECRET: 'verySecretSecret',
        DB_URI: 'mongodb://localhost:27017/cubicle',
        COOKIE_NAME: 'USER_AUTH'
    }
}[process.env.NODE_ENV];