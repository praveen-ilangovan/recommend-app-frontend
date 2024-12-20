// Components: Project
import Container from 'react-bootstrap/Container';

// Components: Local
import BoardPreview from './components/BoardPreview/BoardPreview';

// Styling: Local
import './App.css';

function App() {

  return (
    <Container fluid>
      <BoardPreview name="My first board"/>
      <BoardPreview name="Must watch movies"/>
    </Container>
  )
}

export default App
