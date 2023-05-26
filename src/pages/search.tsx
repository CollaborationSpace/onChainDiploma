import LayoutMain from '@/components/Layout';


const SearchContent = () => {
  return <div>Страница поиска</div>;
};

const Search = () => {
  return <LayoutMain childComponent={<SearchContent />} />;
};
export default Search;
