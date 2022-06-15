import { useFile } from "../Context/FileContext"

export default function FileState(){
    const [file] = useFile()

    return(
        <div>
            {file}        
        </div>
    )
}