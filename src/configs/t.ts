export const getTranslation = (dictionary: Record<string, string>) => {
  const t = (key: string) => {
    return dictionary?.[key] ?? key
  }

  return { t }
}
