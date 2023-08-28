import getUser from '@/lib/getUser'
import getUserPosts from '@/lib/getUserPosts'
import { Suspense } from 'react'
import UserPosts from './components/UserPosts'
import { Metadata } from 'next'
import getAllUsers from '@/lib/getAllUsers'
import { notFound } from 'next/navigation'

type Params = {
    params: {
        userId: string
    }
}

// creating a dynamic metadata

export async function generateMetadata({ params: {userId}}: Params): Promise<Metadata> {
    const userData: Promise<User> = getUser(userId)
    const user = await userData

    // metadata for non-existing user
    if (!user.name){
        return{
            title: 'User Not Found'
        }
    }

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

    if (!user.name) return notFound()

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


// transforming this dynamic user page to SSG
// Why would we do that? This is because all the Users are SSR, and it wouldn't make sense to have a single user as SSR. So we transform the User params to SSG since we already have their information
// Remember to npm run build after transformation to SSG

export async function generateStaticParams() {
    const usersData: Promise<User[]> = getAllUsers()
    const users = await usersData

    return users.map(user => ({
        userId: user.id.toString()
    }))
}