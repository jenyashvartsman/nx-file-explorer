export interface FileDto {
  name: string;
  size: number;
  createdAt: Date;
  modifiedAt: Date;
}

export interface FolderDto {
  name: string;
}

export interface ContentDto {
  files: FileDto[];
  folders: FolderDto[];
  path: string;
}
