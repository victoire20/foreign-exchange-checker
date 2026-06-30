import {Header} from "@/components/layout/Header";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            <main>{children}</main>
        </>
    );
}