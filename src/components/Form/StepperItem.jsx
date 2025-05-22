import FormInput from "./FormInput";

export default function StepperItem({
    label,
    isActive = false,
    isLast = false,
    isDone = false,
    onClick = () => { },
}) {
    return <MarkerWithLine isActive={isActive} isDone={isDone} label={label} onClick={onClick} />;
}

function MarkerWithLine({ isActive, isDone, label, onClick }) {
    return (
        <div className="flex flex-row cursor-pointer" onClick={onClick}>
            <div className="flex flex-col items-center">
                <div className="relative w-[18px] h-[18px] flex items-center justify-center z-10">
                    {isActive ? (
                        <>
                            <span className="absolute once-ping w-10 h-10 rounded-full bg-[#3993D9] opacity-30"></span>
                            <span className="absolute once-ping w-6 h-6 rounded-full bg-[#3993D9] opacity-50 delay-100"></span>
                            <span className="absolute once-ping w-4 h-4 rounded-full bg-[#3993D9] opacity-70 delay-200"></span>
                            <span className="w-4 h-4 rounded-full bg-[#3993D9] z-10"></span>
                        </>
                    ) : isDone ? (
                        <span className="w-[18px] h-[18px] rounded-full bg-[#3993D9] z-10 flex items-center justify-center text-white text-xs font-bold">✓</span>
                    ) : (
                        <span className="w-[18px] h-[18px] rounded-full bg-gray-300 z-10"></span>
                    )}
                </div>
                {
                    isDone ? (<div className="w-[2px] h-[80px] bg-[#3993D9]"></div>) : (<div className="w-[2px] h-[80px] bg-gray-300"></div>)
                }

            </div>

            <div className="ml-2 flex flex-col flex-1">
                <span className={`font-medium ${isActive ? "text-[#3993D9]" : "text-gray-400"}`}>
                    {label || "Tiêu đề bước"}
                </span>

                <div className="mt-4">
                    <FormInput placeholder={label} />
                </div>

            </div>
        </div>
    );
}
