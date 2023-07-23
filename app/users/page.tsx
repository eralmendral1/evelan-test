'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { PaginatedResult, User } from './types'

const URL: string = 'https://reqres.in/api/users'

const UserCard: React.FC<User> = ({ id, first_name, last_name, email, avatar }) => {
    const fullName = `${first_name} ${last_name}`

    return <div className='xl:w-1/4 sm:w-1/2 w-full 2xl:w-1/5 flex flex-col items-center py-12 md:py-6 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg text-white'>
        <div className='w-full flex items-center justify-center'>
            <div className='flex flex-col items-center'>
                <Image
                    className='rounded'
                    loader={() => avatar}
                    src={avatar}
                    alt={fullName}
                    width={120}
                    height={120}
                    unoptimized={true}
                    priority
                />

                <p className='mt-2'>{id}</p>
                <p className='text-xs sm:text-sm md:text-base font-semibold text-center'>Ricardo Boveta</p>
            </div>
        </div>
        <h1>{email}</h1>
        <h1>{fullName}</h1>
    </div>
}

const Users: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [users, setUsers] = useState<User[]>([])
    const [page, setPage] = useState<number>(1)
    const [totalPages, setTotalPages] = useState<number>(0)

    const fetchUsers = async (): Promise<void> => {
        setLoading(true)

        const res = await fetch(`${URL}?page=${page}`)
        const data: PaginatedResult<User> = await res.json()
        setUsers([...users, ...data.data])
        setTotalPages(data.total_pages)

        setLoading(false)
    }

    const handleNextPage = (): void => {
        setPage(page => page + 1)
    }

    useEffect(() => {
        fetchUsers()
    }, [page])

    return (<div className='flex flex-col justify-center items-center'>
        <h1 className='my-5 text-lg'>Users</h1>

        <div className='w-full flex flex-wrap gap-4 items-center justify-center'>
            {users.map((user: User) => {
                return <UserCard key={user.id} {...user} />
            })}
        </div>

        {loading && <span className='loading loading-spinner text-primary'></span>}

        {/* Display load more button if there is next page. */}
        <button className='btn btn-info my-5' disabled={loading || page === totalPages} onClick={handleNextPage}>Load More</button>
    </div>)
}

export default Users