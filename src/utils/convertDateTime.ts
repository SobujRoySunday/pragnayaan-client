export const convertDateTime = (timestamp: string) => {
  // const splitted = timestamp.split('T1')
  // const date = splitted[0]
  // const time = splitted[1].split(".")
  // return `${date} ${time}`

  return (new Date(timestamp)).toString()
}