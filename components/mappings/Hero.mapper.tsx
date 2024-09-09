import { figmaMapping } from "@builder.io/dev-tools/figma";
import ImageHero from "@/components/Hero/ImageHero";

figmaMapping({
  componentKey: "4bd6da0f53b73a462b070b55dd055ce6a4cb3eca",
  mapper(figma) {
    return (
      <ImageHero
        title={
          figma.Title ?? figma.$children[1]?.$children[0]?.$textContent ?? ""
        }
        subTitle="Discover our collection"
        buttonText={
          figma.buttonText ??
          figma.$findOneByName("Shop Now")?.$textContent ??
          ""
        }
        buttonLink="#"
        backgroundImage={figma.$children[0]?.$imageUrl ?? ""}
        alignment="center"
        makeFullBleed={false}
      />
    );
  },
});
