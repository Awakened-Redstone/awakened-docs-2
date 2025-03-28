export type DocsData = {
  [id: string]: {
    name: string
    path: string
    versions: {
      latest: string
      [versionId: string]: string
    }
  }
}