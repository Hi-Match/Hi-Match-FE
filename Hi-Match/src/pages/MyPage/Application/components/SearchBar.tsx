
const SearchBar = () => {
  return (
    <div className="w-full flex justify-end gap-2">
      <input className="w-[250px] rounded-md border border-gray-300 p-2 text-sm placeholder:text-gray-400" type="text" placeholder="키워드로 검색하기" />
    </div>
  )
}

export default SearchBar