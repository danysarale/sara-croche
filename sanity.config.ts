import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemas";
import { sanityConfig } from "./src/sanity/config";

export default defineConfig({
  name: "sara-croche-studio",
  title: "Sara Crochê - Painel Admin",

  projectId: sanityConfig.projectId,
  dataset: sanityConfig.dataset,

  basePath: "/admin",

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
});