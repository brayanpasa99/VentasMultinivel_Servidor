const middelware = (error, req, res, next) => {
    res.status(500).json({
        ErrorMessage: error.stack
    })
}

module.exports = middelware;