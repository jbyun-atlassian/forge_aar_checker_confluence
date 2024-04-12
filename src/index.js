import api, { route, asApp, asUser } from "@forge/api";

export { handler } from "./resolvers";

exports.runWebTrigger = async () => {
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
