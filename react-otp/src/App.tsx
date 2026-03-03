import Otp from "./components/Otp"

function App() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-800">
      <Otp fieldLength={6}/>
    </div>
  )
}

export default App