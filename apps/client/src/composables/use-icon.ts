const icons = Object.entries(
  import.meta.glob('../assets/icons/**/*.svg', {
    eager: true,
    as: 'raw',
  })
).reduce<{
  [key: string]: string
}>((prev, [filePath, module]) => {
  const filePathParts = filePath.split('/')
  const fileName = filePathParts[filePathParts.length - 1]
  const splittedFileName = fileName.split('.')
  const fileNameWithoutExtension = splittedFileName
    .slice(0, splittedFileName.length - 1)
    .join('.')

  prev[fileNameWithoutExtension] = module
  return prev
}, {})

export const useIcon = (iconName: string): string | undefined => {
  return icons[iconName]
}
