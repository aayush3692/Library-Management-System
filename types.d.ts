interface Book {
    id: string,
    title: string;
    author: string;
    genre: string;
    rating: number;         // e.g., 4.5
    totalCopies: number;          // e.g., number of pages or total ratings
    availableCopies: number;  
    description: string;
    coverColor: string;          // e.g., hex color like '#fff' or color name
    coverUrl: string; 
    videoUrl: string;  
    summary: string;
    createdAt: Date | null;
    isLoanedBook?: boolean;      

}

interface AuthCredentials {
    fullName: string,
    email: string,
    password: string,
    universityId: number,
    universityCard: string;
}

interface BookParams {
    title: string,
    author: string,
    genre: string,
    rating: number,
    coverUrl: string,
    coverColor: string,
    description: string,
    totalCopies: number,
    videoUrl: string,
    summary: string

}

interface BorrowBookParams {
    userId: string,
    bookId: string
}