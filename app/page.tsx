import Link from 'next/link'

export default async function Home() {
    return <div className='p-32'>
            <Link href="/users"><h1 className='text-center text-3xl font-bold underline text-blue-500'>Visit Users Page</h1></Link>
    </div>
}