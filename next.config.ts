import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // Let .mdx files participate in routing/imports alongside ts/tsx.
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
  // markdown plugins (remark/rehype) can be added here later if needed
});

export default withMDX(nextConfig);
