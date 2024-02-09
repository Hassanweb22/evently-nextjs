import { getEventById } from '@/lib/actions/event.actions';
import { IEvent } from '@/lib/database/models/event.model';
import { formatDateTime } from '@/lib/utils';
import { SearchParamProps } from '@/types';
import Image from 'next/image';
import { useParams } from 'next/navigation'
import React from 'react'

const EventDetails = async ({ params: { id }, searchParams }: SearchParamProps) => {
    const event: IEvent = await getEventById(id);

    // console.log({ event })

    return (
        <div>
            <section className='flex justify-center  bg-primary-50 bg-dotted-pattern bg-contain '>
                <div className='grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl '>
                    <Image
                        src={event.imageUrl}
                        alt='Event image'
                        width={1000}
                        height={1000}
                        className='h-full min-h-[300px] object-cover object-center'
                    />
                    <div className='flex flex-col p-3 sm:p-5 gap-6'>
                        <p className='h2-bold '>{event.title}</p>

                        <div className='flex flex-col md:flex-row gap-3'>
                            <div className="flex gap-3">
                                <p className="p-bold-20 rounded-full bg-green-500/10 px-5 py-2 text-green-700">
                                    {event.isFree ? 'FREE' : `$${event.price}`}
                                </p>
                                <p className="p-medium-16 rounded-full bg-grey-500/10 px-4 py-2.5 text-grey-500">
                                    {event.category.name}
                                </p>
                            </div>
                            <p className='p-medium-18 ml-2 mt-0 sm:mt-2'>
                                By
                                <span className='text-primary ml-2'>{event?.organizer?.firstName} | {event?.organizer?.lastName}</span>
                            </p>
                        </div>
                        {/* checkout button */}

                        <div className='flex flex-col gap-5'>
                            <div className='flex gap-2 md:gap-3'>
                                <Image
                                    src={'/assets/icons/calendar.svg'}
                                    alt='calendar icon'
                                    width={32}
                                    height={32}
                                />
                                <div className='flex flex-col gap-0 [&>p]:p-medium-16 [&>p]:lg:p-regular-20'>
                                    <p>
                                        {formatDateTime(event.startDateTime).dateOnly} {' '}
                                        {formatDateTime(event.startDateTime).timeOnly}
                                    </p>
                                    <p>
                                        {formatDateTime(event.endDateTime).dateOnly} {' '}
                                        {formatDateTime(event.endDateTime).timeOnly}
                                    </p>
                                </div>
                            </div>

                            <div className="p-regular-20 flex items-center gap-3">
                                <Image src="/assets/icons/location.svg" alt="location" width={32} height={32} />
                                <p className="p-medium-16 lg:p-regular-20">{event.location}</p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <p className="p-bold-20 text-grey-600">What You'll Learn:</p>
                            <p className="p-medium-16 lg:p-regular-18">{event.description}</p>
                            <p className="p-medium-16 lg:p-regular-18 truncate text-primary-500 underline">{event.url}</p>
                        </div>

                    </div>


                </div>
            </section>
        </div>
    )
}

export default EventDetails