import { figmaMapping } from "@builder.io/dev-tools/figma";
import ImageHero from "@/components/Hero/ImageHero";

figmaMapping({
  url: "https://www.figma.com/design/gk3fgi86UxOGgZQohLgSGK/VCP-demo?node-id=1-82&node-type=SYMBOL&t=IQ27EabKQr6yqH2k-11",
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
