export default function StepperItem({
    step,
    label,
    required = false,
    children,
    isActive = false,
}) {
    return (
        <div className="relative flex items-start mb-6">
            {/* Dot tròn */}
            <div className="absolute left-2 top-1 z-10">
                <div className="relative w-6 h-6 flex items-center justify-center">
                    <div
                        className={`w-3.5 h-3.5 rounded-full ${isActive ? "bg-blue-600" : "bg-gray-300"
                            }`}
                    />
                    {isActive && (
                        <div className="absolute w-6 h-6 rounded-full border-2 border-blue-300 animate-ping" />
                    )}
                </div>
            </div>

            {/* Nội dung phải */}
            <div className="ml-8 flex-1">
                <label className="text-sm font-semibold text-black block mb-2">
                    {step}. {label} {required && <span className="text-red-500">*</span>}
                </label>
                {children}
            </div>
        </div>
    );
}
