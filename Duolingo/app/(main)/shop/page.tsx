import { getUserProgress, getUserSubscription } from "@/db/queries";
import { userProgress, userSubscription } from '../../../db/schema';
import { StickyWrapper } from "@/components/stick-wrapper";
import { UserProgress } from "@/components/user-progress";
import { redirect } from "next/navigation";
import { FeedWrapper } from './../../../components/feed-wrapper';
import Image from "next/image";
import { Item } from "./item";

const ShopPage = async() =>{
    const userProgressData = getUserProgress();
    const userSubscriptionData = getUserSubscription();
    const [
        userProgress,
        userSubscription
        
    ] = await Promise.all([
        userProgressData,
        userSubscriptionData
    ])
    if(!userProgress || !userProgress.activeCourse){
        redirect("/courses");
    }
    const isPro = !!userSubscription?.isActive;
    console.log('is pro', userSubscription);
    return (
        <div className="flex flex-row-reverse gap-[48px] px-6">
            <StickyWrapper>
                <UserProgress
                activeCourse={userProgress.activeCourse}
                hearts={userProgress.hearts}
                points={userProgress.points}
                hasActiveSubscription={!!userSubscription?.isActive}
                />
            </StickyWrapper>
            <FeedWrapper>
                <div className="w-full flex flex-col items-center">
                    <Image src="/shop.svg"
                    alt="Shop"
                    height={90}
                    width={90}
                    />
                    <h1 className="text-center font-bold text-neutral-800 text-2xl">
                        Shop
                    </h1>
                    <p className="text-muted-foreground text-center text-lg mb-6">
                        Spend your points on cool stuff
                    </p>
                    <Item
                    hearts={userProgress.hearts}
                    points={userProgress.points}
                    hasActiveSubscription={!!userSubscription?.isActive}
                    />
                </div>


            </FeedWrapper>
        </div>
    )
}
export default ShopPage;