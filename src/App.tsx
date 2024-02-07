import Heading from "./components/Heading"
import { Section } from "./components/Section"
import Counter from "./components/Counter"
import List from "./components/List"

import { useState, useEffect, useCallback, useMemo, useRef} from 'react'
import { CounterProvider } from "./components/CounterContext"

interface User {
  id: number,
  username: string,
}

type fibFunc = (n: number) => number

function App() {
  const [count, setCount] = useState<number>(0)
  const [users, setUsers] = useState<User[] | null>(null)

  const inputRef = useRef<HTMLInputElement>(null)

  const fib: fibFunc = (n) => {
    if (n < 2) return n
    return fib(n - 1) + fib(n - 2)
  }

  const myNum: number = 37

  // console.log(inputRef?.current)
  console.log(inputRef?.current?.value)

  useEffect(() => {
    console.log('mounting')
    console.log('Users: ', users)

    return () => console.log('unmounting')
  }, [users])

  const addTwo = useCallback((): void => setCount(prev => prev + 2), [])

  const result = useMemo<number>(() => fib(myNum), [myNum])

  return (
    <>
      <Heading title={"Hello"} />
      <Section title={"Different Title"}>This is my Section.</Section>
      <CounterProvider>
        <Counter>{(num: number) => <>Current Count: {num}</>}</Counter>
      </CounterProvider>
      <List items={["☕ Coffee", "🌮 Tacos", "💻 Code"]} render={(item: string) => <span className="bold">{item}</span>} />

      {/* hooks */}
      <h1>{count}</h1>
      <button onClick={addTwo}>Add</button>
      <h2>{result}</h2>
      <input ref={inputRef} type="text" />
    </>
  )
}

export default App