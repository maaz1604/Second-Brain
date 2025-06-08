import './App.css'
import { Button } from './components/ui/Button'
import { PlusIcon } from './icons/Plusicon'

function App() {

  return (
    <>
      <Button startIcon={<PlusIcon size='lg'/>} size='md' variant='primary' text='Share' />
      <Button size='lg' variant='secondary' text='Add comment' />
    </>
  )
}

export default App
