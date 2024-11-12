import { getTopTenUsers, getUserProgress, getUserSubscription } from "@/db/queries";
import { userProgress, userSubscription } from '../../../db/schema';
import { StickyWrapper } from "@/components/stick-wrapper";
import { UserProgress } from "@/components/user-progress";
import { redirect } from "next/navigation";
import { FeedWrapper } from '../../../components/feed-wrapper';
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Promo } from "@/components/promo";
import { quests } from '../../../constant';

const QuestPage = async() =>{
    const userProgressData = getUserProgress();
    const userSubscriptionData = getUserSubscription();

    
    const [
        userProgress,
        userSubscription,
        
    ] = await Promise.all([
        userProgressData,
        userSubscriptionData,
    ])
    if(!userProgress || !userProgress.activeCourse){
        redirect("/courses");
    }
    const isPro = !!userSubscription?.isActive;
    console.log('is pro', userProgress);
    return (
        <div className="flex flex-row-reverse gap-[48px] px-6">
            <StickyWrapper>
                <UserProgress
                activeCourse={userProgress.activeCourse}
                hearts={userProgress.hearts}
                points={userProgress.points}
                hasActiveSubscription={!!userSubscription?.isActive}
                />
                {isPro &&(
                    <Promo />
                )}
            </StickyWrapper>
            <FeedWrapper>

                <div className="w-full flex flex-col items-center">
                    <Image src="/leaderboard.svg"
                    alt="Shop"
                    height={90}
                    width={90}
                    />
                    <h1 className="text-center font-bold text-neutral-800 text-2xl">
                        Leaderboard
                    </h1>
                    <p className="text-muted-foreground text-center text-lg mb-6">
                        see Where you stand among other learners in the community. 
                    </p>
                    <Separator className="mb-4 h-0.5 rounded-full"/>
                  {/*TODO: Add user list*/}
                   <ul className="w-full">
                    {quests.map((quest)=>{
                        const progress = (userProgress.points / quest.value *100);
                        
                        return (
                            <div className="flex items-center w-full p-4 gap-x-4 border-t-2"
                                key={quest.title.toString()}
                            >
                                <Image
                                    src="/points.svg"
                                    alt="Points"
                                    width={60}
                                    height={60}
                                />
                                <div className="flex flex-col gap-y-2 w-full">
                                    <p className="text-neutral-700 text-xl font-bold">
                                        {quest.title}
                                    </p>
                                    <Progress value={progress} className="h-3"/>
                                </div>

                            </div>
                        )
                    
                    
                    })}

                   </ul>
                  
                </div>


            </FeedWrapper>
        </div>
    )
}
export default QuestPage;