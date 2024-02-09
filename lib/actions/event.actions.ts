'use server'

import { CreateEventParams, GetAllEventsParams } from "@/types";
import Event from "../database/models/event.model";
import User from "../database/models/user.model";
import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import Category from "../database/models/category.model";
import mongoose from "mongoose";

const eventsData = [
    {
        title: 'Web Development Bootcamp 2024',
        description: 'Embark on a coding journey with our intensive Web Development Bootcamp in 2024. Learn the latest technologies, frameworks, and best practices to become a proficient full-stack developer. Join interactive coding sessions, collaborate on real-world projects, and kickstart your career in web development.',
        location: 'Virtual Classroom',
        imageUrl: 'https://utfs.io/f/7c85b691-82d8-4c1a-8b36-8b44b2d1c509-webdev-bootcamp.png',
        startDateTime: '2024-03-15T10:00:00.000Z',
        endDateTime: '2024-03-18T16:00:00.000Z',
        price: '49.99',
        isFree: false,
        url: 'https://webdevbootcamp.com',
        category: '65c1f897a22f682ec4cd34e5',
        organizer: '65bdda7a88fdaaacf606337b'
    },
    {
        title: 'AI and Machine Learning Summit 2024',
        description: 'Explore the fascinating world of Artificial Intelligence and Machine Learning at our summit in 2024. Engage with leading experts, participate in hands-on workshops, and delve into the latest advancements in AI and ML. Whether you are a seasoned professional or a curious enthusiast, this summit promises insights and knowledge that will shape the future.',
        location: 'Virtual Conference',
        imageUrl: 'https://utfs.io/f/3a4b8d9e-4c6e-4d9b-8aae-94c768f4e1b5-ai-ml-summit.png',
        startDateTime: '2024-04-10T09:30:00.000Z',
        endDateTime: '2024-04-12T18:00:00.000Z',
        price: '39.99',
        isFree: false,
        url: 'https://aimlsummit2024.com',
        category: '65c1f897a22f682ec4cd34e5',
        organizer: '65bdda7a88fdaaacf606337b'
    },
    {
        title: 'Digital Marketing Masterclass 2024',
        description: 'Join our Digital Marketing Masterclass and stay ahead in the ever-evolving world of online marketing. Discover the latest strategies, tools, and techniques to boost your brand\'s online presence. Engage with industry experts, network with fellow marketers, and elevate your digital marketing skills to new heights.',
        location: 'Online Workshop',
        imageUrl: 'https://utfs.io/f/feb7eb5e-18a4-4d8f-9fb5-725186c2f9c0-digital-marketing.png',
        startDateTime: '2024-05-20T14:00:00.000Z',
        endDateTime: '2024-05-22T17:30:00.000Z',
        price: '29.99',
        isFree: false,
        url: 'https://digitalmasterclass.com',
        category: '65c1f897a22f682ec4cd34e5',
        organizer: '65bdda7a88fdaaacf606337b'
    },
    {
        title: 'Blockchain Expo 2024',
        description: 'Immerse yourself in the world of blockchain technology at our Expo in 2024. Explore the latest trends, innovations, and applications of blockchain across various industries. Engage in panel discussions, hands-on demos, and networking opportunities with blockchain enthusiasts and experts. Uncover the potential of blockchain for the future.',
        location: 'Hybrid - Virtual and Physical',
        imageUrl: 'https://utfs.io/f/8a795268-8a84-49bf-89c8-6d153ba60a07-blockchain-expo.png',
        startDateTime: '2024-06-15T11:00:00.000Z',
        endDateTime: '2024-06-17T17:00:00.000Z',
        price: '44.99',
        isFree: false,
        url: 'https://blockchainexpo2024.com',
        category: '65c1f897a22f682ec4cd34e5',
        organizer: '65bdda7a88fdaaacf606337b'
    }
];

// You can use the eventsData array for uploading to MongoDB.



export async function uploadEvents() {
    try {

        await connectToDatabase()
        for (const eventData of eventsData) {
            const event = new Event(eventData);
            await event.save();
            console.log(`Event saved: ${event.title}`);
        }
    } catch (error) {
        console.error('Error uploading events:', error);
    } finally {
        mongoose.disconnect();
    }
}


export async function createEvent({ event, userId, path }: CreateEventParams) {
    try {

        await connectToDatabase()
        const organizer = await User.findById(userId)

        if (!organizer) {
            throw new Error('Organizer not found')
        }
        const newEvent = await Event.create({
            ...event,
            category: event.categoryId,
            organizer: userId,
            path
        })

        return JSON.parse(JSON.stringify(newEvent))

    } catch (error) {
        handleError(error)
    }
}

export async function getEventById(eventId: string) {
    try {

        await connectToDatabase()
        const event = await Event.findById(eventId)
            .populate('organizer', '_id firstName lastName', User)
            .populate('category', '_id name', Category)

        if (!event) {
            throw new Error('Event not found')
        }

        return JSON.parse(JSON.stringify(event))

    } catch (error) {
        handleError(error)
    }
}
export async function getAllEvents({ category, limit, page, query }: GetAllEventsParams) {
    try {
        await connectToDatabase();

        const condition = {}; // Build your query based on params

        const eventsQuery = Event.find(condition)
            .sort({ createdAt: 'desc' })
            .skip(0)
            .limit(limit)
        // .skip(limit * (page - 1))

        const events = await eventsQuery
            .populate('organizer', '_id firstName lastName', User)
            .populate('category', '_id name', Category);

        const eventsCount = await Event.countDocuments(condition);

        return {
            data: JSON.parse(JSON.stringify(events)),
            totalPages: Math.ceil(eventsCount / limit),
        }

    } catch (error) {
        handleError(error);
    }
}
