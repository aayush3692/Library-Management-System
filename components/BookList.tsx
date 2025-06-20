'use client';

import BookCard from './BookCard';

interface Props {
  title: string,
  books: Book[],
  containerClassName?: string;
}

const BookList = ({ title, books, containerClassName }: Props) => {
  if (books.length < 2) return;
  return (
    <section className={containerClassName}>
      <h1 className='font-bebas-neue text-4xl text-light-100'>
        {title}
      </h1>



      <ul className='book-list'>
        {books.map((book, index) => (
          <BookCard
            key={book.title}
            {...book}
          />
        ))}
      </ul>

    </section>
  )
}

export default BookList
