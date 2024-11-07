export default function UserDtDd({label, children}: {label: string, children: string}) {
    return (
      <div className="py-3 sm:py-[18px] sm:flex w-full sm:gap-4 sm:px-6">
        <dt className="text-sm font-medium text-gray-500 sm:w-1/4 max-w-80">{label}</dt>
        <dd className="mt-1 text-sm text-gray-900 flex-grow sm:mt-0 sm:col-span-2">{children}</dd>
      </div>
    );
}