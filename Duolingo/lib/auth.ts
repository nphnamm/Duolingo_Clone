import { auth } from "@clerk/nextjs/server";


const adminIds = [
    "user_2gC2CjYtpY6lhEEdAS1krg177Nn"
]
export const isAdmin =  () => {
    
    const {userId} = auth();

    if(!userId) {
        return false;

    }

    return adminIds.indexOf(userId) !== -1;
 
}