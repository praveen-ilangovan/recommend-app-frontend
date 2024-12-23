import { useState } from 'react';

// Components: Project
import Container from 'react-bootstrap/Container';

// Components: Local
// import BoardPreview from './components/BoardPreview/BoardPreview';
// import CardGrid from './components/CardGrid/CardGrid';
// import BoardKnobControlPanel from './components/BoardKnobControlPanel/BoardKnobControlPanel';
import CardPreview from './components/CardPreview/CardPreview';
import CardDetail from './components/CardDetail/CardDetail';
import CardForm from './components/CardForm/CardForm';

// Styling: Local
import './App.css';

function TestComponent({title}) {
  return (
    <div>
      <h5>{title}</h5>
    </div>
  );
}

function App() {

  const [title, setTitle] = useState("Title");
  const [url, setUrl] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [description, setDescription] = useState("Description...")

  function testCallback(values) {
    // console.log(values)
    if (values.title) {
      setTitle(values.title);
    }

    if (values.url) {
      setUrl(values.url)
    }

    if (values.image) {
      setThumbnail(values.image)
    }

    if (values.description) {
      setDescription(values.description)
    }
  }

  return (
    // <Container fluid>
    //   <BoardPreview name="My first board"/>
    //   <BoardPreview name="Must watch movies"/>
    //   <BoardPreview name="My first board"/>
    //   <BoardPreview name="Must watch movies"/>
    //   <BoardPreview name="My first board"/>
    //   <BoardPreview name="Must watch movies"/>
    // </Container>

    // <>
    //   <BoardKnobControlPanel name="My first board" privateBoard={false}/>
    //   <CardGrid />
    // </>

    // <>
    // <CardDetail
    //   title="Drive"
    //   description="A mysterious Hollywood action film stuntman gets in trouble with gangsters when he tries to help his neighbor's husband rob a pawn shop while serving as his getaway driver."
    //   thumbnail="https://images.bauerhosting.com/legacy/empire-legacy/uploaded/alternative-drive-poster-3.jpg?auto=format&w=1440&q=80"
    //   url="https://www.imdb.com/title/tt0780504/"
    //   id="1"
    // />
    // <CardDetail
    //   title="Pulp Fiction, Pulp Fiction, Pulp Fiction, Pulp Fiction"
    //   description="The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption."
    //   thumbnail="https://alternativemovieposters.com/wp-content/uploads/2021/04/RuizBurgos_PulpFiction.jpg"
    //   url="https://www.imdb.com/title/tt0780504/"
    //   id="2"
    //   editable="true"
    // />
    // </>

    <Container fluid>
      <div>
        <CardForm onUpdate={testCallback}/>
        <CardDetail
          url={url}
          title={title}
          thumbnail={thumbnail}
          description={description}
        />
        <CardPreview
          id=""
          title={title}
          thumbnail={thumbnail}
        />
      </div>
    </Container>
  )
}

export default App
