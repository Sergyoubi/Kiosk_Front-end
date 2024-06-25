const Cell = ({ data, type }: { data: any; type: string }) => {
  const getBackgroundColor = (type: string) => {
    switch (type) {
      case "country":
        return "bg-green-200 py-2 px-5";
      case "business":
        return "bg-emerald-100 py-2 px-4";
      case "date":
        return "bg-lime-200 py-2 px-8";
      case "indicator":
        return "bg-indigo-200 py-2 px-6";
      default:
        return "bg-rose-200 py-2 px-6"; // default color
    }
  };

  return (
    <div className="w-full h-full flex justify-start items-center">
      <p
        className={`text-gray-800 font-semibold text-base rounded-lg ${getBackgroundColor(
          type
        )}`}
      >
        {data}
      </p>
    </div>
  );
};

export default Cell;
