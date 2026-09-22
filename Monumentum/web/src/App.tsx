import './App.css'
import Sidebar from './components/Sidebar'
import CataloguePage from './pages/CataloguePage'

function App() {
  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content">
        <CataloguePage />
      </main>
    </div>
  )
}

export default App