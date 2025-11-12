// components/PasswordInput.jsx - WITH NAME PROP

export default async function Input({ name }) {
  return (
    <div className="mb-6">
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        name={name}
        type={name}
        placeholder={`Enter your ${name}`}
      />
    </div>
  );
}
