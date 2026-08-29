import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    cacheComponents: true,
    devIndicators: false,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
                port: "",
                pathname: "/a/**",
                search: "",
            },
        ],
    },
    reactCompiler: true,
};

export default nextConfig;