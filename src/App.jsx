import { useState } from 'react';

// Components: Project
import Container from 'react-bootstrap/Container';

// Components: Local
// import BoardPreview from './components/BoardPreview/BoardPreview';
// import CardGrid from './components/CardGrid/CardGrid';
// import BoardKnobControlPanel from './components/BoardKnobControlPanel/BoardKnobControlPanel';
// import CardPreview from './components/CardPreview/CardPreview';
// import CardDetail from './components/CardDetail/CardDetail';
// import CardForm from './components/CardForm/CardForm';
// import CardComposer from './components/CardComposer/CardComposer';
// import LoginForm from './components/LoginForm/LoginForm';
// import RegisterForm from './components/RegisterForm/RegisterForm';
// import RecommendBrandName from './components/RecommendBrandName/RecommendBrandName';
// import RecommendBrandSubText from './components/RecommendBrandSubText/RecommndBrandSubText';
// import RecommendBrand from './components/RecommendBrand/RecommendBrand';
// import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from "./components/RegisterPage/RegisterPage";
import RecommendNavBar from './components/RecommendNavBar/RecommendNavBar';

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


    // <CardComposer />

    // <LoginForm />

    // <RegisterForm />

    // <div style={{ margin: "30px" }}>
    //   <RecommendBrand size="60px"/>
    // </div>


    // <LoginPage />
    <>
      <RecommendNavBar />
      <RegisterPage />
    </>

  )
}

export default App
