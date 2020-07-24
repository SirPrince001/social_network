const { ResponseError } = require("../utils/response");
module.exports = (controller) => {
  return async (request, response) => {
    try {
      let x = await controller(request);

      return response.status(x.status).send(x.data);
    } catch (error) {
      console.error(error.message);
      if (error instanceof ResponseError) {
        return response.status(error.status).send({
          error: true,
          message: error.message,
        });
      }
      console.log(error.stack);
      return response.status(500).send(`${error.message} - ${error.stack}`)
    }
  };
};
