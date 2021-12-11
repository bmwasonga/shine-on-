import React, { useState, useEffect } from 'react';

export default function ReadCsv() {
  const [csvFile, setCsvFile] = useState();
  const [csvArray, setCsvArray] = useState();

  // console.log(csvArray);

  const processFile = (str, delim = ',') => {
    const headers = str
      .slice(0, str.indexOf('\n'))
      .replace(/ /g, '')
      .split(delim);
    const rows = str.slice(str.indexOf('\n') + 1).split('\n');

    const newArray = rows.map((row) => {
      const values = row.split(delim);
      const eachObj = headers.reduce((obj, header, index) => {
        obj[header] = values[index];
        return obj;
      }, {});
      return eachObj;
    });

    setCsvArray(newArray);
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
        onChange={console.log('i have changed')}
        placeholder="number to display"
      />

      <br />
      <button
        onClick={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        Submit{' '}
      </button>
    </form>
  );
}
