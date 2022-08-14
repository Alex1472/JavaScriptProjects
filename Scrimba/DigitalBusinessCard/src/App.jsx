import './App.css'
import Info from "./components/Info"
import About from "./components/About"
import Interests from "./components/Interests"
import Footer from "./components/Footer"

function App() {

  return (
    <div className="outer-container">
      <div className="inner-container">
        <Info />
        <div className="content-container">
          <About />
          <Interests />
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default App
