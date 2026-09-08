"use client"

import Image, { type ImageProps } from "next/image"
import { useState } from "react"
import { CldImage, type CldImageProps } from "next-cloudinary"

type CurrencyFlagProps = Pick<
    ImageProps,
    "alt" | "className" | "width" | "height" | "loading" | "placeholder" | "blurDataURL"
> & Pick<CldImageProps, "crop"> & {
    src?: string
}

export function CurrencyFlag({ src, alt, ...props }: CurrencyFlagProps) {
    const [hasError, setHasError] = useState(!src)
    const { crop: _crop, ...imageProps } = props

    if (hasError || !src) {
        return <Image {...imageProps} src="/images/placeholder.svg" alt={alt} />
    }

    return (
        <CldImage
            {...props}
            src={src}
            alt={alt}
            onError={() => {
                setHasError(true)
                return false
            }}
        />
    )
}
