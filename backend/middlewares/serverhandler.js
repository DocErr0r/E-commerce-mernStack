const serverHandler = (fn) => (req, res, next) => {
    try {
        Promise.resolve(fn(req, res, next)).catch(err => {
            res.status(500).send({ message: err.message })
        })
    } catch (e) {
        res.status(500).send({ message: 'Internal server error' })
    }
}
export default serverHandler;