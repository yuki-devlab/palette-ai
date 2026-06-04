import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    devIndicators: false,
    reactCompiler: true,
    serverExternalPackages: ["playwright-core", "playwright"],
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
                port: "",
                pathname: "/**",
            }
        ]
    }
}

export default nextConfig;