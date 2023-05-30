# use-fun

React hook to provide a function that is able to access actual states in an anonymous context.

## Install

```sh
yarn add react-use-fun
# or
npm i react-use-fun --save
```

## Usage / Example:
```javascript

export default function Example(){
    const [start, setStart] = useState(true)

    const checkCondition = useFun(  () => {
        return start
    });

    async function longRunning(){
        console.log('processing started')

        //while(start)){ //will not work due to cached start value (Also see: CallByValue)
        while(checkCondition()){
            //do some weird processing
            await delay(1000)
            console.log('processing...')
        }
        console.log('processing ended.')
    }

    useEffect(() => {
        if (start) {
            longRunning().then()
            setStart(false)
        }
        else{
            console.log('processing aborted')
        }
    }, [start])

    return <div>check console logs</div>
}
```


### Parameters
the returned function takes one parameter. For example...

```javascript
    const [selection, setSelection] = useState(null)

    const onSelectionChanged = useFun(  ( {id: number, data: any} ) => {
        if (!selection) {
            setSelection(data)
            return console.log(`selection changed to id: ${id}`)
        }
        console.log('selection already set')
    });

    // call
    callInSomeFunction = () => {
        onSelectionChanged({id: 1, data: [1, 2, 3]}) 
    }   
    
```