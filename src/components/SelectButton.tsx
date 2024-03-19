const SelectButton = () => {
    return (
        <div className="flex items-center justify-center">
            <h2 className="text-bold ml-4">Branches:</h2>
            <div className="dropdown m-4 w-3/4">
                <div tabIndex={0} role="button" className="btn border-white w-full text-left">Show All</div>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-full">
                    
                </ul>
            </div>
        </div>
    )
}

export default SelectButton;