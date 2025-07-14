import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // ===================================================================
    // כאן תהיה הלוגיקה האמיתית שלך לבדיקת המשתמש מול מסד הנתונים
    // לדוגמה, בדיקה מול Firebase, Supabase, או מסד נתונים אחר.
    //
    // לצורך הדגמה, נשתמש במשתמש וסיסמה קבועים.
    // **אל תשתמש בזה בגרסה הסופית! זה לא מאובטח!**
    // ===================================================================

    if (email === "test@test.com" && password === "123456") {
      // אם הפרטים נכונים
      const user = { name: "משתמש לדוגמה", email: "test@test.com" };
      
      // כאן תוכל ליצור טוקן (JWT) או סשן (session) ולהחזיר אותו
      return NextResponse.json({ message: "Login successful", user });

    } else {
      // אם הפרטים שגויים
      return NextResponse.json({ message: "אימייל או סיסמה שגויים" }, { status: 401 });
    }

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "שגיאה פנימית בשרת" }, { status: 500 });
  }
}
