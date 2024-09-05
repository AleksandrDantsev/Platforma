import React from 'react';
import DataGrid, { Column } from 'devextreme-react/data-grid';
import st from "./GridTable.module.scss";
import 'devextreme/dist/css/dx.light.css';

const GridTable = ({ data, columns }) => {

  return (
    <div className={st.gridTableWrapper}>
        <div className={st.titleGrid}>
            <h1>Окно предварительного просмотра отчёта</h1>
        </div>
        <div className={st.gridInner}>
            <DataGrid 
                dataSource={columns.length > 0 && data} 
                showBorders={true}>
            {
             columns.map((column) => (
                <Column
                    key={column.dataField}
                    dataField={column.dataField}
                    caption={column.caption}
                    dataType={column.dataType}
                    format={column.format}
                    alignment={column.alignment}
                />
                ))
            }
          </DataGrid>
        </div>
    </div>
  );
};

export default GridTable;
