export function ContactFooter() {
  return (
    <div className="contact-footer bg-gray-50 border-t border-gray-200 p-5 text-center mt-10 rounded-lg no-print">
      <h3 className="text-lg font-bold mb-2">צור קשר</h3>
      <p className="text-gray-600 mb-2">יש לכם שאלות או הצעות לשיפור?</p>
      <a
        href="mailto:support@gilfinnas.com?subject=פנייה מאפליקציית תזרים מזומנים&body=שלום,"
        className="text-blue-600 hover:text-blue-800 hover:underline font-semibold transition-colors"
      >
        📧 שלחו לנו מייל
      </a>
    </div>
  )
}
