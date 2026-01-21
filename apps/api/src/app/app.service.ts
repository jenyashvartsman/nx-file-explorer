import { Injectable, NotFoundException } from '@nestjs/common';
import { ContentDto } from '@libs/dto';
import * as fs from 'fs';
import * as nodePath from 'path';

@Injectable()
export class AppService {
  getContent(path: string): ContentDto {
    // resolve the absolute path
    const target = nodePath.resolve(process.cwd(), path || '.');

    // check if the target exists
    if (!fs.existsSync(target)) {
      throw new NotFoundException(`Path not found: ${path}`);
    }

    // read stats of the target
    const stat = fs.statSync(target);
    const folders: string[] = [];
    const files: string[] = [];

    // if target is a directory, read its contents
    if (stat.isDirectory()) {
      const entries: any[] = fs.readdirSync(target, { withFileTypes: true });
      for (const entry of entries) {
        if (entry.isDirectory()) folders.push(entry.name);
        else files.push(entry.name);
      }
    } else {
      files.push(nodePath.basename(target));
    }

    // map files to FileDto
    const fileDtos = files.map((name) => {
      const filePath = nodePath.join(target, name);
      const fileStat = fs.statSync(filePath);
      return {
        name,
        size: fileStat.size,
        createdAt: fileStat.birthtime,
        modifiedAt: fileStat.mtime,
      };
    });

    // map folders to FolderDto
    const folderDtos = folders.map((name) => ({ name }));

    return {
      folders: folderDtos,
      files: fileDtos,
      path: target,
    };
  }
}
