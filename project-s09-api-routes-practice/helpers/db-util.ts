import {
  FilterQuery,
  MongoClient,
  OptionalId,
  SortOptionObject,
} from "mongodb";

const MONGO_URI = process.env.MONGO_URI as string;

export async function connectDatabase() {
  const client = await MongoClient.connect(MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  return client;
}

export async function insertDocument<T extends OptionalId<{}>>(
  client: MongoClient,
  collection: string,
  document: OptionalId<T>
) {
  const db = client.db();
  const result = await db.collection<T>(collection).insertOne(document);

  return result;
}

export async function getAllDocuments<T>(
  client: MongoClient,
  collection,
  query: FilterQuery<OptionalId<T>>,
  sort: string | [string, number][] | SortOptionObject<OptionalId<T>> = {
    _id: -1,
  }
) {
  const db = client.db();

  const results = await db
    .collection<OptionalId<T>>(collection)
    .find(query)
    .sort(sort)
    .toArray();

  return results;
}
