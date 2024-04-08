type LabelProps = {
  children: React.ReactNode;
  className?: string;
  htmlFor?: string;
};

export default function Label({ children, className, htmlFor }: LabelProps) {
  return (
    <label
      className={`block text-gray-700 text-sm font-bold mb-2 ${className}`}
      htmlFor={htmlFor}
    >
      {children}
    </label>
  );
}
