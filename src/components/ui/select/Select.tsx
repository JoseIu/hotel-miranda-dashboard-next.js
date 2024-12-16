type Props = {
  text?: string;
  children: React.ReactNode;
};

export const Select = ({ text, children }: Props) => {
  return (
    <div>
      {text && <label>{text}</label>}
      <select>{children}</select>
    </div>
  );
};
