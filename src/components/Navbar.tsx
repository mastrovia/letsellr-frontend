import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <nav className="fixed z-50 top-0 w-full h-20 bg-white/50 backdrop-blur-md  p-2 py-2 md:p-10 md:py-5 border-b">
        <div className="container w-full flex justify-center md:justify-start">
          <Link to={"/"}>
            <div className="flex items-center">
              <img src={"/favicon.ico"} className="w-10 h-10 object-scale-down" />
              <h1 className="text-2xl font-bold text-primary">Letsellr</h1>
            </div>
          </Link>
        </div>
      </nav>
      <div className="relative h-20"></div>
    </>
  );
}
