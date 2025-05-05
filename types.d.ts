interface Book {
    id: number,
    title: string;
    author: string;
    genre: string;
    rating: number;         // e.g., 4.5
    totalCopies: number;          // e.g., number of pages or total ratings
    availableCopies: boolean;  // e.g., true if available
    description: string;
    coverColor: string;          // e.g., hex color like '#fff' or color name
    coverUrl: string; 
    video: string;  
    summary: string;
    isLoanedBook?: boolean;      
  
}