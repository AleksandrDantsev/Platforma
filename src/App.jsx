import { useState, useEffect } from 'react'
import st from './App.module.scss';
import GridTable from './components/GridTable/GridTable'
import EditorPanel from './components/EditorPanel/EditorPanel'
import { config } from './report-config';
import { data } from "./data";
import { isValidSchema } from './helper/isValidSchema';

function App() {
    const [ dataTable, setDataTable ] = useState(data);
    const [ columns, setColumns ] = useState(config.columns);

    useEffect(() => isValidSchema(), [])
    
    return (
        <main className={st.mainConteiner}>
            <div className={st.wrapper}>
                <GridTable 
                    data={dataTable} 
                    columns={columns} />
                <EditorPanel 
                    setDataTable={setDataTable}       
                    dataTable={dataTable} 
                    setColumns={setColumns} 
                    columns={columns} />
            </div>
        </main>
    )
}

export default App
