const DateService = {
  fromNow: (then) => {
    const now = Date.now()

    const seconds = Math.floor((now - then) / 1000)
    if (seconds < 60) {
      return seconds === 1 ? `${seconds} second ago` : `${seconds} seconds ago`
    }

    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) {
      return minutes === 1 ? `${minutes} minute ago` : `${minutes} minutes ago`
    }

    const hours = Math.floor(minutes / 60)
    if (hours < 24) {
      return hours === 1 ? `${hours} hour ago` : `${hours} hours ago`
    }

    const days = Math.floor(hours / 24)
    return days === 1 ? `${days} day ago` : `${days} days ago`
  }
}

export default DateService
