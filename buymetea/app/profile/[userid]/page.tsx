import Profile from "@/components/User/Profile";

async function ProfilePage({ params }: { params: Promise<{ userid: string }> }) {
    const resolvedParams = await params;
    const id = Number(resolvedParams.userid);
    
    return (
        <Profile userid={id}/>
    )
}

export default ProfilePage