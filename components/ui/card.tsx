type params = {
    label: string;
    value: string;
    isLoading: boolean;
    className?: string;
    classNameLabel?: string;
    classNameValue?: string;
}

export const Card = ({
    label,
    value,
    isLoading,
    className,
    classNameLabel,
    classNameValue
}: params) => {
    return <div className={
        `flex flex-col justify-between gap-4 w-full md:w-full py-3 px-5 rounded-2xl 
        bg-[#171719] border border-[#202022] ${className} ${isLoading ? 'skeleton-item' : ''}`
    }>
        <span className={`uppercase opacity-70 text-[14px] leading-[120%] tracking-[1px] ${classNameLabel} ${isLoading ? 'skeleton-item' : ''}`}>
            {label}
        </span>
        <span className={`text-[20px] leading-[120%] tracking-[-0.5px] ${classNameValue} ${isLoading ? 'skeleton-item' : ''}`}>
            {!isLoading ? value : ''}
        </span>
    </div>
}