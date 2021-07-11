function sleep(seconds) {
	return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

function timer(sec, min = 0, hour = 0, day = 0) {
	// segundos
	if (sec >= 0) {
	  sec = sec*1000
	}
  
	else {
	  throw Error('seconds must be higher than 0')
	}
  
	// minutos
	if (min >= 0) {
	  min = min*60*1000
	}
  
	else {
	  throw Error('minutes must be higher than 0')
	}
  
	// horas
	if (hour >= 0) {
	  hour = hour*60*60*1000
	}
  
	else {
	  throw Error('hours must be higher than 0')
	}
  
	// day
	if (day >= 0) {
	  day = day*24*60*60*100
	}
  
	else {
	  throw Error('minutes must be higher than 0')
	}
  
	let time = sec + min + hour + day
	return time
  }

module.exports = {
	timer, 
	sleep
}