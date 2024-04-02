export function getDistance(value) {
    return parseFloat(Math.round(value / 1000));
  }

export  function getDate(dateStr) {
    let dateObj = new Date(dateStr);

    let monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    let year = dateObj.getFullYear();
    let month = dateObj.getMonth();
    let day = dateObj.getDate();

    return `${monthNames[month]} ${day}, ${year}`;
  }

export  function getImageIdFromUrl(url) {
    // Regular expression to extract the file ID
    var regex = /\/file\/d\/([a-zA-Z0-9_-]+)\//;
    var match = url.match(regex);
  
    if (match && match[1]) {
      return match[1];
    } else {
      console.error("Invalid Google Drive URL");
      return null;
    }
  }
  