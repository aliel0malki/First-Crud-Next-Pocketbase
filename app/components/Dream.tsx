export default function Dream({ data }) {
  return (
    <div className="md:min-w-[25%] min-w-[90%] my-2 p-3 m-3 bg-gray-900 text-gray-200">
      <h1 className="text-center text-white">{data.title}</h1>
      {data.description}
      <p className="block text-gray-400">by @{data.author}</p>
    </div>
  );
}
