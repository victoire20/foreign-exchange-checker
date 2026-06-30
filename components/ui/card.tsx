type params = {
    label: string;
    value: string;
    className?: string;
    classNameLabel?: string;
    classNameValue?: string;
}

export const Card = ({label, value, className, classNameLabel, classNameValue}: params) => {
    return <div className={`flex flex-col justify-between gap-4 w-[100%] md:w-[100%] py-3 px-5 rounded-2xl bg-[#171719] border border-[#202022] ${className}`}>
        <span className={`uppercase opacity-70 text-[14px] leading-[120%] tracking-[1px] ${classNameLabel}`}>{label}</span>
        <span className={`text-[20px] leading-[120%] tracking-[-0.5px] ${classNameValue}`}>{value}</span>
    </div>
}