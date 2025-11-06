import ApiTest from '@/components/ApiTest'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Next.js + Express Boilerplate
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Full-stack TypeScript application with PostgreSQL
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl mb-2">⚛️</div>
            <h3 className="text-lg font-semibold mb-2">Frontend</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Next.js 14 + TypeScript
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl mb-2">🚀</div>
            <h3 className="text-lg font-semibold mb-2">Backend</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Express.js + TypeScript
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl mb-2">🗄️</div>
            <h3 className="text-lg font-semibold mb-2">Database</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              PostgreSQL
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl mb-2">🔧</div>
            <h3 className="text-lg font-semibold mb-2">Dev Tools</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Hot Reload + TypeScript
            </p>
          </div>
        </div>

        <ApiTest />

        <div className="mt-12 text-center text-gray-600 dark:text-gray-300">
          <p className="mb-2">
            <strong>Frontend:</strong> http://localhost:3000
          </p>
          <p>
            <strong>Backend:</strong> http://localhost:3001
          </p>
        </div>
      </div>
    </main>
  )
}