import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import DataContext from './context/DataContext.jsx'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <DataContext>
            <App />
        </DataContext>
    </BrowserRouter>

)