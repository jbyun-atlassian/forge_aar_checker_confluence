import api, { route, asApp, asUser } from "@forge/api";

export { handler } from "./resolvers";

exports.runWebTrigger = async (request) => {
  try {
    const reqBody = JSON.parse(request.body);
    const space_list = reqBody.space_list;
    if (!space_list) {
      throw new Error("space_list property is missing in the request body.");
    }

    if (!Array.isArray(space_list)) {
      throw new Error("space_list property must be array in the request body.");
    }

    let results = [];
    for (var i = 0; i < space_list.length; i++) {
      const space = space_list[i];
      try {
        const res = await asApp().requestConfluence(
          route`/wiki/rest/api/space/${space}/content`
        );

        const data = await res.json();
        results.push({
          message: `result of ${space}`,
          result: data,
        });
      } catch (err) {
        results.push({
          message: `result of ${space}`,
          result: `(error) ${err.message}`,
        });
      }
    }

    return {
      body: JSON.stringify(results),
      headers: {
        "Content-Type": ["application/json"],
        // 'X-Request-Id': [`rnd-${rnd}`]
      },
      statusCode: 200,
      statusText: "Triggered",
    };
  } catch (e) {
    console.error(e);
    return {
      body: JSON.stringify({
        message: `make sure you gotta pass "space_list" (i.e { "space_list": ["spaceA", "spaceB"] }) in a request body. ${e}`,
      }),
      headers: {
        "Content-Type": ["application/json"],
        // 'X-Request-Id': [`rnd-${rnd}`]
      },
      statusCode: 409,
      statusText: "Triggered",
    };
  }
};

exports.runTriggerFunctionAppProperties = async (request) => {
  try {
    const reqBody = JSON.parse(request.body);
    console.log(`Request Body (upsert app prop): ${JSON.stringify(reqBody)}`);

    const propertyKey = reqBody.property_key;
    const propertyValue = reqBody.property_value;

    let results = [];
    try {
      const resAsApp = await asApp().requestConfluence(
        route`/wiki/api/v2/app/properties/${propertyKey}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(propertyValue),
        }
      );

      const data = await resAsApp.json();
      results.push({
        message: `result of storing ${propertyKey} asApp()`,
        result: data,
      });
    } catch (err) {
      results.push({
        message: `result of storing ${propertyKey} asApp()`,
        result: `(error) ${err.message}`,
      });
    }

    try {
      const resAsUser = await asUser().requestConfluence(
        route`/wiki/api/v2/app/properties/${propertyKey}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(propertyValue),
        }
      );

      const data = await resAsUser.json();
      results.push({
        message: `result of storing ${propertyKey} asUser()`,
        result: data,
      });
    } catch (err) {
      results.push({
        message: `result of storing ${propertyKey} asUser()`,
        result: `(error) ${err.message}`,
      });
    }

    return {
      body: JSON.stringify(results),
      headers: {
        "Content-Type": ["application/json"],
        // 'X-Request-Id': [`rnd-${rnd}`]
      },
      statusCode: 200,
      statusText: "Triggered",
    };
  } catch (e) {
    console.error(e);
    return {
      body: JSON.stringify({
        message: `error. ${e}`,
      }),
      headers: {
        "Content-Type": ["application/json"],
        // 'X-Request-Id': [`rnd-${rnd}`]
      },
      statusCode: 409,
      statusText: "Triggered",
    };
  }
};

exports.runDeleteAppProperties = async (request) => {
  try {
    const reqBody = JSON.parse(request.body);
    console.log(`Request Body (delete app prop): ${JSON.stringify(reqBody)}`);

    const propertyKey = reqBody.property_key;

    let results = [];
    try {
      const resAsApp = await asApp().requestConfluence(
        route`/wiki/api/v2/app/properties/${propertyKey}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json"
          },
        }
      );

      let data = resAsApp.status;
      if (!resAsApp.ok) {
        data = await resAsApp.json();
      }
      results.push({
        message: `result of deleting ${propertyKey} asApp()`,
        result: data,
      });
    } catch (err) {
      results.push({
        message: `result of deleting ${propertyKey} asApp()`,
        result: `(error) ${err.message}`,
      });
    }

    try {
      const resAsUser = await asUser().requestConfluence(
        route`/wiki/api/v2/app/properties/${propertyKey}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json"
          },
        }
      );

      let data = resAsUser.status;
      if (!resAsUser.ok) {
        data = await resAsUser.json();
      }

      results.push({
        message: `result of deleting ${propertyKey} asUser()`,
        result: data,
      });
    } catch (err) {
      results.push({
        message: `result of deleting ${propertyKey} asUser()`,
        result: `(error) ${err.message}`,
      });
    }

    return {
      body: JSON.stringify(results),
      headers: {
        "Content-Type": ["application/json"],
        // 'X-Request-Id': [`rnd-${rnd}`]
      },
      statusCode: 200,
      statusText: "Triggered",
    };
  } catch (e) {
    console.error(e);
    return {
      body: JSON.stringify({
        message: `error. ${e}`,
      }),
      headers: {
        "Content-Type": ["application/json"],
        // 'X-Request-Id': [`rnd-${rnd}`]
      },
      statusCode: 409,
      statusText: "Triggered",
    };
  }
};
