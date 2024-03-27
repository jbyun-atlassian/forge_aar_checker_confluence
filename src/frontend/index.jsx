import React, { useEffect, useState } from "react";
import ForgeReconciler, { Text } from "@forge/react";
import { invoke, view, requestConfluence } from "@forge/bridge";

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    invoke("getText", { example: "my-invoke-variable" }).then(setData);

    (async () => {
      // console.log(`hello hello 0a3938cc`);
      // const context = await view.getContext();
      // const commentsData = await fetchCommentsForContent(
      //   context.extension.content.id
      // );
      // setComments(commentsData);1
      // console.log(`Number of comments on this page: ${commentsData.length}`);

      console.log(`boom boom`);
      const res = await requestConfluence(
        `/wiki/rest/api/content`
      );
    
      const data = await res.json();
      console.log(`from Bridge: ${JSON.stringify(data)}`);
    })();
  }, []);

  return (
    <>
      <Text>Hello world!</Text>
      <Text>{data ? data : "Loading..."}</Text>
    </>
  );
};

const fetchCommentsForContent = async (contentId) => {
  // const res = await requestConfluence(
  //   `/wiki/rest/api/content/${contentId}/child/comment`
  // );
  const res = await requestConfluence(
    `/wiki/rest/atlassian-connect/1/addons/my-app-conf/properties`
  );

  const data = await res.json();
  console.log(`from Bridge: ${JSON.stringify(data)}`);
  return data;
};

ForgeReconciler.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
