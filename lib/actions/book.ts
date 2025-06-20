'use server';

import { db } from "@/database/drizzle";
import { books, borrowRecords } from "@/database/schema";
import { eq } from "drizzle-orm";
import {Dayjs} from 'dayjs'

export const borrowBook = async (params: BorrowBookParams) => {
    const { userId, bookId }=params;

    try {
        const book = await db.select({ availableCopies: books.availableCopies})
        .from(books)
        .where(eq(books.id, bookId))
        .limit(1);

        if(!book.length || book[0].availableCopies <= 0) {
            return {
                success: false,
                error: 'Book is not available for borrow.'
            }
        }

        const dueDate = new Dayjs().add(7, 'day').toDate().toDateString();

        const record = db.insert(borrowRecords)
        .values({
            userId,
            bookId,
            dueDate,
            status: 'BORROWED'
        });

        await db.update(books)
        .set({availableCopies: book[0].availableCopies-1})
        .where(eq(books.id, bookId))

        return {
            success: true,
            data: JSON.parse(JSON.stringify(record))
        }
    } catch(error) {
        console.log('error', error)

        return {
            success: false
        }
    }

}