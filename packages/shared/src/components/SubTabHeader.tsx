type Props = {
  title: string;
  subtitle: string;
};

function SubTabHeader(props: Readonly<Props>) {
  const { title, subtitle } = props;
  return (
    <>
      <h2 className="text-lg font-semibold lg:text-xl">{title}</h2>
      <p className="text-muted-foreground -mt-0.5 mb-5 text-xs">{subtitle}</p>
    </>
  );
}

export default SubTabHeader;
