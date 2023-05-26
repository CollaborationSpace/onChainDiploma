import LayoutMain from '@/components/Layout';

const ModeratorContent = () => {
  return <div>Страница модератора</div>;
};

const Moderator = () => {
  return <LayoutMain childComponent={<ModeratorContent />} />;
};
export default Moderator;
