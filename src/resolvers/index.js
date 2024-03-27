import Resolver from '@forge/resolver';
import api, { route, asApp, asUser } from "@forge/api";

const resolver = new Resolver();

resolver.define('getText', async (req) => {
  // console.log(`hello app properties ++++++ :`);
  // console.log(req);
  // const res1 = await asApp().requestConfluence(route `/wiki/rest/atlassian-connect/1/addons/my-app-conf/properties`);
  // const data1 = await res1.json();
  // console.log(`result: ${JSON.stringify(data1)}`);

  return "KAAA BOOOOM!!! (Forge macro)";
});

export const handler = resolver.getDefinitions();
