import type { Metadata } from "next";
import { communityMetadata } from "@/constants/metadataTemplates";

export const metadata: Metadata = communityMetadata("Community", "Explore ongoing and completed airdrops with clear project details.");

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
