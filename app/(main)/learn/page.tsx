import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/stick-wrapper";
import { Header } from "./header";
import { UserProgress } from "@/components/user-progress";
import { getCourseProgress, getLessonPercentage, getUnits, getUserProgress, getUserSubscription } from "@/db/queries";
import { redirect } from "next/navigation";
import { lessons, challenges, userSubscription } from '../../../db/schema';
import { Unit } from "./unit";
import { Promo } from "@/components/promo";
import { Quests } from "@/components/quests";
import { auth } from "@clerk/nextjs/server";

const LearnPage = async () => {
    const userProgressData = getUserProgress()
    const courseProgressData = getCourseProgress();
    const lessonPercentageData = getLessonPercentage();
    const unitsData = getUnits();
    const userSubscriptionData = getUserSubscription();
    const {userId} = auth();

    const [userProgress,
        units,
        courseProgress,
        lessonPercentage,
        userSubscription
    ] =
    await Promise.all([
        userProgressData,
        unitsData,
        courseProgressData,
        lessonPercentageData,
        userSubscriptionData
    ]);
    // console.log('check course progress', courseProgress?.activeLesson?.challenges);
    // console.log('check lesson percentage', lessonPercentage);
    if (!userProgress || !userProgress.activeCourse) {
        redirect("/courses")
    }
    if (!courseProgress) {
        redirect("/courses");
    }
    const isPro = !!userSubscription?.isActive;
     console.log('check user', userId);
    return (
        <div className="flex flex-row-reverse gap-[20px] px-6">
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
                 <Quests points={userProgress.points}/> 
            </StickyWrapper>
            <FeedWrapper>

                <Header title={userProgress.activeCourse.title} />
                 {units?.map((unit) => (
                    <div key={unit.id} className="md-10">
                         <Unit
                             id={unit.id}
                             order={unit.order}
                             description={unit.description}
                             title={unit.title}
                             lessons={unit.lessons}
                             activeLesson={courseProgress.activeLesson}
                             activeLessonPercentage={lessonPercentage}
                         
                         />


                     </div>
                ))} 
            </FeedWrapper>
        </div>
    )
}
export default LearnPage;
