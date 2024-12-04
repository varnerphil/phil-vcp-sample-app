import { builder } from "@builder.io/sdk";
import { RenderBuilderContent } from "../../components/builder";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

interface PageProps {
  params: {
    page: string[];
  };
}

// export const revalidate = 500;

export default async function Page(props: PageProps) {
  const builderModelName = "page";
  const builderProductsModel = "product-data"

  const content = await builder
    // Get the page content from Builder with the specified options
    .get(builderModelName, {
      userAttributes: {
        // Use the page path specified in the URL to fetch the content
        urlPath: "/products"
      },
    })
    // Convert the result to a promise
    .toPromise();

    const products = await builder
    // Get the page content from Builder with the specified options
    .getAll(builderProductsModel, {
        fields: "data",
        limit: 20
    });


  return (
    <>
      {/* Render the Builder page */}
      <RenderBuilderContent content={content} model={builderModelName} options={{ enrich: true }} data={{products}}/>
    </>
  );
}
