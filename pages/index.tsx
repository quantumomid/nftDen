import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import CollectionCard from "../components/CollectionCard";
import { sanityClient, urlFor } from "../sanity";
import { Collection } from "../typings";

export const getServerSideProps: GetServerSideProps = async () => {
  const query = `
    *[_type=="collection"]{
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

  const collections = await sanityClient.fetch(query);
  console.log(collections);
  return {
    props: {
      collections,
    }
  }
}

interface HomePageProps {
  collections: Collection[];
}

const Home: NextPage<HomePageProps> = ({ collections }) => {
  return (
    <div className="max-w-7xl mx-auto flex flex-col min-h-screen py-20 px-10 2xl:px-0">
      <Head>
        <title>Nft Den</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="mb-10 text-4xl font-extrabold">
          The <span className="font-extrabold underline decoration-pink-600/50">Nft Den</span> Market Place 🛒
      </h1>
      <main className="bg-slate-100 p-10 shadow-xl shadow-rose-400/20">
        <div className="grid space-x-3 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {collections.map(collection => <CollectionCard key={collection._id} collection={collection} />)}
        </div>
      </main>
    </div>
  )
}

export default Home;