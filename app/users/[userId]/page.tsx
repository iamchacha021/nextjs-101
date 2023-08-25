import getUser from '@/lib/getUser'
import getUserPosts from '@/lib/getUserPosts'
import { Suspense } from 'react'
import UserPosts from './components/UserPosts'
import { Metadata } from 'next'

type Params = {
    params: {
        userId: string
    }
}

// creating a dynamic metadata

export async function generateMetadata({ params: {userId}}: Params): Promise<Metadata> {
    const userData: Promise<User> = getUser(userId)
    const user = await userData
    return{
        title: user.name,
        description: ` This page belongs to ${user.name}`
    }
}


export default async function UserPage({ params: { userId }}: Params) {
    const userData: Promise<User> = getUser(userId)
    const userPostsData: Promise<Post[]> = getUserPosts(userId)

    // // you can do as below
    // const [user, userPost] = await Promise.all([userData, userPostsData])

    // or this better way
    const user = await userData

  return (
    <>
        <h2>{user.name}</h2>
        <br />
        <Suspense>
            <UserPosts promise={userPostsData} />
        </Suspense>
    </>
  )
}
