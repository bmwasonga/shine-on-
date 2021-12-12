import React, { useState } from 'react';

export default function ReadCsv() {
  const [csvFile, setCsvFile] = useState();
  const [csvArray, setCsvArray] = useState();
  const [inputValue, setInputValue] = useState(1);

  const [sortableval, setSortable] = useState();

  // console.log(csvArray);

  const onChangeHandler = (event) => {
    setInputValue(event.target.value);
  };

  const processFile = (str, delim = ',') => {
    const headers = str
      .slice(0, str.indexOf('\n'))
      .replace(/ /g, '')
      .split(delim);
    const rows = str.slice(str.indexOf('\n') + 1).split('\n');
    // console.log('the rows are', rows);

    const newArray = rows.map((row) => {
      const values = row.split(delim);
      const eachObj = headers.reduce((obj, header, index) => {
        obj[header] = values[index];
        return obj;
      }, {});
      return eachObj;
    });

    setCsvArray(newArray);

    // here we get all the keys ito a single array the way we want it to be.
    // The commonality here will determine the output as we proceed using a function to truncate the array
    const result = newArray.map((array) => array.CustomerID);
    console.log('the result is', result);

    // this is a counter of how mant times the customerID is repeated
    var map = result.reduce(function (obj, b) {
      obj[b] = ++obj[b] || 1;
      return obj;
    }, {});

    console.log('the map is', map);

    var sortable = [];
    for (var x in map) {
      sortable.push([x, map[x]]);
    }

    sortable.sort(function (a, b) {
      return b[1] - a[1];
    });

    console.log('the sortable is', sortable);

    setSortable(sortable);
  };

  const submit = () => {
    const file = csvFile;
    const reader = new FileReader();

    reader.onload = function (e) {
      const text = e.target.result;
      processFile(text);
    };

    reader.readAsText(file);
  };

  return (
    <div className="container">
      <form>
        <input
          type="file"
          accept=".csv"
          onChange={(e) => {
            setCsvFile(e.target.files[0]);
          }}
        />
        <input
          type="number"
          onChange={onChangeHandler}
          value={inputValue}
          placeholder="number to display"
        />

        <br />
        <button
          className="button"
          onClick={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          Submit{' '}
        </button>
      </form>

      <br />

      <div className="">
        {sortableval?.map((item, index) => {
          return (
            <div key={index}>
              {index + 1}:{item[0]}
            </div>
          );
        })}
      </div>
    </div>
  );
}
