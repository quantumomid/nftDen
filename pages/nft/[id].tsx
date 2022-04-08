import { NextPage } from "next"
import Image from "next/image"

const NftPage: NextPage = () => {
    return (
      <div className="flex h-screen flex-col lg:grid lg:grid-cols-10">
        {/* Left */}
        <div className="flex flex-col items-center justify-center bg-gradient-to-br from-cyan-800 to bg-rose-500 lg:col-span-4 lg:min-h-screen">
            <div className="flex flex-col items-center justify-center py-2">
                <div className="bg-gradient-to-br from-yellow-400 to bg-purple-600 rounded-xl">
                    <div className="w-44 rounded-3xl p-2 lg:h-96 lg:w-72">
                        <Image
                            // className="w-44 rounded-3xl lg:h-96 lg:w-72"
                            src="/images/laser_ape.png"
                            alt="Animated Ape wearing a black t-shirt and a navy captain hat with laser beam coming from the eyes."
                            height={400}
                            width={300}
                            objectFit="cover"
                            layout="responsive"
                        />
                    </div>
                </div>
            </div>
            <div className="text-center p-5 space-y-2">
                <h1 className="text-4xl font-bold text-white"> Nft Den Apes 🦧</h1>
                <h2 className="text-xl text-gray-300">A collection of apes who love Next.js!</h2>

            </div>
        </div>

        {/* Right */}
        <div className="flex flex-1 flex-col p-12 lg:col-span-6">
            {/* Header */}
            <header className="flex items-center justify-between">
                <h3 className="w-52 cursor-pointer text-xl sm:w-80">
                    The <span className="font-extrabold underline decoration-pink-600/50">Nft Den</span> Market Place 🛒
                </h3>
                <button className="rounded-full bg-rose-400 px-4 py-2 text-xs text-white font-bold lg:px-5 lg:py-3 lg:text-base">Sign In</button>
            </header>

            <hr className="my-2 border"/>
            {/* Content */}
            <div className="mt-10 flex flex-1 flex-col items-center space-y-6 text-center lg:justify-center">
                <div className="w-80 pb-10 lg:h-40 overflow-hidden">
                    <Image
                        src="/images/many_apes.jpg"
                        alt="Collage of various animates apes with different clothing features."
                        height={600}
                        width={700}
                        objectFit="cover"
                        layout="responsive"
                    />
                </div>
                <h3 className="text-3xl font-bold lg:text-5xl lg:font-extrabold">The Nft Den Coding Club | Nft Mint</h3>
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