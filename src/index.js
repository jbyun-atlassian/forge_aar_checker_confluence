import api, { route, asApp, asUser } from "@forge/api";

export { handler } from './resolvers';

exports.runWebTrigger = async () => {
  const allowedSpaceKey = "AARAllowed";
  const res = await asApp().requestConfluence(route `/wiki/rest/api/space/${allowedSpaceKey}/content`);
  const data = await res.json();
  console.log(`result AARAllowed: ${JSON.stringify(data)}`);

  const blockedSpaceKey = "AARBlocked";
  const res1 = await asApp().requestConfluence(route `/wiki/rest/api/space/${blockedSpaceKey}/content`);
  const data1 = await res1.json();
  console.log(`result AARBlocked: ${JSON.stringify(data1)}`);

  let results = [];
  results.push({
    message: `result AARAllowed`,
    result: data
  });
  results.push({
    message: `result AARBlocked`,
    result: data1
  });

  return {
    body: JSON.stringify(results),
    headers: {
      'Content-Type': ['application/json'],
      // 'X-Request-Id': [`rnd-${rnd}`]
    },
    statusCode: 200,
    statusText: 'Triggered'
  };
};
