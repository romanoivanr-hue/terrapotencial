import PocketBase from 'pocketbase';
export async function getNews(limit = 50) {
 const pb = new PocketBase(process.env.POCKETBASE_URL || 'http://localhost:8090');
 return (await pb.collection('noticias').getList(1, limit, { sort: '-created', filter: 'publicado = true' })).items;
}
export async function getNewsPost(id: string) {
 const pb = new PocketBase(process.env.POCKETBASE_URL || 'http://localhost:8090');
 return pb.collection('noticias').getOne(id);
}
