export const buildAriaLabel = (
  label: string | undefined,
  supplementary: string | undefined
) => {
  const parts: string[] = []

  if (label) {
    parts.push(label)
  }

  if (supplementary) {
    parts.push(supplementary)
  }

  return parts.length > 0 ? parts.join(', ') : undefined
}
