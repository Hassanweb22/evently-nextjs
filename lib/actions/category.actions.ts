'use server'

import { CreateCategoryParams } from "@/types";
import { connectToDatabase } from "../database";
import Category from "../database/models/category.model";
import { handleError } from "../utils";


export async function createCategory({ categoryName }: CreateCategoryParams) {
    try {
        await connectToDatabase();
        const newCategory = await Category.create({ name: categoryName });
        return JSON.parse(JSON.stringify(newCategory))
    } catch (error) {
        handleError(error)
    }
}
export async function deleteCategory(categoryId: string) {
    try {
        await connectToDatabase();
        const deleteResult = await Category.deleteOne({ _id: categoryId });
        if (deleteResult.deletedCount === 0) {
            throw new Error("Category not found or already deleted");
        }
        return { message: "Category successfully deleted" };
    } catch (error) {
        handleError(error);
    }
}

export async function getAllCategories() {
    try {
        await connectToDatabase();
        const categories = await Category.find({});
        return JSON.parse(JSON.stringify(categories));
    } catch (error) {
        handleError(error);
    }
}
