import './App.css'
import Header from './components/Header'
import Travel from './components/Travel'
import data from './data'


function App() {
    const travels = data.map((item, index) => <Travel key={index} item={item} />)
    return (
        <>
            <Header />
            <main>
                {travels}
            </main>
        </>
    )
}

export default App
