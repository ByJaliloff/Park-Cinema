
const campaigns = [
  {
    title: "Imaxda Super Gün",
    image: "/images/imax.webp",
  },
  {
    title: "Səhər Tarifi",
    image: "/images/morning.webp",
  },
  {
    title: "Tələbə Tarifi",
    image: "/images/student.webp",
  },
  {
    title: "Super Gün",
    image: "/images/superday.webp",
  },
  {
    title: "Ailə Tarifi",
    image: "/images/family.webp",
  },
  {
    title: "Ad Günü",
    image: "/images/birthday.webp",
  },
];

function Aksiyalar() {
  return (
    <div className="bg-[#373737] text-white min-h-screen px-6 py-30">
      <div className="max-w-[93%] mx-auto">
        <h2 className="text-3xl font-semibold mb-8">Aksiyalar</h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-6">
          {campaigns.map((item, index) => (
            <div key={index} className="bg-[#4D4D4D] rounded-lg overflow-hidden shadow-lg px-3 py-4">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-[300px] object-cover"
              />
              <div className="p-4 text-left">
                <h3 className="text-lg font-medium">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Aksiyalar;
