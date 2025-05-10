
const SearchBar = () => {
  return (
    <div className="w-full flex justify-end gap-2">
      <input className="w-[250px] rounded-md border border-gray-300 p-2 text-sm" type="text" placeholder="검색어를 입력해주세요." />
    </div>
  )
}

export default SearchBar