import { IMAGE_URL } from './constrants';

export const resizeImage = (
    imageUrl: string,
    width: string = 'original',
): string => `${IMAGE_URL}/${width}${imageUrl}`;
