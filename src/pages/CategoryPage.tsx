import { Footer } from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useParams } from "react-router-dom";

export default function CategoryPage() {
  const { category } = useParams();

  return (
    <div>
      <Navbar />
      <div className="p-10">category name : {category}</div>
      <Footer />
    </div>
  );
}
