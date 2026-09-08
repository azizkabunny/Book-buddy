import { Route, Routes } from 'react-router-dom';
import Catalog from './Catalog';
import BookDetails from './BookDetails';
import Account from './Account';

export default function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Catalog />} />
        <Route path='/books' element={<Catalog />} />
        <Route path='/books/:id' element={<BookDetails />} />
        <Route path='/account' element={<Account />} />
      </Routes>
    </>
  );
}
