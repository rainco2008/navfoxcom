export function build() {
  return {
    write(message: string) {
      console.log(message.trim())
    },
  }
}
