import Image from "next/image";
import Link from "next/link";
import React from "react";
import { urlFor } from "../sanity";
import { Collection } from "../typings";

interface CollectionCardProps {
    collection: Collection
}

const CollectionCard: React.FC<CollectionCardProps> = ({ collection }) => {
    return (
        <Link href={`/nft/${collection.slug.current}`}>
            <article className="flex flex-col items-center cursor-pointer transition-all duration-200 hover:scale-105">
                <div className="h-96 w-60 rounded-2xl overflow-hidden">
                    <Image 
                        src={urlFor(collection.mainImage).url()}
                        alt={collection.description}
                        height={800}
                        width={500}
                        objectFit="cover"
                    />
                </div>
                <div className="p-5">
                    <h2 className="text-3xl">{collection.title}</h2>
                    <p className="mt-2 text-sm text-gray-400">{collection.description}</p>
                </div>
            </article>
        </Link>
    )
}

export default CollectionCard;