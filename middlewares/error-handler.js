function handleErrors(error, request, response, next) {
    console.log(error);
    try {
        if (response.statusCode == 200) {
            response.status(500)
        }
        response.json({ error: error.message|| "Something Went Wrong !" , msg: "from error handler middleware !"})
    }

    catch (error) {
        // catch the error
        console.log(error);
        next()//express js default handler
    }
}

module.exports = { handleErrors }