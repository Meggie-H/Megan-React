const SelectButton = () => {
  return (
    <div className="flex items-center justify-center">
      <h2 className="text-bold ml-4">Branches:</h2>
      <div className="dropdown m-4 w-3/4">
        <div
          tabIndex={0}
          role="button"
          className="btn w-full border-white text-left"
        >
          Show All
        </div>
        <ul
          tabIndex={0}
          className="menu dropdown-content z-[1] w-full rounded-box bg-base-100 p-2 shadow"
        ></ul>
      </div>
    </div>
  );
};

export default SelectButton;
