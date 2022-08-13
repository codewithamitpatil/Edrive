
// success message
module.exports = (msg, docs = {}) => {
    return {
        status: 200,
        message: msg,
        docs: docs
    }
}