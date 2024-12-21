// Components: Project
import Container from 'react-bootstrap/Container';

// Components: Local
// import BoardPreview from './components/BoardPreview/BoardPreview';
// import CardGrid from './components/CardGrid/CardGrid';
import BoardKnobControlPanel from './components/BoardKnobControlPanel/BoardKnobControlPanel';

// Styling: Local
import './App.css';

function App() {

  return (
    // <Container fluid>
    //   <BoardPreview name="My first board"/>
    //   <BoardPreview name="Must watch movies"/>
    //   <BoardPreview name="My first board"/>
    //   <BoardPreview name="Must watch movies"/>
    //   <BoardPreview name="My first board"/>
    //   <BoardPreview name="Must watch movies"/>
    // </Container>

    // <CardGrid />

    <BoardKnobControlPanel name="My first board" privateBoard={false}/>
  )
}

export default App
