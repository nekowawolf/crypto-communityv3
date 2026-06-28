import type { Metadata } from "next";
import { communityMetadata } from "@/constants/metadataTemplates";

export const metadata: Metadata = communityMetadata("Community", "Explore a comprehensive list of crypto communities and connect with like-minded individuals.");

export default function CommunityLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <section>
            {children}
        </section>
    );
}
