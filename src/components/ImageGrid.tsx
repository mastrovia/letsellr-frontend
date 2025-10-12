export default function ImageGrid({ images }: { images: string[] }) {
  return (
    <div className="overflow-hidden rounded-md">
      <div className="grid grid-cols-10 gap-3">
        <div className="col-span-10 sm:col-span-5 overflow-hidden border rounded-md">
          <img src={images?.[0] || "/images/placeholder.svg"} alt="" className="border rounded-md h-full object-cover" />
        </div>
        <div className="col-span-5 overflow-hidden rounded-md grid lg:grid-cols-2 gap-3">
          <img
            src={images?.[1] || "/images/placeholder.svg"}
            alt=""
            className="border rounded-md h-full object-cover hidden sm:flex md:col-span-2 lg:col-span-1"
          />
          <img
            src={images?.[2] || "/images/placeholder.svg"}
            alt=""
            className="border rounded-md h-full object-cover hidden sm:flex md:hidden lg:flex"
          />
          <div className="grid-cols-2 w-full col-span-2 gap-3 h-full md:grid hidden">
            <img src={images?.[3] || "/images/placeholder.svg"} alt="" className="border rounded-md h-full object-cover" />
            <img src={images?.[4] || "/images/placeholder.svg"} alt="" className="border rounded-md h-full object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
}
