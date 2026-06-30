import Image from "next/image";
import {FaMagnifyingGlass} from "react-icons/fa6";
import {FaCheck} from "react-icons/fa";
import {Input} from "@/components/ui/input";
import {CurrencySelectorItem} from "@/components/features/convert-wrapper/currency-selector/currency-selector-item";
import {CurrencySelectItemList} from "@/components/features/convert-wrapper/currency-selector/currency-item-list";


type params = {
    className: string;
    isOpen: boolean;
}


export const ComboBox = ({ className, isOpen }: params) => {

    const data = {
        'popular': [
            {
                'flag': '/images/flags/us.webp',
                'code': 'usd',
                'label': 'US Dollar'
            },
            {
                'flag': '/images/flags/eu.webp',
                'code': 'eur',
                'label': 'Euro'
            },
            {
                'flag': '/images/flags/gb.webp',
                'code': 'gbp',
                'label': 'British Pound'
            },
        ],
        'other currencies': [
            {
                'flag': '/images/flags/ae.webp',
                'code': 'aed',
                'label': 'UAE Dirham'
            },
            {
                'flag': '/images/flags/ar.webp',
                'code': 'ars',
                'label': 'Argentine Peso'
            },
            {
                'flag': '/images/flags/au.webp',
                'code': 'aud',
                'label': 'Australian Dollar'
            },
            {
                'flag': '/images/flags/bd.webp',
                'code': 'bdt',
                'label': 'Bangladeshi Taka'
            },
        ]
    }

    return <>
        {isOpen && (
            <div
                className={`absolute z-10 top-15 bg-[#202022] border border-[#3D3D3D] -left-4 -right-4 rounded-lg p-2 shadow-2xl ${className} 
                transition-all duration-300 ease-out 
                    ${isOpen
                    ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                }\``}>

                {/* Barre de recherche */}
                <div className="flex items-center gap-2.5 py-3.75 px-3 border border-[#9D9D9D] rounded-md mb-2.5">
                    <FaMagnifyingGlass />
                    <Input type="text" placeholder="Search currencies ..." />
                </div>

                {/* ZONE DÉROULANTE GLOBALE (Ajout de max-h et overflow-y-auto) */}
                <div className="max-h-64 overflow-y-auto pr-1 custom-scrollbar">
                    <CurrencySelectItemList />
                </div> {/* Fin de la zone déroulante */}
            </div>
        )}
    </>
}