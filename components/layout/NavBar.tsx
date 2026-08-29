import Image from "next/image";

interface Props {
    currenciesCounter: number;
    isLoading: boolean;
}

export const NavBar = ({ currenciesCounter, isLoading }: Props) => {
    return <nav className="p-4 flex justify-between items-center">
        <div className="max-w-[107.15px] max-h-5">
            <Image src={"/images/logo.svg"} alt={"FX Checker"} width={200} height={200} />
        </div>
        <div
            className={`${isLoading && 'skeleton-item'} text-left tracking-normal text-[#9D9D9D] text-[10px] leading-[100%]
            md:text-[14px] md:leading-[120%] md:tracking-[1px]`}>
            {currenciesCounter} Currencies · EOD · ECB data
        </div>
    </nav>
}