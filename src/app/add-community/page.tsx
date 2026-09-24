import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { communityMetadata } from "@/constants/metadataTemplates";
import AddCommunityClient from "./AddCommunityClient";

export const metadata = communityMetadata("Add Community", "Submit a new crypto community to the directory.");

export default function AddCommunityPage() {
  return (
    <>
      <Header />
      <AddCommunityClient />
      <Footer />
    </>
  );
}