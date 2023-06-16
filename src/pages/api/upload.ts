import formidable from 'formidable';
import fs from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
    bodyParser: false,
  },
};
const post = async (req: any, res: any) => {
  const form: any = new formidable.IncomingForm();
  return form.parse(req, async function (err: any, fields: any, files: { file: any }) {
    const fileName = await saveFile(files.file);
    console.log(fileName)
    return res
      .status(200).json({ fileName })
  });
};

const saveFile = async (file: any) => {
  const data = fs.readFileSync(file.filepath);

  fs.writeFileSync(
    `./public/${file.newFilename}.${
      file.originalFilename.split('.')[parseInt(file.originalFilename.split('.').length) - 1]
    }`,
    data,
  );
  await fs.unlinkSync(file.filepath);
  return file.newFilename
};
type NewType = {
  Data: any;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<NewType>) {
  req.method === 'POST'
    ? post(req, res)
    : req.method === 'PUT'
    ? console.log('PUT')
    : req.method === 'DELETE'
    ? console.log('DELETE')
    : req.method === 'GET'
    ? console.log('GET')
    : res.status(404).end();
}
