import './App.css'
import Calendar from './Components/Calendar';
import Deadline from './Components/Deadline';
import Header from './Components/Header';

function App() {

    return (
        <div className="App">
            <Header/>
            <div className='timeline'>
                <Calendar/>
                <Deadline/>
            </div>
        </div>
    );
}

export default App;
