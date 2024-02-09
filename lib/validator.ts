
import * as z from "zod"

export const eventFormSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    description: z.string().min(3, 'Description must be at least 3 characters').max(700, 'Description must be less than 500 characters'),
    location: z.string().min(3, 'Location must be at least 3 characters').max(50, 'Location must be less than 400 characters'),
    imageUrl: z.string(),
    startDateTime: z.date(),
    endDateTime: z.date(),
    categoryId: z.string().refine((data) => data !== "", {
        message: "Category must be selected",
    }),
    price: z.string(),
    isFree: z.boolean(),
    url: z.string().url()
})