import { getCourses, getUserProgress } from "@/db/queries";
import { List } from "./list";
import { userProgress } from '../../../db/schema';
import { auth } from "@clerk/nextjs/server";


const CoursesPage = async() => {
    const coursesData = await getCourses();
    const userProgressData = await getUserProgress()
    const [courses,userProgress] = await Promise.all([
        coursesData,
        userProgressData
    ])
    const {userId} = auth();
    console.log('check user', userId);
    return (
        <div className="h-full max-w-[912px] px-3 mx-auto">
            <h1 className="text-2xl font-bold text-neutral-700">
                Language Courses

            </h1>
            <List
                coursesList={courses}
                activeCourseId={userProgress?.activeCourseID}
            />
        </div>
    )
}
export default CoursesPage;
