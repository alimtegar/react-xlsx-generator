import React from 'react';
import XLSX from 'xlsx';
import FileSaver from 'file-saver';

function App() {
  const todos = [
    {
      id: 1,
      title: "delectus aut autem",
      completed: false
    },
    {
      id: 2,
      title: "quis ut nam facilis",
      completed: false
    },
    {
      id: 3,
      title: "fugiat veniam minus",
      completed: false
    },
    {
      id: 4,
      title: "et porro tempora",
      completed: true
    },
    {
      id: 5,
      title: "laboriosam mollitia et",
      completed: false
    },
    {
      id: 6,
      title: "qui ullam ratione",
      completed: false
    },
    {
      id: 7,
      title: "illo expedita consequatur",
      completed: false
    },
    {
      id: 8,
      title: "quo adipisci enim quam ut ab",
      completed: true
    },
    {
      id: 9,
      title: "molestiae perspiciatis",
      completed: false
    },
    {
      id: 10,
      title: "illo est ratione",
      completed: true
    },
  ];
  const properties = Object.keys(todos[0]);

  const downloadXlsx = () => {
    let wb = XLSX.utils.book_new();

    wb.Props = {
      Title: 'To-Dos',
      Subject: 'To-Dos',
      Author: 'Alim Tegar',
      CreatedDate: new Date(2019, 6, 26),
    };

    wb.SheetNames.push('Sheet 1');

    let ws_data = [];

    ws_data.push(properties);

    todos.map((todo) => {
      let x = [];

      properties.map((property) => {
        x.push(todo[property]);
      });

      ws_data.push(x);
    })

    const ws = XLSX.utils.aoa_to_sheet(ws_data);

    wb.Sheets['Sheet 1'] = ws;

    const wbout = XLSX.write(wb, {bookType: 'xlsx', type: 'binary'});

    const s2ab = (s) => {
      const buf = new ArrayBuffer(s.length);
      let view = new Uint8Array(buf);

      for (let i = 0; i < s.length; i++) {
        view[i] = s.charCodeAt(i) & 0xFF;
      }

      return buf;
    };

    FileSaver.saveAs(new Blob([s2ab(wbout)], { type: 'application/octet-stream', }), 'todos.xlsx');
  };

  return (
    <div className="App">
      <button onClick={() => downloadXlsx()}>
        Download todos.xlsx
      </button>
    </div>
  );
}

export default App;
