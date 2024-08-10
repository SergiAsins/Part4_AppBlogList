const info = (...params) => {
    if (process.env.MONGODB_URI !== 'test') {
        console.log(...params)
    }
}

const error = (...params) => {
    if (process.env.MONGODB_URI !== 'test') {
        console.error(...params)
    }
};

export default {info, error}