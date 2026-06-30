type params = {
    value: number;
}

export const Badge = ({ value }: params) => (
    <span
        className="px-1 py-1.25 text-[#CEF739] text-[10px] leading-[100%] tracking-normal bg-[#283300] rounded-[999px]"
    >
        {value}
    </span>
)