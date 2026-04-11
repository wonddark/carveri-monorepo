type Props = {
  title: string;
  subtitle: string;
};

function SubTabHeader(props: Readonly<Props>) {
  const { title, subtitle } = props;
  return (
    <div>
      <h2 className="text-lg font-semibold lg:text-2xl">{title}</h2>
      <p className="text-muted-foreground -mt-0.5 mb-5 text-xs lg:text-sm">
        {subtitle}
      </p>
    </div>
  );
}

export default SubTabHeader;
