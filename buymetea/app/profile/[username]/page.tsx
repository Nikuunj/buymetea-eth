import Profile from "@/components/User/Profile";

async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
    const resolvedParams = await params;
    const username = resolvedParams.username;
    
    return (
        <Profile username={username}/>
    )
}

export default ProfilePage