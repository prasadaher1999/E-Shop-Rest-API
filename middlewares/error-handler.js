function handleErrors(error, request, response, next) {
    try {
        if (response.statusCode == 200) {
            response.status(500)
        }
        response.json({ error: error.message, info: "message from error handler middleware!!" })
    }

    catch (error) {
        // catch the error
        next()//express js default handler
    }
}

module.exports = { handleErrors }