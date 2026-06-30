import Image from "next/image";

export const NavBar = () => {
    return <nav className="p-4 flex justify-between items-center">
        <div className="max-w-[107.15px] max-h-5">
            <Image src={"/images/logo.svg"} alt={"Logo"} width={200} height={200} />
        </div>
        <div
            className="text-left tracking-normal text-[#9D9D9D] text-[10px] leading-[100%]
            md:text-[14px] md:leading-[120%] md:tracking-[1px]">
            55 Currencies · EOD · ECB data
        </div>
    </nav>
}