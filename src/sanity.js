// src/sanity.js
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
    projectId: 'omgpbpxs2',
    dataset: 'production',
    useCdn: true,
    apiVersion: '2026-05-03',
});

// 💡 Sanity에서 올린 이미지 주소를 리액트가 읽을 수 있는 깨끗한 URL로 바꿔주는 치트키 함수
const builder = imageUrlBuilder(client);
export function urlFor(source) {
    return builder.image(source);
}