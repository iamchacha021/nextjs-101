import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin']})
import styles from './page.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <main className={ inter.className}>
      {/* <h1>Home Page</h1>
      <Link href='/about'>Go to About Page</Link>
      <p>
        <Link href='/users'>Users</Link>
      </p> */}
    </main>
  )
}
