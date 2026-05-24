import type { NextConfig } from "next";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const monorepoRoot = join(dirname(fileURLToPath(import.meta.url)), "../..");

const nextConfig: NextConfig = {
  turbopack: {
    root: monorepoRoot
  },
  transpilePackages: ["@parkping/domain", "@parkping/ui-components"]
};

export default nextConfig;
