export const getDateFormat = (date , type, s) => {
    let ck;
    let rtstr = "";
    let j = 0;
    for(let i = 0; i < type.length; i++) {
            if(type.substring(i,i+1) == 'x') {
                rtstr += date.substring(j,j+1);
            } else {
            j--;
            rtstr += type.substring(i,i+1);
            }
        j++;
    } 
    if(s == "dw") {
        document.write(rtstr);
    } else {
        return rtstr;
    }
}

export const getFormatDate = (date) => {
    let year = date.getFullYear();
    let month = 1 + date.getMonth();
    month = month >= 10 ? month : "0" + month;
    let day = date.getDate();
    day = day >= 10 ? day : "0" + day;
    let week = ["일", "월", "화", "수", "목", "금", "토"];
    let dayOfWeek = week[date.getDay()];
    let hour = leadingZeros(date.getHours(),2);
    let min = leadingZeros(date.getMinutes(),2);
    function leadingZeros(n, digits) {
        var zero = '';
        n = n.toString();
      
        if (n.length < digits) {
          for (let i = 0; i < digits - n.length; i++)
            zero += '0';
        }
        return zero + n;
      }
    return year + "" + month + "" + day + "|" + dayOfWeek + "|" + hour + min;
  }