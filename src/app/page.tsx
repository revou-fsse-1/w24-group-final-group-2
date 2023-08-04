import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ItemCard from "@/components/ItemCard";

// back end import related
import { prisma } from "@/libs/db";
import IconDoubleRight from "@/components/icons/IconDoubleRight";
import Link from "next/link";

// server side data fetching
async function getAllAssets(take: number) {
  const assets = await prisma.asset.findMany({
    include: {
      bidAssets: {
        orderBy: {
          bidAmount: "desc",
        },
        select: {
          bidAmount: true,
          currentPrice: true,
          bidder: {
            select: {
              email: true,
            },
          },
        },
        take: 1,
      },
    },
    take: take,
  });
  return { assets };
}

export default async function Home() {
  // data fetching
  const { assets } = await getAllAssets(3);

  return (
    <>
      <Header />
      <main className="flex flex-col justify-center w-full">
        <section className="flex items-center justify-center w-full h-screen bg-no-repeat bg-cover home-background ">
          <div className="w-full max-w-7xl px-6 xl:px-0">
            <div className="w-full flex flex-col gap-2 lg:w-1/2">
              <h1 className="h1 text-mkl-primary sm:text-5xl lg:text-7xl">WELCOME TO MARKILANG</h1>
              <h2 className="font-normal h2 text-mkl-neutral sm:text-3xl lg:text-4xl">
                Your Gateway to the World of Collectibles!
              </h2>
              <p className="mt-8 text-mkl-neutral lg:text-lg">
                Get ready for an exhilarating experience in the realm of
                collectibles! At Markilang, we take pride in curating unique
                auctions that bring together collectors and enthusiasts from all
                walks of life. Whether you&apos;re on the hunt for vintage
                rarities or quirky memorabilia, our platform is the perfect
                destination for discovering hidden treasures without breaking
                the bank.
              </p>
              <div className="mt-8 flex flex-col gap-10 md:flex-row">
                <Link href={"/auctions"}>
                  <button className="w-full text-lg font-bold md:w-fit btn-primary hover:btn-secondary">
                    Explore Auction
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="flex justify-center w-full">
          <div className="container flex flex-col mx-5 md:mx-0 my-28">
            <div>
              <h2 className="text-mkl-secondary h2">Auction Available</h2>
              <hr className="mt-2 border-2 w-44 bg-mkl-primary border-mkl-primary" />
              <hr className="mt-3 border-2 w-36 bg-mkl-primary border-mkl-primary" />
            </div>
            <div className="">
              <div className="inline-flex items-center justify-end w-full mb-5">
                <a href="/auctions" className="inline-flex items-center">
                  <p>VIEW ALL</p>
                  <span className="-ml-1">
                    <IconDoubleRight size={60} />
                  </span>
                </a>
              </div>
              <div className="flex flex-col items-center gap-14 flex-wrap md:gap-0 md:flex-row md:justify-between">
                {assets.map((asset) => {
                  return (
                    <>
                      <ItemCard
                        key={asset.id}
                        id={asset.id}
                        name={asset.name}
                        imageUrl={asset.imageUrl}
                        price={
                          asset.openingPrice !== null ? asset.openingPrice : 0
                        }
                        highestBid={
                          !asset.bidAssets[0] ? 0 : asset.bidAssets[0].bidAmount
                        }
                        endDate={
                          asset.endTime !== null
                            ? asset.endTime.toISOString()
                            : new Date().toISOString()
                        }
                      />
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}
