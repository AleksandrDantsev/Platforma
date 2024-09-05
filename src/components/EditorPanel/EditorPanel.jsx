import { useMemo, useState } from "react";
import st from "./EditorPanel.module.scss";
import deleteSvg from "../../assets/DeleteBin.svg";
import editSvg from "../../assets/Edit.svg";
import { capitalize } from "../../helpers/capitalize";
import { debounce } from "../../helpers/debounce";

const EditorPanel = ({ setDataTable, dataTable, setColumns, columns }) => {
    const [ changingName, setChangingName ] = useState("");
    const [ newNameColumn, setNewNameColumn ] = useState("");
    const [ inputNameColumn, setInputNameColumn ] = useState("");
    const [ isActiveAddingWindow, setActiveAddingWindow ] = useState(false);

    const openInputAddingColumn = () => setActiveAddingWindow(!isActiveAddingWindow);


    const columnNames = useMemo(() => {
        const names = [];
        columns.forEach(el => names.push(el.caption));
        return names;
    }, [columns.length, newNameColumn])
    

    const removeColumn = (e, nameColumn) => {
        const typeEvent = e.target.getAttribute("data-event");

        if (Boolean(typeEvent) && typeEvent === "bt-del") {
            setColumns(columns.filter(col => col.dataField !== nameColumn));
        }
    }

    const changeNameColumn = (e, nameColumn) => {
        if (isActiveAddingWindow) setActiveAddingWindow(false);
        const typeEvent = e.target.getAttribute("data-event");

        if (Boolean(typeEvent) && typeEvent === "bt-edit") {
            setChangingName(nameColumn);
            setNewNameColumn(nameColumn);
        }
    }

    const addColumn = () => {
        if (changingName) setChangingName("");
        if (inputNameColumn && isActiveAddingWindow) {
            const isAlreadyExist = columns.find(el => el.dataField === inputNameColumn);

            if (!isAlreadyExist) {
                const columnsCopy = [...columns];
                const initialColumn = { 
                    "dataField": inputNameColumn, 
                    "caption": inputNameColumn, 
                    "dataType": "string" 
                };
                columnsCopy.push(initialColumn);
                setColumns(columnsCopy);
            }
            setInputNameColumn("");
        }
    }

    const changetNewNameColumn = debounce((e) => {
        const targetVal = e.target.value;

        if (targetVal) {
            setNewNameColumn(capitalize(targetVal));
        }
    }, 200)

    const saveNewNameColumn = (e, columnName, isFocus) => {
        if (newNameColumn) {
            if (isFocus || e.key === 'Enter') {
                const columnsCopy = [...columns];
                const dataCopy = [...dataTable];

                columnsCopy.forEach(column => {
                    if (column.caption === columnName) {
                        column.caption = newNameColumn;
                        column.dataField = newNameColumn;
                    }
                })

                dataCopy.forEach(row => {
                    row[newNameColumn] = row[columnName];
                })

                setDataTable(dataCopy);
                setColumns(columnsCopy);
                setChangingName("");
                setNewNameColumn("");
            }
        }
    }

    const changeInputNameColumn = (e) => {
        const targetVal = e.target.value;

        if (targetVal) {
            setInputNameColumn(capitalize(targetVal));
        }
    }

    return (
        <div className={st.editorWrapper}>
            <div className={st.titleEditor}>
                <h2>Список колонок</h2>
            </div>
            <div className={st.columnsList}>
                <ul>
                    {
                    columnNames.map((el, index) => (
                        <li key={el + index}>
                            {
                            changingName === el ? <input type="text" 
                                                         placeholder={el} 
                                                         className={st.nameColumnInput} 
                                                         onChange={changetNewNameColumn}
                                                         onBlur={(e) => saveNewNameColumn(e, el, true)}
                                                         onKeyDown={(e) => saveNewNameColumn(e, el, false)} /> 
                                                         :
                                                         <span className={st.nameColumnSpan}>{el}</span>
                            }
                            <div className={st.events} onClick={(e) => {removeColumn(e, el), changeNameColumn(e, el)}}>
                                <button type="button" data-event="bt-del" className={st.btDel}>
                                    <img src={deleteSvg} alt="del" />
                                </button>
                                <button type="button" data-event="bt-edit" className={st.btEdit}>
                                    <img src={editSvg} alt="edit" />
                                </button>
                            </div>
                        </li>
                        ))
                    }
                </ul>
                <div className={st.addColumn}>
                    <button type="button" onClick={() => {openInputAddingColumn(), addColumn()}}>
                        { isActiveAddingWindow ? "Сохранить колонку" : "Добавить колонку" }
                        </button>
                    <input type="text"
                           value={inputNameColumn}
                           placeholder="Название"
                           onChange={changeInputNameColumn}
                           className={isActiveAddingWindow ? st.activeAddingWindow : st.addColumnInput} />
                </div>
            </div>
        </div>
    )
}

export default EditorPanel;
