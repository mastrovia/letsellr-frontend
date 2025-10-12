import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <>
      <nav className="fixed z-50 flex items-center top-0 w-full h-16 md:h-20 bg-white/70 backdrop-blur-lg  p-2 py-2 md:p-10 md:py-5 border-b">
        <div className="container w-full flex justify-center md:justify-between">
          <Link to={"/"}>
            <div className="flex items-center">
              <img src={"/favicon.ico"} className="w-10 h-10 object-scale-down" />
              <h1 className="text-2xl font-bold text-primary">Letsellr</h1>
            </div>
          </Link>
          <Button className="hidden md:flex">Get in touch with our team</Button>
        </div>
      </nav>
      <div className="relative h-16 md:h-20"></div>
    </>
  );
}
