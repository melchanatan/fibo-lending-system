export const SkeletonCard = () => {
    return (
      <>
        <div className="relative flex w-full justify-center items-center">
          <div className="w-full animate-pulse space-x-1 text-center bg-white rounded border shadow-gray-400 shadow-md p-4 ">
            <div className="flex flex-col space-y-2">
              <div className="mb-3 w-[100%] aspect-square rounded-md bg-gray-300"></div>
              <span className="h-6 w-full rounded-md bg-gray-300"></span>
              <div className="h-6 w-6/12 rounded-md bg-gray-300 self-center"></div>
            </div>
          </div>
        </div>
      </>
    );
  };
