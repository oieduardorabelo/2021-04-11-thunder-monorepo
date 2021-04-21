import { CgSpinner } from 'react-icons/cg';

type PropsLoading = {
  children: React.ReactNode;
}
let Loading = ({ children }: PropsLoading) => {
  return (
    <div className="flex place-items-center">
      <div className="max-w-xs m-auto border border-black rounded-lg p-4 bg-gray-800 text-white my-2 flex place-items-center">
        <CgSpinner className="animate-spin mr-2" /> {children}
      </div>
    </div>
  );
};

export { Loading };
