// utils/uploadCategories.ts
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { menuCategories, amenityCategories } from '../constants/categoryOption';

export async function uploadCategoriesToFirestore() {
  try {
    const docRef = doc(db, 'categories', 'default');
    await setDoc(docRef, {
      menuCategories,
      amenityCategories,
    });
    console.log('카테고리 데이터 업로드 성공');
  } catch (error) {
    console.error('카테고리 업로드 실패:', error);
  }
}
