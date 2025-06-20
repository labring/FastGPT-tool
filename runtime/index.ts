import { Command } from "commander";
import express from "express";
import { init } from "./utils/tools";
import { createExpressEndpoints } from "@ts-rest/express";
import { contract } from "./contract";
import { generateOpenApi } from "@ts-rest/open-api";
import swaggerUi from "swagger-ui-express";

import router from "./controllers";

const program = new Command();

program
  .name("fastgpt-tools")
  .description("Run tools for FastGPT")
  .option("-p, --prod", "Run in production mode")
  .option("-P, --port <port>", "Specify the port to run on", "")
  .parse();
export const prod = program.opts().prod as boolean;
const PORT = parseInt(program.opts().port || process.env.PORT || "3000");
init(prod); // init the tool

const app = express().use(
  express.json(),
  express.urlencoded({ extended: true }),
  express.static("public", {}),
);

const openApiDocument = generateOpenApi(contract, {
  info: {
    title: "FastGPT-plugin API document",
    version: "1.0.0",
    description: "FastGPT-plugin API document",
  },
});

createExpressEndpoints(contract, router, app);

app.use("/openapi", swaggerUi.serve);
app.get("/openapi", swaggerUi.setup(openApiDocument));

app.listen(PORT, (error?: Error) => {
  if (error) {
    console.error(error);
    process.exit(1);
  }
  console.log(
    `FastGPT Plugin Service is listening at http://localhost:${PORT}`,
  );
});
