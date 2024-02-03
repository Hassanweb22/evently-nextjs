import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Home = () => {
    return (
        <>
            <section className='bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10'>
                <div className='wrapper grid grid-cols-1 md:grid-cols-2 gap-5 2xl:gap-0'>
                    <div className='flex flex-col justify-center gap-8'>
                        <h1 className="h1-bold">Host, Connect, Celebrate: Your Events, Our Platform!</h1>
                        <p className='p-regular-20 md:p-regular-24'>
                            Book and learn helpful tips from 3,168+ mentors in world-class companies with our global community.
                        </p>
                        <Button asChild className='button w-full sm:w-fit' size='lg'>
                            <Link href={'#events'}>Explore Now</Link>
                        </Button>
                    </div>

                    <Image
                        src="/assets/images/hero.png"
                        width={1000}
                        height={1000}
                        alt='hero img'
                        className='max-h-[70vh] object-contain 2xl:max-h-[50vh]'
                    />
                </div>
            </section>

            <section id='events' className=' wrapper flex flex-col gap-8 md:gap-12'>
                <h2 className='h2-bold'>Trust by<br /> Thousands of Events</h2>

                <div className='flex-flex-col gap-5 md:flex-row'>
                    Search
                    CategoryFilter
                </div>
            </section>
        </>
    )
}

export default Home