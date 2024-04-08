type TextInputProps = {
  className?: string;
  id: string;
  name: string;
  placeholder: string;
};
export default function TextInput({
  className,
  id,
  name,
  placeholder,
}: TextInputProps) {
  return (
    <input
      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${className}`}
      id={id}
      name={name}
      type="text"
      placeholder={placeholder}
    />
  );
}
