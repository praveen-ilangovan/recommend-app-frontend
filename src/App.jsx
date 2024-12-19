
// Custom components
import CardPreview from './components/CardPreview/CardPreview';

// Styles
import './App.css';

// Data
import { CARDS } from '../data';


function App() {

  return (
    <>
      {CARDS.map( (card) => <CardPreview key={card.id} {...card} /> )}
    </>
  )
}

export default App
