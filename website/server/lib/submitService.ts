import { Resource } from '../generated/sobs';


export const submitResource = async (request: ResourceSubmission) => {
  console.log(request)
  let resource = new Resource({
    canonicalURL: request.url
  });
  return resource.insert();
}