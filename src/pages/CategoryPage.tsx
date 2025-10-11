import { Footer } from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { categories } from "@/db";
import { useParams } from "react-router-dom";

export default function CategoryPage() {
  const { category } = useParams();

  return (
    <div>
      <Navbar />
      <div className="p-10">category name : {category}</div>
      <Footer categories={categories} />
    </div>
  );
}
