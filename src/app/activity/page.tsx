import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { communityMetadata } from "@/constants/metadataTemplates";
import DetailClient from "./DetailClient";

export const metadata = communityMetadata("Activity", "Web activity.");

export default function ActivityPage() {
  return (
    <>
      <Header />
      <DetailClient />
      <Footer />
    </>
  );
}
