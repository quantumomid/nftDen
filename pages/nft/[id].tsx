import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { useAddress, useDisconnect, useMetamask } from "@thirdweb-dev/react";
import { sanityClient, urlFor } from "../../sanity";
import { Collection } from "../../typings";
import Link from "next/link";

export const getServerSideProps: GetServerSideProps = async({ params }) => {
    const query = `
        *[_type=="collection" && slug.current==$id][0]{
            _id,
            title,
            address,
            description,
            nftCollectionName,
            mainImage {
            asset
            },
            previewImage {
            asset
            },
            slug {
            current
            },
            creator -> {
            _id,
            name, 
            address,
            slug {
            current
            },
            },
        }
    `;

    const collection = await sanityClient.fetch(query, {
        id: params?.id
    });

    if(!collection) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            collection
        }
    }
}

interface NftPageProps {
    collection: Collection
}

const NftPage: NextPage<NftPageProps> = ({ collection }) => {

    // Auth
    const connectWithMetamask = useMetamask(); // Connect to wallet with Metamask
    const address = useAddress(); // Get address from connected wallet
    const disconnect = useDisconnect(); // Function to call when want to disconnect from a wallet

    console.log(collection);

    return (
      <div className="flex h-screen flex-col lg:grid lg:grid-cols-10">
        {/* Left */}
        <div className="flex flex-col items-center justify-center bg-gradient-to-br from-cyan-800 to bg-rose-500 lg:col-span-4 lg:min-h-screen">
            <div className="flex flex-col items-center justify-center py-2">
                <div className="bg-gradient-to-br from-yellow-400 to bg-purple-600 rounded-xl">
                    <div className="w-44 rounded-3xl p-2 lg:h-96 lg:w-72">
                        <Image
                            src={urlFor(collection.previewImage).url()}
                            alt={collection.title}
                            height={400}
                            width={300}
                            objectFit="cover"
                            layout="responsive"
                        />
                    </div>
                </div>
            </div>
            <div className="text-center p-5 space-y-2">
                <h1 className="text-4xl font-bold text-white">{collection.nftCollectionName}</h1>
                <h2 className="text-xl text-gray-300">{collection.description}</h2>

            </div>
        </div>

        {/* Right */}
        <div className="flex flex-1 flex-col p-12 lg:col-span-6">
            {/* Header */}
            <header className="flex items-center justify-between">
                <Link href="/">
                    <h3 className="w-52 cursor-pointer text-xl sm:w-80">
                        The <span className="font-extrabold underline decoration-pink-600/50">Nft Den</span> Market Place 🛒
                    </h3>
                </Link>
                <button onClick={() => address ? disconnect() : connectWithMetamask()} 
                    className="rounded-full bg-rose-400 px-4 py-2 text-xs text-white font-bold lg:px-5 lg:py-3 lg:text-base"
                >
                    {address ? "Sign-out" : "Sign In"}
                </button>
            </header>

            <hr className="my-2 border"/>
            {address && (
                <p className="text-center text-sm text-rose-500">
                    Your're logged in with wallet {address.substring(0, 5)}...{address.substring(address.length - 5)}
                </p>
            )}

            {/* Content */}
            <div className="mt-10 flex flex-1 flex-col items-center space-y-6 text-center lg:justify-center">
                <div className="w-80 pb-10 lg:h-40 overflow-hidden">
                    <Image
                        src={urlFor(collection.mainImage).url()}
                        alt={collection.description}
                        height={600}
                        width={700}
                        objectFit="cover"
                        layout="responsive"
                    />
                </div>
                <h3 className="text-3xl font-bold lg:text-5xl lg:font-extrabold">{collection.title}</h3>
                <p className="pt-2 text-xl text-green-500">12/40 Nfts claimed</p>
            </div>
            {/* Mint Button */}
            <button className="h-16 bg-red-600 w-full rounded-full text-white font-bold mt-10">
                Mint NFT (0.01 ETH)
            </button>
        </div>
      </div>
    )
  }
  
export default NftPage