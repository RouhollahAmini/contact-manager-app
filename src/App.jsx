import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const App = () => {
    const [count, setCount] = useState(0)

    return (
        <>
            <h3 style={{ fontFamily: 'Dana'}}>اپلیکیشن مدیریت مخاطبین</h3>
            <span className='fa fa-user'></span>
            <button className='btn btn-primary'>button</button>
        </>
    )
}

export default App
