import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { menuCategories, amenityCategories } from '../constants/categoryOption';

export async function initializeCategoriesInFirestore() {
  const docRef = doc(db, 'categories', 'default');
  const snap = await getDoc(docRef);

  if (!snap.exists()) {
    await setDoc(docRef, {
      menuCategories,
      amenityCategories,
    });
    console.log('✅ 초기 카테고리 저장 완료');
  } else {
    console.log('ℹ️ 이미 존재함, 초기화 생략');
  }
}